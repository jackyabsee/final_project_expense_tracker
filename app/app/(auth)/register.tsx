import { useAuth } from "../../context/authContext";
import { Stack, useRouter } from "expo-router";
import { useState } from "react";
import {
  Button,
  Keyboard,
  TextInput,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
} from "react-native";

const Register = () => {
  const router = useRouter();
  const { onRegister, onLogin } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState<string | null>(null);
  const register = async () => {
    const result = await onRegister!({ username, password, email });
    if (!result) {
      alert("Registration failed");
      return;
    }
    if (result.error) {
      alert(result.error);
      return;
    }
    login();
  };
  const login = async () => {
    const result = await onLogin!({ username, password });
    if (!result) {
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
            placeholder="Username"
            onChangeText={(text: string) => setUsername(text)}
            placeholderTextColor="#aaaaaa"
            value={username}
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
            title="Register"
            onPress={() => {
              register();
              setUsername("");
              setPassword("");
            }}
          ></Button>
        </View>
        <View>
          <Button
            title="Back"
            onPress={() => {
              router.back();
            }}
          ></Button>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Register;

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
