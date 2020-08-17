import {localDateString} from './util';

export type Streak = [string, string];

const DAY = 1000 * 60 * 60 * 24;

export function newStreak(date: Date = new Date()): Streak {
  const dateStr = localDateString(date);
  return [dateStr, dateStr];
}

export function streakLength(streak: Streak | undefined): number {
  if (!streak) return 0;

  return (
    Math.round(
      (new Date(streak[1]).valueOf() - new Date(streak[0]).valueOf()) / DAY,
    ) + 1
  );
}

export function isCurrent(
  streak: Streak | undefined,
  date: Date = new Date(),
): boolean {
  if (!streak) return true;

  const today = localDateString(date);
  return streakLength([streak[1], today]) <= 2;
}

// Returns streak if new date matches streak end or extends it by one day
// Returns false if the new date is 2 or more days after streak end
export function extendStreak(
  streak: Streak | undefined,
  date: Date = new Date(),
): Streak {
  if (!streak || !isCurrent(streak, date)) return newStreak(date);

  return [streak[0], localDateString(date)];
}
