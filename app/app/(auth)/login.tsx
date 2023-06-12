import { Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  TouchableWithoutFeedback,
  Keyboard,
  View,
  TextInput,
  Button,
  StyleSheet,
} from "react-native";
import { useAuth } from "../../context/authContext";

const Login = () => {
  const router = useRouter();
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const { authState, onLogin } = useAuth();
  useEffect(() => {
    if (authState.authenticated) {
      router.replace("/home");
    }
  }, [authState]);

  const login = async () => {
    const result = await onLogin!({ account, password });
    if (!result) {
      console.log("server error");

      alert("server error");
    }
    if (result.error) {
      alert(result.error);
      return;
    }
    const json = result.json;
    console.log("loginPage login result: ", json);
    // router.back();
    // console.log("segment: ", segment);

    router.replace("/home");
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Stack.Screen options={{ title: "Login" }} />
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Account Name"
            onChangeText={(text: string) => setAccount(text)}
            placeholderTextColor="#aaaaaa"
            value={account}
          ></TextInput>
          <TextInput
            style={styles.input}
            placeholder="Password"
            onChangeText={(text: string) => setPassword(text)}
            placeholderTextColor="#aaaaaa"
            secureTextEntry={true}
            value={password}
          ></TextInput>
          {/* <TextInput
          style={styles}
          placeholder="Username"
          onChangeText={(text: string) => setUsername(text)}
        ></TextInput> */}
          <Button
            title="Login"
            onPress={() => {
              login();
              setAccount("");
              setPassword("");
            }}
          ></Button>
        </View>
        <View>
          <Button
            title="Create account"
            onPress={() => {
              router.push("/register");
            }}
          ></Button>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    width: "75%",
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  input: {
    height: 40,
    borderColor: "#cccccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});
