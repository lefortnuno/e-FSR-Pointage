import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useIsFocused } from "@react-navigation/native";
import axios from "axios";
import io from "socket.io-client";
import ScannedAfterModal from "./ScannedAfterModal";
// import { SUN_API_URL } from "@env";

const QrcodeScane = () => {
  const API_STATIQUE = "https://collimation.onrender.com/api/";
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [employeeInfo, setEmployeeInfo] = useState(null);
  const [employeeIm, setEmployeeIm] = useState("");
  const isFocused = useIsFocused();

  const toggleModal = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
      setScanned(false);
    })();
  }, []);

  const handleBarCodeScanned = async ({ data }) => {
    setScanned(true);
    try {
      // 1. Récupérer les informations de l'employé via l'ID scanné
      const employeeResponse = await axios.get(
        `${API_STATIQUE}utilisateur/${data}`
      );
      const employeeData = employeeResponse.data.data;

      if (!employeeData) {
        alert(
          `Ce QR code ne correspond à aucun employé dans la base de données : ${data}`
        );
        setScanned(false);
        return;
      }

      setEmployeeInfo(employeeData);
      setEmployeeIm(data);

      // Enregistrer la sortie de l'employé
      await axios.put(`${API_STATIQUE}pointage/cloture/`, {
        employeIm: data,
      });
      notifyServer();
      setOpenModal(true);
      setIsExiting(false);
    } catch (error) {
      console.error("Erreur lors du scan du QR code:", error);
    }
  };

  // Fonction pour notifier le serveur
  const notifyServer = () => {
    const socket = io(`${API_STATIQUE}`);
    socket.emit("actu", { qrData: "donneeSannee" });
  };

  // Enregistrer une sortie
  const handleExit = async () => {
    try {
      await axios.put(`${API_STATIQUE}pointage/cloture`, {
        employeIm: employeeIm,
      });
      notifyServer();
      toggleModal();
      setScanned(false);
    } catch (error) {
      console.error("Erreur lors de l'enregistrement de la sortie:", error);
    }
  };

  if (hasPermission === null) {
    return <Text>Demande de permission pour la caméra...</Text>;
  }
  if (hasPermission === false) {
    return <Text>Pas d'accès à la caméra</Text>;
  }

  return (
    <View style={styles.container}>
      {isFocused && (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{ height: 500, width: 400 }}
        />
      )}
      {scanned && (
        <TouchableOpacity
          onPress={() => setScanned(false)}
          style={styles.scanButton}
        >
          <Text style={styles.scanButtonText}>Scan QR Code</Text>
        </TouchableOpacity>
      )}
      <ScannedAfterModal
        ouverture={openModal}
        isExiting={isExiting}
        onClose={toggleModal}
        employeeInfo={employeeInfo}
        onExit={handleExit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  scanButton: {
    paddingRight: 15,
    backgroundColor: "#1d8758",
    paddingVertical: 20,
    borderRadius: 20,
    paddingHorizontal: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  scanButtonText: {
    color: "white",
    fontSize: 20,
  },
});

export default QrcodeScane;
