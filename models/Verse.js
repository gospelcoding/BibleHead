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

  static reviewWeight(verse) {
    const age = new Date().getTime() - (verse.lastReview || 0);
    const reviews = (verse.successfulReviews || 0) + 1; // Add one to prevent using 0 in geometric weighting
    const lastWrongFactor = verse.lastReviewWrong ? 2 : 1;
    return (age * lastWrongFactor) / reviews;
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
    return {
      learned: true,
      lastReview: verse.lastReview || 0,
      successfulReviews: verse.successfulReviews || 0
    };
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
