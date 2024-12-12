import React from "react";
import StackNavigator from "./navigation/StackNavigator";
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
} from "react-native-paper";
import { LogBox } from "react-native";
import { DCVBarcodeReader } from "dynamsoft-capture-vision-react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import BarcodeScanner from "./src/BarcodeScanner";

// Initialisation de la licence
(async () => {
  await DCVBarcodeReader.initLicense(
    "t0088pwAAAJZouqPom+mD2ce913boT0RYYY3mHxqa1WVCnF6HzUHdsfKtiCTVzPmBU3+wWnySPoJWBNEYZkCPKgXrMNBUgE++6iI/QTxbx1fHH1XXGr0XUM8iRw==;t0088pwAAAGZky2/kz798jpjeG/KsdHatW0o4DwZ8O3GyWYMOGgfmtTaVLMwRAnELqJXjlMQvTxFISnyzM18ebwzF6rHPuupV3VitOfZO7I8/VEOP/L0BWH8iTA=="
  ).catch((e) => {
    console.log(e);
  });
})();

LogBox.ignoreAllLogs(true);

// Définir les écrans
const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button
        title="Start Scanning"
        onPress={() => navigation.navigate("Barcode")}
      />
    </View>
  );
}

// Thème personnalisé
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "gray",
    secondary: "yellow",
  },
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home"> 
          <Stack.Screen name="Home" component={HomeScreen} />
          {/* <Stack.Screen name="Barcode" component={BarcodeScanner} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
