import axios from "axios";
import * as React from "react";
import { useEffect } from "react";
import { Appbar, Avatar } from "react-native-paper";
import {
  Text,
  FlatList,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";

const data = [
  { id: 1, title: "Presence" },
  { id: 2, title: "Abscence" },
];

const Dashboard = () => {
  const API_STATIQUE = "https://collimation.onrender.com/api/";
  const [pointageData, setPointageData] = React.useState([]);
  const [pointage, setPointage] = React.useState({});
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_STATIQUE}joursFerie/glitch`);
    } catch (error) {}
  };

  useEffect(() => {
    const interval = setInterval(fetchData, 40000); // 40 secondes
    return () => clearInterval(interval);
  }, []);

  const handleLogout = async () => {
    Alert.alert(
      "Déconnexion",
      "Voulez-vous vraiment vous déconnecter ?",
      [
        { text: "Non", style: "cancel" },
        {
          text: "Oui",
          onPress: async () => {
            navigation.replace("Login");
          },
        },
      ],
      { cancelable: true }
    );
  };

  useEffect(() => {
    FetchData();
  }, [isFocused]);

  const FetchData = async () => {
    try {
      const pointage = await axios.get(`${API_STATIQUE}employee/pointage/`);
      const pointageNombre = await axios.get(
        `${API_STATIQUE}employee/pointage/nombre/`
      );
      // console.log(pointage.data.data.find(i=>i.nom =='andrana andrana'));
      setPointageData(pointage.data.data);
      setPointage(pointageNombre.data.data[0]);
    } catch (error) {
      console.error("Erreur lors de la récupération des données:", error);
    }
  };

  return (
    <FlatList
      data={[{ key: "header" }, { key: "content" }]} // Données factices pour séparer les sections
      keyExtractor={(item) => item.key}
      renderItem={({ item }) => {
        if (item.key === "header") {
          return (
            <>
              <Appbar.Header>
                <Text style={{ fontSize: 30, color: "#fcba03" }}>  BO</Text>
                <Text style={{ fontSize: 30, color: "#1d8758" }}>A</Text>
                <Appbar.Content title="" />
                <TouchableOpacity
                  style={{
                    paddingHorizontal: 0,
                    backgroundColor: "white",
                    paddingVertical: 0,
                    marginRight: 0,
                    elevation: 0,
                    flexDirection: "row",
                    borderRadius: 5,
                  }}
                  onPress={handleLogout}
                >
                  <Avatar.Image
                    size={50}
                    source={require("../assets/avatar.jpg")}
                    style={{ marginLeft: 5 }}
                  />
                </TouchableOpacity>
              </Appbar.Header>
              <FlatList
                horizontal
                data={data}
                keyExtractor={(item) => item.id.toString()}
                showsHorizontalScrollIndicator={false}
                style={{ paddingHorizontal: 15, paddingVertical: 15 }}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={{
                      paddingHorizontal: 15,
                      backgroundColor: "white",
                      paddingVertical: 15,
                      marginRight: 30,
                      elevation: 5,
                      flexDirection: "row",
                      borderRadius: 10,
                    }}
                  >
                    <View style={{ justifyContent: "center" }}>
                      <Text
                        style={{
                          fontSize: 15,
                          marginBottom: 10,
                          fontWeight: "bold",
                          width: 150,
                        }}
                      >
                        {item?.title}
                      </Text>
                      <Avatar.Text
                        size={28}
                        label={
                          item?.title === "Presence"
                            ? pointage.isaPresent
                            : pointage.isaAbsent
                        }
                        style={{
                          backgroundColor: "#18a037",
                          borderRadius: 10,
                          width: "100%",
                        }}
                      />
                    </View>
                  </TouchableOpacity>
                )}
              />
            </>
          );
        } else if (item.key === "content") {
          return (
            <View style={{ paddingHorizontal: 15, paddingVertical: 15 }}>
              <Text
                style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}
              >
                FICHE DE PRESENCE
              </Text>
              {/* En-tête du tableau */}
              <View
                style={{
                  flexDirection: "row",
                  paddingVertical: 5,
                  backgroundColor: "#f0f0f0",
                }}
              >
                <Text
                  style={{ flex: 1, fontWeight: "bold", fontSize: 16 }}
                ></Text>
                <Text style={{ flex: 2, fontWeight: "bold", fontSize: 16 }}>
                  IM
                </Text>
                <Text style={{ flex: 3, fontWeight: "bold", fontSize: 16 }}>
                  Nom
                </Text>
                <Text style={{ flex: 2, fontWeight: "bold", fontSize: 16 }}>
                  Arrivée
                </Text>
                <Text style={{ flex: 2, fontWeight: "bold", fontSize: 16 }}>
                  Sortie
                </Text>
              </View>
              {/* Corps du tableau */}
              <FlatList
                data={pointageData}
                keyExtractor={(item) => item.im.toString()}
                renderItem={({ item }) => (
                  <View
                    style={{
                      flexDirection: "row",
                      paddingVertical: 10,
                      alignItems: "center",
                    }}
                  >
                    <View style={{ flex: 1 }}>
                      {item.pic ? (
                        <Image
                          source={{
                            uri: `${API_STATIQUE}${item.pic}`,
                          }}
                          style={{
                            width: 35,
                            height: 35,
                            borderRadius: 25,
                            borderWidth: 2,
                            borderColor: "#000",
                          }}
                        />
                      ) : (
                        <Avatar.Text size={50} label="?" />
                      )}
                    </View>
                    <Text style={{ flex: 2, fontSize: 16 }}>{item.im}</Text>
                    <Text style={{ flex: 3, fontSize: 16 }}>{item.nom}</Text>
                    <Text style={{ flex: 2, fontSize: 16 }}>
                      {item.heureEntree}
                    </Text>
                    <Text style={{ flex: 2, fontSize: 16 }}>
                      {item.heureSortie ? item.heureSortie : "-"}
                    </Text>
                  </View>
                )}
              />
            </View>
          );
        }
      }}
    />
  );
};

export default Dashboard;
