import { Picker } from '@react-native-picker/picker';
import * as Location from 'expo-location';
import { useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { distanceKm, DISTRICTS, nearbyStops, routesAt, Stop, stopsIn } from '../constants/data';

type Coords = { lat: number; lng: number };

function mapHtml(you: Coords | null, stops: Stop[]) {
  const first = stops[0];
  const center = you ? [you.lat, you.lng] : first ? [first.lat, first.lng] : [28.3949, 84.124];
  const pins = stops.map((s) => ({ n: s.name, lat: s.lat, lng: s.lng }));
  return `<!DOCTYPE html><html><head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css"/>
<style>html,body,#map{height:100%;margin:0}</style></head><body><div id="map"></div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js"></script>
<script>
var map = L.map('map').setView(${JSON.stringify(center)}, 12);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',
  {maxZoom:19, attribution:'&copy; OpenStreetMap contributors'}).addTo(map);
var you = ${JSON.stringify(you)};
var stops = ${JSON.stringify(pins)};
var pts = [];
if (you) {
  L.circleMarker([you.lat, you.lng], {radius:9,color:'#fff',weight:3,fillColor:'#1A73E8',fillOpacity:1})
    .addTo(map).bindPopup('You are here');
  pts.push([you.lat, you.lng]);
}
stops.forEach(function(s){
  L.circleMarker([s.lat, s.lng], {radius:8,color:'#fff',weight:2,fillColor:'#C8102E',fillOpacity:1})
    .addTo(map).bindPopup(s.n);
  pts.push([s.lat, s.lng]);
});
if (pts.length > 1) { map.fitBounds(pts, {padding:[30,30], maxZoom:15}); }
</script></body></html>`;
}

export default function MapScreen() {
  const [district, setDistrict] = useState(DISTRICTS[0]);
  const [you, setYou] = useState<Coords | null>(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  const locate = async () => {
    setLoading(true);
    setMsg('');
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setMsg('Location permission was denied. Pick your district below instead.');
        setLoading(false);
        return;
      }
      const pos = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
      const c = { lat: pos.coords.latitude, lng: pos.coords.longitude };
      setYou(c);
      // Pick the district of the closest known stop (within 25 km)
      const closest = nearbyStops(c.lat, c.lng, 25)[0];
      if (closest) {
        setDistrict(closest.district);
      } else {
        setMsg('No known stops within 25 km of you. Pick your district below.');
      }
    } catch {
      setMsg('Could not get your location. Pick your district below.');
    }
    setLoading(false);
  };

  // Only the stops of the chosen district
  const stops = stopsIn(district)
    .map((st) => ({ ...st, dist: you ? distanceKm(you.lat, you.lng, st.lat, st.lng) : null }))
    .sort((a, b) => (a.dist ?? 0) - (b.dist ?? 0) || a.name.localeCompare(b.name));

  // Show the blue dot only if you are near this district
  const youHere = you && stops.some((st) => st.dist !== null && st.dist <= 50) ? you : null;

  return (
    <ScrollView contentContainerStyle={s.page}>
      <Text style={s.title}>Places in a district</Text>
      <Text style={s.sub}>Choose your district, or let the app find it.</Text>

      <Text style={s.label}>District</Text>
      <View style={s.pickerBox}>
        <Picker selectedValue={district} onValueChange={setDistrict}
          style={{ color: '#111' }} dropdownIconColor="#14213D">
          {DISTRICTS.map((d) => <Picker.Item key={d} label={d} value={d} />)}
        </Picker>
      </View>

      <Pressable style={s.btn} onPress={locate} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : (
          <Text style={s.btnText}>Find my district</Text>
        )}
      </Pressable>
      {msg !== '' && <Text style={s.error}>{msg}</Text>}

      <View style={s.mapBox}>
        <WebView
          key={`${district}-${youHere ? 'you' : 'no'}`}
          originWhitelist={['*']}
          source={{ html: mapHtml(youHere, stops) }}
          style={{ flex: 1 }}
        />
      </View>

      <Text style={s.count}>{stops.length} places in {district}</Text>

      {stops.map((st) => (
        <View key={st.id} style={s.item}>
          <View style={{ flex: 1 }}>
            <Text style={s.itemName}>{st.name}</Text>
            <Text style={s.itemRoutes}>
              {routesAt(st.id).map((r) => r.name).join(' • ') || 'No route listed yet'}
            </Text>
          </View>
          {st.dist !== null && st.dist <= 50 && <Text style={s.dist}>{st.dist.toFixed(1)} km</Text>}
        </View>
      ))}
    </ScrollView>
  );
}

const s = StyleSheet.create({
  page: { padding: 24, paddingTop: 70, paddingBottom: 140, backgroundColor: '#F7F7F5' },
  title: { fontSize: 28, fontWeight: '800', color: '#14213D' },
  sub: { color: '#555', marginTop: 4, marginBottom: 8 },
  label: { marginTop: 12, marginBottom: 6, fontWeight: '700', color: '#14213D' },
  pickerBox: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#D5D8E0', borderRadius: 10 },
  btn: { marginTop: 14, backgroundColor: '#14213D', padding: 14, borderRadius: 12, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: '800', fontSize: 15 },
  error: { color: '#C8102E', marginTop: 12, fontWeight: '600' },
  mapBox: { height: 300, marginTop: 18, borderRadius: 16, overflow: 'hidden', borderWidth: 1, borderColor: '#D5D8E0' },
  count: { marginTop: 16, fontWeight: '700', color: '#14213D' },
  item: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 12, padding: 14, marginTop: 10, borderWidth: 1, borderColor: '#D5D8E0' },
  itemName: { fontWeight: '800', color: '#14213D', fontSize: 16 },
  itemRoutes: { color: '#555', marginTop: 2 },
  dist: { color: '#C8102E', fontWeight: '800' },
});