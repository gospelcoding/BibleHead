import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
// import I18n from '../../i18n/i18n';
// import Settings from '../../util/Settings';
// import update from 'immutability-helper';
// import XPlatformTouchable from '../shared/XPlatformTouchable';
// import DateTimePicker from 'react-native-modal-datetime-picker';
// import Notifications from '../../util/Notifications';
// import PickerModal from '../shared/PickerModal';
// import BHSwitch from '../shared/BHSwitch';
// import Backup from '../../util/Backups';
import RestoreBackupModal from './RestoreBackupModal';
// import CodeExplanationModal from './CodeExplanationModal';
// import {zeroPad} from '../../util/util';
import {useAppSelector} from '../BHState';
import {useT} from '../i18n/i18nReact';
import BHSwitch from '../components/BHSwitch';
import {useDispatch} from 'react-redux';
import {settingsSlice} from './Settings';
// import {TouchableOpacity} from 'react-native-gesture-handler';
import BHButton from '../components/BHButton';
import ThemeColors from '../util/ThemeColors';
import {NavigationProp} from '@react-navigation/native';
import {BHRootNav} from '../BibleHeadApp';
import ScreenRoot from '../components/ScreenRoot';

interface IProps {
  navigation: NavigationProp<BHRootNav, 'Preferences'>;
}

export default function SettingsScreen({navigation}: IProps) {
  const t = useT();
  const dispatch = useDispatch();

  const [
    showingNewVerseMethodPicker,
    setShowingNewVerseMethodPicker,
  ] = useState(false);
  const [showingRestoreBackupModal, setShowingRestoreBackupModal] = useState(
    false,
  );

  const settings = useAppSelector((state) => state.settings);
  // const latestBackup = ...

  // updateSettings = (mergeSettings) => {
  //   this.setState((prevState) => ({
  //     settings: update(prevState.settings, {$merge: mergeSettings}),
  //   }));
  //   Settings.writeSettings(mergeSettings);
  //   this.updateNotificationSchedule(mergeSettings);
  // };

  // updateNotificationSchedule = (mergeSettings) => {
  //   if (
  //     mergeSettings.notificationTime ||
  //     mergeSettings.notification !== undefined
  //   )
  //     Notifications.updateNotificationSchedule();
  // };

  // setNotificationTime = (date) => {
  //   this.updateSettings({notificationTime: notificationTimeFromDate(date)});
  //   this.setState({showingTimePicker: false});
  // };

  // setNewVerseMethod = (method) => {
  //   this.updateSettings({newVerseMethod: method});
  //   this.setState({showingNewVerseMethodPicker: false});
  // };

  // createBackup = async () => {
  //   this.setState({backingUp: true});
  //   try {
  //     const newLatestBackup = await Backup.createBackup();
  //     this.setState((prevState) => ({
  //       latestBackup: newLatestBackup,
  //       backingUp: false,
  //       backupError: undefined,
  //       showingCodeExplanationModal: !prevState.latestBackup,
  //     }));
  //   } catch (error) {
  //     this.setState({backupError: error, backingUp: false});
  //   }
  // };

  // static navigationOptions = () => {
  //   return {
  //     headerTitle: t('Preferences'),
  //   };
  // };

  return (
    <ScreenRoot>
      <View style={styles.row}>
        <Text style={styles.settingTitle}>
          {t('NotificationChannelDescription')}
        </Text>
        <BHSwitch
          value={settings.notification}
          onValueChange={(value) =>
            dispatch(settingsSlice.actions.toggleNotifications(value))
          }
        />
      </View>

      {/* {settings.notification && (
          <XPlatformTouchable
            onPress={() => this.setState({showingTimePicker: true})}>
            <View style={styles.row}>
              <Text style={styles.settingTitle}>{t('ReviewTime')}</Text>
              <Text style={styles.settingText}>
                {settings.notificationTime}
              </Text>
            </View>
          </XPlatformTouchable>
        )} */}

      {/* <XPlatformTouchable
          onPress={() => this.setState({showingNewVerseMethodPicker: true})}>
          <View style={[styles.row, {flexDirection: 'column'}]}>
            <Text style={styles.settingTitle}>{t('NewVerseMethod')}</Text>
            <Text style={styles.settingTextLittle}>
              {t(settings.newVerseMethod)}
            </Text>
          </View>
        </XPlatformTouchable> */}
      {/* 
        <View style={styles.row}>
          <Text style={styles.settingTitle}>
            {t('BackupVersesAutomatically')}
          </Text>
          <BHSwitch
            value={settings.automaticBackup}
            onValueChange={(value) => {
              this.updateSettings({automaticBackup: value});
              if (value) this.createBackup();
            }}
          />
        </View> */}
      {/* 
        <XPlatformTouchable onPress={this.createBackup}>
          <View style={[styles.row, {flexDirection: 'column'}]}>
            <Text style={styles.settingTitle}>{t('BackupVersesNow')}</Text>
            <Text style={styles.settingTextLittle}>
              {backupDetailText(this.state)}
            </Text>
          </View>
        </XPlatformTouchable> */}

      <TouchableOpacity onPress={() => setShowingRestoreBackupModal(true)}>
        <View style={styles.row}>
          <Text style={styles.settingTitle}>{t('RestoreBackup')}</Text>
        </View>
      </TouchableOpacity>
      {/* 
        <DateTimePicker
          isVisible={this.state.showingTimePicker}
          mode="time"
          date={dateFromNotificationTime(settings.notificationTime)}
          onConfirm={this.setNotificationTime}
          onCancel={() => this.setState({showingTimePicker: false})}
          titleIOS={t('ReviewTime')}
          confirmTextIOS={t('Confirm')}
          cancelTextIOS={t('Cancel')}
        /> */}

      {/* <PickerModal
          isVisible={this.state.showingNewVerseMethodPicker}
          data={Settings.newVerseMethodSettings()}
          itemSelected={this.setNewVerseMethod}
          dismissModal={() =>
            this.setState({showingNewVerseMethodPicker: false})
          }
          itemText={(item) => t(item)}
        /> */}

      <RestoreBackupModal
        goHome={() => navigation.navigate('Verses')}
        isVisible={showingRestoreBackupModal}
        dismissModal={() => setShowingRestoreBackupModal(false)}
      />

      {/* <CodeExplanationModal
          isVisible={!!this.state.showingCodeExplanationModal}
          dismissModal={() =>
            this.setState({showingCodeExplanationModal: false})
          }
          code={this.state.latestBackup && this.state.latestBackup.code}
        /> */}
    </ScreenRoot>
  );
}

// function dateFromNotificationTime(timeStr) {
//   const hourMinute = timeStr.split(':').map((str) => parseInt(str));
//   let date = new Date();
//   date.setHours(hourMinute[0], hourMinute[1]);
//   return date;
// }

// function notificationTimeFromDate(date) {
//   return `${date.getHours()}:${zeroPad(date.getMinutes(), 2)}`;
// }

// function backupDetailText(state) {
//   if (state.backingUp) return t('BackingUp');
//   if (state.backupError) return t(state.backupError);
//   if (state.latestBackup)
//     return t('LatestBackup', {
//       code: state.latestBackup.code,
//       datetime: new Date(state.latestBackup.datetime).toLocaleDateString(),
//     });
//   return '';
// }

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderColor: '#aaa',
    backgroundColor: 'white',
  },
  settingTitle: {
    fontSize: 20,
    color: 'black',
  },
  settingText: {
    fontSize: 20,
    color: '#999',
  },
  settingTextLittle: {
    fontSize: 16,
    color: '#999',
  },
});
