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
// import { Table, TableWrapper, Row } from "react-native-table-component";
import { useGetId } from "../../hooks/useGetId";
import { apiOrigin } from "../../env";
import { useAuth } from "../../context/authContext";
import {
  array,
  object,
  id,
  string,
  number,
  ParseResult,
  optional,
} from "cast.ts";
import { del, get } from "../../api/api";
import { Table } from "../../components/Table";
import useEvent from "react-use-event";
import { CreatedAssetEvent } from "./addAssetDetails";

const tableHeaders = [
  "所屬機構",
  "資產種類",
  "資產價值",
  "年利率",
  "備註",
  "編輯/刪除",
];
const tableWidths = [90, 100, 100, 90, 100, 130];
// const tableData = data;

let dataParser = object({
  error: optional(string()),
  assets: optional(
    array(
      object({
        id: id(),
        institution: string(),
        type: string(),
        value: number(),
        interest_rate: number(),
        remark: string(),
      })
    )
  ),
});

function getAssets(token: string) {
  return get("/assets", { token, parser: dataParser });
}

function deleteAsset(id: number, token: string) {
  return del("/assets/" + id, { token });
}

function editAsset(id: number, token: string) {
  return get("/editAssets/" + id, { token });
}

export default function SavingTable() {
  const pathname = usePathname();

  const {
    authState: { token },
  } = useAuth();

  const [tableData, setTableData] = useState<ParseResult<typeof dataParser>>({
    error: undefined,
    assets: undefined,
  });
  const [refreshing, setRefreshing] = React.useState(false);

  useEvent<CreatedAssetEvent>("CreatedAsset", (event) => {
    setTableData((data) => ({
      ...data,
      assets: data.assets ? [event.asset, ...data.assets] : [event.asset],
    }));
  });

  const deleteById = async (id: number, token: string) => {
    let json = await deleteAsset(id, token);
    console.log("after clicking delete json::", json);
    let assets = tableData.assets?.filter((asset) => asset.id !== id);
    setTableData({ error: json.error, assets });
  };

  const router = useRouter();
  const editById = async (id: number, token: string) => {
    let json = await editAsset(id, token);
    console.log("after clicking edit::", json);
    router.push({ pathname: "/editAssetDetails", params: { json } });
  };
  useEffect(() => {
    console.log("check get asset", pathname);
    if (!token) return;
    // if (pathname !== "/SavingTable") return;
    fetchData(token);
  }, [token]);

  const onRefresh = React.useCallback(() => {
    if (!token) return;
    setRefreshing(true);
    fetchData(token);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, [token]);

  async function fetchData(token: string) {
    console.log("get assets");
    let json = await getAssets(token);
    setTableData(json);
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

  if (!token) {
    return (
      <View style={styles.container}>
        <Text>Saving Table is not available to guest, please login...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal={true}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {tableData.error ? <Text>{tableData.error}</Text> : null}

        {tableData.assets ? (
          <View>
            <Table
              rows={tableData.assets}
              fields={[
                {
                  label: "所屬機構",
                  width: 90,
                  render: (row) => row.institution,
                },
                { label: "資產種類", width: 100, render: (row) => row.type },
                { label: "資產價值", width: 100, render: (row) => row.value },
                {
                  label: "年利率",
                  width: 90,
                  render: (row) => row.interest_rate,
                },
                { label: "備註", width: 100, render: (row) => row.remark },
                {
                  label: "編輯/刪除",
                  width: 130,
                  render: (row) => (
                    <EditAndDelete
                      edit={() => editById(row.id, token)}
                      delete={() => deleteById(row.id, token)}
                    />
                  ),
                },
              ]}
            ></Table>
            <AddBtn />
          </View>
        ) : (
          <Text>Loading data...</Text>
        )}
      </ScrollView>
    </View>
  );
}

function EditAndDelete(props: { delete: () => void; edit: () => void }) {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.editBtn} onPress={props.edit}>
        <View style={styles.editBtn}>
          <Text style={styles.btnText}>編輯</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.deleteBtn} onPress={props.delete}>
        <View style={styles.deleteBtn}>
          <Text style={styles.btnText}>刪除</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

function AddBtn() {
  const router = useRouter();
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    backgroundColor: "#fff",
  },
  header: { height: 50, backgroundColor: "white" },
  text: { textAlign: "center", fontWeight: "100" },
  dataWrapper: { marginTop: -1 },
  oddRow: { height: 40, backgroundColor: "#E7E6E1" },
  evenRow: { height: 40, backgroundColor: "#F7F6E7" },
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
