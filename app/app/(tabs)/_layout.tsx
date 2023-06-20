import { Stack, Tabs } from "expo-router";
import { NativeBaseProvider, Box } from "native-base";
import { Provider } from "react-redux";
import { store } from "../../redux/selectedItemStore";
const Tabs_layout = () => {
  return (
    <Tabs>
      <Tabs.Screen name="home" options={{ title: "Home" }} />
      <Tabs.Screen name="single" options={{ title: "single" }} />
      <Tabs.Screen name="SavingTable" options={{ title: "Saving" }} />
      <Tabs.Screen name="table3" options={{ title: "table3" }} />
    </Tabs>
  );
};

export default Tabs_layout;
