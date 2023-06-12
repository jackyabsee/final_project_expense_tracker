import { background } from "native-base/lib/typescript/theme/styled-system";
import React, { Component } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { Table, TableWrapper } from "react-native-table-component";

const tableData = [
  ["所屬機構", "Bank A"],
  ["資產種類", "Stocks"],
  ["資產價值", "10000"],
  ["年利率", "5%"],
  ["備註", ""],
];

export default class SavingTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: tableData,
    };
  }

  render() {
    const state = this.state;
    return (
      <View style={styles.container}>
        <Table borderStyle={{ borderWidth: 1 }}>
          {state.tableData.map((rowData, index) => (
            <TableWrapper
              key={index}
              style={[styles.row, index % 2 && { backgroundColor: "#F7F6E7" }]}
            >
              <Text style={[styles.text, { flex: 1 }]}>{rowData[0]}</Text>
              <TextInput
                style={[
                  styles.textInput,
                  { flex: 1 },
                  { backgroundColor: "white" },
                ]}
                value={rowData[1]}
                onChangeText={(text) => console.log(text)} // You can replace this with your own onChangeText function
              />
            </TableWrapper>
          ))}
        </Table>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 40, backgroundColor: "#fff" },
  text: { textAlign: "center", fontWeight: "100" },
  row: { flexDirection: "row", height: 40, backgroundColor: "#E7E6E1" },
  textInput: { borderColor: "#CCCCCC", borderWidth: 1, padding: 5 },
});
