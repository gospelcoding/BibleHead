import React from "react";
import PropTypes from "prop-types";
import { View, Picker } from "react-native";
import ChapterVerseInput from "./ChapterVerseInput";
import EndReferenceInput from "./EndReferenceInput";
import SingleVerseToggle from "./SingleVerseToggle";

export default function ReferenceInput(props) {
  const verse = props.verse;
  return (
    <View>
      <View style={{ flexDirection: "row" }}>
        <Picker
          style={{ flex: 1 }}
          selectedValue={verse.bookName}
          onValueChange={(name, id) => {
            props.updateVerse({ bookId: id, bookName: name });
          }}
        >
          {props.bibleBooks.map((book, id) => {
            return (
              <Picker.Item key={id.toString()} label={book} value={book} />
            );
          })}
        </Picker>
        <ChapterVerseInput
          chapter={verse.startChapter}
          verse={verse.startVerse}
          updateChapter={c => {
            props.updateVerse({ startChapter: c });
          }}
          updateVerse={v => {
            props.updateVerse({ startVerse: v });
          }}
        />
      </View>
      {!props.singleVerse && (
        <EndReferenceInput
          verse={props.verse}
          updateVerse={props.updateVerse}
        />
      )}
      <SingleVerseToggle
        singleVerse={props.singleVerse}
        setSingleVerse={props.setSingleVerse}
      />
    </View>
  );
}

ReferenceInput.propTypes = {
  verse: PropTypes.shape({
    bookId: PropTypes.number.isRequired,
    startChapter: PropTypes.number.isRequired,
    startVerse: PropTypes.number.isRequired,
    endChapter: PropTypes.number,
    endVerse: PropTypes.number
  }),
  updateVerse: PropTypes.func.isRequired,
  singleVerse: PropTypes.bool.isRequired,
  setSingleVerse: PropTypes.func.isRequired,
  bibleBooks: PropTypes.arrayOf(PropTypes.string)
};
