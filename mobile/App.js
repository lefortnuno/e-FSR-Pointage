import StackNavigator from "./navigation/StackNavigator";
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
} from "react-native-paper";
import { LogBox } from "react-native"; 

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
