import React from "react";
import { StyleSheet, View, Platform } from "react-native";
import Modal from "react-native-modal";
import PickerList from "../shared/PickerList";
import PropTypes from "prop-types";
import BHButton from "./BHButton";
import I18n from "../../i18n/i18n";
import CommonStyles from "../../util/CommonStyles";

export default function PickerModal(props) {
  return (
    <Modal
      isVisible={props.isVisible}
      onRequestClose={props.dismissModal}
      onBackdropPress={props.dismissModal}
    >
      <View style={{ flexShrink: 1 }}>
        <View style={styles.listContainer}>
          <PickerList
            data={props.data}
            keyExtractor={props.keyExtractor || (item => item.toString())}
            itemPress={item => {
              props.itemSelected(item);
              props.dismissModal();
            }}
            itemText={props.itemText || (item => item.toString())}
          />
        </View>
        <View style={styles.buttonContainer}>
          <BHButton
            title={I18n.t("Cancel")}
            textStyle={styles.buttonTextStyle}
            buttonStyle={styles.buttonStyle}
            onPress={props.dismissModal}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  listContainer: Platform.select({
    ios: {
      backgroundColor: "white",
      borderRadius: 16,
      paddingHorizontal: 16,
      marginBottom: 8,
      flexShrink: 1
    }
  }),
  buttonContainer: Platform.select({
    ios: {
      backgroundColor: "white",
      borderRadius: 16,
      paddingVertical: 10
    },
    android: {
      backgroundColor: "white",
      alignItems: "flex-end",
      paddingRight: 16,
      paddingBottom: 8
    }
  }),
  buttonTextStyle: Platform.select({
    ios: {
      fontWeight: "600",
      fontSize: 20
    },
    android: CommonStyles.androidDialogButton.text
  }),
  buttonStyle: Platform.select({
    android: CommonStyles.androidDialogButton.button
  })
});

PickerModal.propTypes = {
  isVisible: PropTypes.bool,
  data: PropTypes.array,
  itemSelected: PropTypes.func,
  dismissModal: PropTypes.func,
  keyExtractor: PropTypes.func,
  itemText: PropTypes.func
};
