import I18n from "react-native-i18n";
const en = require("./locales/en.json");
const fr = require("./locales/fr.json");
const es = require("./locales/es.json");
const nl = require("./locales/nl.json");
const pt = require("./locales/pt.json");

I18n.fallbacks = true;
I18n.translations = { en, fr, es, nl, pt };

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

// I18n.codeConversion = {
//   en: "eng-US",
//   fr: "fra",
//   es: "spa",
//   nl: "nld",

// };

export default I18n;
