import { isValidInteger } from "./util";

const maxChapter = 150;
const maxVerse = 200;

function isValidStartChapter(chapterStr) {
  return isValidInteger(chapterStr, { min: 1, max: maxChapter });
}

function isValidStartVerse(verseStr) {
  return isValidInteger(verseStr, { min: 1, max: maxVerse });
}

function isValidEndChapter(endChapterStr, startChapterStr) {
  const min = parseInt(startChapterStr) || 1;
  return isValidInteger(endChapterStr, { min: min, max: maxChapter });
}

function isValidEndVerse(
  endVerseStr,
  startVerseStr,
  endChapterStr,
  startChapterStr
) {
  const min =
    endChapterStr == startChapterStr ? parseInt(startVerseStr) + 1 || 1 : 1;
  return isValidInteger(endVerseStr, { min: min, max: maxVerse });
}

export {
  isValidStartChapter,
  isValidEndChapter,
  isValidStartVerse,
  isValidEndVerse
};
