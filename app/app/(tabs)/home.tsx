import { useEffect, useState } from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { Stack, useRouter, Tabs, usePathname } from "expo-router";
import * as SecureStore from "expo-secure-store";

import { SafeAreaView } from "react-native-safe-area-context";
import { Box, Button, Icon, Badge, HStack, Flex, Spacer } from "native-base";
import { Button as HeaderButton } from "react-native";
import { useAuth } from "../../context/authContext";
// import jwtDecode from "jwt-decode";
import { HomeData, JWTPayload } from "../../api/types";
import { useGetId } from "../../hooks/useGetId";
import { getHomeData } from "../../api/api";
import { useGet } from "../../hooks/useGet";
import { VictoryPie } from "victory-native";
import { Provider, useSelector } from "react-redux";
import {
  RootState,
  setSelectedData,
  store,
} from "../../redux/selectedItemStore";
import { useDispatch } from "react-redux";
function RenderHomeData({
  data,
}: {
  data: { items: Array<HomeData> | null } & { error?: string };
}): any {
  const router = useRouter();
  const dispatch = useDispatch();
  if (!data) {
    return <></>;
  }

  if (data.error) {
    return <Text style={styles.text}>{String(data.error)}</Text>;
  }

  if (!Array.isArray(data.items)) {
    return <></>;
  }
  const dataItems = data.items.map((item) => ({
    x: item.type,
    y: item.price,
    labels: item.type,
  }));
  console.log(dataItems);

  if (!dataItems) {
    return <></>;
  }
  return (
    <VictoryPie
      // animate={{ duration: 2000 }}
      events={[
        {
          target: "data",
          eventHandlers: {
            onPressIn: (event, data) => {
              console.log(data.datum);
              const input = {
                type: data.datum.labels as string,
                price: data.datum.y as number,
              };
              console.log(input);
              dispatch(setSelectedData(input));
              return router.push("/modal");
            },
          },
        },
      ]}
      data={dataItems}
      colorScale={["tomato", "orange", "gold", "cyan", "navy"]}
      innerRadius={90}
    />
  );
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
  const { authState } = useAuth();
  const userId = useGetId();
  // let data: { items: Array<HomeData> } & { error?: string };
  const [data, setData] = useState<
    { items: Array<HomeData> | null } & { error?: string }
  >({ items: null, error: "loading" });
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/home") {
      (async () => {
        const data = await getHomeData(authState.token || "");
        setData(data as { items: Array<HomeData> } & { error?: string });
      })();
    }
  }, [pathname]);

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
        <Provider store={store}>
          <RenderHomeData data={data} />
        </Provider>

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
