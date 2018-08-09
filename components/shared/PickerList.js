import React from "react";
import { FlatList, Text } from "react-native";
import PropTypes from "prop-types";
import XPlatformTouchable from "./XPlatformTouchable";
import CommonStyles from "../../util/CommonStyles";

export default function PickerList(props) {
  return (
    <FlatList
      data={props.data}
      keyExtractor={props.keyExtractor}
      renderItem={({ item }) => {
        return (
          <XPlatformTouchable
            onPress={() => {
              props.itemPress(item);
            }}
          >
            <Text style={CommonStyles.listItem}>{props.itemText(item)}</Text>
          </XPlatformTouchable>
        );
      }}
    />
  );
}

PickerList.propTypes = {
  data: PropTypes.array.isRequired,
  keyExtractor: PropTypes.func.isRequired,
  itemPress: PropTypes.func.isRequired,
  itemText: PropTypes.func.isRequired
};
