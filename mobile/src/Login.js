import axios from "axios";
import React, { useEffect } from "react";
import {
  View,
  SafeAreaView,
  ImageBackground,
  Dimensions,
  Text,
  TouchableOpacity,
} from "react-native";

const API_STATIQUE = "https://collimation.onrender.com/api/";

const Login = ({ navigation }) => {
  const { height } = Dimensions.get("window");

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_STATIQUE}joursFerie/glitch`);
    } catch (error) {}
  };

  const change = async () => {
    try {
      const response = await fetch(`${API_STATIQUE}joursFerie/glitch`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
    } catch (error) {}

    navigation.navigate("Conexion");
    fetchData();
  };

  useEffect(() => {
    const interval = setInterval(fetchData, 30000); // 30 secondes
    return () => clearInterval(interval);
  }, []);

  return (
    <SafeAreaView style={{ backgroundColor: "#fff", height: height * 2 }}>
      <View>
        <ImageBackground
          style={{
            height: height / 2.5,
            marginBottom: 0,
          }}
          resizeMode="contain"
          source={require("./img/undraw_season_change_f99v.png")}
        />
      </View>
      <View
        style={{
          width: "80%",
          marginTop: 0,
          marginBottom: 22,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginHorizontal: "auto",
        }}
      >
        <ImageBackground
          style={{
            height: height / 10.5,
            width: 250,
          }}
          resizeMode="contain"
          source={require("./img/logo_BOA.png")}
        />
      </View>
      <View
        style={{
          paddingHorizontal: 60,
          paddingTop: 10,
          textAlign: "center",
          alignItems: "center",
        }}
      >
        <Text>
          <Text
            style={{
              fontSize: 30,
              color: "#1d8758",
            }}
          >
            Pointage biometrique pour
          </Text>
          <Text
            style={{
              fontSize: 30,
              color: "#fcba03",
            }}
          >
            {" "}
            BO
          </Text>
          <Text
            style={{
              fontSize: 30,
              color: "#1d8758",
            }}
          >
            A
          </Text>
        </Text>
      </View>
      <View
        style={{
          paddingHorizontal: 50,
          paddingTop: 10,
          textAlign: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 15,
            color: "gray",
          }}
        >
          La banque toujours à vos côtés !
        </Text>
      </View>
      <View
        style={{
          paddingHorizontal: 50,
          marginTop: 100,
          paddingTop: 10,
          textAlign: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={change}
          style={{
            backgroundColor: "#1d8758",
            paddingVertical: 20,
            borderRadius: 20,
            paddingHorizontal: 60,
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 20,
            }}
          >
            Commencer
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Login;
