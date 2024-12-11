import axios from "axios";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";

export default function Conex({ navigation }) {
  const API_STATIQUE = "https://collimation.onrender.com/api/";
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const { height } = Dimensions.get("window");

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_STATIQUE}joursFerie/glitch`);
    } catch (error) {}
  };

  useEffect(() => {
    const interval = setInterval(fetchData, 40000); // 40 secondes
    return () => clearInterval(interval);
  }, []);

  const connexion = async () => {
    try {
      const response = await fetch(`${API_STATIQUE}utilisateur/seConnecter`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ im: userName, pwd: userPassword }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setUserName("");
        setUserPassword("");
        navigation.navigate("BottomTabs");
        fetchData();
      } else {
        Alert.alert(
          "Erreur de connexion",
          result.message || "Identifiant ou Mot de passe incorrect"
        );
      }
    } catch (error) {
      Alert.alert(
        "Erreur",
        "Impossible de se connecter. Vérifiez votre connexion!" || error.message
      );
      console.error(error);
    }
  };

  return (
    <SafeAreaView>
      <View
        style={{
          backgroundColor: "#fff",
          height: height * 2,
          padding: height / 10,
          alignItems: "center",
        }}
      >
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
        <View style={{ marginVertical: 50 }}>
          <TextInput
            placeholder="Saisissez votre Identifiant"
            style={{
              fontSize: 20,
              padding: 15,
              backgroundColor: "#d1edd9",
              width: height / 2.5,
              marginHorizontal: "auto",
              borderRadius: 10,
            }}
            value={userName}
            onChangeText={(text) => setUserName(text)}
          />
          <TextInput
            placeholder="Mot de passe ****"
            secureTextEntry
            style={{
              marginTop: height / 20,
              fontSize: 20,
              padding: 15,
              backgroundColor: "#d1edd9",
              width: height / 2.5,
              marginHorizontal: "auto",
              borderRadius: 10,
            }}
            value={userPassword}
            onChangeText={(text) => setUserPassword(text)}
          />
          <View>
            <Text
              style={{
                alignSelf: "flex-end",
                marginTop: 30,
                color: "gray",
              }}
            >
              Mots de passe oublier ?
            </Text>
          </View>
          <TouchableOpacity
            onPress={connexion}
            style={{
              backgroundColor: "#1d8758",
              paddingVertical: 20,
              borderRadius: 20,
              alignItems: "center",
              marginTop: 30,
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 23,
              }}
            >
              S'authentifier
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
