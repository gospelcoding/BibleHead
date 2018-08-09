import ThemeColors from "./ThemeColors";
import { Platform } from "react-native";

const isIOS = Platform.OS == "ios";

export default {
  screenRoot: {
    flex: 1,
    backgroundColor: ThemeColors.grey
  },
  headerOptions: {},
  picker: {},
  listHeader: {
    fontWeight: "bold",
    color: "black",
    fontSize: 16,
    padding: 8
  },
  listItem: {
    backgroundColor: "white",
    fontSize: 24,
    marginBottom: 2,
    padding: 8
  },
  textView: {
    backgroundColor: "white",
    fontSize: 18,
    padding: 8,
    margin: isIOS ? 0 : 8,
    elevation: isIOS ? 0 : 4
  }
};