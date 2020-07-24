import React from 'react';
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  Pressable,
  StyleProp,
  ViewStyle,
} from 'react-native';
import DividingLine from './DividingLine';

interface IProps<T> {
  data: T[];
  keyExtractor: (t: T) => string;
  itemPress: (item: T, index: number) => void;
  itemText: (item: T) => string;
  style?: StyleProp<ViewStyle>;
}

export default function PickerList<T>(props: IProps<T>) {
  return (
    <FlatList
      data={props.data}
      keyExtractor={props.keyExtractor}
      style={props.style}
      renderItem={({item, index}) => {
        return (
          <View style={styles.item}>
            <Pressable
              onPress={() => {
                props.itemPress(item, index);
              }}>
              <Text style={styles.listItem}>{props.itemText(item)}</Text>
            </Pressable>
            {index < props.data.length - 1 && <DividingLine />}
          </View>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
  },
  listItem: {
    backgroundColor: 'white',
    fontSize: 24,
    padding: 8,
  },
});
