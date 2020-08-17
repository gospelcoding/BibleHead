import {
  newStreak,
  streakLength,
  extendStreak,
  Streak,
  isCurrent,
} from './Streak';

const DAY = 1000 * 60 * 60 * 24;

const tzOffset = new Date().getTimezoneOffset();
function localDate(str: string) {
  return new Date(new Date(str).valueOf() - tzOffset);
}

test('New Streak', () => {
  const streak = newStreak(localDate('2020-08-13T13:41'));
  expect(streak).toEqual(['2020-08-13', '2020-08-13']);
});

test('Streak Length', () => {
  expect(streakLength(['2020-08-13', '2020-08-13'])).toBe(1);
  expect(streakLength(['2020-08-13', '2020-08-14'])).toBe(2);
  expect(streakLength(['2020-08-13', '2020-09-13'])).toBe(32);
  expect(streakLength(['2020-02-28', '2020-03-01'])).toBe(3);

  expect(streakLength(undefined)).toBe(0);
});

test('is Current', () => {
  expect(isCurrent(newStreak(new Date()))).toBe(true);
  expect(isCurrent(newStreak(new Date(Date.now() - DAY)))).toBe(true);
  expect(isCurrent(newStreak(new Date(Date.now() - 2 * DAY)))).toBe(false);

  expect(isCurrent(undefined)).toBe(true);
});

test('Streak Extends', () => {
  const streak: Streak = ['2020-08-13', '2020-08-21'];
  expect(extendStreak(streak, localDate('2020-08-22T23:59:59'))).toEqual([
    '2020-08-13',
    '2020-08-22',
  ]);
});

test('Streak Extends - no op', () => {
  const streak: Streak = ['2020-08-13', '2020-08-21'];
  expect(extendStreak(streak, localDate('2020-08-21T13:59:59'))).toEqual([
    '2020-08-13',
    '2020-08-21',
  ]);
});

test('Streak Extends - Reset', () => {
  const streak: Streak = ['2020-08-13', '2020-08-21'];
  expect(extendStreak(streak, localDate('2020-08-23T00:00:01'))).toEqual([
    '2020-08-23',
    '2020-08-23',
  ]);
});

test('Streak Extends - New Streak', () => {
  expect(extendStreak(undefined, localDate('2020-08-23T00:00:01'))).toEqual([
    '2020-08-23',
    '2020-08-23',
  ]);
});
