import { NativeModules } from "react-native";
import Settings from "./Settings";
import I18n from "../i18n/i18n";

const AlarmModule = NativeModules.AlarmModule;

export default class Notifications {
  static async updateNotificationSchedule() {
    const settings = await Settings.readSettings();
    if (settings.notification) scheduleNotifications(settings.notificationTime);
    else cancelNotifications();
  }

  static setupNotificationChannel() {
    AlarmModule.setupNotificationChannel(
      I18n.t("NotificationChannelDescription")
    );
  }
}

function scheduleNotifications(time) {
  AlarmModule.setAlarmTime(
    time,
    I18n.t("NotificationTitle"),
    I18n.t("NotificationText")
  );
}

function cancelNotifications() {
  AlarmModule.setAlarmTime(
    "",
    I18n.t("NotificationTitle"),
    I18n.t("NotificationText")
  );
}
