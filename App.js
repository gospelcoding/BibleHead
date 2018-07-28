import React, { Component } from "react";
import NewVerseForm from "./components/NewVerseForm/NewVerseForm";
import VerseList from "./components/VerseList/VerseList";
import { createStackNavigator } from "react-navigation";

const RootStack = createStackNavigator(
  {
    VerseList: VerseList,
    NewVerseForm: NewVerseForm
  },
  { initialRouteName: "VerseList" }
);

export default class App extends React.PureComponent {
  render() {
    return <RootStack />;
  }
}
