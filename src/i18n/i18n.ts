import en from './locales/en.json';
import es from './locales/es.json';
import fr from './locales/fr.json';
import nl from './locales/nl.json';
import pt from './locales/pt.json';

const allStrings = {
  en,
  es,
  fr,
  nl,
  pt,
};

export type Strings = typeof en;

export type TKey =
  | keyof Omit<Strings, 'bibleBooks' | 'months' | 'App Store'>
  | '';
type RealTKey = Exclude<TKey, ''>;
export function isTKey(str: any): str is TKey {
  return str in en;
}

type Locale = keyof typeof allStrings;
export const locales: Locale[] = Object.keys(allStrings) as Locale[];

export function loadStrings(locale: Locale): Strings {
  if (locale == 'en') return en;
  const strings: Partial<Strings> = allStrings[locale];
  return {
    ...en,
    ...strings,
  };
}

function translate(
  strings: Strings,
  key: TKey,
  subs: {[key: string]: any} = {},
  pluralize?: number,
) {
  if (key === '') return '';
  if (!strings[key]) console.error(`Missing i18n key: ${key}`);

  const baseText =
    pluralize === undefined
      ? strings[key]
      : pluralizedText(strings, key, pluralize);
  return Object.keys(subs).reduce((outStr, subKey) => {
    const keyPattern = `{{${subKey}}}`;
    while (outStr.includes(keyPattern)) {
      outStr = outStr.replace(keyPattern, subs[subKey]);
    }
    return outStr;
  }, baseText);
}

function pluralizedText(strings: Strings, key: RealTKey, number: number) {
  const plKey = `${key}_${number}`;
  if (plKey in strings) return strings[plKey as RealTKey];
  return strings[key];
}

export type TFunc = (
  key: TKey,
  subs?: {[key: string]: any},
  pluralize?: number,
) => string;
export interface I18nPackage {
  t: TFunc;
  bibleBooks: Strings['bibleBooks'];
}

export function tForStrings(strings: Strings): TFunc {
  return (key, subs, pluralize) => translate(strings, key, subs, pluralize);
}

// export function nonStrictT(t: TFunc): (str: string) => string {
//   return (str: string) => {
//     if (isTKey(str)) return t(str);
//     return str;
//   };
// }
