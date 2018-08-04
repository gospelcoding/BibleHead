import I18n from "../i18n/i18n";

export default class BibleBook {
  static books(lang) {
    return lang ? I18n.t("bibleBooks", { locale: lang }) : I18n.t("bibleBooks");
  }
}
