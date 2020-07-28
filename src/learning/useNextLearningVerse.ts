import {useAppSelector} from '../BHState';
import {Verse} from '../verses/Verse';

export function useNextLearningVerse(): Verse | undefined {
  const toLearn = useAppSelector((state) => state.verses.learning.toLearn);
  return useVerseById(toLearn[0]);
}

export function useNextReviewVerse(): Verse | undefined {
  const toReview = useAppSelector((state) => state.verses.learning.toReview);
  return useVerseById(toReview[0]);
}

function useVerseById(id: number | undefined): Verse | undefined {
  const verses = useAppSelector((state) => state.verses.verses);
  return id ? verses.find((v) => v.id == id) : undefined;
}
