import {useAppSelector} from '../BHState';
import {Verse} from '../verses/Verse';

export function useNextLearningVerse(): Verse | undefined {
  const toLearn = useAppSelector((state) => state.learning.toLearn);
  const verses = useAppSelector((state) => state.verses.verses);
  return toLearn.length > 0
    ? verses.find((v) => v.id == toLearn[0])
    : undefined;
}
