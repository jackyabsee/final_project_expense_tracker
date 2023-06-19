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
import { HistoryData, HomeData } from "../api/types";
import { usePathname, useRouter } from "expo-router";
import { getHistory, getHomeData } from "../api/api";
import { useAuth } from "../context/authContext";
import { Table } from "../components/greenTable";
import { Button } from "native-base";
import { convertDate } from "../api/util";
import { background } from "native-base/lib/typescript/theme/styled-system";

function ConfirmDeleteModal({ openModel }: { openModel: boolean }) {
  const [modalVisible, setModalVisible] = useState(openModel);
  return (
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
            <Text style={styles.modalText}>Hello World!</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const history = () => {
  const router = useRouter();
  const { authState } = useAuth();
  const [data, setData] = useState<
    { items: Array<HistoryData> | null } & { error?: string }
  >({ items: null, error: "loading" });
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/history") {
      (async () => {
        const data = await getHistory(authState.token || "");
        console.log("history", data);

        setData(data as { items: Array<HistoryData> } & { error?: string });
      })();
    }
  }, [pathname]);
  return (
    <>
      <SafeAreaView style={styles.container}>
        <View>
          <Button onPress={() => router.replace("/home")}>返回</Button>
        </View>
        <ScrollView
          horizontal={true}
          //   refreshControl={
          //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          //   }
        >
          {data.error ? <Text>{data.error}</Text> : null}

          {data.items ? (
            <View>
              <Table
                rows={data.items}
                fields={[
                  { label: "Type", width: 100, render: (row) => row.type },
                  { label: "Price", width: 100, render: (row) => row.price },
                  {
                    label: "Date",
                    width: 115,
                    render: (row) => convertDate(String(row.date)).date,
                  },
                  {
                    label: "Remark",
                    width: 100,
                    render: (row) => row.remark,
                  },
                  {
                    label: "刪除",
                    width: 99,
                    render: (row: any) => (
                      <Button
                        onPress={() => <ConfirmDeleteModal openModel={true} />}
                      >
                        刪除
                      </Button>
                    ),
                  },
                ]}
              ></Table>
            </View>
          ) : (
            <Text>Loading data...</Text>
          )}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default history;

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
    padding: 35,
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
});
