import React, {useEffect} from 'react';
import {View, Text, Button} from 'react-native';
import CommonStyles from '../util/CommonStyles';
import {useAppSelector} from '../BHState';
import {refText} from '../verses/Verse';
import BHTextInput from '../util/BHTextInput';
import draftVerseSlice from './draftVerseSlice';
import {NavigationProp} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {useT} from '../i18n/i18nReact';
import BHText from '../components/BHText';

interface IProps {
  navigation: NavigationProp<any, any>;
}

export default function TextEntryScreen({navigation}: IProps) {
  const dispatch = useDispatch();
  const t = useT();

  const draftVerse = useAppSelector((state) => state.draftVerse);

  useEffect(() => {
    if (!draftVerse) navigation.navigate('RefEditor');
  });

  if (!draftVerse) return <View />;

  return (
    <View style={CommonStyles.screenRoot}>
      <BHText>{refText(draftVerse)}</BHText>
      <BHTextInput
        multiline
        value={draftVerse.text}
        onChangeText={(text) =>
          dispatch(draftVerseSlice.actions.setDraftVerse({...draftVerse, text}))
        }
      />
      <Button
        title={t('Save')}
        onPress={() => {
          dispatch(draftVerseSlice.actions.saveDraftVerse(draftVerse));
          navigation.navigate('VerseList');
        }}
      />
    </View>
  );
}

// import React from "react";
// import PropTypes from "prop-types";
// import {
//   SafeAreaView,
//   View,
//   TextInput,
//   StyleSheet,
//   Platform,
//   KeyboardAvoidingView
// } from "react-native";
// import BookNameModal from "./BookNameModal";

// const isAndroid = Platform.OS == "android";

// export default class TextEntry extends React.PureComponent {
//   constructor(props) {
//     super(props);
//     this.state = {
//       verse: props.navigation.getParam("verse")
//     };
//     props.navigation.setParams({
//       clickSave: this.saveVerse,
//       editReference: this.editReference
//     });
//   }

//   editReference = option => {
//     if (option == "RemoveEndVerse")
//       this.updateVerse({ endVerse: null, endChapter: null });
//     else this.setState(this.modalState(option));
//   };

//   modalState = whichModal => {
//     switch (whichModal) {
//       case "BookName":
//         return {
//           bookNameModalDisplayed: true
//         };
//       case "ChangeStartChapter":
//         return {
//           modalData: intArray(1, 150),
//           onModalSelect: c => {
//             this.updateVerse({ startChapter: c });
//           }
//         };
//       case "ChangeStartVerse":
//         return {
//           modalData: intArray(1, 200),
//           onModalSelect: v => {
//             this.updateVerse({ startVerse: v });
//           }
//         };
//       case "AddEndVerse":
//       case "ChangeEndVerse":
//         return {
//           modalData: this.endVerseOptions(),
//           onModalSelect: endRef => {
//             const colon = endRef.indexOf(":");
//             this.updateVerse({
//               endChapter: parseInt(endRef.slice(0, colon)),
//               endVerse: parseInt(endRef.slice(colon + 1))
//             });
//           }
//         };
//     }
//   };

//   endVerseOptions = () => {
//     const chapter = this.state.verse.startChapter;
//     return intArray(this.state.verse.startVerse + 1, 200)
//       .map(v => this.refStr(chapter, v))
//       .concat(intArray(1, 200).map(v => this.refStr(chapter + 1, v)));
//   };

//   refStr = (c, v) => `${c}:${v}`;

//   updateVerse = mergeVerse => {
//     this.setState(prevState => {
//       const newVerse = update(prevState.verse, { $merge: mergeVerse });
//       this.props.navigation.setParams({
//         verse: newVerse
//       });
//       return {
//         verse: newVerse
//       };
//     });
//   };

//   saveVerse = () => {
//     const saveVerse = this.props.navigation.getParam("saveVerse");
//     saveVerse(this.state.verse);
//     this.props.navigation.navigate("VerseListScreen");
//   };

//   static navigationOptions = ({ navigation }) => {
//     const verse = navigation.getParam("verse");
//     return {
//       title: Verse.refText(verse),
//       headerRight: (
//         <BHHeaderButtons>
//           {!!verse.text && (
//             <Item
//               title="save"
//               iconName="checkmark"
//               iconSize={isAndroid ? undefined : 36}
//               onPress={navigation.getParam("clickSave")}
//             />
//           )}
//           {verseRefMenuOptions(verse).map(option => (
//             <Item
//               key={option}
//               title={I18n.t(option)}
//               show="never"
//               onPress={() => navigation.getParam("editReference")(option)}
//             />
//           ))}
//         </BHHeaderButtons>
//       )
//     };
//   };

//   render() {
//     return (
//       <SafeAreaView style={styles.container}>
//         <PickerModal
//           isVisible={!!this.state.modalData}
//           data={this.state.modalData}
//           itemSelected={this.state.onModalSelect}
//           dismissModal={() => {
//             this.setState({ modalData: undefined, onModalSelect: undefined });
//           }}
//         />
//         <BookNameModal
//           isVisible={!!this.state.bookNameModalDisplayed}
//           verse={this.state.verse}
//           updateName={name => this.updateVerse({ bookName: name })}
//           dismissModal={() => this.setState({ bookNameModalDisplayed: false })}
//         />
//         <KeyboardAvoidingView
//           style={{ flex: 1 }}
//           behavior={isAndroid ? undefined : "padding"}
//           enabled
//         >
//           <TextInput
//             style={styles.textInput}
//             placeholder={I18n.t("VerseTextInputHint")}
//             value={this.state.verse.text}
//             multiline
//             autoFocus
//             onChangeText={text => {
//               this.updateVerse({ text: text });
//             }}
//           />
//           {!isAndroid && <View style={{ height: 60 }} />}
//         </KeyboardAvoidingView>
//       </SafeAreaView>
//     );
//   }
// }

// function verseRefMenuOptions(verse) {
//   return verse.endChapter
//     ? [
//         "BookName",
//         "ChangeStartChapter",
//         "ChangeStartVerse",
//         "ChangeEndVerse",
//         "RemoveEndVerse"
//       ]
//     : ["BookName", "ChangeStartChapter", "ChangeStartVerse", "AddEndVerse"];
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: isAndroid ? ThemeColors.grey : "white"
//   },
//   textInput: {
//     flex: 1,
//     backgroundColor: "white",
//     fontSize: 18,
//     padding: 8,
//     margin: isAndroid ? 8 : 0,
//     elevation: isAndroid ? 4 : 0
//   }
// });

// TextEntry.propTypes = {
//   navigation: PropTypes.object.isRequired
// };
