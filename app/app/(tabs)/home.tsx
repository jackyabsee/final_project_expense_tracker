import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Stack, useRouter, Tabs } from "expo-router";
import * as SecureStore from "expo-secure-store";

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
} from "native-base";
import { Button as HeaderButton } from "react-native";
import { useAuth } from "../../context/authContext";
// import jwtDecode from "jwt-decode";
import { HomeData, JWTPayload } from "../../api/types";
import { useGetId } from "../../hooks/useGetId";
import { getHomeData } from "../../api/api";
import { useGet } from "../../hooks/useGet";
function RenderHomeData({
  data,
}: {
  data: { items: Array<HomeData> | null } & { error?: string };
}): any {
  if (!data) {
    return <></>;
  }

  if (data.error) {
    return <Text style={styles.text}>{String(data.error)}</Text>;
  }

  if (!Array.isArray(data.items)) {
    return <></>;
  }

  return data.items.map((item: HomeData) => {
    return (
      <View>
        <Text style={styles.text}>
          {item.type} {item.price}
        </Text>
      </View>
    );
  });
}

function Logout() {
  const router = useRouter();
  const { onLogout, authState } = useAuth();

  return (
    <Button
      onPress={async () => {
        await onLogout();
        router.replace("/login");
      }}
    >
      Logout
    </Button>
  );
}

const Home = () => {
  const router = useRouter();
  const { onLogout, authState } = useAuth();
  const userId = useGetId();
  // let data: { items: Array<HomeData> } & { error?: string };
  const [data, setData] = useState<
    { items: Array<HomeData> | null } & { error?: string }
  >({ items: null, error: "loading" });

  useEffect(() => {
    (async () => {
      const data = await getHomeData(authState.token || "");
      setData(data as { items: Array<HomeData> } & { error?: string });
    })();
  }, []);

  return (
    <>
      <View style={styles.topContainer}>
        <Stack.Screen
          options={{
            headerRight: () => <Logout />,
          }}
        />

        <Button
          variant="solid"
          colorScheme="green"
          m="2"
          p="2"
          onPress={() => router.push("/Multi")}
        >
          多次記賬
        </Button>
        <Button
          variant="solid"
          colorScheme="green"
          m="2"
          p="2"
          onPress={() => router.push("/single")}
        >
          快速記賬
        </Button>
      </View>

      <SafeAreaView style={styles.container}>
        <RenderHomeData data={data} />

        {/* <View style={styles.data}>
          <Text style={styles.text}>交通</Text>
          <Text style={styles.text}>$300</Text>
        </View>
        <View style={styles.data}>
          <Text style={styles.text}>餐飲</Text>
          <Text style={styles.text}>$2300</Text>
        </View>
        <View style={styles.data}>
          <Text style={styles.text}>衣飾</Text>
          <Text style={styles.text}>$1200</Text>
        </View>
        <View style={styles.data}>
          <Text style={styles.text}>娛樂</Text>
          <Text style={styles.text}>$1300</Text>
        </View>
        <View style={styles.data}>
          <Text style={styles.text}>繳費</Text>
          <Text style={styles.text}>$5000</Text>
        </View>
        <View style={styles.data}>
          <Text style={styles.text}>其他</Text>
          <Text style={styles.text}>$130</Text>
        </View> */}
        <View>{authState.token ? <Text>{userId}</Text> : null}</View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    display: "flex",
    flexDirection: "row-reverse",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  data: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "80%",
    marginBottom: "1.75%",
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
export default Home;
