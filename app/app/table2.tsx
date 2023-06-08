import { useRouter } from 'expo-router';
import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Table, TableWrapper, Row } from 'react-native-table-component';

//export default class ExampleThree extends Component {
//  constructor(props) {
//    super(props);
//    this.state = {
//      tableHead: ['所屬機構', '資產種類', '資產價值', '年利率', '備註', '編輯'],
//      widthArr: [40, 60, 80, 100, 120, 140, 160, 180, 200]
//    }
//  }
//
//  render() {
//    const state = this.state;
//    const tableData = [['恒生銀行', '定期存款', '$300000', '3%', '2024年完成','編輯']];
//    for (let i = 1; i < 30; i++) {
//      const rowData = [];
//      for (let j = 0; j < 6; j++) {
//        
//        rowData.push(`${i}${j}`);
//        
//      }
//      tableData.push(rowData);
//    }
//
//    return (
//      <View style={styles.container}>
//        <ScrollView horizontal={true}>
//          <View>
//            <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
//              <Row data={state.tableHead} widthArr={state.widthArr} style={styles.header} textStyle={styles.text}/>
//            </Table>
//            <ScrollView style={styles.dataWrapper}>
//              <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
//                {
//                  tableData.map((rowData, index) => (
//                    <Row
//                      key={index}
//                      data={rowData}
//                      widthArr={state.widthArr}
//                      style={[styles.row, index%2 && {backgroundColor: '#F7F6E7'}]}
//                      textStyle={styles.text}
//                    />
//                  ))
//                }
//              </Table>
//            </ScrollView>
//          </View>
//        </ScrollView>
//      </View>
//    )
//  }
//}

export default function SavingTable(){
    const router = useRouter()
    const tableHead = ['所屬機構', '資產種類', '資產價值', '年利率', '備註', '編輯']
    const widthArr = [100, 100, 100, 100, 130, 90]
    const tableData = [['恒生銀行', '定期存款', '$3000000', '3%', '2024年完成','編輯']];
    for (let i = 1; i < 30; i++) {
      const rowData = [];
      for (let j = 0; j < 6; j++) {
        
        rowData.push(`${i}${j}`);
        
      }
      tableData.push(rowData);
    }

    return (
        <View style={styles.container}>
          <ScrollView horizontal={true}>
            <View>
              <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                <Row data={tableHead} widthArr={widthArr} style={styles.header} textStyle={styles.text}/>
              </Table>
              <ScrollView style={styles.dataWrapper}>
                <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                  {
                    tableData.map((rowData, index) => (
                      <Row
                        key={index}
                        data={rowData}
                        widthArr={widthArr}
                        style={[styles.row, index%2 && {backgroundColor: '#F7F6E7'}]}
                        textStyle={styles.text}
                      />
                    ))
                  }
                </Table>
              </ScrollView>
            </View>
          </ScrollView>
        </View>
      )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  header: { height: 50, backgroundColor: '#537791' },
  text: { textAlign: 'center', fontWeight: '100' },
  dataWrapper: { marginTop: -1 },
  row: { height: 40, backgroundColor: '#E7E6E1' }
});