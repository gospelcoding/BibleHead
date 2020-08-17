import {
  DateList,
  dateListFilter,
  dateListWeekFilter,
  prevSunday,
  aWeekAgo,
} from './DateList';

function basicDateList(): DateList {
  return ['2020-08-13', '2020-08-08', '2020-08-02', '2020-07-28'];
}

const tzOffset = new Date().getTimezoneOffset();
function localDate(str: string) {
  return new Date(new Date(str).valueOf() - tzOffset);
}

test('Filter by year', () => {
  expect(dateListFilter(basicDateList(), '2020')).toEqual(basicDateList());
  expect(dateListFilter(basicDateList(), '2019')).toEqual([]);
});

test('Filter by month', () => {
  expect(dateListFilter(basicDateList(), '2020-08')).toEqual(
    basicDateList().slice(0, 3),
  );
  expect(dateListFilter(basicDateList(), '2020-07')).toEqual(['2020-07-28']);
});

test('Filter by week', () => {
  expect(dateListWeekFilter(basicDateList(), '2020-08-02')).toEqual([
    '2020-08-08',
    '2020-08-02',
  ]);
  expect(dateListWeekFilter(basicDateList(), '2020-07-26')).toEqual([
    '2020-07-28',
  ]);
});

test('prevSunday', () => {
  expect(prevSunday(localDate('2020-08-02T00:01'))).toBe('2020-08-02');
  expect(prevSunday(localDate('2020-08-08T23:59'))).toBe('2020-08-02');
  expect(prevSunday(localDate('2020-01-02'))).toBe('2019-12-29');
});

test('aWeekAgo', () => {
  expect(aWeekAgo('2020-08-14')).toBe('2020-08-07');
  expect(aWeekAgo('2020-01-02')).toBe('2019-12-26');
});
