import {isoDateString} from './util';

export type Streak = [string, string];

const DAY = 1000 * 60 * 60 * 24;

export function newStreak(date: Date = new Date()) {
  const dateStr = isoDateString(date);
  return [dateStr, dateStr];
}

export function streakLength(streak: Streak): number {
  return (
    Math.round(
      (new Date(streak[1]).valueOf() - new Date(streak[0]).valueOf()) / DAY,
    ) + 1
  );
}

// Returns streak if new date matches streak end or extends it by one day
// Returns false if the new date is 2 or more days after streak end
export function extendStreak(
  streak: Streak,
  date: Date = new Date(),
): Streak | false {
  const dateStr = isoDateString(date);
  if (streakLength([streak[1], dateStr]) > 2) return false;
  if (dateStr <= streak[1]) return streak;
  return [streak[0], dateStr];
}
