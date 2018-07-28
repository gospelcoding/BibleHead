export function newVerse(
  text,
  bookName,
  startChapter,
  startVerse,
  endChapter,
  endVerse
) {
  return {
    text: text,
    bookName: bookName,
    startChapter: startChapter,
    startVerse: startVerse,
    endChapter: endChapter,
    endVerse: endVerse,
    learned: false,
    reviews: 0
  };
}
