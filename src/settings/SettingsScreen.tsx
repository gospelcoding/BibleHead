import React, {useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import RestoreBackupModal from './RestoreBackupModal';
import {useAppSelector} from '../BHState';
import {useT} from '../i18n/i18nReact';
import BHSwitch from '../components/BHSwitch';
import {useDispatch} from 'react-redux';
import {settingsSlice} from './Settings';
import BHButton from '../components/BHButton';
import ThemeColors from '../util/ThemeColors';
import {NavigationProp} from '@react-navigation/native';
import ScreenRoot from '../components/ScreenRoot';
import BHTouchable from '../components/BHTouchable';
import {LatestBackup, createBackup} from '../util/Backups';
import {TFunc, TKey} from '../i18n/i18n';
import CodeExplanationModal from './CodeExplanationModal';
import {BHRootTabs} from '../BHRootNav';
import {
  cancelNotifications,
  sendNotifications,
  nextDateAtTime,
  timeStrFromDate,
  getTimePieces,
} from '../util/notifications';
import NotificationTimeRow from './NotificationTimeRow';

interface IProps {
  navigation: NavigationProp<BHRootTabs, 'Preferences'>;
}

export default function SettingsScreen({navigation}: IProps) {
  const t = useT();
  const dispatch = useDispatch();

  const [showTimePickerModal, setShowTimePickerModal] = useState(false);
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

  const toggleNotifications = () => {
    if (settings.notification) {
      cancelNotifications();
    } else {
      sendNotifications(settings.notificationTime, t);
    }
    dispatch(settingsSlice.actions.toggleNotifications(!settings.notification));
  };

  const setNotificationTime = (date: Date) => {
    setShowTimePickerModal(false);
    const timeStr = timeStrFromDate(date);
    if (settings.notification) sendNotifications(timeStr, t);
    dispatch(settingsSlice.actions.setNotificationTime(timeStr));
  };

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

  return (
    <ScreenRoot>
      <View style={styles.row}>
        <Text style={styles.settingTitle}>
          {t('NotificationChannelDescription')}
        </Text>
        <BHSwitch
          value={settings.notification}
          onValueChange={toggleNotifications}
        />
      </View>

      <NotificationTimeRow
        setShowTimePickerModal={setShowTimePickerModal}
        setNotificationTime={setNotificationTime}
        settings={settings}
      />

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

      <DateTimePickerModal
        isVisible={showTimePickerModal}
        mode="time"
        date={nextDateAtTime(getTimePieces(settings.notificationTime))}
        onConfirm={setNotificationTime}
        onCancel={() => setShowTimePickerModal(false)}
        headerTextIOS={t('ReviewTime')}
        confirmTextIOS={t('Confirm')}
        cancelTextIOS={t('Cancel')}
      />

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

export const styles = StyleSheet.create({
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
