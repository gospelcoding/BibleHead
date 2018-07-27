import React from "react";
import ChapterVerseInput from "./ChapterVerseInput";
import MultiverseCheck from "./MultiverseCheck";

function EndReferenceInput(props) {
  if (props.multiverse) {
    return <ChapterVerseInput {...props} />;
  }
  return <MultiverseCheck setMultiverse={props.setMultiverse} />;
}

export default EndReferenceInput;
