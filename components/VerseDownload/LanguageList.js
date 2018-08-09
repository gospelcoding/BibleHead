import React from "react";
import { SafeAreaView, Text, FlatList, View } from "react-native";
import CommonStyles from "../../util/CommonStyles";
import I18n from "../../i18n/i18n";
import XPlatformTouchable from "../shared/XPlatformTouchable";
import BiblesOrgApi from "../../util/BiblesOrgApi";
import PickerList from "../shared/PickerList";

function versionLanguages(versions) {
  return versions.reduce((languages, version) => {
    if (
      languages.length == 0 ||
      version.lang != languages[languages.length - 1].code
    ) {
      languages.push({
        code: version.lang,
        name: version.lang_name,
        versions: [version]
      });
    } else {
      languages[languages.length - 1].versions.push(version);
    }
    return languages;
  }, []);
}

function findAutoLang(languages) {
  let code;
  if (I18n.currentLocale() == "en-GB") code = "eng-GB";
  else code = I18n.codeConversion[I18n.currentLang()];

  if (!code) return null;

  return languages.find(lang => lang.code == code);
}

export default class LanguageList extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      languages: []
    };
  }

  async componentDidMount() {
    const versions = (await BiblesOrgApi.versions()).sort((a, b) => {
      if (a.lang_name == b.lang_name) return a.name.localeCompare(b.name);
      return a.lang_name.localeCompare(b.lang_name);
    });
    const languages = versionLanguages(versions);
    const autoLang = findAutoLang(languages);
    if (autoLang)
      this.props.navigation.navigate("VersionList", {
        versions: autoLang.versions,
        autoLang: true
      });
    this.setState({
      languages: languages
    });
  }

  // toggleSelection = langCode => {
  //   this.setState(prevState => {
  //     return {
  //       selectedLang: prevState.selectedLang == langCode ? null : langCode
  //     };
  //   });
  // };

  static navigationOptions = () => {
    return {
      headerTitle: "Language"
    };
  };

  render() {
    return (
      <SafeAreaView style={CommonStyles.screenRoot}>
        <PickerList
          data={this.state.languages}
          keyExtractor={language => language.code}
          itemText={language => language.name}
          itemPress={language => {
            this.props.navigation.navigate("VersionList", {
              versions: language.versions
            });
          }}
        />
      </SafeAreaView>
    );
  }

  // render() {
  //   return (
  //     <SafeAreaView style={CommonStyles.screenRoot}>
  //       <Text style={CommonStyles.listHeader}>{I18n.t("Language")}</Text>
  //       <FlatList
  //         style={{ flex: 1 }}
  //         data={this.state.languages}
  //         keyExtractor={language => language.code}
  //         renderItem={({ item: language }) => {
  //           return (
  //             <View>
  //               <XPlatformTouchable
  //                 onPress={() => {
  //                   this.toggleSelection(language.code);
  //                 }}
  //               >
  //                 <Text style={CommonStyles.listItem}>{language.name}</Text>
  //               </XPlatformTouchable>
  //               <View style={{ paddingStart: 16 }}>
  //                 {language.code == this.state.selectedLang &&
  //                   language.versions.map(version => (
  //                     <View key={version.id}>
  //                       <XPlatformTouchable
  //                         onPress={() => {
  //                           this.props.navigation.navigate("BookList", {
  //                             version: version
  //                           });
  //                         }}
  //                       >
  //                         <Text style={CommonStyles.listItem}>
  //                           {version.name}
  //                         </Text>
  //                       </XPlatformTouchable>
  //                     </View>
  //                   ))}
  //               </View>
  //             </View>
  //           );
  //         }}
  //       />
  //     </SafeAreaView>
  //   );
  // }
}
