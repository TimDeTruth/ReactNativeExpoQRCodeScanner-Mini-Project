import { SafeAreaView, StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import { Link, Stack } from "expo-router";
import { useCameraPermissions } from "expo-camera";

const Home = () => {
  const [permission, requestPermission] = useCameraPermissions();

  const isPermissionGranted = Boolean(permission?.granted);
  console.log(permission);

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: "Overview", headerShown: false }} />
      <Text style={styles.title}>QR code Scanner</Text>
      <View style={{ gap: 20 }}>
        <Pressable onPress={requestPermission}>
          <Text style={styles.buttonStyle}> Request Camera Permission</Text>
          <Text style={styles.buttonStyle}>Status: {permission?.status}</Text>
        </Pressable>

        <Link href={"/scanner"} asChild>
          <Pressable disabled={!isPermissionGranted}>
            <Text
              style={[
                styles.buttonStyle,
                { opacity: !isPermissionGranted ? 0.5 : 1 },
              ]}
            >
              Scan Code
            </Text>
          </Pressable>
        </Link>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "black",
    justifyContent: "space-around",
    paddingVertical: 80,
  },
  title: {
    color: "white",
    fontSize: 40,
  },
  buttonStyle: {
    color: "#0E7AFE",
    fontSize: 20,
    textAlign: "center",
  },
});
