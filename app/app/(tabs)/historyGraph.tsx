import {
  Modal,
  Pressable,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "expo-router";
import { Button } from "native-base";
import { background } from "native-base/lib/typescript/theme/styled-system";
import { getHistory, deleteHistoryItem } from "../../api/api";
import { HistoryData } from "../../api/types";
import { convertDate } from "../../api/util";
import { useAuth } from "../../context/authContext";
import { Table } from "../../components/Table";
import { LineChart, PieChart } from "react-native-chart-kit";
const colorScale = [
  "#FFBB00",
  "#EE0000",
  "#A020F0",
  "#32CD32",
  "#ADD8E6",
  "#FFC0CB",
];
const chartConfig = {
  backgroundGradientFrom: "white",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "white",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 154, 26, ${opacity})`,
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
  propsForDots: {
    r: "5",
    strokeWidth: "4",
    stroke: "#ffa726",
  },
};
const historyGraph = () => {
  const router = useRouter();
  const { authState } = useAuth();
  const [data, setData] = useState<
    { items: Array<HistoryData> | null } & { error?: string }
  >({ items: null, error: "loading" });
  const [Uniquedata, setUniqueData] = useState<Array<HistoryData> | null>(null);
  const pathname = usePathname();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(0);
  const [currentYearExpense, setCurrentYearExpense] = useState<
    number[] | undefined
  >();
  const [totalExpense, setTotalExpense] = useState(0);

  useEffect(() => {
    if (pathname === "/historyGraph") {
      (async () => {
        const data = await getHistory(authState.token || "");
        console.log("history graph", data);
        setData(data as { items: Array<HistoryData> } & { error?: string });

        if (!data.error) {
          const uniqueTypesArray = Object.values(
            data.items.reduce(
              (acc: { [type: string]: HistoryData }, item: HistoryData) => {
                if (!acc[item.type]) {
                  acc[item.type] = { ...item };
                } else {
                  acc[item.type].price += item.price;
                }
                return acc;
              },
              {}
            )
          ).map((item, index) => ({
            ...item,
            name: item.type,
            color: colorScale[index % colorScale.length], // set color using colorScale array
            legendFontColor: "#7F7F7F" as string,
            legendFontSize: 15 as number,
          }));
          console.log("Unique Type array", uniqueTypesArray);
          setUniqueData(uniqueTypesArray);

          const expensesByMonth = data.items.reduce(
            (acc: { [month: string]: number }, item: HistoryData) => {
              const date = new Date(item.date);
              const month = `${date.getFullYear()}-${
                date.getMonth() + 1
              }`.padStart(7, "0");
              if (!acc[month]) {
                acc[month] = item.price;
              } else {
                acc[month] += item.price;
              }
              return acc;
            },
            {}
          );

          const expensesFromJanToDec = [...Array(12).keys()].map((month) => {
            const monthStr = `${new Date().getFullYear()}-${
              month + 1
            }`.padStart(7, "0");
            return expensesByMonth[monthStr] || 0;
          });
          console.log(expensesFromJanToDec);
          setCurrentYearExpense(expensesFromJanToDec);

          const totalExpense = data.items.reduce(
            (acc: number, item: HistoryData) => {
              const date = new Date(item.date);
              if (date.getFullYear() === new Date().getFullYear()) {
                acc += item.price;
              }
              return acc;
            },
            0
          );
          setTotalExpense(totalExpense);
        }
      })();
    }
  }, [pathname]);
  const testData = [
    {
      name: "Seoul",
      population: 21500000,
      color: "rgba(131, 167, 234, 1)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Toronto",
      population: 2800000,
      color: "#F00",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Beijing",
      population: 527612,
      color: "red",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "New York",
      population: 8538000,
      color: "#ffffff",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Moscow",
      population: 11920000,
      color: "rgb(0, 0, 255)",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
  ];
  return (
    <>
      <SafeAreaView style={styles.container}>
        <View>
          <Button onPress={() => router.replace("/home")}>返回</Button>
        </View>
        <View></View>
        {currentYearExpense ? (
          <View style={styles.LGmiddleContainer}>
            <Text
              style={{
                fontSize: 21.5,
                fontWeight: "bold",
                color: "#aab1b1",
                marginBottom: 20,
                borderBottomColor: "#32CD32",
                borderBottomWidth: 3,
                textAlign: "center",
              }}
            >
              年度帳目
            </Text>
            <ScrollView horizontal={true}>
              <LineChart
                data={{
                  labels: [
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                    "August",
                    "September",
                    "October",
                    "November",
                    "December",
                  ],
                  datasets: [
                    {
                      data: currentYearExpense,
                      color: (opacity = 1) => `rgba(35, 145, 32, ${opacity})`, // optional
                      strokeWidth: 4, // optional
                    },
                  ],
                }}
                width={1000}
                height={200}
                chartConfig={chartConfig}
                fromZero
              />
            </ScrollView>
          </View>
        ) : null}
        <ScrollView
        // horizontal={true}
        //   refreshControl={
        //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        //   }
        >
          {data.error ? <Text>{data.error}</Text> : null}

          {Uniquedata ? (
            <View style={styles.centeredView}>
              <View style={styles.middleContainer}>
                <Text style={styles.itemLabel}>{totalExpense}</Text>
              </View>
              <View style={styles.middleContainer}>
                <PieChart
                  data={Uniquedata}
                  width={300}
                  height={300}
                  chartConfig={chartConfig}
                  accessor={"price"}
                  backgroundColor={"transparent"}
                  paddingLeft={"0"}
                  center={[70, 0]}
                  absolute
                />
              </View>
              <View></View>
            </View>
          ) : (
            <Text>Loading data...</Text>
          )}
        </ScrollView>
        <View style={styles.centeredView}>
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
                    style={[styles.button, styles.buttonClose]}
                    onPress={async () => {
                      if (selectedItemId <= 0) {
                        alert("Can't delete");
                        setSelectedItemId(0);
                        return;
                      }
                      if (!authState.token) {
                        alert("PLease login first");
                        setSelectedItemId(0);

                        return;
                      }
                      let result = await deleteHistoryItem(
                        selectedItemId,
                        authState.token
                      );
                      if (result.error || !result) {
                        alert("Delete failed");
                        setSelectedItemId(0);
                        return;
                      }
                      if (result.success) {
                        alert("Deleted successfully");
                        setSelectedItemId(0);
                        const data = await getHistory(authState.token);
                        setData(data);
                        return;
                      }
                    }}
                  >
                    <Text style={styles.textStyle}>Delete</Text>
                  </Button>
                  <Button
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text style={styles.textStyle}>Back</Text>
                  </Button>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </SafeAreaView>
    </>
  );
};

export default historyGraph;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    backgroundColor: "#fff",
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
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
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
  LGmiddleContainer: {
    backgroundColor: "#fff",
    borderRadius: 18,
    shadowColor: "grey",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    marginTop: 10,
    marginBottom: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    width: "100%",
    borderColor: "#32BD32",
    borderWidth: 2.5,
  },
  itemLabel: {
    fontSize: 21.5,
    fontWeight: "bold",
    color: "#aab1b1",
    marginBottom: 15,
  },
});
