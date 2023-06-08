import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';

// export default class ExampleFour extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       tableHead: ['Head', 'Head2', 'Head3', 'Head4'],
//       tableData: [
//         ['1', '2', '3', '4'],
//         ['a', 'b', 'c', 'd'],
//         ['1', '2', '3', '4'],
//         ['a', 'b', 'c', 'd']
//       ]
//     }
//   }

//   _alertIndex(index) {
//     Alert.alert(`This is row ${index + 1}`);
//   }

//   render() {
//     const state = this.state;
//     const element = (data, index) => (
//       <TouchableOpacity onPress={() => this._alertIndex(index)}>
//         <View style={styles.btn}>
//           <Text style={styles.btnText}>button</Text>
//         </View>
//       </TouchableOpacity>
//     );

//     return (
//       <View style={styles.container}>
//         <Table borderStyle={{borderColor: 'transparent'}}>
//           <Row data={state.tableHead} style={styles.head} textStyle={styles.text}/>
//           {
//             state.tableData.map((rowData, index) => (
//               <TableWrapper key={index} style={styles.row}>
//                 {
//                   rowData.map((cellData, cellIndex) => (
//                     <Cell key={cellIndex} data={cellIndex === 3 ? element(cellData, index) : cellData} textStyle={styles.text}/>
//                   ))
//                 }
//               </TableWrapper>
//             ))
//           }
//         </Table>
//       </View>
//     )
//   }
// }

//const element = (data, index) => (
//    <TouchableOpacity >
//      <View style={styles.btn}>
//        <Text style={styles.btnText}>+</Text>
//      </View>
//    </TouchableOpacity>
//  );
//
//export default function ExampleFour(){
//
//    const tableHead =  ['編輯/儲存','所屬機構', '資產種類', '資產價值', '年利率', '備註', 'Head', 'Head2', 'Head3', 'Head4', 'Head5']
//    const tableData =  [
//      ['','恒生銀行', '定期存款', '3%', '2024年完成','1', '2', '3', '4'],
//      ['a', 'b', 'c', 'd','1', '2', '3', '4'],
//      ['1', '2', '3', '4','1', '2', '3', '4'],
//      ['a', 'b', 'c', 'd','1', '2', '3', '4'],
//      ['a', 'b', 'c', 'd','1', '2', '3', '4']
//    ]
//
//    return (
//        
//        
//        <View style={styles.container}>
//            <ScrollView>
//            <ScrollView horizontal={true}>
//        <Table borderStyle={{borderColor: 'transparent'}}>
//          <Row data={tableHead} style={styles.head} textStyle={styles.text} 
//        onContentSizeChange={this.onContentSizeChange}/>
//          {
//            tableData.map((rowData, index) => (
//              <TableWrapper key={index} style={styles.row}>
//                {
//                  rowData.map((cellData, cellIndex) => (
//                    <Cell key={cellIndex} data={cellIndex === 0 ? element(cellData, index) : cellData} textStyle={styles.text} />
//                  ))
//                }
//              </TableWrapper>
//            ))
//          }
//        </Table>
//        </ScrollView>
//        </ScrollView>
//      </View>
//      
//      
//    )
//}
//
//const styles = StyleSheet.create({
//  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
//  head: { height: 40, backgroundColor: '#808B97' },
//  text: { margin: 6 },
//  row: { flexDirection: 'row', backgroundColor: '#FFF1C1' },
//  btn: { width: 40, height: 18, backgroundColor: '#78B7BB',  borderRadius: 2 },
//  btnText: { textAlign: 'center', color: '#fff' }
//});