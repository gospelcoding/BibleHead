import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';
import {Platform} from 'react-native';
import {TFunc} from '../i18n/i18n';
import {zeroPad, isInt} from './util';
import {uses24HourClock} from 'react-native-localize';

export function sendNotifications(time: string, t: TFunc) {
  cancelNotifications();
  PushNotification.removeAllDeliveredNotifications();

  console.log(
    `Send notifications at ${time} (${nextDateAtTime(getTimePieces(time))})`,
  );

  PushNotification.localNotificationSchedule({
    title: t('NotificationTitle'),
    message: t('NotificationText'),
    date: nextDateAtTime(getTimePieces(time)),
    largeIcon: '',
    smallIcon: 'drawable/ic_stat_biblehead_notification',
    repeatType: 'day',
    playSound: false,
    importance: 'low',
  });
}

export function nextDateAtTime(time: TimePieces) {
  const date = new Date();
  date.setHours(time.hour);
  date.setMinutes(time.minute);
  date.setSeconds(0);
  if (date.valueOf() < Date.now()) date.setDate(date.getDate() + 1);
  return date;
}

export function timeStrFromDate(date: Date) {
  return `${date.getHours()}:${zeroPad(date.getMinutes(), 2)}`;
}

export type TimePieces = {hour: number; minute: number};
export function getTimePieces(
  time: string,
  fallback: TimePieces = {hour: 6, minute: 45},
) {
  const pieces = time.split(':').map((val) => parseInt(val));
  return {
    hour: isInt(pieces[0]) ? pieces[0] : fallback.hour,
    minute: isInt(pieces[1]) ? pieces[1] : fallback.minute,
  };
}

export function printNotificationTime(time: string) {
  if (uses24HourClock()) return time;

  const pieces = getTimePieces(time);
  if (pieces.hour >= 1 && pieces.hour <= 11) return time;

  if (pieces.hour == 0) return `12:${pieces.minute}`;

  if (pieces.hour == 12) return `12:${pieces.minute}p`;

  return `${pieces.hour - 12}:${pieces.minute}p`;
}

export function cancelNotifications() {
  console.log('Cancel notifications');
  PushNotification.cancelAllLocalNotifications();
}

export function configureNotifications() {
  // Must be outside of any component LifeCycle (such as `componentDidMount`).
  PushNotification.configure({
    // (required) Called when a remote is received or opened, or local notification is opened
    onNotification: (notification) => {
      console.log('NOTIFICATION:', notification);

      // process the notification

      // (required) Called when a remote is received or opened, or local notification is opened
      notification.finish(PushNotificationIOS.FetchResult.NoData);
    },

    // // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
    // onAction: function (notification) {
    //   console.log("ACTION:", notification.action);
    //   console.log("NOTIFICATION:", notification);

    //   // process the action
    // },

    // // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
    // onRegistrationError: function(err) {
    //   console.error(err.message, err);
    // },

    // IOS ONLY (optional): default: all - Permissions to register.
    permissions: {
      alert: true,
      badge: false,
      sound: false,
    },

    // Should the initial notification be popped automatically
    // default: true
    popInitialNotification: true,

    /**
     * (optional) default: true
     * - Specified if permissions (ios) and token (android and ios) will requested or not,
     * - if not, you must call PushNotificationsHandler.requestPermissions() later
     * - if you are not using remote notification or do not have Firebase installed, use this:
     *     requestPermissions: Platform.OS === 'ios'
     */
    requestPermissions: Platform.OS === 'ios',
  });
}
