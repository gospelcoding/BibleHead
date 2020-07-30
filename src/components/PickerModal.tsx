import React from 'react';
import {StyleSheet, View, Platform, Button} from 'react-native';
import Modal from 'react-native-modal';
import PickerList from './PickerList';
import {useT} from '../i18n/i18nReact';
import CommonStyles from '../util/CommonStyles';
import {SafeAreaView} from 'react-native-safe-area-context';

interface IProps<T> {
  data: T[];
  isVisible: boolean;
  dismissModal: () => void;
  itemSelected: (item: T) => void;
  keyExtractor?: (item: T) => string;
  itemText?: (item: T) => string;
  cancelButton?: boolean;
}

export default function PickerModal<T>(props: IProps<T>) {
  const t = useT();
  return (
    <Modal
      isVisible={props.isVisible}
      onBackdropPress={props.dismissModal}
      onBackButtonPress={props.dismissModal}>
      <SafeAreaView style={{flexShrink: 1}}>
        <View style={{flexShrink: 1}}>
          <View style={styles.listContainer}>
            <PickerList
              data={props.data}
              keyExtractor={props.keyExtractor || ((item) => `${item}`)}
              itemPress={(item) => {
                props.itemSelected(item);
                props.dismissModal();
              }}
              itemText={props.itemText || ((item) => `${item}`)}
            />
          </View>
          {props.cancelButton && (
            <View style={styles.buttonContainer}>
              <Button
                title={t('Cancel')}
                // textStyle={styles.buttonTextStyle}
                // buttonStyle={styles.buttonStyle}
                onPress={props.dismissModal}
              />
            </View>
          )}
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  listContainer:
    Platform.select({
      ios: {
        backgroundColor: 'white',
        borderRadius: 16,
        paddingHorizontal: 16,
        marginBottom: 8,
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
        alignItems: 'flex-end',
        paddingRight: 16,
        paddingBottom: 8,
      },
    }) || {},
  buttonTextStyle:
    Platform.select({
      // ios: {
      //   fontWeight: "600",
      //   fontSize: 20
      // },
      android: CommonStyles.androidDialogButtonText,
    }) || {},
  buttonStyle:
    Platform.select({
      android: CommonStyles.androidDialogButton,
    }) || {},
});
