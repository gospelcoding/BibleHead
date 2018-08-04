import React from "react";
import { Text, FlatList, Button, StyleSheet, Modal, View } from "react-native";
import PropTypes from "prop-types";
import XPlatformTouchable from "../shared/XPlatformTouchable";
import I18n from "../../i18n/i18n";

export default function LanguageModal(props) {
  return (
    <Modal
      animationType="slide"
      visible={props.langModalDisplayed}
      onRequestClose={() => {}}
    >
      <View style={{ marginTop: 22, flex: 1 }}>
        <View style={{ flex: 1 }}>
          <FlatList
            data={I18n.getLocales()}
            keyExtractor={lang => lang.code}
            renderItem={({ item: lang }) => {
              return (
                <LangItem
                  langName={lang.name}
                  selectMe={() => {
                    props.setVerseLang(lang.code);
                  }}
                  selected={props.verseLang == lang.code}
                />
              );
            }}
          />
        </View>
        <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
          {/* <Button title={I18n.t('Cancel')} onPress={props.hideLangModal} /> */}
          <Button title={I18n.t("Done")} onPress={props.hideLangModal} />
        </View>
      </View>
    </Modal>
  );
}

function LangItem(props) {
  return (
    <XPlatformTouchable onPress={props.selectMe}>
      <View>
        <Text style={{ fontWeight: props.selected ? "bold" : "normal" }}>
          {props.langName}
        </Text>
      </View>
    </XPlatformTouchable>
  );
}
