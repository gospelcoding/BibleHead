import React from "react";
import { Modal, SafeAreaView } from "react-native";
import PickerList from "../shared/PickerList";
import PropTypes from "prop-types";

export default function PickerModal(props) {
  return (
    <Modal
      animationType="slide"
      visible={props.visible}
      onRequestClose={props.dismissModal}
    >
      <SafeAreaView>
        <PickerList
          data={props.data}
          keyExtractor={props.keyExtractor || (item => item.toString())}
          itemPress={item => {
            props.itemSelected(item);
            props.dismissModal();
          }}
          itemText={props.itemText || (item => item.toString())}
        />
      </SafeAreaView>
    </Modal>
  );
}

PickerModal.propTypes = {
  visible: PropTypes.bool,
  data: PropTypes.array,
  itemSelected: PropTypes.func,
  dismissModal: PropTypes.func,
  keyExtractor: PropTypes.func,
  itemText: PropTypes.func
};
