// import { Button, StyleSheet, Text, View } from "react-native";
// import React from "react";
// import { useSelector } from "react-redux";
// import { RootState } from "../redux/selectedItemStore";
// import { useRouter } from "expo-router";

// const Modal = () => {
//   const selectedData = useSelector((state: RootState) => state.homeData);
//   const router = useRouter();
//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.headerText}>Selected Item Details</Text>
//       </View>
//       <View style={styles.content}>
//         <Text style={styles.text}>
//           {selectedData.selectedData?.type
//             ? selectedData.selectedData.type
//             : null}

//           {selectedData.selectedData?.price
//             ? selectedData.selectedData?.price
//             : null}
//         </Text>

//         <Button
//           title="Close"
//           onPress={() => {
//             router.back();
//           }}
//         />
//       </View>
//     </View>
//   );
// };

// export default Modal;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "#0C0C0C",
//   },
//   header: {
//     width: "100%",
//     padding: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: "#2EE6D6",
//   },
//   headerText: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "#2EE6D6",
//   },
//   content: {
//     padding: 16,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   text: {
//     fontSize: 18,
//     color: "#FFFFFF",
//     marginVertical: 16,
//   },
// });
