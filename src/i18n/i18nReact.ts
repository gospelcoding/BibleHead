import {createContext, useContext} from 'react';
import {loadStrings, TFunc, tForStrings} from './i18n';

export const I18nContext = createContext(loadStrings('en'));

export function useT(): TFunc {
  const strings = useContext(I18nContext);
  return tForStrings(strings);
}

export function useBibleBooks(): string[] {
  return useContext(I18nContext).bibleBooks;
}

export function useMonthNames(): string[] {
  return useContext(I18nContext).months;
}
