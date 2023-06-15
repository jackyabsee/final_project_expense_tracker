import { Stack, Tabs } from "expo-router";
import { NativeBaseProvider, Box } from "native-base";
import { Provider } from "react-redux";
import { store } from "../../redux/selectedItemStore";
const Tabs_layout = () => {
  return (
    <Tabs>
      <Provider store={store}>
        <Tabs.Screen name="home" options={{ title: "Home" }} />
      </Provider>
      <Tabs.Screen name="single" options={{ title: "single" }} />
      <Tabs.Screen name="table2" options={{ title: "table2" }} />
      <Tabs.Screen
        name="addAssetDetails"
        options={{ title: "addAssetDetails" }}
      />
      <Tabs.Screen name="table3" options={{ title: "table3" }} />
    </Tabs>
  );
};

export default Tabs_layout;
