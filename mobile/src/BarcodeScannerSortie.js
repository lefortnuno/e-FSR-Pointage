import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  DCVBarcodeReader,
  DCVCameraView,
  EnumBarcodeFormat,
  EnumDBRPresetTemplate,
  EnumTorchState,
} from "dynamsoft-capture-vision-react-native";
import Entypo from "react-native-vector-icons/Entypo";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import axios from "axios";

const option = {
  mediaType: "photo",
  maxWidth: 2000,
  maxHeight: 2000,
  quality: 0.7,
};

const mergeResultsText = (results) => {
  let str = "";
  if (results && results.length > 0) {
    for (let i = 0; i < results.length; i++) {
      str +=
        results[i].barcodeFormatString + ": " + results[i].barcodeText + " \n";
    }
  } else {
    str = "No barcode detected.";
  }
  return str;
};

const modalInitState = {
  isVisible: false,
  modalText: "",
};

class BarcodeScannerSortie extends React.Component {
  ifDecodingFile = false;
  state = {
    results: null,
    isVisible: false,
    modalText: "",
  };

  decodeFile = async (filePath) => {
    return this.reader.decodeFile(filePath);
  };

  useImagePicker = (imagePickerLauncher) => {
    this.reader
      .updateRuntimeSettings(EnumDBRPresetTemplate.IMAGE_SPEED_FIRST)
      .catch((err) => {
        console.log(err);
      });
    this.ifDecodingFile = true;
    imagePickerLauncher(option, (res) => {
      if (res.didCancel) {
        this.ifDecodingFile = false;
        return false;
      }
      this.decodeFile(res.assets[0].uri.split("file://")[1])
        .then((results) => {
          let str = mergeResultsText(results);
          this.setState({ isVisible: true, modalText: str });
        })
        .catch((err) => {
          console.log(err);
          this.setState({ isVisible: true, modalText: err.toString() });
        })
        .finally(() => {
          this.initSettingForVideo(this.reader);
          this.ifDecodingFile = false;
        });
    });
  };

  initSettingForVideo = async (reader) => {
    await reader.resetRuntimeSettings();
    let settings = await reader.getRuntimeSettings();

    settings.expectedBarcodesCount = 0;
    settings.barcodeFormatIds =
      EnumBarcodeFormat.BF_ONED |
      EnumBarcodeFormat.BF_QR_CODE |
      EnumBarcodeFormat.BF_PDF417 |
      EnumBarcodeFormat.BF_DATAMATRIX;

    await reader.updateRuntimeSettings(settings);
  };

  async componentDidMount() {
    this.reader = await DCVBarcodeReader.createInstance();

    await this.initSettingForVideo(this.reader);

    this.reader.addResultListener(async (results) => {
      if (!this.ifDecodingFile && results.length > 0) {
        const barcodeText = results[0].barcodeText; // Assume the first result is the desired one
        this.setState({ results });

        try {
          await axios.post("https://collimation.onrender.com/api/pointage/", {
            employeIm: barcodeText,
          });
          console.log("POST request successful");
        } catch (error) {
          console.error("Error sending POST request:", error);
        }
      }
    });

    this.reader.startScanning();

    this.props.navigation.setOptions({
      headerRight: () => (
        <View style={styles.headerRight}>
          <Entypo
            style={{ paddingRight: 15 }}
            name={"camera"}
            size={35}
            onPress={() => {
              this.useImagePicker(launchCamera);
            }}
          />
          <Entypo
            style={{ paddingLeft: 15 }}
            name={"folder-images"}
            size={35}
            onPress={() => {
              this.useImagePicker(launchImageLibrary);
            }}
          />
        </View>
      ),
    });
  }

  async componentWillUnmount() {
    await this.reader.stopScanning();
    this.reader.removeAllResultListeners();
  }

  render() {
    let barcode_text = "";
    let results = this.state.results;
    if (results && results.length > 0) {
      for (var i = 0; i < results.length; i++) {
        barcode_text +=
          results[i].barcodeFormatString + ":" + results[i].barcodeText + "\n";
      }
    }

    return (
      <DCVCameraView
        style={{
          flex: 1,
        }}
        ref={(ref) => {
          this.scanner = ref;
        }}
        overlayVisible={true}
        torchButton={{
          visible: true,
        }}
        torchState={EnumTorchState.OFF}
      >
        <Text
          style={{
            flex: 0.9,
            marginTop: 200,
            textAlign: "center",
            color: "white",
            fontSize: 18,
          }}
        >
          {results && results.length > 0 ? barcode_text : ""}
        </Text>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.isVisible}
          onRequestClose={() => {
            this.setState(modalInitState);
          }}
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              this.setState(modalInitState);
            }}
            style={styles.centeredView}
          >
            <View style={styles.modalView}>
              <Text style={styles.modalText}>{this.state.modalText}</Text>
            </View>
          </TouchableOpacity>
        </Modal>
      </DCVCameraView>
    );
  }
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    backgroundColor: "#00000000",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    textAlign: "center",
  },
  headerRight: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default BarcodeScannerSortie;
