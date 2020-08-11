import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, View, Text} from 'react-native';
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
import ScreenRoot from '../components/ScreenRoot';
import BHTouchable from '../components/BHTouchable';
import {LatestBackup, createBackup} from '../util/Backups';
import {TFunc, TKey} from '../i18n/i18n';
import CodeExplanationModal from './CodeExplanationModal';
import {BHRootTabs} from '../BHRootNav';

interface IProps {
  navigation: NavigationProp<BHRootTabs, 'Preferences'>;
}

export default function SettingsScreen({navigation}: IProps) {
  const t = useT();
  const dispatch = useDispatch();

  const [showingRestoreBackupModal, setShowingRestoreBackupModal] = useState(
    false,
  );
  const [
    showingCodeExplanationModal,
    setShowingCodeExplanationModal,
  ] = useState(false);
  const [backingUp, setBackingUp] = useState(false);
  const [backupError, setBackupError] = useState<null | TKey>(null);

  const settings = useAppSelector((state) => state.settings);
  const verses = useAppSelector((state) => state.verses.verses);

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

  const backup = async () => {
    setBackingUp(true);
    try {
      const newLatestBackup = await createBackup(
        verses,
        settings.latestBackup?.code,
      );
      setShowingCodeExplanationModal(!settings.latestBackup);
      dispatch(settingsSlice.actions.setLatestBackup(newLatestBackup));
      setBackupError(null);
    } catch (error) {
      setBackupError(error);
    } finally {
      setBackingUp(false);
    }
  };

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

      <View style={styles.row}>
        <Text style={styles.settingTitle}>
          {t('BackupVersesAutomatically')}
        </Text>
        <BHSwitch
          value={settings.automaticBackup}
          onValueChange={(value) => {
            dispatch(settingsSlice.actions.toggleAutomaticBackups());
            if (value) backup();
          }}
        />
      </View>

      <BHTouchable onPress={backup} backgroundColor={ThemeColors.white}>
        {(backgroundColor) => (
          <View
            style={[styles.row, {flexDirection: 'column'}, {backgroundColor}]}>
            <Text style={styles.settingTitle}>{t('BackupVersesNow')}</Text>
            <Text style={styles.settingTextLittle}>
              {backupDetailText(
                {backingUp, backupError, latestBackup: settings.latestBackup},
                t,
              )}
            </Text>
          </View>
        )}
      </BHTouchable>

      <BHTouchable
        onPress={() => setShowingRestoreBackupModal(true)}
        backgroundColor={ThemeColors.white}>
        {(backgroundColor) => (
          <View style={[styles.row, {backgroundColor}]}>
            <Text style={styles.settingTitle}>{t('RestoreBackup')}</Text>
          </View>
        )}
      </BHTouchable>
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

      <RestoreBackupModal
        goHome={() => navigation.navigate('Verses')}
        isVisible={showingRestoreBackupModal}
        dismissModal={() => setShowingRestoreBackupModal(false)}
      />

      <CodeExplanationModal
        isVisible={!!showingCodeExplanationModal}
        dismissModal={() => setShowingCodeExplanationModal(false)}
        code={settings.latestBackup?.code || ''}
      />
    </ScreenRoot>
  );
}

function backupDetailText(
  state: {
    backingUp: boolean;
    backupError: TKey | null;
    latestBackup: LatestBackup | undefined;
  },
  t: TFunc,
) {
  if (state.backingUp) return t('BackingUp');
  if (state.backupError) return t(state.backupError);
  if (state.latestBackup)
    return t('LatestBackup', {
      code: state.latestBackup.code,
      datetime: new Date(state.latestBackup.datetime).toLocaleDateString(),
    });
  return '';
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
    flexShrink: 1,
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
