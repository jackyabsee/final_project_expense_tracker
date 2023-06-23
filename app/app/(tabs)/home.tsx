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
import { Button, ScrollView } from "native-base";
import { useAuth } from "../../context/authContext";
import { HomeData, JWTPayload } from "../../api/types";
import { useGetId } from "../../hooks/useGetId";
import { deleteAccount, getHomeData } from "../../api/api";
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

//function ModalOfDetailData() {
//  const selectedData = useSelector(
//    (state: RootState) => state.homeData.selectedData
//  );
//  const modalVisible = useSelector(
//    (state: RootState) => state.homeData.modalVisible
//  );
//  const dispatch = useDispatch();
//  const [modalHeight, setModalHeight] = useState(CLOSED_MODAL_HEIGHT);
//
//  return (
//    <Modal
//      style={styles.container}
//      visible={modalVisible}
//      transparent={true}
//      onRequestClose={() => {
//        alert("Modal has been closed.");
//        dispatch(setModalVisible(false));
//      }}
//    >
//      <PanGestureHandler
//        onGestureEvent={({ nativeEvent }) => {
//          setModalHeight(
//            Math.min(
//              CLOSED_MODAL_HEIGHT,
//              CLOSED_MODAL_HEIGHT - nativeEvent.translationY
//            )
//          );
//        }}
//        onHandlerStateChange={({ nativeEvent }) => {
//          if (nativeEvent.state === State.END) {
//            if (nativeEvent.translationY > 0) {
//              dispatch(setModalVisible(false));
//            }
//            setModalHeight(CLOSED_MODAL_HEIGHT);
//          }
//        }}
//      >
//        <Animated.View style={[styles.modal, { height: modalHeight }]}>
//          <View style={styles.header}>
//            <Text style={styles.headerText}>Selected Item Details</Text>
//          </View>
//          <View style={styles.content}>
//            <Text style={styles.text}>
//              {selectedData?.type ? selectedData.type : null}
//              {selectedData?.price ? selectedData?.price : null}
//            </Text>
//          </View>
//        </Animated.View>
//      </PanGestureHandler>
//    </Modal>
//  );
//}

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
  const dataItems = data.items.map((item) => {
    let emoji;
    switch (item.type) {
      case "衣飾":
        emoji = "👕";
        break;
      case "娛樂":
        emoji = "🎉";
        break;
      case "繳費":
        emoji = "💰";
        break;
      case "交通":
        emoji = "🚌";
        break;
      case "餐飲":
        emoji = "🍔";
        break;
      default:
        emoji = "💡";
    }
    return {
      x: item.type,
      y: item.price,
      labels: `${emoji}${item.type}`,
    };
  });
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
        <View style={styles.topMiddleContainer}>
          <Text style={styles.itemLabel}>範例</Text>
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
              "#FFBB00",
              "#EE0000",
              "#A020F0",
              "#32CD32",
              "#00BFFF",
              "#FFC0CB",
            ]}
            innerRadius={60}
            style={{
              labels: {
                fontSize: 16,
                fill: "white",
                margin: 20,
              },
            }}
            labelRadius={100}
          />
        </View>
        <View style={styles.middleContainer}>
          <View>
            <Text style={styles.itemLabel}>範例</Text>
          </View>
          {testData.map((item) => (
            <View style={styles.itemLabelContainer} key={item.x}>
              <View style={{ width: 100 }}>
                <Text style={styles.itemLabel}>{item.label}</Text>
              </View>
              <View style={{ width: 90 }}>
                <Text style={styles.itemLabel}>${item.y}</Text>
              </View>
            </View>
          ))}
          <View style={styles.itemLabelContainer}>
            <View style={{ width: 100 }}>
              <Text style={styles.totalItemLabel}>總支出</Text>
            </View>
            <View style={{ width: 90 }}>
              <Text style={styles.totalItemLabel}>
                ${testData.reduce((sum, item) => sum + item.y, 0)}
              </Text>
            </View>
          </View>
        </View>
      </>
    );
  }
  return (
    <>
      <View style={styles.topMiddleContainer}>
        <VictoryPie
          animate={{ duration: 3000 }}
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
            "#FFBB00",
            "#EE0000",
            "#A020F0",
            "#32CD32",
            "#ADD8E6",
            "#FFC0CB",
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
      <View style={styles.middleContainer}>
        {dataItems.map((item) => (
          <View style={styles.itemLabelContainer} key={item.x}>
            <View style={{ width: 100 }}>
              <Text style={styles.itemLabel}>{item.labels}</Text>
            </View>
            <View style={{ width: 90 }}>
              <Text style={styles.itemLabel}>${item.y}</Text>
            </View>
          </View>
        ))}
        <View style={styles.itemLabelContainer}>
          <View style={{ width: 100 }}>
            <Text style={styles.totalItemLabel}>總支出</Text>
          </View>
          <View style={{ width: 90 }}>
            <Text style={styles.totalItemLabel}>
              ${dataItems.reduce((sum, item) => sum + item.y, 0)}
            </Text>
          </View>
        </View>
      </View>
    </>
  );
}

function Logout() {
  const router = useRouter();
  const { onLogout } = useAuth();

  return (
    <Button
      variant="solid"
      style={{
        width: 60,
        backgroundColor: "#d6d3d1",
      }}
      onPress={async () => {
        await onLogout();
        router.replace("/login");
      }}
    >
      登出
    </Button>
  );
}

function DeleteAccount() {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);

  const {
    authState: { token },
    onLogout,
  } = useAuth();

  async function callDeleteAccount() {
    if (!token) {
      alert("No token");
      return;
    }

    await onLogout();

    // const res = await deleteAccount(token);

    // if (res.error) {
    //   alert("Error deleting");
    //   console.log(res.error);
    //   return;
    // }
    // if (res.success) {
    //   alert("delete successfullu");
    //   // await onLogout();
    //   // setTimeout(async () => await onLogout(), 2000);
    // }

    // router.replace("/");
  }

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          alert("Modal has been closed.");
          setModalVisible(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Are You Sure?</Text>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <Button
                style={styles.button}
                onPress={async () => {
                  await callDeleteAccount();
                }}
              >
                <Text style={styles.textStyle}>Delete</Text>
              </Button>
              <Button
                style={styles.button}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.textStyle}>Back</Text>
              </Button>
            </View>
          </View>
        </View>
      </Modal>

      <Button
        variant="solid"
        style={{
          width: 85,
          backgroundColor: "#d6d3d1",
        }}
        onPress={() => setModalVisible(true)}
      >
        刪除帳號
      </Button>
    </>
  );
}

const Home = () => {
  const router = useRouter();
  const { authState, onLogout } = useAuth();

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

  useEffect(() => {
    if (!authState.token || !authState) {
      router.replace("/");
    }
  }, [authState.token, authState]);

  return (
    <>
      <View style={styles.topContainer}>
        <Stack.Screen
          options={{
            headerRight: () => <Logout />,
            headerLeft: () => <DeleteAccount />,
          }}
        />

        <Button
          variant="solid"
          colorScheme="green"
          m="2"
          p="2"
          onPress={() => router.push("/Multi")}
        >
          多次記帳
        </Button>
        <Button onPress={() => router.replace("/extraData")}>賺錢貼士</Button>
        <Button onPress={() => router.replace("/history")}>記帳紀錄</Button>
        <Button
          variant="solid"
          colorScheme="green"
          m="2"
          p="2"
          onPress={() => router.push("/single")}
        >
          快速記帳
        </Button>
      </View>

      <View>
        <ScrollView>
          <RenderHomeData data={data} />

          {/* <View> */}
          {/* {authState.token ? <Text style={styles.text}>{userId}</Text> : null} */}
          {/* </View> */}

          {/* <ModalOfDetailData /> */}
          <View style={{ height: 100 }}></View>
        </ScrollView>
      </View>
      <View style={styles.centeredView}></View>
    </>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    display: "flex",
    flexDirection: "row-reverse",
    // backgroundColor: "#1a1c20",
    justifyContent: "space-between",
    alignItems: "center",

    backgroundColor: "#fff",
    borderRadius: 18,
    shadowColor: "grey",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    marginBottom: 5,
    width: "100%",
    marginTop: 10,
    borderColor: "#32BD32",
    borderWidth: 2.2,
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
  data: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
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
    padding: 0,
    borderBottomWidth: 2,
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
  topMiddleContainer: {
    backgroundColor: "#fff",
    borderRadius: 18,
    shadowColor: "grey",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    marginBottom: 10,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#32BD32",
    borderWidth: 2.5,
  },
  middleContainer: {
    backgroundColor: "#fff",
    borderRadius: 18,
    shadowColor: "grey",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    marginBottom: 20,
    paddingVertical: 20,
    paddingHorizontal: 50,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-around",
    borderColor: "#32BD32",
    borderWidth: 2.5,
  },
  pie: {
    shadowOffset: { width: 10, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
  },
  itemLabelContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  itemLabel: {
    fontSize: 21.5,
    fontWeight: "bold",
    color: "#aab1b1",
    marginBottom: 15,
  },
  totalItemLabel: {
    fontSize: 21.5,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 15,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 80,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    margin: 3,
    backgroundColor: "#FF0000",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
export default Home;
