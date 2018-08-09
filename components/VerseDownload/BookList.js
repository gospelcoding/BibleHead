import React from "react";
import I18n from "../../i18n/i18n";
import BiblesOrgApi from "../../util/BiblesOrgApi";
import PickerList from "../shared/PickerList";

export default class BookList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    };
  }

  version = () => {
    const v = this.props.navigation.getParam("version");
    return v;
  };

  async componentDidMount() {
    this.setState({
      books: await BiblesOrgApi.books(this.version().id)
    });
  }

  static navigationOptions = () => {
    return {
      headerTitle: I18n.t("Book")
    };
  };

  render() {
    return (
      <PickerList
        data={this.state.books}
        keyExtractor={book => book.id}
        itemPress={book => {
          this.props.navigation.navigate("ChapterList", {
            book: book
          });
        }}
        itemText={book => book.name}
      />
    );
  }
}
