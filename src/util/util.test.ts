import {isInt} from './util';

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
