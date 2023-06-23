import React, { useState, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Stack, useRouter, Tabs } from "expo-router";
import { COLORS, icons, images, SIZES } from "../constants";
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
  NumberInput,
} from "native-base";
import { post } from "../api/api";
import { useAuth } from "../context/authContext";
import { useEvent } from "react-use-event";
import { object, optional, id, string } from "cast.ts";
import { useDispatch } from "react-redux";
import { addItem } from "../redux/NewAssetSlice";

type NewAsset = {
  institution: string;
  type: string;
  value: string;
  interest_rate: string;
  remark: string;
};

export type CreatedAssetEvent = {
  type: "CreatedAsset";
  asset: {
    id: number;
    institution: string;
    type: string;
    value: number;
    interest_rate: number;
    remark: string;
  };
};

let createAssetParser = object({
  id: optional(id()),
  error: optional(string()),
});
async function createAsset(asset: NewAsset, token: string) {
  return post("/assets", { body: asset, token, parser: createAssetParser });
}

const addAssetDetails = () => {
  const router = useRouter();

  let r = (Math.random() * 100) | 0;
  const [asset, setAsset] = useState<NewAsset>({
    institution: "xx銀行" + r,
    type: "type ",
    value: "100000",
    interest_rate: "1." + r,
    remark: "備註",
  });

  // const dispatch = useEvent<CreatedAssetEvent>("CreatedAsset");
  const dispatch = useDispatch();

  const {
    authState: { token },
  } = useAuth();

  const handleSubmit = async (token: string) => {
    console.log("submit asset");

    const json = await createAsset(asset, token);
    console.log("json: ", json);

    if (json.error) {
      console.log(json.error);
      return;
    }
    if (json.id) {
      console.log("success", json);
      console.log("success");

      dispatch(
        addItem({
          ...asset,
          id: json.id,
          value: +asset.value,
          interest_rate: +asset.interest_rate,
        })
      );

      // router.push("/SavingTable");
      router.back();
      return;
    }
  };

  if (!token) {
    return (
      <View style={styles.container}>
        <Text>This function is not available to guest, please login...</Text>
      </View>
    );
  }

  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
          <Stack.Screen
            options={{
              headerShown: true,
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
                  onChangeText={(itemValue) =>
                    setAsset({ ...asset, institution: itemValue })
                  }
                  value={asset.institution}
                ></Input>
              </View>
            </View>
            <View style={styles.data}>
              <Text style={styles.text}>資產種類</Text>
              <View style={styles.InputView}>
                <Input
                  style={styles.Input}
                  onChangeText={(itemValue) =>
                    setAsset({ ...asset, type: itemValue })
                  }
                  value={asset.type}
                ></Input>
              </View>
            </View>
            <View style={styles.data}>
              <Text style={styles.text}>資產價值</Text>
              <View style={styles.InputView}>
                <Input
                  style={styles.Input}
                  placeholder="63100"
                  onChangeText={(itemValue) =>
                    setAsset({ ...asset, value: itemValue })
                  }
                  value={asset.value}
                ></Input>
              </View>
            </View>
            <View style={styles.data}>
              <Text style={styles.text}>回報率</Text>
              <View style={styles.InputView}>
                <Input
                  style={styles.Input}
                  placeholder="1.03"
                  onChangeText={(itemValue) =>
                    setAsset({ ...asset, interest_rate: itemValue })
                  }
                  value={asset.interest_rate}
                ></Input>
              </View>
            </View>
            <View style={styles.data}>
              <Text style={styles.text}>備註</Text>
              <View style={styles.InputView}>
                <Input
                  style={styles.Input}
                  onChangeText={(itemValue) =>
                    setAsset({ ...asset, remark: itemValue })
                  }
                  value={asset.remark}
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
              onPress={() => {
                handleSubmit(token);
                return;
              }}
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
