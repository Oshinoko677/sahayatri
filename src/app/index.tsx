import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import {
  calcFare,
  DISTRICTS,
  FARES_UPDATED,
  PASSENGERS,
  stopsIn, VEHICLES,
} from '../constants/data';

type Props = {
  title: string;
  district: string;
  stop: string;
  onDistrict: (d: string) => void;
  onStop: (id: string) => void;
};

function PlacePicker({ title, district, stop, onDistrict, onStop }: Props) {
  return (
    <View>
      <Text style={s.label}>{title} district</Text>
      <View style={s.pickerBox}>
        <Picker selectedValue={district} onValueChange={onDistrict}
          style={{ color: '#111' }} dropdownIconColor="#14213D">
          {DISTRICTS.map((d) => <Picker.Item key={d} label={d} value={d} />)}
        </Picker>
      </View>
      <Text style={s.label}>{title} place</Text>
      <View style={s.pickerBox}>
        <Picker selectedValue={stop} onValueChange={onStop}
          style={{ color: '#111' }} dropdownIconColor="#14213D">
          {stopsIn(district).map((st) => <Picker.Item key={st.id} label={st.name} value={st.id} />)}
        </Picker>
      </View>
    </View>
  );
}

type Item = { id: string; label: string };
function Chips({ items, value, onPick }: { items: Item[]; value: string; onPick: (id: string) => void }) {
  return (
    <View style={s.chips}>
      {items.map((i) => (
        <Pressable key={i.id} onPress={() => onPick(i.id)}
          style={[s.chip, value === i.id && s.chipOn]}>
          <Text style={[s.chipText, value === i.id && s.chipTextOn]}>{i.label}</Text>
        </Pressable>
      ))}
    </View>
  );
}

export default function HomeScreen() {
  const router = useRouter();
  const first = DISTRICTS[0];
  const [fromD, setFromD] = useState(first);
  const [fromS, setFromS] = useState(stopsIn(first)[0].id);
  const [toD, setToD] = useState(first);
  const [toS, setToS] = useState((stopsIn(first)[1] ?? stopsIn(first)[0]).id);
  const [vehicle, setVehicle] = useState('bus');
  const [passenger, setPassenger] = useState('regular');
  const [result, setResult] = useState<ReturnType<typeof calcFare> | null>(null);
  const [error, setError] = useState('');

  const pickFromDistrict = (d: string) => { setFromD(d); setFromS(stopsIn(d)[0].id); setResult(null); };
  const pickToDistrict = (d: string) => { setToD(d); setToS(stopsIn(d)[0].id); setResult(null); };

  const swap = () => {
    setFromD(toD); setFromS(toS);
    setToD(fromD); setToS(fromS);
    setResult(null);
  };

  const calculate = () => {
    if (fromS === toS) {
      setResult(null);
      setError('Please pick two different places.');
      return;
    }
    setError('');
    setResult(calcFare(fromS, toS, vehicle, passenger));
  };

  return (
    <ScrollView contentContainerStyle={s.page}>
      <Text style={s.title}>Fare finder</Text>
      <Text style={s.sub}>Pick the district first, then the place.</Text>

      <PlacePicker title="From" district={fromD} stop={fromS}
        onDistrict={pickFromDistrict} onStop={(id) => { setFromS(id); setResult(null); }} />

      <Pressable onPress={swap} style={s.swap}>
        <Text style={s.swapText}>⇅ Swap</Text>
      </Pressable>

      <PlacePicker title="To" district={toD} stop={toS}
        onDistrict={pickToDistrict} onStop={(id) => { setToS(id); setResult(null); }} />

      <Text style={s.label}>Vehicle</Text>
      <Chips items={VEHICLES} value={vehicle} onPick={(id) => { setVehicle(id); setResult(null); }} />

      <Text style={s.label}>Passenger</Text>
      <Chips items={PASSENGERS} value={passenger} onPick={(id) => { setPassenger(id); setResult(null); }} />

      <Pressable style={s.btn} onPress={calculate}>
        <Text style={s.btnText}>Show fare</Text>
      </Pressable>

      {error !== '' && <Text style={s.error}>{error}</Text>}

      {result && (
        <View style={s.card}>
          <Text style={s.cardLabel}>Official fare</Text>
          <Text style={s.fare}>Rs. {result.fare}</Text>
          <Text style={s.meta}>Distance: about {result.km} km</Text>
          {result.saved > 0 && (
            <Text style={s.saved}>You save Rs. {result.saved} (full fare Rs. {result.fullFare})</Text>
          )}
          {result.km > 40 && (
            <Text style={s.warn}>Long distance: fares for long routes can differ. Check with the transport office.</Text>
          )}
          <Text style={s.meta}>Rates updated: {FARES_UPDATED}</Text>
          <Pressable style={s.reportBtn} onPress={() => router.push('/report')}>
            <Text style={s.reportText}>Charged more? Report it</Text>
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
}

const s = StyleSheet.create({
  page: { padding: 24, paddingTop: 70, paddingBottom: 140, backgroundColor: '#F7F7F5' },
  title: { fontSize: 28, fontWeight: '800', color: '#14213D' },
  sub: { color: '#555', marginTop: 4, marginBottom: 12 },
  label: { marginTop: 16, marginBottom: 6, fontWeight: '700', color: '#14213D' },
  pickerBox: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#D5D8E0', borderRadius: 10 },
  swap: { alignSelf: 'flex-end', marginTop: 8, paddingVertical: 4, paddingHorizontal: 10 },
  swapText: { color: '#C8102E', fontWeight: '700' },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { paddingVertical: 8, paddingHorizontal: 14, borderRadius: 20, backgroundColor: '#fff', borderWidth: 1, borderColor: '#D5D8E0' },
  chipOn: { backgroundColor: '#C8102E', borderColor: '#C8102E' },
  chipText: { color: '#333' },
  chipTextOn: { color: '#fff', fontWeight: '700' },
  btn: { marginTop: 24, backgroundColor: '#14213D', padding: 16, borderRadius: 12, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: '800', fontSize: 16 },
  error: { color: '#C8102E', marginTop: 12, fontWeight: '600' },
  card: { marginTop: 24, backgroundColor: '#fff', borderRadius: 16, padding: 20, borderWidth: 1, borderColor: '#D5D8E0' },
  cardLabel: { color: '#555', fontWeight: '600' },
  fare: { fontSize: 44, fontWeight: '900', color: '#1E7B4B', marginVertical: 4 },
  meta: { color: '#555', marginTop: 4 },
  saved: { color: '#1E7B4B', fontWeight: '700', marginTop: 6 },
  warn: { color: '#B26A00', fontWeight: '600', marginTop: 8 },
  reportBtn: { marginTop: 16, borderWidth: 1.5, borderColor: '#C8102E', padding: 12, borderRadius: 10, alignItems: 'center' },
  reportText: { color: '#C8102E', fontWeight: '800' },
});