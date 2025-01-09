import React from "react";
import { Avatar, Button } from "react-native-paper";
import { Text, View, TouchableOpacity, Dimensions } from "react-native";
import moment from "moment";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";

const Affichage = ({ dataInfo }) => {
  const [infoMotif, setInfoMotif] = React.useState([]);
  const isFocused = useIsFocused();
  const dateValue = moment().format("DD-MM-YYYY");
  function formatTime(timeValue) {
    const heureFormater = moment(timeValue, "HH:mm:ss").format(
      "H[h] m[m] s[s]"
    );
    return heureFormater;
  }
  const Fetcdata = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3002/api/getmotifPresences/${dataInfo.im}`,
        { params: { date: dateValue } }
      );
      setInfoMotif(response.data.data);
    } catch (error) {
      //console.log(error);
    }
  };
  React.useEffect(() => {
    Fetcdata();
    console.log(infoMotif);
  }, [isFocused]);
  return (
    <TouchableOpacity
      style={{
        flex: 1,
        flexDirection: "row",
        backgroundColor: "white",
        elevation: 5,
        padding: 10,
        paddingHorizontal: 15,
        marginBottom: 20,
        borderRadius: 5,
      }}
    >
      <Avatar.Image
        size={50}
        // source={require("../assets/avatar.jpg")}
        source={{
          uri: `http://localhost:3002/api/images/${dataInfo.image}`,
        }}
        style={{ marginLeft: 5, marginRight: 15 }}
      />
      <View style={{ flexDirection: "column" }}>
        <Text>
          <Text style={{ marginTop: 3, fontSize: 15, fontWeight: "bold" }}>
            {" "}
            {dataInfo.nom}
          </Text>
        </Text>
        <View style={{ flexDirection: "column" }}>
          {infoMotif.map((itemInfo, index) => {
            return (
              <View
                style={{ display: "flex", flexDirection: "column" }}
                key={index}
              >
                <Text>
                  <Text> Entrée :</Text>
                  <Text style={{ color: "green" }}>
                    {" "}
                    {formatTime(itemInfo.heureentree)}
                  </Text>
                </Text>
                {itemInfo.heuresortie != undefined ? (
                  <Text>
                    {" "}
                    <Text>Sortie {itemInfo.motif} à </Text>
                    <Text style={{ color: "#e91e63" }}>
                      {formatTime(itemInfo.heuresortie)}
                    </Text>
                  </Text>
                ) : (
                  <Button icon={require("./img/clock2.gif")}>
                    {/* Press me */}
                  </Button>
                )}
              </View>
            );
          })}
        </View>
        <Text> Departement : {dataInfo.departement}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Affichage;
