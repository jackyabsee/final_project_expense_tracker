import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  Button as BackButton,
} from "react-native";
import { Stack, useRouter, Tabs, useLocalSearchParams } from "expo-router";
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
  NumberInput,
} from "native-base";
import {
  NavigationContainer,
  usePreventRemoveContext,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Picker } from "@react-native-picker/picker";
import { apiOrigin } from "../../env";
// import { JWTPayload } from "../../api/types";
// import jwtDecode from "jwt-decode";
import { useGetId } from "../../hooks/useGetId";
import { get, post } from "../../api/api";
import { useAuth } from "../../context/authContext";
import { useEvent } from "react-use-event";
import { object, optional, id, string } from "cast.ts";

type NewAsset = {
  institution: string | string[] | undefined;
  type: string | string[] | undefined;
  value: string | string[] | undefined;
  interest_rate: string | string[] | undefined;
  remark: string | string[] | undefined;
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
function editAsset(asset: NewAsset, params: any, token: string) {
  return post("/editAsset", {
    body: { ...asset, id: params.id },
    token,
    parser: createAssetParser,
  });
}

function getAssetDetails(id: number, token: string) {
  return get("/assets/" + id, { token });
}

const editAssetDetails = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  console.log("parmmmmmmmmmmmmmmm::", params);

  let r = (Math.random() * 100) | 0;
  const [asset, setAsset] = useState<NewAsset>({
    institution: params.institution,
    type: params.type,
    value: params.value,
    interest_rate: params.interest_rate,
    remark: params.remark,
  });

  useEffect(() => {
    setAsset({
      institution: params.institution,
      type: params.type,
      value: params.value,
      interest_rate: params.interest_rate,
      remark: params.remark,
    });
  }, [params]);

  const dispatch = useEvent<CreatedAssetEvent>("CreatedAsset");

  const {
    authState: { token },
  } = useAuth();

  const handleSubmit = async (token: string) => {
    const json = await editAsset(asset, params, token);
    if (json.id) {
      dispatch({
        asset: {
          ...asset,
          id: json.id,
          value: +asset.value,
          interest_rate: +asset.interest_rate,
        },
      });
      console.log(params);
    }
    router.push("/SavingTable");
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
              onPress={() => handleSubmit(token)}
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
export default editAssetDetails;
