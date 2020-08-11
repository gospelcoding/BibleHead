import {Passage} from '../addVerse/parsePassage';
import {isInt} from '../util/util';
import {BHReview} from '../learning/LearningScreen';

export interface Verse {
  id: number;
  text: string;
  bookId: number; // 0-65
  bookName: string;
  startChapter: number;
  endChapter?: number;
  startVerse?: number;
  endVerse?: number;
  learned: boolean;
  createdAt: number;
  lastReview?: number;
  successfulReviews?: number;
  lastReviewWrong?: boolean;
  lastPracticed?: number;
}

export interface DividedVerse extends Verse {
  splitIndices: number[];
  currentSplit: number; // Index of splitIndices
}

export function newVerse(
  verse: Omit<Verse, 'learned' | 'createdAt' | 'id'>,
): Verse {
  return {
    ...verse,
    learned: false,
    createdAt: Date.now(),
    id: 0, // id should be 0 until saved in versesSlice
  };
}

export function refText(verse: Verse | Passage['ref']) {
  let ref = `${verse.bookName} ${verse.startChapter}`;
  if (verse.startVerse) ref += `:${verse.startVerse}`;
  if (verse.endChapter) {
    if (!verse.endVerse && verse.endChapter != verse.startChapter) {
      ref += `-${verse.endChapter}`;
    } else {
      ref +=
        verse.endChapter == verse.startChapter
          ? verse.startVerse == verse.endVerse
            ? ''
            : `-${verse.endVerse}`
          : `-${verse.endChapter}:${verse.endVerse}`;
    }
  }
  return ref;
}

export function isDivided(verse: Verse): verse is DividedVerse {
  return (
    'splitIndices' in verse && (verse as DividedVerse).splitIndices.length > 1
  ); // verse.splitIndices && verse.splitIndices.length > 1;
}

export interface PracticeParams {
  text: string;
  progress: string;
  prompt: string;
  learned: boolean;
}

export function versePracticeParams(verse: Verse): PracticeParams {
  if (!isDivided(verse) || verse.learned)
    return {
      text: verse.text,
      progress: '',
      prompt: '',
      learned: verse.learned,
    };
  return {
    text: currentLearningText(verse),
    progress: `(${verse.currentSplit + 1}/${verse.splitIndices.length})`,
    prompt: currentLearningPrompt(verse),
    learned: false,
  };
}

export function currentLearningText(verse: Verse) {
  if (!isDivided(verse)) return verse.text;
  if (verse.currentSplit == verse.splitIndices.length - 1)
    return verse.text.slice(verse.splitIndices[verse.currentSplit]);
  return verse.text.slice(
    verse.splitIndices[verse.currentSplit],
    verse.splitIndices[verse.currentSplit + 1],
  );
}

export function currentLearningPrompt(verse: Verse) {
  if (!isDivided(verse) || verse.currentSplit == 0) return '';
  const text = verse.text.slice(0, verse.splitIndices[verse.currentSplit]);
  const lastSixWords = /\S+(\s+\S+){5}\s*$/;
  const matches = text.match(lastSixWords);
  if (matches === null) return text;
  if (matches[0].length < text.length) return '...' + matches[0];
  return matches[0];
}

export function reviewWeight(verse: Verse) {
  const age = new Date().getTime() - (verse.lastReview || 0);
  const reviews = (verse.successfulReviews || 0) + 1; // Add one to prevent using 0 in geometric weighting
  const lastWrongFactor = verse.lastReviewWrong ? 2 : 1;
  return (age * lastWrongFactor) / reviews;
}

export function selectReviewVersesAndLearningVerse(verses: Verse[]): BHReview {
  const [reviewing, learning] = reviewingAndLearningLists(verses);
  return {
    toReview: selectReviewVerses(reviewing, 4).map((v) => v.id),
    toLearn: selectLearningVerses(learning).map((v) => v.id),
  };
}

export function reviewingAndLearningLists(verses: Verse[]) {
  const learning: Verse[] = [];
  const reviewing: Verse[] = [];
  verses.forEach((verse) => {
    // A verse can be on both lists!
    if (!verse.learned) learning.push(verse);
    if (verse.learned || (isDivided(verse) && verse.currentSplit > 0))
      reviewing.push(verse);
  });
  return [reviewing, learning];
}

// export function allReviewableVerses(
//   reviewList: Verse[],
//   learningList: Verse[],
// ) {
//   return reviewList.concat(
//     learningList.filter((verse) => isDivided(verse) && verse.currentSplit > 0),
//   );
// }

export function selectReviewVerses(verses: Verse[], number: number) {
  let weightedVerses = verses.map((verse) => {
    return {
      verse: verse,
      weight: reviewWeight(verse),
    };
  });
  weightedVerses.sort((a, b) => {
    return b.weight - a.weight;
  });
  return weightedVerses.slice(0, number).map((wVerse) => {
    return wVerse.verse;
  });
}

export function selectLearningVerses(verses: Verse[]): Verse[] {
  let lastPracticedVerse;
  let oldestVerse;
  for (let verse of verses) {
    if (
      verse.lastPracticed &&
      (!lastPracticedVerse ||
        verse.lastPracticed > lastPracticedVerse.lastPracticed!)
    )
      lastPracticedVerse = verse;
    if (!oldestVerse || verse.createdAt < oldestVerse.createdAt)
      oldestVerse = verse;
  }
  return lastPracticedVerse
    ? [lastPracticedVerse]
    : oldestVerse
    ? [oldestVerse]
    : [];
}

export function compareVerses(a: Verse, b: Verse) {
  return verseCompareVal(a) - verseCompareVal(b);
}

// export function getLearningAndReviewingLists(verses: Verse[]) {
//   let learning = [];
//   let reviewing = [];
//   for (const verse of verses) {
//     if (verse.learned) {
//       reviewing.push(verse);
//     } else {
//       learning.push(verse);
//     }
//   }
//   return {
//     learning: learning,
//     reviewing: reviewing,
//   };
// }

export function toggleLearnedParams(verse: Verse) {
  const learned = !verse.learned;
  if (!isDivided(verse)) return {learned};
  const newCurrentSplit = learned
    ? verse.currentSplit + 1
    : verse.currentSplit - 1;
  if (newCurrentSplit == verse.splitIndices.length)
    return {learned: true, currentSplit: 0};
  return {currentSplit: newCurrentSplit};
}

export function successfulReviewParams(verse: Verse) {
  return {
    lastReview: new Date().getTime(),
    successfulReviews: (verse.successfulReviews || 0) + 1,
    lastReviewWrong: false,
  };
}

export function failedReviewParams() {
  return {
    lastReview: new Date().getTime(),
    lastReviewWrong: true,
  };
}

function verseCompareVal(verse: Verse) {
  return (
    (verse.startVerse || 1) + 1000 * (verse.startChapter + 1000 * verse.bookId)
  );
}

export function verseReviewText(verse: Verse) {
  const text =
    verse.learned || !isDivided(verse)
      ? verse.text
      : verse.text.slice(0, verse.splitIndices[verse.currentSplit]);
  return text.trim(); // Avoids bug in step button caused by leading whitespace
}

export function normalizeVerses(
  verses: Verse[],
  updateVerse: (verse: Verse) => void,
  bookNames: string[],
) {
  verses.forEach((verse) => {
    const update: Partial<Verse> = {};
    if (!isInt(verse.bookId)) update.bookId = 100;
    if (!isInt(verse.startChapter)) update.startChapter = 1;
    if (!verse.bookName) {
      if (verse.bookId) update.bookName = bookNames[verse.bookId];
      else update.bookName = '???';
    }
    if (Object.keys(update).length > 0) updateVerse({...verse, ...update});
  });
}

export function verseStrength(verse: Verse): number {
  if (!verse.learned) return 0;

  const dayInMS = 1000 * 60 * 60 * 24;
  const age = verse.lastReview ? (Date.now() - verse.lastReview) / dayInMS : 0;
  return (
    (-200 / ((verse.successfulReviews || 0) + 100) + 100) *
    Math.max((100 - age) / 100, 0.05)
  );
}
