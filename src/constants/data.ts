// ============================================================
// SAHAYATRI DATA: Kathmandu, Lalitpur, Bhaktapur and Jhapa only.
//
// Coordinates are approximate and routes/fares are PLACEHOLDERS.
// Check places on Google Maps and fix any that sit in the wrong spot.
//
// TO ADD A PLACE: copy one line in PLACES and change it:
//   [id, name, district, latitude, longitude]
//   - id: short, lowercase, no spaces, never used twice
//   - district: exactly Kathmandu, Lalitpur, Bhaktapur or Jhapa
// To get latitude/longitude: on Google Maps (phone), press and hold on the
// exact spot, then copy the two numbers shown.
// ============================================================

export const FARES_UPDATED = 'PLACEHOLDER - replace with the official date';

export type Stop = { id: string; name: string; district: string; lat: number; lng: number };
export type Route = { id: string; name: string; vehicle: string; stops: string[] };

const PLACES: [string, string, string, number, number][] = [
  // ---------------- Kathmandu ----------------
  ['kalanki', 'Kalanki', 'Kathmandu', 27.6933, 85.2816],
  ['kuleshwor', 'Kuleshwor', 'Kathmandu', 27.694, 85.297],
  ['kalimati', 'Kalimati', 'Kathmandu', 27.6983, 85.2997],
  ['teku', 'Teku', 'Kathmandu', 27.6955, 85.304],
  ['tripureshwor', 'Tripureshwor', 'Kathmandu', 27.694, 85.313],
  ['sundhara', 'Sundhara', 'Kathmandu', 27.7005, 85.3135],
  ['newroad', 'New Road', 'Kathmandu', 27.704, 85.312],
  ['ratnapark', 'Ratnapark', 'Kathmandu', 27.7061, 85.3151],
  ['thamel', 'Thamel', 'Kathmandu', 27.7154, 85.3123],
  ['thapathali', 'Thapathali', 'Kathmandu', 27.693, 85.319],
  ['maitighar', 'Maitighar', 'Kathmandu', 27.6945, 85.3225],
  ['putalisadak', 'Putalisadak', 'Kathmandu', 27.705, 85.322],
  ['bagbazar', 'Bagbazar', 'Kathmandu', 27.705, 85.326],
  ['lazimpat', 'Lazimpat', 'Kathmandu', 27.721, 85.321],
  ['baluwatar', 'Baluwatar', 'Kathmandu', 27.726, 85.328],
  ['baneshwor', 'New Baneshwor', 'Kathmandu', 27.6915, 85.3436],
  ['tinkune', 'Tinkune', 'Kathmandu', 27.6855, 85.348],
  ['koteshwor', 'Koteshwor', 'Kathmandu', 27.6783, 85.3495],
  ['sinamangal', 'Sinamangal', 'Kathmandu', 27.696, 85.345],
  ['airport', 'Tribhuvan Airport', 'Kathmandu', 27.6966, 85.3591],
  ['gaushala', 'Gaushala', 'Kathmandu', 27.709, 85.344],
  ['chabahil', 'Chabahil', 'Kathmandu', 27.718, 85.346],
  ['boudha', 'Boudha', 'Kathmandu', 27.7215, 85.362],
  ['jorpati', 'Jorpati', 'Kathmandu', 27.7215, 85.379],
  ['kapan', 'Kapan', 'Kathmandu', 27.741, 85.368],
  ['budhanilkantha', 'Budhanilkantha', 'Kathmandu', 27.779, 85.364],
  ['maharajgunj', 'Maharajgunj', 'Kathmandu', 27.737, 85.33],
  ['basundhara', 'Basundhara', 'Kathmandu', 27.739, 85.333],
  ['tokha', 'Tokha', 'Kathmandu', 27.7633, 85.3293],
  ['gongabu', 'Gongabu', 'Kathmandu', 27.7352, 85.3139],
  ['balaju', 'Balaju', 'Kathmandu', 27.7355, 85.304],
  ['swayambhu', 'Swayambhu', 'Kathmandu', 27.7149, 85.2903],
  ['dallu', 'Dallu', 'Kathmandu', 27.712, 85.3],
  ['balkhu', 'Balkhu', 'Kathmandu', 27.684, 85.296],
  ['kirtipur', 'Kirtipur', 'Kathmandu', 27.667, 85.278],

  // ---------------- Lalitpur ----------------
  ['lagankhel', 'Lagankhel', 'Lalitpur', 27.6669, 85.322],
  ['patan', 'Patan Durbar Square', 'Lalitpur', 27.6727, 85.3253],
  ['jawalakhel', 'Jawalakhel', 'Lalitpur', 27.673, 85.3135],
  ['pulchowk', 'Pulchowk', 'Lalitpur', 27.677, 85.316],
  ['kupondol', 'Kupondol', 'Lalitpur', 27.683, 85.317],
  ['ekantakuna', 'Ekantakuna', 'Lalitpur', 27.666, 85.304],
  ['satdobato', 'Satdobato', 'Lalitpur', 27.658, 85.325],
  ['gwarko', 'Gwarko', 'Lalitpur', 27.667, 85.333],
  ['balkumari', 'Balkumari', 'Lalitpur', 27.6733, 85.3453],
  ['imadol', 'Imadol', 'Lalitpur', 27.659, 85.347],
  ['harisiddhi', 'Harisiddhi', 'Lalitpur', 27.64, 85.345],
  ['godawari', 'Godawari', 'Lalitpur', 27.595, 85.379],

  // ---------------- Bhaktapur ----------------
  ['lokanthali', 'Lokanthali', 'Bhaktapur', 27.674, 85.359],
  ['bode', 'Bode', 'Bhaktapur', 27.687, 85.388],
  ['thimi', 'Thimi', 'Bhaktapur', 27.6783, 85.3868],
  ['bhaktapur', 'Bhaktapur', 'Bhaktapur', 27.671, 85.4298],
  ['suryabinayak', 'Suryabinayak', 'Bhaktapur', 27.659, 85.425],
  ['changunarayan', 'Changunarayan', 'Bhaktapur', 27.716, 85.429],
  ['nagarkot', 'Nagarkot', 'Bhaktapur', 27.7172, 85.52],

  // ---------------- Jhapa ----------------
  ['damak', 'Damak', 'Jhapa', 26.665, 87.7],
  ['birtamod', 'Birtamod Chowk', 'Jhapa', 26.643, 87.992],
  ['chandragadhi', 'Chandragadhi', 'Jhapa', 26.571, 88.08],
  ['bhadrapur', 'Bhadrapur', 'Jhapa', 26.538, 88.095],
  ['kakarbhitta', 'Kakarbhitta', 'Jhapa', 26.648, 88.147],
];

export const STOPS: Stop[] = PLACES.map(([id, name, district, lat, lng]) => ({
  id, name, district, lat, lng,
}));

// Districts shown in the app: Kathmandu first, then A to Z
export const DISTRICTS: string[] = STOPS.map((s) => s.district)
  .filter((d, i, all) => all.indexOf(d) === i)
  .sort((a, b) => (a === 'Kathmandu' ? -1 : b === 'Kathmandu' ? 1 : a.localeCompare(b)));

export function stopsIn(district: string) {
  return STOPS.filter((s) => s.district === district);
}

// A trip stays inside one group. Jhapa is far from the valley, so it has its
// own group. To let two districts be picked together, put them in one group.
const TRIP_GROUPS: string[][] = [['Kathmandu', 'Lalitpur', 'Bhaktapur'], ['Jhapa']];

// Districts you can pick as "To" when "From" is the given district
export function districtsWith(district: string) {
  const group = TRIP_GROUPS.find((g) => g.includes(district));
  return DISTRICTS.filter((x) => (group ? group.includes(x) : x === district));
}

// Routes are approximate and based on general knowledge of the main roads.
// Check them with the operators/transport office and fix as needed.
// TO ADD A ROUTE: copy one line and list the place ids in order.
export const ROUTES: Route[] = [
  {
    id: 'r1', name: 'Kalanki - Bhaktapur', vehicle: 'Microbus',
    stops: ['kalanki', 'kalimati', 'ratnapark', 'baneshwor', 'koteshwor', 'thimi', 'bhaktapur'],
  },
  {
    id: 'r2', name: 'Ratnapark - Bhaktapur (Araniko Highway)', vehicle: 'Bus',
    stops: ['ratnapark', 'maitighar', 'baneshwor', 'tinkune', 'koteshwor', 'lokanthali', 'thimi', 'bhaktapur'],
  },
  {
    id: 'r3', name: 'Lagankhel - Ratnapark', vehicle: 'Microbus',
    stops: ['lagankhel', 'jawalakhel', 'pulchowk', 'kupondol', 'thapathali', 'tripureshwor', 'sundhara', 'ratnapark'],
  },
  {
    id: 'r4', name: 'Ring Road (circular)', vehicle: 'Bus / Microbus',
    stops: ['balaju', 'gongabu', 'maharajgunj', 'chabahil', 'tinkune', 'koteshwor', 'gwarko', 'satdobato', 'ekantakuna', 'balkhu', 'kalanki'],
  },
  {
    id: 'r5', name: 'Ratnapark - Jorpati (via Chabahil, Boudha)', vehicle: 'Microbus',
    stops: ['ratnapark', 'putalisadak', 'gaushala', 'chabahil', 'boudha', 'jorpati'],
  },
  {
    id: 'r6', name: 'Budhanilkantha - Ratnapark', vehicle: 'Bus',
    stops: ['budhanilkantha', 'maharajgunj', 'lazimpat', 'ratnapark'],
  },
  {
    id: 'r7', name: 'Ratnapark - Kalanki', vehicle: 'Microbus',
    stops: ['ratnapark', 'sundhara', 'tripureshwor', 'teku', 'kalimati', 'kuleshwor', 'kalanki'],
  },
  {
    id: 'r8', name: 'Damak - Kakarbhitta (East-West Highway)', vehicle: 'Bus',
    stops: ['damak', 'birtamod', 'chandragadhi', 'kakarbhitta'],
  },
  {
    id: 'r9', name: 'Birtamod - Bhadrapur', vehicle: 'Microbus',
    stops: ['birtamod', 'chandragadhi', 'bhadrapur'],
  },
];

export function routesAt(stopId: string) {
  return ROUTES.filter((r) => r.stops.includes(stopId));
}

export type Vehicle = { id: string; label: string; base: number; perKm: number };
export const VEHICLES: Vehicle[] = [
  { id: 'bus', label: 'Bus', base: 15, perKm: 1.8 },
  { id: 'microbus', label: 'Microbus', base: 20, perKm: 2.2 },
  { id: 'tempo', label: 'Tempo', base: 15, perKm: 2.0 },
];

export type Passenger = { id: string; label: string; discount: number };
export const PASSENGERS: Passenger[] = [
  { id: 'regular', label: 'Regular', discount: 0 },
  { id: 'student', label: 'Student', discount: 0.25 },
  { id: 'senior', label: 'Senior citizen', discount: 0.5 },
];

export const ISSUES = [
  'Overcharging',
  'No student discount',
  'No senior discount',
  'Refused passenger',
  'Unsafe driving',
  'Harassment',
  'Overcrowding',
  'Other',
];

// Straight-line distance in km between two coordinates (haversine)
export function distanceKm(aLat: number, aLng: number, bLat: number, bLng: number) {
  const R = 6371;
  const rad = (d: number) => (d * Math.PI) / 180;
  const dLat = rad(bLat - aLat);
  const dLng = rad(bLng - aLng);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(rad(aLat)) * Math.cos(rad(bLat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

// Stops within radiusKm of a point, nearest first
export function nearbyStops(lat: number, lng: number, radiusKm: number) {
  return STOPS.map((s) => ({ ...s, dist: distanceKm(lat, lng, s.lat, s.lng) }))
    .filter((s) => s.dist <= radiusKm)
    .sort((a, b) => a.dist - b.dist);
}

export function calcFare(fromId: string, toId: string, vehicleId: string, passengerId: string) {
  const from = STOPS.find((s) => s.id === fromId)!;
  const to = STOPS.find((s) => s.id === toId)!;
  const vehicle = VEHICLES.find((v) => v.id === vehicleId)!;
  const passenger = PASSENGERS.find((p) => p.id === passengerId)!;

  // Roads are longer than a straight line, so multiply by 1.3
  const km = Math.round(distanceKm(from.lat, from.lng, to.lat, to.lng) * 1.3 * 10) / 10;
  const raw = vehicle.base + vehicle.perKm * km;
  const full = Math.ceil(raw / 5) * 5;
  const fare = Math.ceil((raw * (1 - passenger.discount)) / 5) * 5;
  return { km, fullFare: full, fare, saved: full - fare };
}