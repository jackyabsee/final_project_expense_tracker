import { useRouter } from "expo-router";
import { usePathname } from "expo-router";

import React, { Component, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  RefreshControl,
} from "react-native";
import { Table, TableWrapper, Row } from "react-native-table-component";
import { useGetId } from "../../hooks/useGetId";
import { apiOrigin } from "../../env";
import { useAuth } from "../../context/authContext";

const tableHead = [
  "所屬機構",
  "資產種類",
  "資產價值",
  "年利率",
  "備註",
  "編輯/刪除",
];
const widthArr = [90, 100, 100, 90, 100, 130];
// const tableData = data;

export default function SavingTable() {
  const router = useRouter();
  const pathname = usePathname();

  const { authState } = useAuth();
  const userId = useGetId();

  const [tableData, setTableData] = useState<any[]>([]);
  const [refreshing, setRefreshing] = React.useState(false);

  function editAndDelete() {
    const handleDelete = async () => {
      let token = authState.token;
      console.log("before fetch: ", authState.token);
      try {
        const response = await fetch(`${apiOrigin}/deleteAsset`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        });

        const json = await response.json();
        json.push([addBtn()]);
        console.log("jsonPush: ", json);
        setTableData(json);

        console.log("json: ", json);
      } catch (error) {
        console.error(error);
      }
    };

    return (
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.editBtn}>
          <View style={styles.editBtn}>
            <Text style={styles.btnText}>編輯</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteBtn}
          onPress={() => handleDelete()}
        >
          <View style={styles.deleteBtn}>
            <Text style={styles.btnText}>刪除</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  function addBtn() {
    return (
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => router.push("/addAssetDetails")}
        >
          <View style={styles.addBtn}>
            <Text style={styles.btnText}>新增</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  useEffect(() => {
    console.log("AAAAAAAAAAAAAAAAAAAA", pathname);
    if (pathname === "/table2") {
      fetchData();
    }
  }, [pathname]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchData();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  async function fetchData() {
    let token = authState.token;
    console.log("before fetch: ", authState.token);
    try {
      const response = await fetch(`${apiOrigin}/loadAsset`, {
        headers: { Authorization: "Bearer " + token },
        method: "GET",
      });

      const json = await response.json();
      for (let subArray of json) {
        subArray.push(editAndDelete());
      }
      json.push([addBtn()]);
      console.log("jsonPush: ", json);
      setTableData(json);

      console.log("json: ", json);
    } catch (error) {
      console.error(error);
    }
  }

  //for (let i = 1; i < 20; i++) {
  //  let rowData = [editAndDelete()];
  //  if (i === 19) {
  //    tableData.push([addBtn()]);
  //    break;
  //  }
  //  for (let j = 0; j < 5; j++) {
  //    rowData.unshift(`${i}${j}`);
  //  }
  //  tableData.push(rowData);
  //}

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal={true}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View>
          <Table borderStyle={{ borderWidth: 1, borderColor: "#C1C0B9" }}>
            <Row
              data={tableHead}
              widthArr={widthArr}
              style={styles.header}
              textStyle={styles.text}
            />
          </Table>
          {tableData ? (
            <ScrollView style={styles.dataWrapper}>
              <Table borderStyle={{ borderWidth: 1, borderColor: "#C1C0B9" }}>
                {tableData.map((rowData, index) => (
                  <Row
                    key={index}
                    data={rowData}
                    widthArr={widthArr}
                    style={[
                      styles.row,
                      index % 2 === 0 && { backgroundColor: "#F7F6E7" },
                    ]}
                    textStyle={styles.text}
                  />
                ))}
              </Table>
            </ScrollView>
          ) : (
            <Text>Loading data...</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: "#fff" },
  header: { height: 50, backgroundColor: "white" },
  text: { textAlign: "center", fontWeight: "100" },
  dataWrapper: { marginTop: -1 },
  row: { height: 40, backgroundColor: "#E7E6E1" },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  editBtn: {
    width: 46,
    height: 30,
    backgroundColor: "#72A0C1",
    borderRadius: 4,
    marginRight: 8,
    justifyContent: "center",
  },
  deleteBtn: {
    width: 46,
    height: 30,
    backgroundColor: "red",
    borderRadius: 4,
    justifyContent: "center",
  },
  addBtn: {
    width: 46,
    height: 30,
    backgroundColor: "#1CAB78",
    borderRadius: 4,
    justifyContent: "center",
  },
  btnText: { textAlign: "center", color: "#fff" },
});
