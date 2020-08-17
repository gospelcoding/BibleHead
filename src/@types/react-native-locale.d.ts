declare module 'react-native-locale' {
  export type DateFormat = 'full' | 'long' | 'medium' | 'short' | 'none';
  export type TimeFormat = DateFormat;
  export function dateFormat(
    date: Date | number,
    dateFormat: DateFormat,
    timeFormat: TimeFormat,
  ): Promise<string>;
}
