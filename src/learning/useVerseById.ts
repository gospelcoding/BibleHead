import {useAppSelector} from '../BHState';
import {Verse} from '../verses/Verse';

export const LATEST_VERSE = -1;

export function useVerseById(id: number | undefined): Verse | undefined {
  const verses = useAppSelector((state) => state.verses.verses);
  if (id === LATEST_VERSE)
    return verses.reduce((newest, verse) =>
      verse.createdAt > newest.createdAt ? verse : newest,
    );
  return id ? verses.find((v) => v.id == id) : undefined;
}
