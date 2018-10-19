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
  const spaceIndex = refText.indexOf(" ");
  const firstColonIndex = refText.indexOf(":");
  const secondColonIndex = refText.lastIndexOf(":");
  const dashIndex = refText.indexOf("-");

  let ref = {};
  if (spaceIndex < 0) return ref;
  ref.bookName = refText.slice(0, spaceIndex);

  // John 1-2
  if (firstColonIndex < spaceIndex && dashIndex > 0) {
    ref.startChapter = parseInt(refText.slice(spaceIndex + 1, dashIndex));
    ref.endChapter = parseInt(refText.slice(dashIndex + 1));
    return ref;
  }

  // John 1
  if (firstColonIndex < spaceIndex) {
    ref.startChapter = parseInt(refText.slice(spaceIndex + 1));
    return ref;
  }
  ref.startChapter = parseInt(refText.slice(spaceIndex + 1, firstColonIndex));

  // John 1:1
  if (dashIndex < firstColonIndex) {
    ref.startVerse = parseInt(refText.slice(firstColonIndex + 1));
    return ref;
  }

  // John 1:1-2
  if (secondColonIndex == firstColonIndex) {
    ref.startVerse = parseInt(refText.slice(firstColonIndex + 1, dashIndex));
    ref.endChapter = ref.startChapter;
    ref.endVerse = parseInt(refText.slice(dashIndex + 1));
    return ref;
  }

  // John 1:1-2:2
  ref.startVerse = parseInt(refText.slice(firstColonIndex + 1, dashIndex));
  ref.endChapter = parseInt(refText.slice(dashIndex + 1, secondColonIndex));
  ref.endVerse = parseInt(refText.slice(secondColonIndex + 1));
  return ref;
}
