import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Stack, useRouter, Tabs } from "expo-router";

import { COLORS, icons, images, SIZES } from "./constants";
import {
  Nearbyjobs,
  Popularjobs,
  ScreenHeaderBtn,
  Welcome,
} from "./components";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Box,
  Pressable,
  Badge,
  HStack,
  Flex,
  Spacer,
  Divider,
  Icon,
  VStack,
} from "native-base";

const On = () => {
  const router = useRouter();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerTitle: "HELLO",
          headerStyle: { backgroundColor: COLORS.lightwhite },
          headerShadowVisible: false,
          headerLeft: () => <Text>Left</Text>,
          headerRight: () => <Text>Right</Text>,
        }}
      />
      <View>
        <View>
          <Text>收入</Text>
        </View>
        <View>
          <Text>支出</Text>
        </View>
        <View>
          <Text>資產</Text>
        </View>
        <View>
          <Text>存款</Text>
        </View>
        <View style={styles.assetData}>
          <Text style={styles.text}>種類</Text>
          <Text style={styles.text}>價值</Text>
          <Text style={styles.text}>回報</Text>
        </View>
        <View>
          <Text>股票</Text>
        </View>
        <View>
          <Text>其他</Text>
        </View>

        <VStack space={3} divider={<Divider />} w="90%">
          <HStack justifyContent="space-between">
            <Text>Simon Mignolet</Text>
            <Icon name="arrow-forward" />
          </HStack>
          <HStack justifyContent="space-between">
            <Text>Nathaniel Clyne</Text>
            <Icon name="arrow-forward" />
          </HStack>
          <HStack justifyContent="space-between">
            <Text>Dejan Lovren</Text>
            <Text>Dejan Lovren</Text>
            <Text>Dejan Lovren</Text>
            <Text>Dejan Lovren</Text>
            <Icon name="arrow-forward" />
          </HStack>
        </VStack>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  assetData: {
    display: "flex",
    flexDirection: "row",
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default On;
