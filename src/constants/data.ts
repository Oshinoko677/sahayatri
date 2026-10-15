// ============================================================
// PLACEHOLDER DATA. Replace every number below with the OFFICIAL
// rates and distances from the transport authority before you
// share the app with real people.
// ============================================================

export const FARES_UPDATED = 'PLACEHOLDER - replace with the official date';

// Stops along one corridor. "km" = distance from the first stop.
// Distance between two stops = difference of their km values.
// Add more stops by adding lines here.
export type Stop = { id: string; name: string; km: number };

export const STOPS: Stop[] = [
  { id: 'kalanki', name: 'Kalanki', km: 0 },
  { id: 'kalimati', name: 'Kalimati', km: 3.5 },
  { id: 'ratnapark', name: 'Ratnapark', km: 6 },
  { id: 'baneshwor', name: 'New Baneshwor', km: 9 },
  { id: 'koteshwor', name: 'Koteshwor', km: 11 },
  { id: 'thimi', name: 'Thimi', km: 15 },
  { id: 'bhaktapur', name: 'Bhaktapur', km: 18 },
];

// Vehicle types: starting fare + price per km (placeholders)
export type Vehicle = { id: string; label: string; base: number; perKm: number };

export const VEHICLES: Vehicle[] = [
  { id: 'bus', label: 'Bus', base: 15, perKm: 1.8 },
  { id: 'microbus', label: 'Microbus', base: 20, perKm: 2.2 },
  { id: 'tempo', label: 'Tempo', base: 15, perKm: 2.0 },
  ];

// Passenger types: discount as a fraction (0.25 = 25% off). Placeholders.
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

export function calcFare(
  fromId: string,
  toId: string,
  vehicleId: string,
  passengerId: string
) {
  const from = STOPS.find((s) => s.id === fromId);
  const to = STOPS.find((s) => s.id === toId);
  const vehicle = VEHICLES.find((v) => v.id === vehicleId);
  const passenger = PASSENGERS.find((p) => p.id === passengerId);
  if (!from || !to || !vehicle || !passenger) return null;

  const km = Math.abs(to.km - from.km);
  const full = vehicle.base + vehicle.perKm * km;
  const fullFare = Math.ceil(full / 5) * 5;
  const fare = Math.ceil((full * (1 - passenger.discount)) / 5) * 5;

  return { km, fullFare, fare, saved: fullFare - fare };
}