import React from "react";
import { FlatList, Text, View, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import XPlatformTouchable from "./XPlatformTouchable";
import CommonStyles from "../../util/CommonStyles";
import DividingLine from "./DividingLine";

export default function PickerList(props) {
  return (
    <FlatList
      data={props.data}
      keyExtractor={props.keyExtractor}
      style={props.style}
      renderItem={({ item, index }) => {
        return (
          <View style={styles.item}>
            <XPlatformTouchable
              onPress={() => {
                props.itemPress(item, index);
              }}
            >
              <Text style={styles.listItem}>{props.itemText(item)}</Text>
            </XPlatformTouchable>
            {index < props.data.length - 1 && <DividingLine />}
          </View>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "white"
  },
  listItem: {
    backgroundColor: "white",
    fontSize: 24,
    padding: 8
  }
});

PickerList.propTypes = {
  data: PropTypes.array,
  keyExtractor: PropTypes.func.isRequired,
  itemPress: PropTypes.func.isRequired,
  itemText: PropTypes.func.isRequired,
  style: PropTypes.oneOf([PropTypes.object, PropTypes.array])
};
