import {Verse} from '../verses/Verse';
import {localDateString, utcDateString, zeroPad} from './util';

export type DateList = string[]; // YYYY-MM-DD

const DAY = 1000 * 60 * 60 * 24;

export function learnedDateList(verses: Verse[]) {
  return verses
    .reduce((dates: string[], verse) => {
      if (verse.learned && verse.learnedDate) dates.push(verse.learnedDate);
      return dates;
    }, [])
    .sort((a, b) => b.localeCompare(a));
}

// Filter either YYYY or YYYY-MM
export function dateListFilter(dates: DateList, filter: string) {
  return dates.filter((d) => d.startsWith(filter));
}

export function dateListWeekFilter(dates: DateList, sunday: string) {
  const sundayDate = new Date(sunday);
  const saturday = utcDateString(
    new Date(new Date(sunday).setUTCDate(sundayDate.getUTCDate() + 6)),
  );

  return dates.filter((date) => date >= sunday && date <= saturday);
}

// Inclusive - if given date is sunday, returns that date
export function prevSunday(date: Date = new Date()) {
  const sunday = new Date(date);
  sunday.setDate(date.getDate() - date.getDay());
  return localDateString(sunday);
}

export function aWeekAgo(date: string) {
  const d = new Date(date);
  d.setUTCDate(d.getUTCDate() - 7);
  return utcDateString(d);
}

export function learnedSummary(verses: Verse[], monthNames: string[]) {
  const learned = verses.filter((v) => v.learned);
  const learnedDates = learnedDateList(learned);
  const thisYear = new Date().getFullYear();
  const thisMonth = new Date().getMonth();
  const lastMonth = thisMonth == 0 ? 12 : thisMonth - 1;

  return {
    total: learned.length,
    names: {
      thisYear,
      lastYear: thisYear - 1,
      thisMonth: monthNames[thisMonth],
      lastMonth: monthNames[lastMonth],
    },
    thisWeek: dateListWeekFilter(learnedDates, prevSunday()).length,
    lastWeek: dateListWeekFilter(learnedDates, aWeekAgo(prevSunday())).length,
    thisMonth: dateListFilter(
      learnedDates,
      `${thisYear}-${zeroPad(thisMonth + 1, 2)}`,
    ).length,
    lastMonth: dateListFilter(
      learnedDates,
      `${lastMonth == 11 ? thisYear - 1 : thisYear}-${zeroPad(
        lastMonth + 1,
        2,
      )}`,
    ).length,
    thisYear: dateListFilter(learnedDates, `${thisYear}`).length,
    lastYear: dateListFilter(learnedDates, `${thisYear - 1}`).length,
  };
}
