import { STOPS } from '@/constants/data';
import { FlatList, StyleSheet, Text, View } from 'react-native';

export default function RoutesScreen() {
  return (
    <View style={styles.page}>
      <Text style={styles.title}>Kalanki → Bhaktapur</Text>
      <FlatList
        data={STOPS}
        keyExtractor={(s) => s.id}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.km}>{item.km} km</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, padding: 24, paddingTop: 70 },
  title: { fontSize: 26, fontWeight: 'bold', color: '#000', marginBottom: 16 },
  row: {
    flexDirection: 'row', justifyContent: 'space-between',
    paddingVertical: 14, borderBottomWidth: 1, borderColor: '#ddd',
  },
  name: { fontSize: 18, color: '#000' },
  km: { fontSize: 18, color: '#666' },
});
