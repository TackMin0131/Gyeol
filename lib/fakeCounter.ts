/**
 * Deterministic "today's signups" counter.
 * - Resets at KST (UTC+9) midnight
 * - Adds 1~3 per hour, identical for everyone viewing at the same hour
 * - Pure client-side; seeded by (date, hour) so no DB hit needed
 */

function hashIncrement(seed: string): number {
  // FNV-1a 32-bit hash → mod 3 → 1..3
  let h = 2166136261 >>> 0;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619) >>> 0;
  }
  return (h % 3) + 1;
}

/** Returns { total, hour } where total is cumulative KST-today signups up to now. */
export function getTodayCount(now: Date = new Date()): { total: number; hour: number; dateKey: string } {
  // now.getTime() is UTC epoch ms regardless of viewer locale.
  // KST = UTC+9, so shift +9h and read the shifted clock via getUTC* methods.
  const kst = new Date(now.getTime() + 9 * 60 * 60_000);
  const y = kst.getUTCFullYear();
  const m = String(kst.getUTCMonth() + 1).padStart(2, "0");
  const d = String(kst.getUTCDate()).padStart(2, "0");
  const hour = kst.getUTCHours();
  const dateKey = `${y}-${m}-${d}`;

  // Reset to 0 at KST midnight. First +1~3 bump happens at 01:00 KST.
  // e.g. hour=0 → 0, hour=1 → 1~3, hour=23 → 23~69.
  let total = 0;
  for (let h = 1; h <= hour; h++) {
    total += hashIncrement(`${dateKey}:${h}`);
  }
  return { total, hour, dateKey };
}
