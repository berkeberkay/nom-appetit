import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthProps {
  authState: {
    token: string | null;
    authenticated: boolean | null;
  };
  onRegister: (username: string, password: string) => Promise<any>;
  onSignIn: (username: string, password: string) => Promise<any>;
  onLogout: () => Promise<any>;
}

const AuthContext = createContext<AuthProps>({
  authState: {
    token: null,
    authenticated: null,
  },
  onRegister: async () => {},
  onSignIn: async () => {},
  onLogout: async () => {},
});

export const useAuth = () => {
  return useContext(AuthContext);
};

const JWT_KEY = process.env.EXPO_PUBLIC_JWT_KEY as string;
const API_URL = process.env.EXPO_PUBLIC_API_URL as string;

export const AuthProvider = ({ children }: any) => {
  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null;
  }>({
    token: null,
    authenticated: null,
  });

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync(JWT_KEY);
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        setAuthState({ token, authenticated: true });
      }
    };
    loadToken();
  });

  const register = async (username: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}/users`, {
        username,
        password,
      });
    } catch (error) {
      return { error: true, msg: (error as any).response.data.error };
    }
  };

  const signin = async (username: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}/token`, {
        username,
        password,
      });
      setAuthState({
        token: response.data.token,
        authenticated: true,
      });
      axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;
      await SecureStore.setItemAsync(JWT_KEY, response.data.token);
    } catch (error) {
      return { error: true, msg: (error as any).response.data.error };
    }
  };

  const logout = async () => {
    try {
      await SecureStore.deleteItemAsync(JWT_KEY);
      axios.defaults.headers.common["Authorization"] = "";
      setAuthState({
        token: null,
        authenticated: false,
      });
    } catch (error) {
      return { error: true, msg: (error as any).response.data.error };
    }
  };

  const value = {
    authState,
    onRegister: register,
    onSignIn: signin,
    onLogout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
