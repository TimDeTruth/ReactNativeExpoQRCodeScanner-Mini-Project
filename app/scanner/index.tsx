import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const Home = () => {
  return (
    <SafeAreaView>
      <Stack.Screen options={{ title: "Overview", headerShown: false }} />
    </SafeAreaView>
  );
};

export default Home;
