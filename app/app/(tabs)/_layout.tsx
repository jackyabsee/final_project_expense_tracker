import { Stack, Tabs } from "expo-router";
import { NativeBaseProvider, Box } from "native-base";
import { Provider } from "react-redux";
import { store } from "../../redux/selectedItemStore";
const Tabs_layout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{ title: "Home", tabBarIconStyle: { display: "none" } }}
      />
      <Tabs.Screen
        name="single"
        options={{ title: "single", tabBarIconStyle: { display: "none" } }}
      />
      <Tabs.Screen
        name="SavingTable"
        options={{ title: "Asset", tabBarIconStyle: { display: "none" } }}
      />
    </Tabs>
  );
};

export default Tabs_layout;
