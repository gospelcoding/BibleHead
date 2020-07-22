import {findBestAvailableLanguage} from 'react-native-localize';
import {locales, loadStrings} from './i18n';

export function stringsForDeviceLocale() {
  const {languageTag} = findBestAvailableLanguage([...locales]) || {
    languageTag: 'en',
  };
  return loadStrings(languageTag);
}
