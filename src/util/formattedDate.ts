import {Platform} from 'react-native';
import {dateFormat} from 'react-native-locale';
import {useState, useEffect} from 'react';
import {localDateString, localDateFromString} from './util';

type DateFormat = 'short' | 'medium' | 'long';

const isAndroid = Platform.OS == 'android';

export default async function formattedDate(
  date: Date,
  format: DateFormat = 'short',
): Promise<string> {
  try {
    return dateFormat(dateForFormatter(date), format, 'none');
  } catch (err) {
    // Fallback to JS Date
    return date.toLocaleDateString();
  }
}

export function useFormattedDate(dateStr: string | undefined) {
  const [output, setOutput] = useState(dateStr);

  useEffect(() => {
    if (dateStr)
      formattedDate(localDateFromString(dateStr), 'long').then((formatted) =>
        setOutput(formatted),
      );
  }, [dateStr]);

  return output;
}

// Odd little library requires date objects for Android, but timestamps for iOS...
function dateForFormatter(date: Date) {
  return isAndroid ? date : date.getTime();
}
