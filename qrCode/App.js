import StackNavigator from "./navigation/StackNavigator";
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
} from "react-native-paper";
import { LogBox } from "react-native";
import { DCVBarcodeReader } from "dynamsoft-capture-vision-react-native";

(async () => {
  await DCVBarcodeReader.initLicense(
    "t0088pwAAAJZouqPom+mD2ce913boT0RYYY3mHxqa1WVCnF6HzUHdsfKtiCTVzPmBU3+wWnySPoJWBNEYZkCPKgXrMNBUgE++6iI/QTxbx1fHH1XXGr0XUM8iRw==;t0088pwAAAGZky2/kz798jpjeG/KsdHatW0o4DwZ8O3GyWYMOGgfmtTaVLMwRAnELqJXjlMQvTxFISnyzM18ebwzF6rHPuupV3VitOfZO7I8/VEOP/L0BWH8iTA=="
  ).catch((e) => {
    console.log(e);
  });
})();

LogBox.ignoreAllLogs(true);

const getFont = () =>
  FontFace.loadAsync({
    yes: require("./assets/font/inter_thin.ttf"),
  });
export default function App() {
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: "gray",
      secondary: "yellow",
    },
  };
  return (
    <>
      <PaperProvider theme={theme} style={{ fontFamily: "inte_thin" }}>
        <StackNavigator />
      </PaperProvider>
    </>
  );
}
// adb reverse tcp:3002 tcp:3002
