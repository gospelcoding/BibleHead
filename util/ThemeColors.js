// Source: https://coolors.co/375e97-567e42-ffffff-d3d4d9-bb0a21

import { Platform } from "react-native";

const isIOS = Platform.OS == "ios";

const iosBlue = "#5b9dff";
const blue = "#375e97";
const green = "#567e42";

export default {
  blue: blue,
  darkBlue: "#233c61",
  iosBlue: iosBlue,
  green: green,
  white: "#ffffff",
  grey: "#d3d4d9",
  red: "#bb0a21",
  yellow: "#E6AF2E",
  buttonBlue: isIOS ? iosBlue : blue,
  buttonGreen: isIOS ? "#8fd36e" /*"#95DB72"*/ : green
};
