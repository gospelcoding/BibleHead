import React, {PropsWithChildren} from 'react';
import Modal from 'react-native-modal';
import {StyleSheet, View} from 'react-native';

interface IProps {
  isVisible: boolean;
}

export default function BHModal(props: PropsWithChildren<IProps>) {
  return (
    <Modal isVisible={props.isVisible}>
      <View style={styles.mainContainer}>{props.children}</View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    paddingHorizontal: 16,
    marginBottom: 8,
    flexShrink: 1,
  },
});
