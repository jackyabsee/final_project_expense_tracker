import { Stack, Tabs } from "expo-router";
import { NativeBaseProvider, Box } from "native-base";
import { Provider } from "react-redux";
import { store } from "../../redux/selectedItemStore";
const Tabs_layout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{
          title: "帳目表",
          tabBarIconStyle: { display: "none" },
          tabBarStyle: {
            borderTopColor: "#32BD32",
            borderTopWidth: 2,
            backgroundColor: "lightgreen",
          },
          tabBarLabelStyle: { fontSize: 12 },
        }}
      />
      <Tabs.Screen
        name="SavingTable"
        options={{
          title: "資產",
          tabBarIconStyle: { display: "none" },
          tabBarStyle: {
            borderTopColor: "#6666CC",
            borderTopWidth: 2,
            backgroundColor: "lightblue",
          },
          tabBarLabelStyle: { fontSize: 12 },
        }}
      />
      <Tabs.Screen
        name="extraData"
        options={{
          title: "賺錢貼士",
          tabBarIconStyle: { display: "none" },
          tabBarStyle: {
            borderTopColor: "#BD3232",
            borderTopWidth: 2,
            backgroundColor: "#FFC0CB",
          },
          tabBarLabelStyle: { fontSize: 12 },
        }}
      />
    </Tabs>
  );
};

export default Tabs_layout;
