import cheerio from "cheerio-without-node-native";

export default function parsePassage(html) {
  const $ = cheerio.load(html);
  const ref = $(".passage-display-bcv").text();
  const pContents = $("p").contents();
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
    text: text
  };
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
