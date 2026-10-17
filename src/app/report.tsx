import { ImageManipulator, SaveFormat } from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useState } from 'react';
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text, TextInput,
  View,
} from 'react-native';
import AdminPanel from '../components/admin-panel';
import { ISSUES } from '../constants/data';
import { db, firebaseReady } from '../constants/firebase';

// Shrinks a photo to 800px wide and turns it into text, so it can be saved
// inside the complaint (no paid Firebase Storage needed).
async function shrink(uri: string) {
  const ctx = ImageManipulator.manipulate(uri);
  ctx.resize({ width: 800 });
  const img = await ctx.renderAsync();
  const out = await img.saveAsync({ compress: 0.5, format: SaveFormat.JPEG, base64: true });
  return 'data:image/jpeg;base64,' + out.base64;
}

export default function ReportScreen() {
  const [issue, setIssue] = useState(ISSUES[0]);
  const [plate, setPlate] = useState('');
  const [route, setRoute] = useState('');
  const [details, setDetails] = useState('');
  const [photo, setPhoto] = useState('');
  const [sending, setSending] = useState(false);
  const [admin, setAdmin] = useState(false);

  const takePhoto = async () => {
    const perm = await ImagePicker.requestCameraPermissionsAsync();
    if (!perm.granted) {
      Alert.alert('Camera blocked', 'Allow camera access in your phone settings.');
      return;
    }
    const res = await ImagePicker.launchCameraAsync({ quality: 0.7 });
    if (!res.canceled) setPhoto(await shrink(res.assets[0].uri));
  };

  const pickPhoto = async () => {
    const res = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images'], quality: 0.7 });
    if (!res.canceled) setPhoto(await shrink(res.assets[0].uri));
  };

  const submit = async () => {
    if (!plate.trim()) {
      Alert.alert('Number plate needed', 'Enter the vehicle number plate.');
      return;
    }
    if (!firebaseReady) {
      Alert.alert('Not connected yet', 'Add your Firebase config in firebase.ts.');
      return;
    }
    if (photo.length > 900000) {
      Alert.alert('Photo too large', 'Please choose a different photo.');
      return;
    }
    setSending(true);
    try {
      await addDoc(collection(db, 'complaints'), {
        issue,
        plate: plate.trim().toUpperCase(),
        route: route.trim(),
        details: details.trim(),
        photo,
        status: 'received',
        createdAt: serverTimestamp(),
      });
      setPlate('');
      setRoute('');
      setDetails('');
      setPhoto('');
      Alert.alert('Complaint sent', 'Thank you for reporting.');
    } catch {
      Alert.alert('Could not send', 'Check your internet and try again.');
    }
    setSending(false);
  };

  // Admin area: long-press the title to open it
  if (admin) {
    return (
      <ScrollView contentContainerStyle={s.page}>
        <AdminPanel onBack={() => setAdmin(false)} />
      </ScrollView>
    );
  }

  return (
    <ScrollView contentContainerStyle={s.page}>
      <Text style={s.title} onLongPress={() => setAdmin(true)}>Report a problem</Text>
      <Text style={s.sub}>Overcharged or treated unfairly? Tell us.</Text>

      <Text style={s.label}>What happened?</Text>
      <View style={s.chips}>
        {ISSUES.map((i) => (
          <Pressable
            key={i}
            onPress={() => setIssue(i)}
            style={[s.chip, issue === i && s.chipOn]}>
            <Text style={[s.chipText, issue === i && s.chipTextOn]}>{i}</Text>
          </Pressable>
        ))}
      </View>

      <Text style={s.label}>Number plate</Text>
      <TextInput
        style={s.input}
        value={plate}
        onChangeText={setPlate}
        placeholder="e.g. Ba 1 Ja 1234"
        placeholderTextColor="#999"
      />

      <Text style={s.label}>Route (optional)</Text>
      <TextInput
        style={s.input}
        value={route}
        onChangeText={setRoute}
        placeholder="e.g. Kalanki to Koteshwor"
        placeholderTextColor="#999"
      />

      <Text style={s.label}>Details (optional)</Text>
      <TextInput
        style={[s.input, { height: 110 }]}
        value={details}
        onChangeText={setDetails}
        multiline
        textAlignVertical="top"
        placeholder="What did the driver or conductor say or do?"
        placeholderTextColor="#999"
      />

      <Text style={s.label}>Photo (optional)</Text>
      {photo !== '' && <Image source={{ uri: photo }} style={s.preview} />}
      <View style={s.photoRow}>
        <Pressable style={s.photoBtn} onPress={takePhoto}>
          <Text style={s.photoText}>Take photo</Text>
        </Pressable>
        <Pressable style={s.photoBtn} onPress={pickPhoto}>
          <Text style={s.photoText}>Choose photo</Text>
        </Pressable>
        {photo !== '' && (
          <Pressable style={s.photoBtn} onPress={() => setPhoto('')}>
            <Text style={s.photoText}>Remove</Text>
          </Pressable>
        )}
      </View>

      <Pressable
        style={[s.btn, sending && { opacity: 0.6 }]}
        onPress={submit}
        disabled={sending}>
        <Text style={s.btnText}>{sending ? 'Sending...' : 'Send complaint'}</Text>
      </Pressable>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  page: { padding: 24, paddingTop: 70, paddingBottom: 140, backgroundColor: '#F7F7F5' },
  title: { fontSize: 28, fontWeight: '800', color: '#14213D' },
  sub: { color: '#555', marginTop: 4, marginBottom: 12 },
  label: { marginTop: 18, marginBottom: 6, fontWeight: '700', color: '#14213D' },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#D5D8E0',
  },
  chipOn: { backgroundColor: '#C8102E', borderColor: '#C8102E' },
  chipText: { color: '#333' },
  chipTextOn: { color: '#fff', fontWeight: '700' },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#D5D8E0',
    borderRadius: 10,
    padding: 12,
    color: '#111',
  },
  preview: { width: '100%', height: 200, borderRadius: 12, marginBottom: 10, backgroundColor: '#ddd' },
  photoRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  photoBtn: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#14213D',
    backgroundColor: '#fff',
  },
  photoText: { color: '#14213D', fontWeight: '700' },
  btn: { marginTop: 28, backgroundColor: '#C8102E', padding: 16, borderRadius: 12, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: '800', fontSize: 16 },
});