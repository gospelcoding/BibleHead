import {Platform} from 'react-native';
import {dateFormat} from 'react-native-locale';

type DateFormat = 'short';

const isAndroid = Platform.OS == 'android';

export default function formattedDate(
  date: Date,
  format: DateFormat = 'short',
): Promise<string> {
  // Odd little library requires date objects for Android, but timestamps for iOS...
  const dateForFormatter = isAndroid ? date : date.getTime();

  return dateFormat(dateForFormatter, 'short', 'none');
}
