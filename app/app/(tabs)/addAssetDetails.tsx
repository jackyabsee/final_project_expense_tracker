import React, { useState, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  Button as BackButton,
} from "react-native";
import { Stack, useRouter, Tabs } from "expo-router";
import { COLORS, icons, images, SIZES } from "../../constants";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Box,
  Button,
  Icon,
  Pressable,
  Badge,
  HStack,
  Flex,
  Spacer,
  Select,
  Input,
} from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Picker } from "@react-native-picker/picker";
import { apiOrigin } from "../../env";
// import { JWTPayload } from "../../api/types";
// import jwtDecode from "jwt-decode";
import { useGetId } from "../../hooks/useGetId";

const addAssetDetails = () => {
  const router = useRouter();
  const [institution, setInstitution] = React.useState("");
  const [type, setType] = React.useState("");
  const [value, setValue] = React.useState("");
  const [interestRate, setInterestRate] = React.useState("");
  const [remark, setRemark] = React.useState("");
  const userId = useGetId();
  const handleSubmit = async () => {
    console.log({ institution, type, value, interestRate, userId });

    try {
      const response = await fetch(`${apiOrigin}/addAsset`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          institution,
          type,
          value,
          interestRate,
          remark,
          userId,
        }),
      });
      const json = await response.json();
      console.log(json);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
          <Stack.Screen
            options={{
              headerStyle: { backgroundColor: COLORS.lightWhite },
              headerShadowVisible: false,

              headerTitle: "Asset Details",
              headerLeft: () => (
                <Button
                  variant="solid"
                  colorScheme="blue"
                  m="2"
                  p="2"
                  width="95"
                  height="45"
                  onPress={() => router.back()}
                >
                  返回
                </Button>
              ),
            }}
          />
          <View style={styles.container}>
            <View style={styles.data}>
              <Text style={styles.text}>所屬機構</Text>
              <View style={styles.InputView}>
                <Input
                  style={styles.Input}
                  onChangeText={(itemValue) => setInstitution(itemValue)}
                  value={institution}
                ></Input>
              </View>
            </View>
            <View style={styles.data}>
              <Text style={styles.text}>資產種類</Text>
              <View style={styles.InputView}>
                <Input
                  style={styles.Input}
                  onChangeText={(itemValue) => setType(itemValue)}
                  value={type}
                ></Input>
              </View>
            </View>
            <View style={styles.data}>
              <Text style={styles.text}>資產價值</Text>
              <View style={styles.InputView}>
                <Input
                  style={styles.Input}
                  placeholder="63100"
                  onChangeText={(itemValue) => setValue(itemValue)}
                  value={value}
                ></Input>
              </View>
            </View>
            <View style={styles.data}>
              <Text style={styles.text}>回報率</Text>
              <View style={styles.InputView}>
                <Input
                  style={styles.Input}
                  placeholder="1.03"
                  onChangeText={(itemValue) => setInterestRate(itemValue)}
                  value={interestRate}
                ></Input>
              </View>
            </View>
            <View style={styles.data}>
              <Text style={styles.text}>備註</Text>
              <View style={styles.InputView}>
                <Input
                  style={styles.Input}
                  onChangeText={(itemValue) => setRemark(itemValue)}
                  value={remark}
                ></Input>
              </View>
            </View>
          </View>
          <View style={styles.bottomContainer}>
            <Button
              variant="solid"
              colorScheme="blue"
              m="2"
              p="2"
              width="95"
              height="45"
              onPress={handleSubmit}
            >
              確認
            </Button>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    display: "flex",
    flexDirection: "row",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  data: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "80%",
    marginBottom: "1.75%",
  },
  InputView: {
    width: 110,
  },
  Input: {
    width: 100,
    marginTop: 10,
    fontSize: 14,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
  pickerContainer: {
    flex: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginLeft: 16,
  },
  bottomContainer: {
    display: "flex",
    flexDirection: "row-reverse",
  },
});
export default addAssetDetails;
