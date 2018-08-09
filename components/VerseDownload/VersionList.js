import React from "react";
import { SafeAreaView, Text, FlatList, View } from "react-native";
import CommonStyles from "../../util/CommonStyles";
import I18n from "../../i18n/i18n";
import XPlatformTouchable from "../shared/XPlatformTouchable";
import BiblesOrgApi from "../../util/BiblesOrgApi";
import PickerList from "../shared/PickerList";
import BHButton from "../shared/BHButton";

// function versionLanguages(versions) {
//   return versions.reduce((languages, version) => {
//     if (
//       languages.length == 0 ||
//       version.lang != languages[languages.length - 1].code
//     ) {
//       languages.push({
//         code: version.lang,
//         name: version.lang_name,
//         versions: [version]
//       });
//     } else {
//       languages[languages.length - 1].versions.push(version);
//     }
//     return languages;
//   }, []);
// }

export default class VersionList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      versions: this.props.navigation.getParam("versions")
    };
  }

  // async componentDidMount() {
  //   const versions = (await BiblesOrgApi.versions()).sort((a, b) => {
  //     if (a.lang_name == b.lang_name) return a.name.localeCompare(b.name);
  //     return a.lang_name.localeCompare(b.lang_name);
  //   });
  //   this.setState({
  //     versions: versions
  //   });
  // }

  // toggleSelection = langCode => {
  //   this.setState(prevState => {
  //     return {
  //       selectedLang: prevState.selectedLang == langCode ? null : langCode
  //     };
  //   });
  // };

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: navigation.getParam("versions")[0].lang_name
    };
  };

  render() {
    return (
      <SafeAreaView style={CommonStyles.screenRoot}>
        <PickerList
          data={this.state.versions}
          keyExtractor={version => version.id}
          itemText={version => version.name}
          itemPress={version => {
            this.props.navigation.navigate("BookList", { version: version });
          }}
        />
      </SafeAreaView>
    );
  }
}
