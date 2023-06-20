import { Slot, Stack, Tabs, useRouter } from "expo-router";
import { AuthProvider, useAuth } from "../context/authContext";
import { Button, NativeBaseProvider } from "native-base";
import { Provider } from "react-redux";
import { store } from "../redux/selectedItemStore";
import { COLORS } from "../constants";
// import { Provider } from "../context/auth";

export default function Layout() {
  const router = useRouter();
  return (
    // Setup the auth context and render our layout inside of it.
    <Provider store={store}>
      <AuthProvider>
        <NativeBaseProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="extraData" />
            <Stack.Screen name="addAssetDetails" />
            <Stack.Screen name="assetCalculator" />
          </Stack>
        </NativeBaseProvider>
      </AuthProvider>
    </Provider>
  );
}
