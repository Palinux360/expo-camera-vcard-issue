import React, { useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { CameraView } from "expo-camera";

type QRScannerProps = {
  onScannedResult: (result: { type: string; data: string }) => void;
};

export default function QRScanner({ onScannedResult }: QRScannerProps) {
  const [scanned, setScanned] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    if (scanned) return;
    setScanned(true);

    console.log("QR Code Scanned! Data:", data);
    let result = { type: "unknown", data };

    if (data.includes("BEGIN:VCARD") && data.includes("END:VCARD")) {
      result = { type: "vCard", data };
    } else if (/^(https?:\/\/|www\.)[^\s/$.?#].[^\s]*$/i.test(data)) {
      result = { type: "url", data };
    }

    onScannedResult(result);
  };

  return (
    <View style={{ flex: 1 }}>
      <CameraView
        style={StyleSheet.absoluteFillObject}
        barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
        onBarcodeScanned={handleBarCodeScanned}
        onCameraReady={() => {
          setIsCameraReady(true);
        }}
      />
      {!isCameraReady && (
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color="#FFF" />
          <Text style={styles.loadingText}>Initializing Camera...</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: "#FFF",
    marginTop: 10,
  },
});



