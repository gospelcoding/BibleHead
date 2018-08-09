import I18n from "react-native-i18n";
import en from "./locales/en";
import fr from "./locales/fr";

I18n.fallbacks = true;
I18n.translations = { en, fr };

I18n.getLocales = function() {
  return Object.entries(this.translations).map(keyValue => {
    return {
      code: keyValue[0],
      name: keyValue[1].Lang
    };
  });
};

// Strip off the dash and following from the locale to get lang code
I18n.currentLang = function() {
  return this.currentLocale().replace(/-.*/, "");
};

I18n.codeConversion = {
  en: "eng-US",
  fr: "fra",
  es: "spa"
};

export default I18n;
