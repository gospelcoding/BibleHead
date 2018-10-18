import React from "react";
import { SafeAreaView, StyleSheet, View, Text } from "react-native";
import I18n from "../../i18n/i18n";
import Settings from "../../util/Settings";
import update from "immutability-helper";
import XPlatformTouchable from "../shared/XPlatformTouchable";
import DateTimePicker from "react-native-modal-datetime-picker";
import Notifications from "../../util/Notifications";
import PickerModal from "../shared/PickerModal";
import BHSwitch from "../shared/BHSwitch";

export default class SettingsView extends React.PureComponent {
  state = {
    showingNewVerseMethodPicker: false
  };

  async componentDidMount() {
    const settings = await Settings.readSettings();
    this.setState({ settings: settings });
  }

  updateSettings = mergeSettings => {
    this.setState(prevState => ({
      settings: update(prevState.settings, { $merge: mergeSettings })
    }));
    Settings.writeSettings(mergeSettings);
    this.updateNotificationSchedule(mergeSettings);
  };

  updateNotificationSchedule = mergeSettings => {
    if (
      mergeSettings.notificationTime ||
      mergeSettings.notification !== undefined
    )
      Notifications.updateNotificationSchedule();
  };

  setNotificationTime = date => {
    this.updateSettings({ notificationTime: notificationTimeFromDate(date) });
    this.setState({ showingTimePicker: false });
  };

  setNewVerseMethod = method => {
    this.updateSettings({ newVerseMethod: method });
    this.setState({ showingNewVerseMethodPicker: false });
  };

  static navigationOptions = () => {
    return {
      headerTitle: I18n.t("Preferences")
    };
  };

  render() {
    if (!this.state.settings) return <View />;
    return (
      <SafeAreaView>
        <View style={styles.row}>
          <Text style={styles.settingTitle}>
            {I18n.t("NotificationChannelDescription")}
          </Text>
          <BHSwitch
            value={this.state.settings.notification}
            onValueChange={value =>
              this.updateSettings({ notification: value })
            }
          />
        </View>

        {this.state.settings.notification && (
          <XPlatformTouchable
            onPress={() => this.setState({ showingTimePicker: true })}
          >
            <View style={styles.row}>
              <Text style={styles.settingTitle}>{I18n.t("ReviewTime")}</Text>
              <Text style={styles.settingText}>
                {this.state.settings.notificationTime}
              </Text>
            </View>
          </XPlatformTouchable>
        )}

        <XPlatformTouchable
          onPress={() => this.setState({ showingNewVerseMethodPicker: true })}
        >
          <View style={[styles.row, { flexDirection: "column" }]}>
            <Text style={styles.settingTitle}>{I18n.t("NewVerseMethod")}</Text>
            <Text
              style={[
                styles.settingText,
                { fontSize: 16, alignSelf: "flex-end" }
              ]}
            >
              {I18n.t(this.state.settings.newVerseMethod)}
            </Text>
          </View>
        </XPlatformTouchable>

        <DateTimePicker
          isVisible={this.state.showingTimePicker}
          mode="time"
          date={dateFromNotificationTime(this.state.settings.notificationTime)}
          onConfirm={this.setNotificationTime}
          onCancel={() => this.setState({ showingTimePicker: false })}
          titleIOS={I18n.t("ReviewTime")}
          confirmTextIOS={I18n.t("Confirm")}
          cancelTextIOS={I18n.t("Cancel")}
        />

        <PickerModal
          isVisible={this.state.showingNewVerseMethodPicker}
          data={Settings.newVerseMethodSettings()}
          itemSelected={this.setNewVerseMethod}
          dismissModal={() =>
            this.setState({ showingNewVerseMethodPicker: false })
          }
          itemText={item => I18n.t(item)}
        />
      </SafeAreaView>
    );
  }
}

function dateFromNotificationTime(timeStr) {
  const hourMinute = timeStr.split(":").map(str => parseInt(str));
  let date = new Date();
  date.setHours(hourMinute[0], hourMinute[1]);
  return date;
}

function notificationTimeFromDate(date) {
  return `${date.getHours()}:${date.getMinutes()}`;
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderColor: "#aaa",
    backgroundColor: "white"
  },
  settingTitle: {
    fontSize: 20,
    color: "black"
  },
  settingText: {
    fontSize: 20,
    color: "#999"
  }
});
