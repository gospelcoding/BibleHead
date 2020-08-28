import React from 'react';
import Modal from 'react-native-modal';
import {View, Text, SafeAreaView, Platform, StyleSheet} from 'react-native';
import {useT} from '../i18n/i18nReact';
import BHButton from '../components/BHButton';
import CommonStyles from '../util/CommonStyles';

interface IProps {
  code: string;
  isVisible: boolean;
  dismissModal: () => void;
}

export default function CodeExplanationModal(props: IProps) {
  const t = useT();
  return (
    <Modal
      isVisible={props.isVisible}
      onBackButtonPress={props.dismissModal}
      onBackdropPress={props.dismissModal}>
      <SafeAreaView>
        <View style={styles.container}>
          <Text style={styles.message}>
            {t('CodeExplanation', {code: props.code})}
          </Text>
          <View style={styles.buttonContainer}>
            <BHButton title={t('GotIt')} onPress={props.dismissModal} />
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 16,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  buttonContainer: {
    backgroundColor: 'white',
    paddingVertical: 10,
  },
  // buttonTextStyle: Platform.select({
  //   ios: {
  //     fontWeight: "600",
  //     fontSize: 20
  //   },
  //   android: CommonStyles.androidDialogButtonText
  // }),
  // buttonStyle: Platform.select({
  //   android: CommonStyles.androidDialogButton
  // }),
  message: {
    fontSize: 18,
    marginVertical: 12,
    textAlign: 'center',
  },
});
