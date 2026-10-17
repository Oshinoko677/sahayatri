import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { DISTRICTS, ROUTES, STOPS } from '../constants/data';

type Card = { title: string; text: string; path: string; color: string; icon: string };

const CARDS: Card[] = [
  {
    title: 'Fare finder',
    text: 'Check the fair fare, with student and senior discounts.',
    path: '/fare',
    color: '#14213D',
    icon: '🚌',
  },
  {
    title: 'Routes & places',
    text: 'Browse places by district and see the routes that serve them.',
    path: '/explore',
    color: '#1E7B4B',
    icon: '🗺️',
  },
  {
    title: 'Report a problem',
    text: 'Overcharged or treated unfairly? Send a complaint with a photo.',
    path: '/report',
    color: '#C8102E',
    icon: '📢',
  },
];

export default function HomeScreen() {
  const router = useRouter();
  const go = (path: string) => router.push(path as never);

  return (
    <ScrollView contentContainerStyle={s.page}>
      <View style={s.hero}>
        <Text style={s.brand}>Sahayatri</Text>
        <Text style={s.tagline}>Know the fair fare. Ride with confidence.</Text>

        <View style={s.stats}>
          <View style={s.stat}>
            <Text style={s.statNum}>{DISTRICTS.length}</Text>
            <Text style={s.statLabel}>districts</Text>
          </View>
          <View style={s.stat}>
            <Text style={s.statNum}>{STOPS.length}</Text>
            <Text style={s.statLabel}>places</Text>
          </View>
          <View style={s.stat}>
            <Text style={s.statNum}>{ROUTES.length}</Text>
            <Text style={s.statLabel}>routes</Text>
          </View>
        </View>
      </View>

      <Text style={s.section}>What do you need?</Text>
      {CARDS.map((c) => (
        <Pressable key={c.path} style={s.card} onPress={() => go(c.path)}>
          <View style={[s.iconBox, { backgroundColor: c.color }]}>
            <Text style={s.icon}>{c.icon}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={s.cardTitle}>{c.title}</Text>
            <Text style={s.cardText}>{c.text}</Text>
          </View>
          <Text style={s.arrow}>›</Text>
        </Pressable>
      ))}

      <Text style={s.section}>Popular routes</Text>
      {ROUTES.slice(0, 4).map((r) => (
        <View key={r.id} style={s.route}>
          <Text style={s.routeName}>{r.name}</Text>
          <Text style={s.routeMeta}>{r.vehicle} • {r.stops.length} stops</Text>
        </View>
      ))}
      <Pressable onPress={() => go('/explore')}>
        <Text style={s.more}>See all routes and places</Text>
      </Pressable>

      <View style={s.tip}>
        <Text style={s.tipTitle}>Know your rights</Text>
        <Text style={s.tipText}>
          Ask the conductor for the official fare. Students and senior citizens may be eligible
          for a discount. If you are charged more, report it in the app.
        </Text>
      </View>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  page: { padding: 24, paddingTop: 70, paddingBottom: 140, backgroundColor: '#F7F7F5' },
  hero: { backgroundColor: '#14213D', borderRadius: 20, padding: 22 },
  brand: { color: '#fff', fontSize: 34, fontWeight: '900' },
  tagline: { color: '#D5D8E0', marginTop: 4, fontSize: 15 },
  stats: { flexDirection: 'row', gap: 10, marginTop: 20 },
  stat: { flex: 1, backgroundColor: 'rgba(255,255,255,0.12)', borderRadius: 12, paddingVertical: 12, alignItems: 'center' },
  statNum: { color: '#fff', fontSize: 24, fontWeight: '800' },
  statLabel: { color: '#D5D8E0', fontSize: 12, marginTop: 2 },
  section: { marginTop: 26, marginBottom: 10, fontSize: 18, fontWeight: '800', color: '#14213D' },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#D5D8E0',
  },
  iconBox: { width: 52, height: 52, borderRadius: 14, alignItems: 'center', justifyContent: 'center', marginRight: 14 },
  icon: { fontSize: 26 },
  cardTitle: { fontSize: 17, fontWeight: '800', color: '#14213D' },
  cardText: { color: '#555', marginTop: 2 },
  arrow: { fontSize: 30, color: '#999', marginLeft: 8 },
  route: { backgroundColor: '#fff', borderRadius: 12, padding: 14, marginBottom: 8, borderWidth: 1, borderColor: '#D5D8E0' },
  routeName: { fontWeight: '800', color: '#14213D' },
  routeMeta: { color: '#555', marginTop: 2 },
  more: { color: '#C8102E', fontWeight: '700', marginTop: 6, textAlign: 'center', paddingVertical: 8 },
  tip: { marginTop: 22, backgroundColor: '#FFF4E5', borderRadius: 14, padding: 16, borderWidth: 1, borderColor: '#F0D9B5' },
  tipTitle: { fontWeight: '800', color: '#8A4B00' },
  tipText: { color: '#5A3A10', marginTop: 4 },
});