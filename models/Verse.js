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
      learned: false,
      reviews: 0
    };
  }

  static refText(verse) {
    let ref = `${verse.bookName} ${verse.startChapter}:${verse.startVerse}`;
    if (verse.endChapter) {
      ref +=
        verse.endChapter == verse.startChapter
          ? `-${verse.endVerse}`
          : `-${verse.endChapter}:${verse.endVerse}`;
    }
    return ref;
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
}

function verseCompareVal(verse) {
  return verse.startVerse + 1000 * (verse.startChapter + 1000 * verse.bookId);
}
