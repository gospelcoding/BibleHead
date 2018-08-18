// Source: https://coolors.co/375e97-567e42-ffffff-d3d4d9-bb0a21

import { Platform } from "react-native";

const isIOS = Platform.OS == "ios";

export default {
  blue: "#375e97",
  darkBlue: "#233c61",
  green: "#567e42",
  white: "#ffffff",
  grey: "#d3d4d9",
  red: "#bb0a21",
  yellow: "#E6AF2E",
  buttonBlue: isIOS ? "#5b9dff" : "#375e97",
  buttonGreen: isIOS ? "#8fd36e" /*"#95DB72"*/ : "#567e42"
};
