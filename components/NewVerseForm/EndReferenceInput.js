import React from "react";
import PropTypes from "prop-types";
import ChapterVerseInput from "./ChapterVerseInput";
import MultiverseCheck from "./MultiverseCheck";

export default function EndReferenceInput(props) {
  if (props.multiverse) {
    return <ChapterVerseInput {...props} />;
  }
  return <MultiverseCheck setMultiverse={props.setMultiverse} />;
}

EndReferenceInput.propTypes = {
  multiverse: PropTypes.bool,
  setMultiverse: PropTypes.func.isRequired
};
