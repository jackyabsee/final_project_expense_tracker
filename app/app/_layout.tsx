import { Slot, Stack, Tabs, useRouter } from "expo-router";
import { AuthProvider, useAuth } from "../context/authContext";
import { NativeBaseProvider } from "native-base";
// import { Provider } from "../context/auth";

export default function Layout() {
  // const { authState } = useAuth();
  return (
    // Setup the auth context and render our layout inside of it.
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </AuthProvider>
  );
}
