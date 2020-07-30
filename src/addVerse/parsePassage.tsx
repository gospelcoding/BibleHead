import cheerio from 'react-native-cheerio';
import bookCodes from './bibleCodes';

type Reference = {
  bookName: string;
  bookId: number;
  startChapter: number;
  startVerse?: number;
  endChapter?: number;
  endVerse?: number;
};

export type Passage = {
  ref: Reference;
  // refText: string;
  text: string;
};

export default function parsePassage(html: string): Passage {
  const $ = cheerio.load(html);
  const passageTextDiv = $('.passage-text');
  const ref = parseRef($);
  const pContents = $('p', passageTextDiv).contents();
  let text = '';
  for (let i = 0; i < pContents.length; ++i) {
    let node = pContents[i];
    if (node.name == 'span') {
      text = handleTextSpan(text, node);
    } else if (node.name == 'br') {
      if (text && text[text.length - 1] != '\n') text += '\n';
    }
  }
  return {
    ref: ref,
    text: text,
  };
}

function handleTextSpan(text: string, node: CheerioElement) {
  let newText = text;
  for (let i = 0; i < node.children.length; ++i) {
    let childNode = node.children[i];
    if (childNode.type == 'text') {
      newText = appendText(newText, childNode.data || '');
    } else if (!isJunk(childNode)) {
      newText = handleTextSpan(newText, childNode);
    }
  }
  return newText;
}

function appendText(text: string, addition: string) {
  if (
    text &&
    addition &&
    !endsWithWhitespace(text) &&
    needsFrontWhitespace(addition)
  )
    return text + ' ' + addition;
  return text + addition;
}

function isJunk(node: CheerioElement) {
  if (node.name == 'sup') return true;
  if (
    node.attribs &&
    node.attribs.class &&
    node.attribs.class.match(/chapternum/)
  )
    return true;
  return false;
}

function needsFrontWhitespace(s: string) {
  return !s[0].match(/[.,?!’”\s]/);
}

function endsWithWhitespace(s: string) {
  return isWhitespace(s[s.length - 1]);
}

function startsWithWhitespace(s: string) {
  return isWhitespace(s[0]);
}

function isWhitespace(c: string) {
  return !!c.match(/\s/);
}

type RefText = {
  ref: string;
  text: string;
};

function processChildren(children: CheerioElement[]): RefText {
  return children.reduce(
    (passage, subNode) => {
      let childPassage = processNode(subNode);
      return {
        ref: passage.ref + childPassage.ref,
        text: passage.text + childPassage.text,
      };
    },
    {ref: '', text: ''},
  );
}

function processNode(node: CheerioElement): RefText {
  if (node.attribs && node.attribs.class == 'passage-display-bcv') {
    return {ref: pureTextContent(node), text: ''};
  }

  if (node.attribs && node.attribs.class == 'text') {
    return {text: pureTextContent(node), ref: ''};
  }

  if (node.children) {
    return processChildren(node.children);
  }

  return {ref: '', text: ''};
}

function pureTextContent(node: CheerioElement) {
  return node.children.reduce((text, subNode) => {
    return subNode.type == 'text' ? text + subNode.data : text;
  }, '');
}

function parseRef($: CheerioStatic): Reference {
  const reference = blankReference();
  const refText = $('.bcv .dropdown-display-text').text();
  const bookNameMatch = /(.+) \d/.exec(refText);
  if (bookNameMatch) reference.bookName = bookNameMatch[1];

  const versePs = $('.passage-text .text');
  if (versePs.length == 0) return reference;

  const startVerseRef = parseVerseRef(versePs.first());
  if (!startVerseRef) return reference;

  reference.bookId = bookCodes().indexOf(startVerseRef[0]);
  console.log(`Book ID for ${startVerseRef[0]} : ${reference.bookId}`);
  reference.startChapter = startVerseRef[1];
  reference.startVerse = startVerseRef[2];

  const endVerseRef = parseVerseRef(versePs.last());
  if (!endVerseRef) return reference;

  reference.endChapter = endVerseRef[1];
  reference.endVerse = endVerseRef[2];

  return reference;
}

function parseVerseRef(node: Cheerio): [string, number, number] | null {
  const pattern = /(\w+)-(\d+)-(\d+)/;
  const classAttr = node.attr('class');
  const match = classAttr ? classAttr.match(pattern) : null;
  if (!match) return null;
  return [match[1], parseInt(match[2]), parseInt(match[3])];
}

function blankReference(): Reference {
  return {
    bookName: '??',
    startChapter: 0,
    bookId: 100,
  };
}
