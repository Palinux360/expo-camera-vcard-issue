import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, Alert } from "react-native";
import { useCameraPermissions } from "expo-camera";
import QRScanner from "./QRScanner";
import { useRouter } from "expo-router";

export default function ReadCard() {
  const [permission, requestPermission] = useCameraPermissions();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const router = useRouter();

  useEffect(() => {
    const getPermissions = async () => {
      if (!permission) {
        const { granted } = await requestPermission();
        setHasPermission(granted);
      } else {
        setHasPermission(permission.granted);
      }
    };
    getPermissions();
  }, [permission]);

  if (hasPermission === null) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
        <Text>Requesting camera permission...</Text>
      </View>
    );
  }

  if (!hasPermission) {
    Alert.alert("Permission Denied", "You need to allow camera access to scan QR codes.", [
      { text: "Go Back", onPress: () => router.back() },
    ]);
    return <View style={styles.centered}><Text>Permission Denied</Text></View>;
  }

  return <QRScanner onScannedResult={(result) => {
    Alert.alert("Scanned Data", result.data, [{ text: "OK", onPress: () => router.back() }]);
  }} />;
}

const styles = {
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
};
