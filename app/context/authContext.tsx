import { createContext, useContext, useEffect, useState } from "react";

import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { AuthState, RegisterInput, LoginInput } from "../api/types";
import { apiOrigin } from "../env";
import { loginFn, registerFn } from "../api/api";
interface AuthProps {
  authState?: AuthState;
  onRegister?: (input: RegisterInput) => Promise<any>;
  onLogin?: (input: LoginInput) => Promise<any>;
  onLogout?: () => Promise<any>;
}

const TOKEN_KEY = "token";
const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: { children: any }) => {
  const [authState, setAuthState] = useState<AuthState>({
    token: null,
    authenticated: null,
  });

  useEffect(() => {
    const loadToken = async () => {
      try {
        const token = await SecureStore.getItemAsync(TOKEN_KEY);
        console.log("stored: ", token);
        if (token) {
          setAuthState({ token: token, authenticated: true });
        }
      } catch (error) {
        console.log(error);
      }
    };
    loadToken();
  }, []);

  const register = async (input: RegisterInput) => {
    const json = await registerFn(input);
    if (json.error) {
      return { error: json.error };
    }
    if (json.token) {
      const token = json.token;
      setAuthState({ token, authenticated: true });
      await SecureStore.setItemAsync(TOKEN_KEY, token);
    }
    return { json };
  };

  const login = async (input: LoginInput) => {
    //v2
    const json = await loginFn(input);
    if (json.error) {
      console.log("result:", json);
      // alert(json.error);
      return { error: json.error };
    }
    if (json.token) {
      const token = json.token;
      setAuthState({ token, authenticated: true });
      await SecureStore.setItemAsync(TOKEN_KEY, token);
    }

    return { json };
  };

  const logout = async () => {
    try {
      await SecureStore.deleteItemAsync(TOKEN_KEY);
      // axios.defaults.headers.common["Authorization"] = "";
      setAuthState({ token: null, authenticated: null });
    } catch (error) {
      return { error: String(error) };
    }
  };

  const value = {
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    authState,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
