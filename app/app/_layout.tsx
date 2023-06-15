import { Slot, Stack, Tabs, useRouter } from "expo-router";
import { AuthProvider, useAuth } from "../context/authContext";
import { NativeBaseProvider } from "native-base";
import { Provider } from "react-redux";
import { store } from "../redux/selectedItemStore";
// import { Provider } from "../context/auth";

export default function Layout() {
  const router = useRouter();
  return (
    // Setup the auth context and render our layout inside of it.
    <AuthProvider>
      <NativeBaseProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Provider store={store}>
            <Stack.Screen
              name="modal"
              options={{
                presentation: "modal",
              }}
            />
          </Provider>
        </Stack>
      </NativeBaseProvider>
    </AuthProvider>
  );
}
