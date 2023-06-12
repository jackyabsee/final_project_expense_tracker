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
import { JWTPayload } from "../../api/types";
import { UseGetId } from "../../hooks/useGetId";

const Home = () => {
  const router = useRouter();
  const [type, setType] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [date, setDate] = React.useState("");
  const [remark, setRemark] = React.useState("");
  const userId = UseGetId();
  const handleSubmit = async () => {
    console.log({ type, price, date, remark, userId });

    try {
      const response = await fetch(`${apiOrigin}/quickRecordPost`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ type, price, date, remark, userId }),
      });
      const json = await response.json();
      console.log(json);
      setType("");
      setPrice("");
      setDate("");
      setRemark("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {/* <View style={styles.topContainer}>
        <Button
          variant="solid"
          colorScheme="green"
          m="2"
          p="2"
          width="95"
          height="45"
          onPress={() => router.push("/")}
        >
          返回
        </Button>
      </View> */}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
          <Stack.Screen
            options={{
              headerStyle: { backgroundColor: COLORS.lightWhite },
              headerShadowVisible: false,

              headerTitle: "快速記賬",
              headerLeft: () => (
                <Button
                  variant="solid"
                  colorScheme="green"
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
              <Text style={styles.text}>種類</Text>
              <Box maxW="300">
                <Select
                  selectedValue={type}
                  minWidth="110"
                  fontSize={14}
                  _selectedItem={{
                    bg: "teal.600",
                  }}
                  height={50}
                  onValueChange={(itemValue) => setType(itemValue)}
                >
                  <Select.Item label="交通" value="交通" />
                  <Select.Item label="餐飲" value="餐飲" />
                  <Select.Item label="衣飾" value="衣飾" />
                  <Select.Item label="娛樂" value="娛樂" />
                  <Select.Item label="繳費" value="繳費" />
                  <Select.Item label="其他" value="其他" />
                </Select>
              </Box>
            </View>
            <View style={styles.data}>
              <Text style={styles.text}>價格</Text>
              <View style={styles.InputView}>
                <Input
                  style={styles.Input}
                  onChangeText={(itemValue) => setPrice(itemValue)}
                  value={price}
                ></Input>
              </View>
            </View>
            <View style={styles.data}>
              <Text style={styles.text}>日期</Text>
              <View style={styles.InputView}>
                <Input
                  style={styles.Input}
                  placeholder="dd-mm-yyyy"
                  onChangeText={(itemValue) => setDate(itemValue)}
                  value={date}
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
              colorScheme="green"
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
export default Home;
