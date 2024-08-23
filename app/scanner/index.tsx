import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Platform,
  Linking,
  AppState,
} from "react-native";
import React, { useEffect, useRef } from "react";
import { Stack } from "expo-router";
import { CameraView } from "expo-camera";
import { Overlay } from "./Overlay";
import { StatusBar } from "expo-status-bar";
import { LinkingContext } from "@react-navigation/native";

const Home = () => {
  const qrLock = useRef(false);
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        qrLock.current = false;
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);
  return (
    <SafeAreaView>
      <Stack.Screen options={{ title: "Overview", headerShown: false }} />
      {Platform.OS === "android" ? <StatusBar hidden /> : null}
      <CameraView
        style={styles.cameraView}
        facing="back"
        onBarcodeScanned={({ data }) => {
          if (data && !qrLock.current) {
            qrLock.current = true;
            console.log(data);
            setTimeout(async () => {
              await Linking.openURL(data);
            }, 500);
          }
        }}
      />
      <Overlay />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  cameraView: {
    ...StyleSheet.absoluteFillObject,
  },
});
