import {loadStrings, locales, tForStrings} from './i18n';
import fs from 'fs';
import path from 'path';

const en = loadStrings('en');
const otherStrings = locales
  .filter((l) => l != 'en')
  .map((loc) =>
    JSON.parse(
      fs
        .readFileSync(path.join(__dirname, 'locales', `${loc}.json`))
        .toString(),
    ),
  );

test('No extra strings in translations', () => {
  const extraKeys = otherStrings.map((strings) =>
    Object.keys(strings).filter((key) => !(key in en)),
  );
  expect(extraKeys).toEqual(otherStrings.map(() => []));
});

// This test can be safely skipped if needed.
// English strings will be used where translations are missing
// ( Change from test() to test.skip() )
test.skip('No missing strings in translations', () => {
  const enKeys = Object.keys(en);
  const missingKeys = otherStrings.map((strings) =>
    enKeys.filter((key) => !(key in strings)),
  );
  expect(missingKeys).toEqual(otherStrings.map(() => []));
});

test('Pluralizing', () => {
  const t = tForStrings(en);
  expect(t('days', {number: '0'}, 0)).toBe('0 days');
  expect(t('days', {number: '1'}, 1)).toBe('1 day');
  expect(t('days', {number: '2'}, 2)).toBe('2 days');

  expect(t('days', {number: '1'})).toBe('1 days');
});
