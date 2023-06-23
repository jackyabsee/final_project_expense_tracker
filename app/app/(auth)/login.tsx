import { Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  TouchableWithoutFeedback,
  Keyboard,
  View,
  TextInput,
  StyleSheet,
  Text,
} from "react-native";
import { useAuth } from "../../context/authContext";
import { Button } from "native-base";

const Login = () => {
  const router = useRouter();
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const { authState, onLogin } = useAuth();

  useEffect(() => {
    if (authState.authenticated) {
      console.log("AAAAAAAAAAAAAAAAAAA");
      console.log(authState);
      console.log(authState.authenticated);

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
        <View>
          <Text style={styles.title}>Multi</Text>
          <Text style={styles.secondTitle}>Manage Your Money</Text>
        </View>
        <Stack.Screen options={{ title: "Login" }} />
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Account Name"
            onChangeText={(text: string) => setAccount(text)}
            placeholderTextColor="#a1a1a1"
            value={account}
          ></TextInput>
          <TextInput
            style={styles.input}
            placeholder="Password"
            onChangeText={(text: string) => setPassword(text)}
            placeholderTextColor="#a1a1a1"
            secureTextEntry={true}
            value={password}
          ></TextInput>
          {/* <TextInput
          style={styles}
          placeholder="Username"
          onChangeText={(text: string) => setUsername(text)}
        ></TextInput> */}
          <Button
            style={{ backgroundColor: "#0077c2", borderRadius: 0 }}
            variant="solid"
            onPress={() => {
              login();
              setAccount("");
              setPassword("");
            }}
          >
            登入
          </Button>
        </View>
        <View>
          <Button
            style={{
              backgroundColor: "#0077c2",
              borderRadius: 0,
              marginTop: 6,
            }}
            onPress={() => {
              router.push("/register");
            }}
          >
            建立帳號
          </Button>
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
    backgroundColor: "#fff",
    shadowColor: "grey",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
  },
  form: {
    width: "80%",
    backgroundColor: "#fff",
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
  title: {
    fontSize: 36,
    fontWeight: "800",
    marginBottom: 6,
    textShadowColor: "grey",
    textShadowOffset: { width: 1.3, height: 1.3 },
    textShadowRadius: 1,
    textAlign: "center",
    color: "#4d648d",
  },
  secondTitle: {
    fontSize: 21,
    fontWeight: "800",
    marginBottom: 6,
    textShadowColor: "grey",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    textAlign: "center",
    color: "#4d648d",
  },
  input: {
    height: 40,
    borderColor: "#00CCB2",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    color: "#111111",
  },
  button: {
    backgroundColor: "#00FFA2",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "#191919",
    fontWeight: "bold",
    textAlign: "center",
  },
  createAccountText: {
    color: "#F5F5F5",
    marginTop: 20,
    textDecorationLine: "underline",
  },
  //  middleContainer: {
  //    backgroundColor: "#fff",
  //    borderRadius: 18,
  //    shadowColor: "grey",
  //    shadowOffset: { width: 1, height: 1 },
  //    shadowOpacity: 0.8,
  //    shadowRadius: 8,
  //    marginBottom: 20,
  //    paddingVertical: 20,
  //    paddingHorizontal: 50,
  //    width: "100%",
  //    alignItems: "center",
  //    justifyContent: "space-around",
  //  },
});
