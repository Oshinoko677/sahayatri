// ============================================================
// STARTER DATA. Coordinates are approximate and routes/fares are
// PLACEHOLDERS. Check stops on openstreetmap.org / Google Maps and
// replace fares with official rates before sharing the app.
//
// TO ADD A PLACE: copy one line in STOPS, change the name, district,
// lat and lng. Spell the district exactly like the existing ones.
// All 77 districts are included through their district headquarters
// (see DISTRICT_HQ near the bottom of STOPS).
// ============================================================

export const FARES_UPDATED = 'PLACEHOLDER - replace with the official date';

export type Stop = { id: string; name: string; district: string; lat: number; lng: number };
export type Route = { id: string; name: string; vehicle: string; stops: string[] };

const DETAILED_STOPS: Stop[] = [
  // Kathmandu district
  { id: 'kalanki', name: 'Kalanki', district: 'Kathmandu', lat: 27.6933, lng: 85.2816 },
  { id: 'kalimati', name: 'Kalimati', district: 'Kathmandu', lat: 27.6983, lng: 85.2997 },
  { id: 'ratnapark', name: 'Ratnapark', district: 'Kathmandu', lat: 27.7061, lng: 85.3151 },
  { id: 'baneshwor', name: 'New Baneshwor', district: 'Kathmandu', lat: 27.6915, lng: 85.3436 },
  { id: 'koteshwor', name: 'Koteshwor', district: 'Kathmandu', lat: 27.6783, lng: 85.3495 },
  { id: 'balaju', name: 'Balaju', district: 'Kathmandu', lat: 27.7355, lng: 85.304 },
  { id: 'gongabu', name: 'Gongabu', district: 'Kathmandu', lat: 27.7352, lng: 85.3139 },
  { id: 'maharajgunj', name: 'Maharajgunj', district: 'Kathmandu', lat: 27.737, lng: 85.33 },
  { id: 'chabahil', name: 'Chabahil', district: 'Kathmandu', lat: 27.718, lng: 85.346 },
  { id: 'budhanilkantha', name: 'Budhanilkantha', district: 'Kathmandu', lat: 27.779, lng: 85.364 },
  // Lalitpur district
  { id: 'lagankhel', name: 'Lagankhel', district: 'Lalitpur', lat: 27.6669, lng: 85.322 },
  { id: 'jawalakhel', name: 'Jawalakhel', district: 'Lalitpur', lat: 27.673, lng: 85.3135 },
  // Bhaktapur district
  { id: 'thimi', name: 'Thimi', district: 'Bhaktapur', lat: 27.6783, lng: 85.3868 },
  { id: 'bhaktapur', name: 'Bhaktapur', district: 'Bhaktapur', lat: 27.671, lng: 85.4298 },
  // Kaski district
  { id: 'pk-lakeside', name: 'Lakeside', district: 'Kaski', lat: 28.2096, lng: 83.959 },
  { id: 'pk-prithvi', name: 'Prithvi Chowk', district: 'Kaski', lat: 28.2093, lng: 83.9855 },
  // Jhapa district
  { id: 'birtamod', name: 'Birtamod Chowk', district: 'Jhapa', lat: 26.643, lng: 87.992 },
  { id: 'damak', name: 'Damak', district: 'Jhapa', lat: 26.665, lng: 87.7 },
  { id: 'chandragadhi', name: 'Chandragadhi', district: 'Jhapa', lat: 26.571, lng: 88.08 },
  { id: 'bhadrapur', name: 'Bhadrapur', district: 'Jhapa', lat: 26.538, lng: 88.095 },
  { id: 'kakarbhitta', name: 'Kakarbhitta', district: 'Jhapa', lat: 26.648, lng: 88.147 },
];

// District headquarters for the other 72 districts: [district, town, lat, lng]
// Coordinates are approximate (town centre). Fix any that look off.
const DISTRICT_HQ: [string, string, number, number][] = [
  // Koshi Province
  ['Bhojpur', 'Bhojpur', 27.1718, 87.0498],
  ['Dhankuta', 'Dhankuta', 26.9831, 87.3419],
  ['Ilam', 'Ilam', 26.9097, 87.9281],
  ['Khotang', 'Diktel', 27.2128, 86.7931],
  ['Morang', 'Biratnagar', 26.4525, 87.2718],
  ['Okhaldhunga', 'Okhaldhunga', 27.3141, 86.5039],
  ['Panchthar', 'Phidim', 27.1458, 87.7494],
  ['Sankhuwasabha', 'Khandbari', 27.3747, 87.2036],
  ['Solukhumbu', 'Salleri', 27.5222, 86.58],
  ['Sunsari', 'Inaruwa', 26.6081, 87.1469],
  ['Taplejung', 'Phungling', 27.3517, 87.6706],
  ['Terhathum', 'Myanglung', 27.05, 87.55],
  ['Udayapur', 'Gaighat', 26.8056, 86.7242],
  // Madhesh Province
  ['Bara', 'Kalaiya', 27.027, 85.003],
  ['Dhanusha', 'Janakpur', 26.7288, 85.9246],
  ['Mahottari', 'Jaleshwar', 26.6483, 85.8],
  ['Parsa', 'Birgunj', 27.0104, 84.877],
  ['Rautahat', 'Gaur', 26.7667, 85.2667],
  ['Saptari', 'Rajbiraj', 26.54, 86.75],
  ['Sarlahi', 'Malangwa', 26.85, 85.56],
  ['Siraha', 'Siraha', 26.6533, 86.2],
  // Bagmati Province
  ['Chitwan', 'Bharatpur', 27.6833, 84.4333],
  ['Dhading', 'Dhadingbesi', 27.8667, 84.9167],
  ['Dolakha', 'Charikot', 27.6667, 86.05],
  ['Kavrepalanchok', 'Dhulikhel', 27.6194, 85.5414],
  ['Makwanpur', 'Hetauda', 27.4286, 85.0322],
  ['Nuwakot', 'Bidur', 27.9, 85.17],
  ['Ramechhap', 'Manthali', 27.4167, 86.0833],
  ['Rasuwa', 'Dhunche', 28.11, 85.29],
  ['Sindhuli', 'Sindhulimadi', 27.25, 85.9667],
  ['Sindhupalchok', 'Chautara', 27.78, 85.71],
  // Gandaki Province
  ['Baglung', 'Baglung', 28.27, 83.59],
  ['Gorkha', 'Gorkha', 28.0, 84.63],
  ['Lamjung', 'Besisahar', 28.23, 84.38],
  ['Manang', 'Chame', 28.55, 84.24],
  ['Mustang', 'Jomsom', 28.78, 83.73],
  ['Myagdi', 'Beni', 28.35, 83.57],
  ['Nawalpur', 'Kawasoti', 27.65, 84.12],
  ['Parbat', 'Kushma', 28.23, 83.68],
  ['Syangja', 'Putalibazar', 28.09, 83.87],
  ['Tanahun', 'Damauli', 27.98, 84.28],
  // Lumbini Province
  ['Arghakhanchi', 'Sandhikharka', 27.95, 83.15],
  ['Banke', 'Nepalgunj', 28.05, 81.6167],
  ['Bardiya', 'Gulariya', 28.2, 81.35],
  ['Dang', 'Ghorahi', 28.04, 82.48],
  ['Gulmi', 'Tamghas', 28.08, 83.25],
  ['Kapilvastu', 'Taulihawa', 27.55, 83.05],
  ['Parasi', 'Parasi', 27.51, 83.65],
  ['Palpa', 'Tansen', 27.8667, 83.55],
  ['Pyuthan', 'Pyuthan', 28.1, 82.86],
  ['Rolpa', 'Liwang', 28.21, 82.63],
  ['Rukum East', 'Rukumkot', 28.58, 82.45],
  ['Rupandehi', 'Siddharthanagar', 27.5, 83.45],
  // Karnali Province
  ['Dailekh', 'Narayan', 28.84, 81.71],
  ['Dolpa', 'Dunai', 28.95, 82.9],
  ['Humla', 'Simikot', 29.97, 81.82],
  ['Jajarkot', 'Khalanga', 28.7, 82.2],
  ['Jumla', 'Jumla Khalanga', 29.27, 82.18],
  ['Kalikot', 'Manma', 29.15, 81.62],
  ['Mugu', 'Gamgadhi', 29.5, 82.1],
  ['Rukum West', 'Musikot', 28.62, 82.48],
  ['Salyan', 'Salyan Khalanga', 28.38, 82.17],
  ['Surkhet', 'Birendranagar', 28.6, 81.63],
  // Sudurpashchim Province
  ['Achham', 'Mangalsen', 29.05, 81.29],
  ['Baitadi', 'Dasharathchand', 29.52, 80.55],
  ['Bajhang', 'Chainpur', 29.55, 81.2],
  ['Bajura', 'Martadi', 29.45, 81.48],
  ['Dadeldhura', 'Amargadhi', 29.3, 80.58],
  ['Darchula', 'Darchula Khalanga', 29.85, 80.55],
  ['Doti', 'Dipayal', 29.26, 80.94],
  ['Kailali', 'Dhangadhi', 28.69, 80.59],
  ['Kanchanpur', 'Mahendranagar', 28.97, 80.18],
];

// More places inside districts: [district, name, lat, lng]
// Coordinates are approximate (typical chowk / bus stop / town centre).
// Check them on Google Maps and fix any that sit in the wrong spot.
const MORE_PLACES: [string, string, number, number][] = [
  // Kathmandu
  ['Kathmandu', 'Thamel', 27.7154, 85.3123],
  ['Kathmandu', 'New Road', 27.704, 85.312],
  ['Kathmandu', 'Sundhara', 27.7005, 85.3135],
  ['Kathmandu', 'Tripureshwor', 27.694, 85.313],
  ['Kathmandu', 'Teku', 27.6955, 85.304],
  ['Kathmandu', 'Thapathali', 27.693, 85.319],
  ['Kathmandu', 'Maitighar', 27.6945, 85.3225],
  ['Kathmandu', 'Putalisadak', 27.705, 85.322],
  ['Kathmandu', 'Bagbazar', 27.705, 85.326],
  ['Kathmandu', 'Lazimpat', 27.721, 85.321],
  ['Kathmandu', 'Baluwatar', 27.726, 85.328],
  ['Kathmandu', 'Tinkune', 27.6855, 85.348],
  ['Kathmandu', 'Sinamangal', 27.696, 85.345],
  ['Kathmandu', 'Tribhuvan Airport', 27.6966, 85.3591],
  ['Kathmandu', 'Gaushala', 27.709, 85.344],
  ['Kathmandu', 'Boudha', 27.7215, 85.362],
  ['Kathmandu', 'Jorpati', 27.7215, 85.379],
  ['Kathmandu', 'Kapan', 27.741, 85.368],
  ['Kathmandu', 'Swayambhu', 27.7149, 85.2903],
  ['Kathmandu', 'Dallu', 27.712, 85.3],
  ['Kathmandu', 'Balkhu', 27.684, 85.296],
  ['Kathmandu', 'Kirtipur', 27.667, 85.278],
  // Lalitpur
  ['Lalitpur', 'Pulchowk', 27.677, 85.316],
  ['Lalitpur', 'Kupondol', 27.683, 85.317],
  ['Lalitpur', 'Satdobato', 27.658, 85.325],
  ['Lalitpur', 'Gwarko', 27.667, 85.333],
  ['Lalitpur', 'Balkumari', 27.6733, 85.3453],
  ['Lalitpur', 'Imadol', 27.659, 85.347],
  ['Lalitpur', 'Godawari', 27.595, 85.379],
  // Bhaktapur
  ['Bhaktapur', 'Lokanthali', 27.674, 85.359],
  ['Bhaktapur', 'Suryabinayak', 27.659, 85.425],
  ['Bhaktapur', 'Changunarayan', 27.716, 85.429],
  ['Bhaktapur', 'Nagarkot', 27.7172, 85.52],
  // Kaski (Pokhara)
  ['Kaski', 'Damside', 28.1985, 83.969],
  ['Kaski', 'Pokhara Airport', 28.2009, 83.9821],
  ['Kaski', 'Mahendrapul', 28.213, 83.989],
  ['Kaski', 'Chipledhunga', 28.216, 83.985],
  ['Kaski', 'Hemja', 28.26, 83.95],
  ['Kaski', 'Sarangkot', 28.244, 83.947],
  // Other towns and cities
  ['Kavrepalanchok', 'Banepa', 27.633, 85.519],
  ['Kavrepalanchok', 'Panauti', 27.585, 85.517],
  ['Chitwan', 'Narayangadh', 27.7, 84.426],
  ['Chitwan', 'Gaindakot', 27.71, 84.39],
  ['Chitwan', 'Sauraha', 27.58, 84.498],
  ['Sunsari', 'Itahari', 26.665, 87.276],
  ['Sunsari', 'Dharan', 26.8123, 87.2806],
  ['Rupandehi', 'Butwal', 27.7, 83.45],
  ['Rupandehi', 'Bhairahawa', 27.5042, 83.45],
  ['Rupandehi', 'Lumbini', 27.469, 83.276],
  ['Banke', 'Kohalpur', 28.2, 81.684],
  ['Kailali', 'Tikapur', 28.525, 81.133],
  ['Dang', 'Tulsipur', 28.131, 82.297],
  ['Dang', 'Lamahi', 27.878, 82.525],
];

export const STOPS: Stop[] = [
  ...DETAILED_STOPS,
  ...MORE_PLACES.map(([district, name, lat, lng]) => ({
    id: 'p-' + (district + '-' + name).toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    name,
    district,
    lat,
    lng,
  })),
  ...DISTRICT_HQ.map(([district, name, lat, lng]) => ({
    id: 'hq-' + district.toLowerCase().replace(/ /g, '-'),
    name,
    district,
    lat,
    lng,
  })),
];

// All 77 districts: Kathmandu first, the rest A to Z
export const DISTRICTS: string[] = STOPS.map((s) => s.district)
  .filter((d, i, all) => all.indexOf(d) === i)
  .sort((a, b) => (a === 'Kathmandu' ? -1 : b === 'Kathmandu' ? 1 : a.localeCompare(b)));

export function stopsIn(district: string) {
  return STOPS.filter((s) => s.district === district);
}

export const ROUTES: Route[] = [
  {
    id: 'r1',
    name: 'Kalanki - Bhaktapur',
    vehicle: 'Microbus',
    stops: ['kalanki', 'kalimati', 'ratnapark', 'baneshwor', 'koteshwor', 'thimi', 'bhaktapur'],
  },
  { id: 'r2', name: 'Lagankhel - Ratnapark', vehicle: 'Microbus', stops: ['lagankhel', 'jawalakhel', 'ratnapark'] },
  { id: 'r3', name: 'Budhanilkantha - Ratnapark', vehicle: 'Bus', stops: ['budhanilkantha', 'maharajgunj', 'ratnapark'] },
  { id: 'r4', name: 'Balaju - Chabahil (Ring Road)', vehicle: 'Bus', stops: ['balaju', 'gongabu', 'maharajgunj', 'chabahil'] },
  { id: 'r5', name: 'Lakeside - Prithvi Chowk', vehicle: 'Bus', stops: ['pk-lakeside', 'pk-prithvi'] },
  { id: 'r6', name: 'Damak - Kakarbhitta (East-West Highway)', vehicle: 'Bus', stops: ['damak', 'birtamod', 'chandragadhi', 'kakarbhitta'] },
  { id: 'r7', name: 'Birtamod - Bhadrapur', vehicle: 'Microbus', stops: ['birtamod', 'chandragadhi', 'bhadrapur'] },
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