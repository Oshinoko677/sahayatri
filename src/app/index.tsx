import {
  FARES_UPDATED,
  PASSENGERS,
  STOPS, VEHICLES,
  calcFare,
} from '@/constants/data';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';

export default function HomeScreen() {
  const [from, setFrom] = useState(STOPS[0].id);
  const [to, setTo] = useState(STOPS[1].id);
  const [vehicle, setVehicle] = useState(VEHICLES[0].id);
  const [passenger, setPassenger] = useState(PASSENGERS[0].id);
  const [result, setResult] = useState<ReturnType<typeof calcFare>>(null);
  const [message, setMessage] = useState('');

  const showPrice = () => {
    if (from === to) {
      setResult(null);
      setMessage('Please pick two different stops.');
      return;
    }
    setMessage('');
    setResult(calcFare(from, to, vehicle, passenger));
  };

  return (
    <ScrollView contentContainerStyle={styles.page}>
      <Text style={styles.title}>Bus Fare Finder 🚌</Text>

      <Text style={styles.label}>From:</Text>
      <Picker selectedValue={from} onValueChange={setFrom}>
        {STOPS.map((s) => (
          <Picker.Item key={s.id} label={s.name} value={s.id} />
        ))}
      </Picker>

      <Text style={styles.label}>To:</Text>
      <Picker selectedValue={to} onValueChange={setTo}>
        {STOPS.map((s) => (
          <Picker.Item key={s.id} label={s.name} value={s.id} />
        ))}
      </Picker>

      <Text style={styles.label}>Vehicle:</Text>
      <Picker selectedValue={vehicle} onValueChange={setVehicle}>
        {VEHICLES.map((v) => (
          <Picker.Item key={v.id} label={v.label} value={v.id} />
        ))}
      </Picker>

      <Text style={styles.label}>Passenger:</Text>
      <Picker selectedValue={passenger} onValueChange={setPassenger}>
        {PASSENGERS.map((p) => (
          <Picker.Item key={p.id} label={p.label} value={p.id} />
        ))}
      </Picker>

      <Pressable style={styles.button} onPress={showPrice}>
        <Text style={styles.buttonText}>SHOW ME THE PRICE!</Text>
      </Pressable>

      {message !== '' && <Text style={styles.error}>{message}</Text>}

      {result && (
        <>
          <Text style={styles.price}>Fair price: Rs. {result.fare}</Text>
          <Text style={styles.small}>Distance: {result.km} km</Text>
          {result.saved > 0 && (
            <Text style={styles.small}>
              You save Rs. {result.saved} (full fare Rs. {result.fullFare})
            </Text>
          )}
          <Text style={styles.small}>Rates updated: {FARES_UPDATED}</Text>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: { padding: 24, paddingTop: 70 },
  title: { fontSize: 32, fontWeight: 'bold', color: '#000', marginBottom: 20 },
  label: { fontSize: 18, fontWeight: '600', color: '#000', marginTop: 12 },
  button: {
    backgroundColor: '#2196F3', padding: 16, borderRadius: 6, marginTop: 20,
  },
  buttonText: { color: '#fff', textAlign: 'center', fontSize: 16 },
  price: { fontSize: 30, fontWeight: 'bold', color: 'green', marginTop: 24 },
  small: { fontSize: 16, color: '#333', marginTop: 6 },
  error: { color: 'red', fontSize: 16, marginTop: 12 },
});
