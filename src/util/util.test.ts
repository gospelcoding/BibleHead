import {isInt, aShadeDarker, localDateFromString} from './util';

test('isInt', () => {
  expect(isInt(0)).toBe(true);
  expect(isInt(1)).toBe(true);
  expect(isInt(-1)).toBe(true);
  expect(isInt(44)).toBe(true);

  expect(isInt('1')).toBe(false);
  expect(isInt(undefined)).toBe(false);
  expect(isInt(null)).toBe(false);
  expect(isInt(NaN)).toBe(false);
  expect(isInt({})).toBe(false);
});

test('a shade darker', () => {
  expect(aShadeDarker('#bb0a21')).toBe('#a8091e');
});

test('Local Date from String', () => {
  const date = localDateFromString('2020-09-05');
  expect(date.getMonth()).toBe(8);
});
