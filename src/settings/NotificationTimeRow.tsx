import React, {useState} from 'react';
import {View, Text, Platform} from 'react-native';
import BHTouchable from '../components/BHTouchable';
import {useT} from '../i18n/i18nReact';
import ThemeColors from '../util/ThemeColors';
import {BHSettings} from './Settings';
import {styles} from './SettingsScreen';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  nextDateAtTime,
  getTimePieces,
  printNotificationTime,
} from '../util/notifications';
import BHButton from '../components/BHButton';

interface IProps {
  setShowTimePickerModal: (show: boolean) => void;
  setNotificationTime: (date: Date) => void;
  settings: BHSettings;
}

export default function NotificationTimeRow(props: IProps) {
  const t = useT();

  const [showTimePicker, setShowTimePicker] = useState(false);
  const [timeValue, setTimeValue] = useState(
    nextDateAtTime(getTimePieces(props.settings.notificationTime)),
  );

  const ios14 =
    Platform.OS == 'ios' && parseInt(Platform.Version as string) >= 14;
  const onClick = ios14
    ? () => setShowTimePicker(true)
    : () => props.setShowTimePickerModal(true);

  if (!props.settings.notification) return null;

  return showTimePicker ? (
    <View style={styles.row}>
      <View style={{width: '100%'}}>
        <DateTimePicker
          value={timeValue}
          onChange={(_, newVal) => newVal && setTimeValue(newVal)}
          mode="time"
          display="inline"
        />
        <View style={{alignSelf: 'flex-end'}}>
          <BHButton
            onPress={() => {
              setShowTimePicker(false);
              props.setNotificationTime(timeValue);
            }}
            title={t('Done')}
          />
        </View>
      </View>
    </View>
  ) : (
    <BHTouchable onPress={onClick} backgroundColor={ThemeColors.white}>
      {(backgroundColor) => (
        <View style={[styles.row, {backgroundColor}]}>
          <Text style={styles.settingTitle}>{t('ReviewTime')}</Text>

          <Text style={styles.settingText}>
            {printNotificationTime(props.settings.notificationTime)}
          </Text>
        </View>
      )}
    </BHTouchable>
  );
}
