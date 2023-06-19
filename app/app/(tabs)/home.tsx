import { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Modal,
  Animated,
} from "react-native";
import { Stack, useRouter, Tabs, usePathname } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "native-base";
import { useAuth } from "../../context/authContext";
import { HomeData, JWTPayload } from "../../api/types";
import { useGetId } from "../../hooks/useGetId";
import { getHomeData } from "../../api/api";
import { VictoryLabel, VictoryPie, VictoryTheme } from "victory-native";
import { Provider, useSelector } from "react-redux";
import {
  RootState,
  setModalVisible,
  setSelectedData,
  store,
} from "../../redux/selectedItemStore";
import { useDispatch } from "react-redux";
import { PanGestureHandler, State } from "react-native-gesture-handler";

function ModalOfDetailData() {
  const selectedData = useSelector(
    (state: RootState) => state.homeData.selectedData
  );
  const modalVisible = useSelector(
    (state: RootState) => state.homeData.modalVisible
  );
  const dispatch = useDispatch();
  const [modalHeight, setModalHeight] = useState(CLOSED_MODAL_HEIGHT);

  return (
    <Modal
      style={styles.container}
      visible={modalVisible}
      transparent={true}
      onRequestClose={() => {
        alert("Modal has been closed.");
        dispatch(setModalVisible(false));
      }}
    >
      <PanGestureHandler
        onGestureEvent={({ nativeEvent }) => {
          setModalHeight(
            Math.min(
              CLOSED_MODAL_HEIGHT,
              CLOSED_MODAL_HEIGHT - nativeEvent.translationY
            )
          );
        }}
        onHandlerStateChange={({ nativeEvent }) => {
          if (nativeEvent.state === State.END) {
            if (nativeEvent.translationY > 0) {
              dispatch(setModalVisible(false));
            }
            setModalHeight(CLOSED_MODAL_HEIGHT);
          }
        }}
      >
        <Animated.View style={[styles.modal, { height: modalHeight }]}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Selected Item Details</Text>
          </View>
          <View style={styles.content}>
            <Text style={styles.text}>
              {selectedData?.type ? selectedData.type : null}
              {selectedData?.price ? selectedData?.price : null}
            </Text>
          </View>
        </Animated.View>
      </PanGestureHandler>
    </Modal>
  );
}

const CLOSED_MODAL_HEIGHT = 300;

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

  if (dataItems.length === 0) {
    const testData = [
      {
        x: "Sample data 衣飾",
        y: 10,
        label: "衣飾",
      },
      {
        x: "Sample data 娛樂",
        y: 100,
        label: "娛樂",
      },
      {
        x: "Sample data 繳費",
        y: 150,
        label: "繳費",
      },
      {
        x: "Sample data 交通",
        y: 150,
        label: "交通",
      },
      {
        x: "Sample data 餐飲",
        y: 150,
        label: "餐飲",
      },
      {
        x: "Sample data 其他",
        y: 150,
        label: "其他",
      },
    ];
    return (
      <>
        <View>
          <VictoryPie
            //animate={{ duration: 2000 }}
            events={[
              {
                target: "data",
                eventHandlers: {
                  onPressIn: (event, data) => {
                    console.log(data.datum);
                    const input = {
                      type: data.datum.x as string,
                      price: data.datum.y as number,
                    };
                    console.log(input);
                    dispatch(setSelectedData(input));
                    // return router.push("/modal");
                    dispatch(setModalVisible(true));
                    return;
                  },
                },
              },
            ]}
            data={testData}
            colorScale={[
              "#00a8e8",
              "#0077b6",
              "#023e8a",
              "#03045e",
              "#011f4b",
              "#000000",
            ]}
            innerRadius={60}
            style={{
              labels: {
                fontSize: 14,
                fill: "white",
                margin: 20,
              },
            }}
            labelRadius={100}
          />
        </View>
        <View>
          {testData.map((item) => (
            <View key={item.x}>
              <Text
                style={{ fontSize: 16, fontWeight: "bold", color: "#c9d1d9" }}
              >
                {item.label}| ${item.y}
              </Text>
            </View>
          ))}
        </View>
      </>
    );
  }
  return (
    <>
      <View>
        <VictoryPie
          animate={{ duration: 2000 }}
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
                  dispatch(setModalVisible(true));
                  return;
                },
              },
            },
          ]}
          data={dataItems}
          colorScale={[
            "#00a8e8",
            "#0077b6",
            "#023e8a",
            "#03045e",
            "#011f4b",
            "#000000",
          ]}
          innerRadius={60}
          labelRadius={100}
          style={{
            labels: {
              fontSize: 14,
              fill: "white",
              margin: 20,
            },
          }}
          theme={VictoryTheme.material}
        />
      </View>
      <View>
        {dataItems.map((item) => (
          <View key={item.x}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color: "#c9d1d9",
                marginBottom: 15,
              }}
            >
              {item.labels}| ${item.y}
            </Text>
          </View>
        ))}
      </View>
    </>
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
        <Button onPress={() => router.replace("/extraData")}>
          To Extra Information
        </Button>
        <Button onPress={() => router.replace("/history")}>To History</Button>
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
        {/* <View> */}
        {/* {authState.token ? <Text style={styles.text}>{userId}</Text> : null} */}
        {/* </View> */}

        <ModalOfDetailData />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    display: "flex",
    flexDirection: "row-reverse",
    backgroundColor: "#1a1c20",
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
    justifyContent: "space-between",
    alignItems: "center",
  },
  logoutButton: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
  },
  logoutButtonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1a1c20",
  },
  container: {
    flex: 1,
    backgroundColor: "#0d1117",
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  data: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginBottom: "1.75%",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#c9d1d9",
  },
  modal: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#1a1c20",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: "hidden",
  },
  header: {
    width: "100%",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#2EE6D6",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2EE6D6",
  },
  content: {
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default Home;
