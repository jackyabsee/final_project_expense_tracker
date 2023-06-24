import { Stack, Tabs } from "expo-router";
import { NativeBaseProvider, Box } from "native-base";
import { Provider } from "react-redux";
import { store } from "../../redux/selectedItemStore";
const Tabs_layout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{ title: "記帳", tabBarIconStyle: { display: "none" } }}
      />
      <Tabs.Screen
        name="single"
        options={{ title: "快速記帳", tabBarIconStyle: { display: "none" } }}
      />
      <Tabs.Screen
        name="SavingTable"
        options={{ title: "資產", tabBarIconStyle: { display: "none" } }}
      />
      <Tabs.Screen
        name="historyGraph"
        options={{ title: "歷史", tabBarIconStyle: { display: "none" } }}
      />
    </Tabs>
  );
};

export default Tabs_layout;
