import { useRouter } from "expo-router";
import { Heading } from "native-base";
import React, { Component, useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Text,
} from "react-native";
import { Table, TableWrapper, Row } from "react-native-table-component";

function AddBtn({ title }: { title: string }) {
  const router = useRouter();

  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={styles.addBtn}
        onPress={() =>
          router.push({
            pathname: "/addAssetDetails",
            params: { title: title },
          })
        }
      >
        <View style={styles.addBtn}>
          <Text style={styles.btnText}>新增</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

function EditAndDelete() {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.editBtn}>
        <View style={styles.editBtn}>
          <Text style={styles.btnText}>編輯</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.deleteBtn}>
        <View style={styles.deleteBtn}>
          <Text style={styles.btnText}>刪除</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const tableHead = ["所屬機構", "資產種類", "資產價值", "回報率", "編輯/刪除"];
const widthArr = [120, 100, 100, 100, 130, 90];
const tableDataRaw: any[] = [
  ["編輯", "恒生銀行", "資產類別", "$3000000", "3%", "2024年完成"],
];

export default function SavingTable() {
  const [tableData, setTableData] = useState<any[]>(tableDataRaw);

  useEffect(() => {
    setTableData([...tableData, [, "", "", "", "", ""]]);
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <Heading size="lg">存款</Heading>
      </View>
      <ScrollView horizontal={true}>
        <View>
          <Table borderStyle={{ borderWidth: 1, borderColor: "#C1C0B9" }}>
            <Row
              data={tableHead}
              widthArr={widthArr}
              style={styles.header}
              textStyle={styles.text}
            />
          </Table>
          <ScrollView style={styles.dataWrapper}>
            <Table borderStyle={{ borderWidth: 1, borderColor: "#C1C0B9" }}>
              {tableData.map((rowData, index) => (
                <Row
                  key={index}
                  data={rowData}
                  widthArr={widthArr}
                  style={[
                    styles.row,
                    index % 2 && { backgroundColor: "#F7F6E7" },
                  ]}
                  textStyle={styles.text}
                />
              ))}
            </Table>
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: "#fff" },
  header: { height: 50, backgroundColor: "#537791" },
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
