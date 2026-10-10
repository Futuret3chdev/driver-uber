import { PLATFORMS } from './platforms.js';

const KEY = 't3x-shift-uber.v1';
const LEGACY_KEY = 'driver-panda.v1';

function uid(prefix) {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

export function emptyState() {
  return {
    profile: {
      name: '',
      dailyGoal: 150,
      weeklyGoal: 800,
      onboarded: false
    },
    online: Object.fromEntries(PLATFORMS.map((p) => [p.id, { on: false, since: null }])),
    lastLive: null,
    activeJob: null,
    trips: [],
    expenses: [],
    apiToken: uid('dpk')
  };
}

export function loadState() {
  try {
    const raw = localStorage.getItem(KEY) || localStorage.getItem(LEGACY_KEY);
    if (!raw) return emptyState();
    const parsed = JSON.parse(raw);
    return { ...emptyState(), ...parsed, profile: { ...emptyState().profile, ...(parsed.profile || {}) } };
  } catch {
    return emptyState();
  }
}

export function saveState(state) {
  localStorage.setItem(KEY, JSON.stringify(state));
}

export function seedDemo(state) {
  const now = new Date();
  const trips = [];
  const samples = [
    { platform: 'uber', fare: 18.42, tip: 4.0, miles: 6.2, minutes: 22 },
    { platform: 'uber', fare: 24.1, tip: 6.0, miles: 11.1, minutes: 34 },
    { platform: 'uber', fare: 11.3, tip: 2.0, miles: 4.1, minutes: 17 },
    { platform: 'uber', fare: 15.8, tip: 3.5, miles: 5.4, minutes: 20 },
    { platform: 'uber', fare: 21.2, tip: 5.0, miles: 8.3, minutes: 28 }
  ];

  samples.forEach((s, i) => {
    const d = new Date(now);
    d.setDate(d.getDate() - (i % 6));
    d.setHours(11 + (i * 2) % 10, (i * 7) % 60, 0, 0);
    trips.push({
      id: uid('trip'),
      ...s,
      occurredAt: d.toISOString(),
      notes: '',
      source: 'sample',
      status: 'sample'
    });
  });

  const expenses = [
    { id: uid('exp'), category: 'Gas', amount: 42.18, occurredAt: new Date(now.getTime() - 86400000 * 2).toISOString(), notes: 'Shell' },
    { id: uid('exp'), category: 'Car wash', amount: 12, occurredAt: new Date(now.getTime() - 86400000).toISOString(), notes: '' }
  ];

  return {
    ...state,
    profile: { ...state.profile, name: state.profile.name || 'Alex', onboarded: true },
    trips,
    expenses
  };
}

export { uid };
