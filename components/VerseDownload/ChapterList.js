import React from "react";
import I18n from "../../i18n/i18n";
import BiblesOrgApi from "../../util/BiblesOrgApi";
import PickerList from "../shared/PickerList";

function actualChapters(chapters) {
  return chapters.filter(chapter => parseInt(chapter.chapter));
}

export default class ChapterList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      chapters: []
    };
  }

  book = () => {
    return this.props.navigation.getParam("book");
  };

  async componentDidMount() {
    const chapters = await BiblesOrgApi.chapters(this.book().id);
    this.setState({
      chapters: actualChapters(chapters)
    });
  }

  static navigationOptions = () => {
    return {
      headerTitle: I18n.t("Chapter")
    };
  };

  render() {
    return (
      <PickerList
        data={this.state.chapters}
        keyExtractor={chapter => chapter.id}
        itemPress={chapter => {
          this.props.navigation.navigate("VersePicker", {
            chapter: chapter
          });
        }}
        itemText={chapter => chapter.chapter}
      />
    );
  }
}
