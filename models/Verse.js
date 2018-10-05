/*
  Verse:
    text: String,
    bookId: int (0-65)
    bookName: String,
    startChapter: int (1-150),
    endChapter: int (1-150),
    startVerse: int (1-200),
    endVerse: int (1-200),
    learned: boolean,
    createdAt: Date in milliseconds,
    lastReview: Date in milliseconds,
    review: int,
    lastReviewWrong: boolean,
    lastPracticed: Date in milliseconds,
    splitIndices: Array of ints (indices referring to text),
    currentSplit: int (index of splitIndices)
*/

export default class Verse {
  static newVerse(
    text,
    bookId,
    bookName,
    startChapter,
    startVerse,
    endChapter,
    endVerse
  ) {
    return {
      text: text,
      bookId: bookId,
      bookName: bookName,
      startChapter: startChapter,
      startVerse: startVerse,
      endChapter: endChapter,
      endVerse: endVerse,
      learned: false
    };
  }

  static refText(verse) {
    let ref = `${verse.bookName} ${verse.startChapter}`;
    if (verse.startVerse) ref += `:${verse.startVerse}`;
    if (verse.endChapter) {
      if (!verse.endVerse && verse.endChapter != verse.startChapter) {
        ref += `-${verse.endChapter}`;
      } else {
        ref +=
          verse.endChapter == verse.startChapter
            ? `-${verse.endVerse}`
            : `-${verse.endChapter}:${verse.endVerse}`;
      }
    }
    return ref;
  }

  static isDivided(verse) {
    return verse.splitIndices && verse.splitIndices.length > 1;
  }

  static practiceParams(verse) {
    if (!Verse.isDivided(verse) || verse.learned)
      return {
        text: verse.text,
        progress: "",
        prompt: ""
      };
    return {
      text: Verse.currentLearningText(verse),
      progress: `(${verse.currentSplit + 1}/${verse.splitIndices.length})`,
      prompt: Verse.currentLearningPrompt(verse)
    };
  }

  static currentLearningText(verse) {
    if (!Verse.isDivided(verse)) return verse.text;
    if (verse.currentSplit == verse.splitIndices.length - 1)
      return verse.text.slice(verse.splitIndices[verse.currentSplit]);
    return verse.text.slice(
      verse.splitIndices[verse.currentSplit],
      verse.splitIndices[verse.currentSplit + 1]
    );
  }

  static currentLearningPrompt(verse) {
    if (!Verse.isDivided(verse) || verse.currentSplit == 0) return "";
    const text = verse.text.slice(0, verse.splitIndices[verse.currentSplit]);
    const lastSixWords = /\S+(\s+\S+){5}\s*$/;
    const matches = text.match(lastSixWords);
    if (matches === null) return text;
    if (matches[0].length < text.length) return "..." + matches[0];
    return matches[0];
  }

  static reviewWeight(verse) {
    const age = new Date().getTime() - (verse.lastReview || 0);
    const reviews = (verse.successfulReviews || 0) + 1; // Add one to prevent using 0 in geometric weighting
    const lastWrongFactor = verse.lastReviewWrong ? 2 : 1;
    return (age * lastWrongFactor) / reviews;
  }

  static selectReviewVersesAndLearningVerse(reviewList, learningList) {
    return {
      reviewVerses: this.selectReviewVerses(
        this.allReviewableVerses(reviewList, learningList),
        4
      ),
      learningVerse: this.selectLearningVerse(learningList)
    };
  }

  static allReviewableVerses(reviewList, learningList) {
    return reviewList.concat(
      learningList.filter(verse => verse.currentSplit && verse.currentSplit > 0)
    );
  }

  static selectReviewVerses(verses, number) {
    let weightedVerses = verses.map(verse => {
      return {
        verse: verse,
        weight: this.reviewWeight(verse)
      };
    });
    weightedVerses.sort((a, b) => {
      return b.weight - a.weight;
    });
    return weightedVerses.slice(0, number).map(wVerse => {
      return wVerse.verse;
    });
  }

  static selectLearningVerse(verses) {
    let lastPracticedVerse;
    let oldestVerse;
    for (let verse of verses) {
      if (
        verse.lastPracticed &&
        (!lastPracticedVerse ||
          verse.lastPracticed > lastPracticedVerse.lastPracticed)
      )
        lastPracticedVerse = verse;
      if (!oldestVerse || verse.createdAt < oldestVerse.createdAt)
        oldestVerse = verse;
    }
    return lastPracticedVerse || oldestVerse;
  }

  static compare(a, b) {
    return verseCompareVal(a) - verseCompareVal(b);
  }

  static getLearningAndReviewingLists(verses) {
    let learning = [];
    let reviewing = [];
    for (const verse of verses) {
      if (verse.learned) {
        reviewing.push(verse);
      } else {
        learning.push(verse);
      }
    }
    return {
      learning: learning,
      reviewing: reviewing
    };
  }

  static markLearnedParams(verse) {
    if (!Verse.isDivided(verse)) return { learned: true };
    if (verse.currentSplit == verse.splitIndices.length - 1)
      return { learned: true, currentSplit: 0 };
    return { currentSplit: verse.currentSplit + 1 };
  }

  static successfulReviewParams(verse) {
    return {
      lastReview: new Date().getTime(),
      successfulReviews: (verse.successfulReviews || 0) + 1,
      lastReviewWrong: false
    };
  }

  static failedReviewParams(verse) {
    return {
      lastReview: new Date().getTime(),
      lastReviewWrong: true
    };
  }
}

function verseCompareVal(verse) {
  return (
    (verse.startVerse || 1) + 1000 * (verse.startChapter + 1000 * verse.bookId)
  );
}
