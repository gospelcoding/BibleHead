import React from 'react';
import {View, StyleSheet} from 'react-native';

export default function DividingLine() {
  return <View style={styles.dividingLine} />;
}

const styles = StyleSheet.create({
  dividingLine: {
    marginHorizontal: 0,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
});
