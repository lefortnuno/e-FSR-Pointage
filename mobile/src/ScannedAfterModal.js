import { View, Text, TextInput, Dimensions, Image } from "react-native";
import React, { useState } from "react";
import { Modal, Pressable, TouchableOpacity, StyleSheet } from "react-native";
import { Avatar } from "react-native-paper";
// import DropdownComponent from "./dropinput";
// import DropdownComponent from './Dropinput'
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import axios from "axios";
import io from "socket.io-client";
import moment from "moment/moment";
// import { SUN_API_URL } from "@env";

const data = [
  { label: "Sortie", value: "Sortie" },
  { label: "Affaire Personnel", value: "Affaire Personnel" },
  { label: "Service Patron", value: "Service Patron" },
  { label: "Gouter", value: "Gouter" },
  { label: "Formation", value: "Formation" },
  { label: "Abvscence sans motif", value: "Abvscence sans motif" },
];
const ScannedAfterModal = ({
  ouverture,
  onClose,
  information,
  employeeInfo,
  inputnlery,
  im,
}) => {
  const API_STATIQUE = "https://eboas.onrender.com/api/";
  const { height } = Dimensions.get("window");
  const [motif, setmotif] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const renderLabel = () => {
    if (motif || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: "#1d8758" }]}>
          Motif de sortie
        </Text>
      );
    }
    return null;
  };
  // //console.log(motif);

  const saveMotif = async () => {
    try {
      await axios.post(`${API_STATIQUE}pointage/cloture`, {
        employeIm: im,
      });
      const socket = io(`${API_STATIQUE}`);
      socket.emit("actu", { qrData: "donneSannee" });
    } catch (error) {
      //console.log(error);
    }
  };
  return (
    <Modal animationType="slide" visible={ouverture} transparent={true}>
      <Pressable
        style={{
          flex: 1,
          padding: 25,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0,0,0,0.7)",
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            width: "100%",
            alignItems: "center",
            paddingTop: 45,
            borderRadius: 15,
            elevation: 5,
            shadowColor: "#000",
          }}
        >
          <View
            style={{
              position: "absolute",
              top: -45,
              elevation: 5,
              shadowColor: "#000",
              shadowOpacity: 0.25,
              shadowRadius: 5,
              shadowOffset: { width: 0, height: 2 },
            }}
          >
            <Avatar.Image
              size={75}
              source={{
                uri: `${API_STATIQUE}${employeeInfo?.pic}`,
              }}
              style={{ marginLeft: 5, elevation: 5 }}
            />
          </View>
          <View style={{ paddingVertical: 15 }}>
            <Text>
              <Text style={{ fontSize: 15 }}>
                {inputnlery ? (
                  <Text>Heure de sortie</Text>
                ) : (
                  <Text>Heure d'arrivée :</Text>
                )}
              </Text>
              <Text style={{ fontSize: 19, color: "#e91e63" }}>
                {moment().format("HH:mm:ss")}
              </Text>
            </Text>
            <Text>
              <Text style={{ fontSize: 15 }}>Nom : </Text>
              <Text style={{ fontSize: 19, color: "#e91e63" }}>
                {employeeInfo?.nom}
              </Text>
            </Text>
            <Text>
              <Text style={{ fontSize: 15 }}>Numero : </Text>
              <Text style={{ fontSize: 19, color: "#e91e63" }}>
                {employeeInfo?.num}
              </Text>
            </Text>
            <Text>
              <Text style={{ fontSize: 15 }}>Departement : </Text>
              <Text style={{ fontSize: 19, color: "#e91e63" }}>
                {employeeInfo?.departement}
              </Text>
            </Text>
          </View>
          {inputnlery && (
            <>
              <View style={styles.container}>
                {renderLabel()}
                <Dropdown
                  style={[
                    styles.dropdown,
                    isFocus && { borderColor: "#d1edd9" },
                  ]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={data}
                  search
                  maxHeight={300}
                  labelField="label"
                  valueField="motif"
                  placeholder={!isFocus ? "Motif de Sortie" : "..."}
                  searchPlaceholder="Search..."
                  value={motif}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={(item) => {
                    setmotif(item.value);
                    setIsFocus(false);
                  }}
                  renderLeftIcon={() => (
                    <AntDesign
                      style={styles.icon}
                      color={isFocus ? "#d1edd9" : "black"}
                      name="Safety"
                      size={20}
                    />
                  )}
                />
              </View>
            </>
          )}
          <View></View>
          <View style={{ width: "100%", alignItems: "center", padding: 20 }}>
            <TouchableOpacity
              onPress={() => {
                if (inputnlery) {
                  saveMotif();
                }

                onClose();
              }}
              style={{
                backgroundColor: "#1d8758",
                paddingVertical: 15,
                borderRadius: 15,
                paddingHorizontal: 40,
                width: "100%",
                alignContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 15,
                }}
              >
                OK
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'white',
    padding: 16,
    width: "90%",
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: "#d1edd9",
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
export default ScannedAfterModal;
