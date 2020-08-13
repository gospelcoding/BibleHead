import {newStreak, streakLength, extendStreak, Streak} from './Streak';

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
  expect(extendStreak(streak, localDate('2020-08-04T13:59:59'))).toEqual([
    '2020-08-13',
    '2020-08-21',
  ]);
});

test('Streak Extends - Fail', () => {
  const streak: Streak = ['2020-08-13', '2020-08-21'];
  expect(extendStreak(streak, localDate('2020-08-23T00:00:01'))).toEqual(false);
});
