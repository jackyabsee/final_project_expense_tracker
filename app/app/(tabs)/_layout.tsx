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
          headerStyle: {
            borderBottomWidth: 2,
            borderBottomColor: "green",
          },
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
          title: "你的資產",
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
          headerStyle: {
            borderBottomWidth: 2,
            borderBottomColor: "pink",
          },
          tabBarIconStyle: { display: "none" },
          tabBarStyle: {
            borderTopColor: "#BD3232",
            borderTopWidth: 2,
            backgroundColor: "#FFC0CB",
          },
          tabBarLabelStyle: { fontSize: 12 },
        }}
      />
      <Tabs.Screen
        name="historyGraph"
        options={{ title: "歷史", tabBarIconStyle: { display: "none" } }}
      />
    </Tabs>
  );
};

export default Tabs_layout;
