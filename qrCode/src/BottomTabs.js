import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Dashboard from "./Dashboard";
import QrcodeScane from "./QrcodeScane";
import ClotureQrCode from "./ClotureQrCode";
// import BarcodeScannerEntree from "./BarcodeScannerEntree";
// import BarcodeScannerSortie from "./BarcodeScannerSortie";

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="tabs_Dashboard"
      screenOptions={{
        tabBarActiveTintColor: "#e91e63",
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="BarcodeScannerSortie"
        component={ClotureQrCode}
        options={{
          tabBarLabel: "Sortie",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="qrcode" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="tabs_Dashboard"
        component={Dashboard}
        options={{
          tabBarLabel: "Accueil",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
          tabBarBadge: 1,
        }}
      />
      <Tab.Screen
        name="BarcodeScannerEntree"
        component={QrcodeScane}
        options={{
          tabBarLabel: "Entrée",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="camera-party-mode"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;
