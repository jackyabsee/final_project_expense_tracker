import { useEffect, useState } from "react";
import {
  Button,
  Keyboard,
  Text,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { useAuth } from "../context/authContext";
import {
  Redirect,
  useRootNavigationState,
  useRouter,
  useSegments,
} from "expo-router";
// import { useAuth } from "../context/auth";

export default function Index() {
  const router = useRouter();
  const segments = useSegments();
  const navigationState = useRootNavigationState();
  const { authState } = useAuth();

  useEffect(() => {
    if (!navigationState?.key) return;
    const inAuthGroup = segments[0] === "(auth)";
    if (!authState.authenticated && !inAuthGroup) {
      console.log("Is in authGroup?", inAuthGroup);
      console.log(segments);

      router.replace("/login");
      console.log("ok");

      // Redirect({ href: "/home" });
    } else if (authState.authenticated) {
      router.replace("/home");
    }
  }, [authState, navigationState?.key, segments]);

  return <View>{!navigationState?.key ? <Text>LOADING...</Text> : <></>}</View>;
}
