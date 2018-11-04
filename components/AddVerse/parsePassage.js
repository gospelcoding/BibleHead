import cheerio from "cheerio-without-node-native";
import bookCodes from "./bibleCodes";

export default function parsePassage(html) {
  const $ = cheerio.load(html);
  const passageTextDiv = $(".passage-text");
  const refText = $(".passage-display-bcv", passageTextDiv).text();
  const ref = parseRefText(refText);
  const bookId = getBookId($, passageTextDiv);
  const pContents = $("p", passageTextDiv).contents();
  let text = "";
  for (let i = 0; i < pContents.length; ++i) {
    let node = pContents[i];
    if (node.name == "span") {
      text = handleTextSpan(text, node);
    } else if (node.name == "br") {
      if (text && text[text.length - 1] != "\n") text += "\n";
    }
  }
  return {
    ref: ref,
    refText: refText,
    bookId: bookId,
    text: text
  };
}

function getBookId($, passageTextDiv) {
  try {
    const node = $("span.text", passageTextDiv);
    // console.error(node);
    const pattern = /(\w+)-\d+-\d+/;
    const bookCode = node.attr("class").match(pattern)[1];
    return bookCodes().indexOf(bookCode);
  } catch (err) {
    return -1;
  }
}

function handleTextSpan(text, node) {
  let newText = text;
  for (let i = 0; i < node.children.length; ++i) {
    let childNode = node.children[i];
    if (childNode.type == "text") {
      newText = appendText(newText, childNode.data);
    } else if (!isJunk(childNode)) {
      newText = handleTextSpan(newText, childNode);
    }
  }
  return newText;
}

function appendText(text, addition) {
  if (
    text &&
    addition &&
    !endsWithWhitespace(text) &&
    needsFrontWhitespace(addition)
  )
    return text + " " + addition;
  return text + addition;
}

function isJunk(node) {
  if (node.name == "sup") return true;
  if (
    node.attribs &&
    node.attribs.class &&
    node.attribs.class.match(/chapternum/)
  )
    return true;
  return false;
}

function needsFrontWhitespace(s) {
  return !s[0].match(/[.,?!’”\s]/);
}

function endsWithWhitespace(s) {
  return isWhitespace(s[s.length - 1]);
}

function startsWithWhitespace(s) {
  return isWhitespace(s[0]);
}

function isWhitespace(c) {
  return !!c.match(/\s/);
}

function processChildren(children) {
  return children.reduce(
    (passage, subNode) => {
      let childPassage = processNode(subNode);
      return {
        ref: passage.ref + childPassage.ref,
        text: passage.text + childPassage.text
      };
    },
    { ref: "", text: "" }
  );
}

function processNode(node) {
  if (node.attribs && node.attribs.class == "passage-display-bcv") {
    return { ref: pureTextContent(node), text: "" };
  }

  if (node.attribs && node.attribs.class == "text") {
    return { text: pureTextContent(node), ref: "" };
  }

  if (node.children) {
    return processChildren(node.children);
  }

  return { ref: "", text: "" };
}

function pureTextContent(node) {
  return node.children.reduce((text, subNode) => {
    if (subNode.type == "text") return text + subNode.data;
  }, "");
}

function parseRefText(refText) {
  let pattern = /(\d+):(\d+)-(\d+):(\d+)/; // John 1:1-2:2
  let match = pattern.exec(refText);
  if (match)
    return {
      bookName: refText.slice(0, match.index).trim(),
      startChapter: parseInt(match[1]),
      startVerse: parseInt(match[2]),
      endChapter: parseInt(match[3]),
      endVerse: parseInt(match[4])
    };

  pattern = /(\d+):(\d+)-(\d+)/; // John 1:1-2
  match = pattern.exec(refText);
  if (match)
    return {
      bookName: refText.slice(0, match.index).trim(),
      startChapter: parseInt(match[1]),
      endChapter: parseInt(match[1]),
      startVerse: parseInt(match[2]),
      endVerse: parseInt(match[3])
    };

  pattern = /(\d+):(\d+)/; // John 1:1
  match = pattern.exec(refText);
  if (match) {
    return {
      bookName: refText.slice(0, match.index).trim(),
      startChapter: parseInt(match[1]),
      startVerse: parseInt(match[2])
    };
  }

  pattern = /(\d+)-(\d+)/; // John 1-2
  match = pattern.exec(refText);
  if (match)
    return {
      bookName: refText.slice(0, match.index).trim(),
      startChapter: parseInt(match[1]),
      endChapter: parseInt(match[2])
    };

  pattern = /(\d+)$/; // John 1
  match = pattern.exec(refText);
  if (match)
    return {
      bookName: refText.slice(0, match.index).trim(),
      startChapter: parseInt(match[1])
    };

  return {};
}
