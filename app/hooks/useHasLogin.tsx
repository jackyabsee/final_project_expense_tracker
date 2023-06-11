import { useRouter } from "expo-router";
import { useAuth } from "../context/authContext";
import { useEffect } from "react";

export const useHasLogin = () => {
  const { authState, onLogout } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!authState.authenticated) {
      console.log("authenticated state: ", authState.authenticated);
      console.log("token: ", authState.token);

      router.replace("/");
    }
  }, [authState]);
};

// export const isLogin = () => {
//   useHasLogin();
// };
