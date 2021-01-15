export type IndexedWord = {
  word: string;
  index: number;
};

export function getWords(text: string): IndexedWord[] {
  const preferLowerCase = looksLikeGreek(text);
  const pattern = /\S+/g;
  const wordsWithIndices: IndexedWord[] = [];
  let find;
  while ((find = pattern.exec(text)) !== null) {
    wordsWithIndices.push({
      word: find[0],
      index: find.index,
    });
  }

  const startPunctuation = /^[.,:;?¿!¡"“”‘’«»()·]+/;
  const endPunctuation = /[.,:;?¿!¡"“”‘’«»()·]+$/;
  for (let wordObj of wordsWithIndices) {
    wordObj.word = decase(
      wordObj.word.replace(startPunctuation, '').replace(endPunctuation, ''),
      preferLowerCase,
    );
  }

  return wordsWithIndices;
}

function decase(str: string, preferLowerCase: boolean) {
  return preferLowerCase ? str.toLowerCase() : str.toUpperCase();
}

function looksLikeGreek(str: string) {
  const greekAlphabet = /[αβγδεζηθικλμνξοπρσςτυφχψωΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ]/g;
  return (str.match(greekAlphabet) || []).length > Math.min(10, str.length / 2);
}
