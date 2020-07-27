import React, {useState, useEffect} from 'react';
import Modal from 'react-native-modal';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Platform,
  ActivityIndicator,
  KeyboardAvoidingView,
} from 'react-native';
import {restoreBackup} from '../util/Backups';
import {Verse, refText} from '../verses/Verse';
import {useDispatch} from 'react-redux';
import {useT} from '../i18n/i18nReact';
import versesSlice from '../verseList/versesSlice';
import {isTKey} from '../i18n/i18n';
import BHButton from '../components/BHButton';
import CommonStyles from '../util/CommonStyles';
import ThemeColors from '../util/ThemeColors';

const isIOS = Platform.OS == 'ios';
enum Phases {
  codeEntry,
  working,
  versesDisplay,
}

interface IProps {
  dismissModal: () => void;
  isVisible: boolean;
  goHome: () => void;
}

export default function RestoreBackupModal(props: IProps) {
  const dispatch = useDispatch();
  const t = useT();

  const [code, setCode] = useState('');
  const [verses, setVerses] = useState<Verse[] | null>(null);
  const [phase, setPhase] = useState(Phases.codeEntry);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const getVerses = async () => {
    setErrorMessage(null);
    setPhase(Phases.working);
    try {
      const verses = await restoreBackup(code);
      setVerses(verses);
      setPhase(Phases.versesDisplay);
    } catch (error) {
      setErrorMessage(error);
      setPhase(Phases.codeEntry);
    }
  };

  const addVerses = async () => {
    if (verses) {
      dispatch(versesSlice.actions.add(verses));
      props.dismissModal();
      props.goHome();
    }
  };

  useEffect(() => {
    if (!props.isVisible) setPhase(Phases.codeEntry);
  }, [props.isVisible]);

  return (
    <Modal
      isVisible={props.isVisible}
      onBackButtonPress={props.dismissModal}
      onBackdropPress={props.dismissModal}>
      <SafeAreaView style={{flexShrink: 1}}>
        <KeyboardAvoidingView
          style={[{flexShrink: 1}, isIOS ? {marginBottom: 40} : {}]}>
          <View style={styles.mainContainer}>
            {phase == Phases.working && (
              <ActivityIndicator style={styles.spinner} />
            )}
            {phase == Phases.codeEntry && (
              <View>
                <TextInput
                  value={code}
                  placeholder={t('Code')}
                  onChangeText={(value) => setCode(value)}
                  autoFocus
                  autoCorrect={false}
                  autoCapitalize={'characters'}
                  style={styles.codeText}
                />
                {errorMessage && (
                  <Text style={styles.errorText}>
                    {isTKey(errorMessage) ? t(errorMessage) : errorMessage}
                  </Text>
                )}
                {isIOS && code.length > 0 && (
                  <BHButton
                    title={t('GetVerses')}
                    onPress={getVerses}
                    textStyle={styles.buttonTextStyle}
                    buttonStyle={styles.buttonStyle}
                  />
                )}
              </View>
            )}
            {phase == Phases.versesDisplay && (
              <View style={{flexShrink: 1}}>
                <FlatList
                  style={styles.list}
                  data={verses}
                  keyExtractor={(verse) => verse.id.toString()}
                  renderItem={({item}) => {
                    return <Text style={styles.verseRef}>{refText(item)}</Text>;
                  }}
                />
                {isIOS && (
                  <BHButton
                    title={t('AddVerses')}
                    onPress={addVerses}
                    textStyle={styles.buttonTextStyle}
                    buttonStyle={styles.buttonStyle}
                  />
                )}
              </View>
            )}
          </View>
          <View style={styles.buttonContainer}>
            <BHButton
              title={t('Cancel')}
              onPress={props.dismissModal}
              textStyle={styles.buttonTextStyle}
              buttonStyle={styles.buttonStyle}
            />
            {!isIOS && phase == Phases.codeEntry && code.length > 0 && (
              <BHButton
                title={t('GetVerses')}
                onPress={getVerses}
                textStyle={styles.buttonTextStyle}
                buttonStyle={styles.buttonStyle}
              />
            )}
            {!isIOS && phase == Phases.versesDisplay && (
              <BHButton
                title={t('AddVerses')}
                onPress={addVerses}
                textStyle={styles.buttonTextStyle}
                buttonStyle={styles.buttonStyle}
              />
            )}
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  mainContainer:
    Platform.select({
      ios: {
        backgroundColor: 'white',
        borderRadius: 16,
        paddingHorizontal: 16,
        marginBottom: 8,
        flexShrink: 1,
      },
      android: {
        backgroundColor: 'white',
        flexShrink: 1,
      },
    }) || {},
  buttonContainer:
    Platform.select({
      ios: {
        backgroundColor: 'white',
        borderRadius: 16,
        paddingVertical: 10,
      },
      android: {
        backgroundColor: 'white',
        justifyContent: 'flex-end',
        paddingRight: 16,
        paddingBottom: 8,
        flexDirection: 'row',
      },
    }) || {},
  buttonTextStyle:
    Platform.select({
      // ios: {
      //   // fontWeight: "600",
      //   // fontSize: 20
      // },
      android: CommonStyles.androidDialogButtonText,
    }) || {},
  buttonStyle:
    Platform.select({
      android: CommonStyles.androidDialogButton,
    }) || {},
  codeText: {
    fontSize: 24,
    marginVertical: 12,
    textAlign: 'center',
  },
  list: {
    marginTop: 16,
    marginHorizontal: 16,
  },
  verseRef: {
    fontSize: 16,
  },
  errorText: {
    color: ThemeColors.red,
    fontSize: 16,
    padding: 8,
  },
  spinner: {
    paddingVertical: 16,
  },
});
