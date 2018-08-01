import React from "react";
import NewVerseForm from "./components/NewVerseForm/NewVerseForm";
import VerseList from "./components/VerseList/VerseList";
import { createStackNavigator } from "react-navigation";
import VersePractice from "./components/VersePractice/VersePractice";
import Experiment from "./components/experiment/Experiment";

const RootStack = createStackNavigator(
  {
    Experiment: Experiment,
    VerseList: VerseList,
    NewVerseForm: NewVerseForm,
    VersePractice: VersePractice
  },
  { initialRouteName: "VerseList" }
);

export default class App extends React.PureComponent {
  render() {
    return <RootStack />;
  }
}
