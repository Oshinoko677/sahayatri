import {
    onAuthStateChanged,
    signInWithEmailAndPassword, signOut,
    User,
} from 'firebase/auth';
import {
    collection,
    doc,
    limit, onSnapshot,
    orderBy,
    query,
    updateDoc,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Image,
    Pressable,
    StyleSheet,
    Text, TextInput,
    View,
} from 'react-native';
import { auth, db } from '../constants/firebase';

type Complaint = {
  id: string;
  issue: string;
  plate: string;
  route: string;
  details: string;
  photo: string;
  status: string;
  createdAt?: { toDate: () => Date };
};

const STATUSES = ['received', 'forwarded', 'resolved'];

export default function AdminPanel({ onBack }: { onBack: () => void }) {
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [items, setItems] = useState<Complaint[]>([]);
  const [filter, setFilter] = useState('all');

  // Follow login / logout
  useEffect(() => onAuthStateChanged(auth, setUser), []);

  // Live list of the 50 newest complaints (only works for the admin account)
  useEffect(() => {
    if (!user) {
      setItems([]);
      return;
    }
    const q = query(collection(db, 'complaints'), orderBy('createdAt', 'desc'), limit(50));
    return onSnapshot(
      q,
      (snap) =>
        setItems(
          snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Complaint, 'id'>) }))
        ),
      () =>
        Alert.alert(
          'Not allowed',
          'This account cannot read complaints. Check the admin email in the Firestore rules.'
        )
    );
  }, [user]);

  const login = async () => {
    setBusy(true);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      setPassword('');
    } catch {
      Alert.alert('Login failed', 'Wrong email or password.');
    }
    setBusy(false);
  };

  const setStatus = async (id: string, status: string) => {
    try {
      await updateDoc(doc(db, 'complaints', id), { status });
    } catch {
      Alert.alert('Could not update', 'Check your internet and the Firestore rules.');
    }
  };

  const shown = items.filter((c) => filter === 'all' || c.status === filter);

  // Login form
  if (!user) {
    return (
      <View>
        <Text style={s.title}>Admin login</Text>
        <Text style={s.sub}>Only the project admin can sign in.</Text>
        <TextInput
          style={s.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Admin email"
          placeholderTextColor="#999"
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          style={s.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          placeholderTextColor="#999"
          secureTextEntry
          autoCapitalize="none"
        />
        <Pressable style={s.btn} onPress={login} disabled={busy}>
          {busy ? <ActivityIndicator color="#fff" /> : <Text style={s.btnText}>Sign in</Text>}
        </Pressable>
        <Pressable style={s.link} onPress={onBack}>
          <Text style={s.linkText}>Back to report form</Text>
        </Pressable>
      </View>
    );
  }

  // Complaint list
  return (
    <View>
      <Text style={s.title}>Complaints</Text>
      <Text style={s.sub}>{items.length} newest complaints</Text>

      <View style={s.chips}>
        {['all', ...STATUSES].map((f) => (
          <Pressable key={f} onPress={() => setFilter(f)} style={[s.chip, filter === f && s.chipOn]}>
            <Text style={[s.chipText, filter === f && s.chipTextOn]}>{f}</Text>
          </Pressable>
        ))}
      </View>

      {shown.length === 0 && <Text style={s.empty}>No complaints here yet.</Text>}

      {shown.map((c) => (
        <View key={c.id} style={s.card}>
          <Text style={s.issue}>{c.issue}</Text>
          <Text style={s.plate}>Plate: {c.plate}</Text>
          {c.route ? <Text style={s.meta}>Route: {c.route}</Text> : null}
          {c.details ? <Text style={s.details}>{c.details}</Text> : null}
          {c.photo ? <Image source={{ uri: c.photo }} style={s.photo} /> : null}
          <Text style={s.meta}>{c.createdAt?.toDate().toLocaleString() ?? 'Sending...'}</Text>

          <View style={s.chips}>
            {STATUSES.map((st) => (
              <Pressable
                key={st}
                onPress={() => setStatus(c.id, st)}
                style={[s.chip, c.status === st && s.chipOn]}>
                <Text style={[s.chipText, c.status === st && s.chipTextOn]}>{st}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      ))}

      <Pressable style={s.link} onPress={() => signOut(auth)}>
        <Text style={s.linkText}>Sign out</Text>
      </Pressable>
      <Pressable style={s.link} onPress={onBack}>
        <Text style={s.linkText}>Back to report form</Text>
      </Pressable>
    </View>
  );
}

const s = StyleSheet.create({
  title: { fontSize: 28, fontWeight: '800', color: '#14213D' },
  sub: { color: '#555', marginTop: 4, marginBottom: 14 },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#D5D8E0',
    borderRadius: 10,
    padding: 12,
    color: '#111',
    marginBottom: 12,
  },
  btn: { backgroundColor: '#14213D', padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 4 },
  btnText: { color: '#fff', fontWeight: '800', fontSize: 16 },
  link: { alignItems: 'center', paddingVertical: 14 },
  linkText: { color: '#C8102E', fontWeight: '700' },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 8 },
  chip: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#D5D8E0',
  },
  chipOn: { backgroundColor: '#C8102E', borderColor: '#C8102E' },
  chipText: { color: '#333' },
  chipTextOn: { color: '#fff', fontWeight: '700' },
  empty: { color: '#555', marginTop: 20 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    marginTop: 14,
    borderWidth: 1,
    borderColor: '#D5D8E0',
  },
  issue: { fontSize: 18, fontWeight: '800', color: '#14213D' },
  plate: { fontWeight: '700', color: '#C8102E', marginTop: 4 },
  meta: { color: '#555', marginTop: 4 },
  details: { color: '#222', marginTop: 8 },
  photo: { width: '100%', height: 200, borderRadius: 10, marginTop: 10, backgroundColor: '#ddd' },
});

