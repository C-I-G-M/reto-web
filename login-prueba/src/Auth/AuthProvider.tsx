import { useContext, createContext, useState, useEffect } from "react";
import type { AccessTokenResponse, AuthResponse, User } from "../types/types";
import { API_URL } from "./constants";

interface AuthProviderProps {
  children: React.ReactNode;
}

interface AuthContextType {
  IsAuthenticated: boolean;
  getAccessToken: () => string;
  saveUser: (userData: AuthResponse) => void;
  getRefreshToken: () => string | null;
  getUser: () => User | undefined;
  signOut: () => void;
  authLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  IsAuthenticated: false,
  getAccessToken: () => "",
  saveUser: () => {},
  getRefreshToken: () => null,
  getUser: () => undefined,
  signOut: () => {},
  authLoading: true,
});

export function AuthProvider({ children }: AuthProviderProps) {
  const [IsAuthenticated, SetIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState<string>("");
  const [User, setUser] = useState<User>();
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    CheckAuth();
  }, []);

  async function requestNewAccessToken(refreshToken: string) {
    try {
      console.log("Requesting new access token with refresh token:", refreshToken);
      const response = await fetch(`${API_URL}/refreshtoken`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${refreshToken}`,
        },
      });

      if (response.ok) {
        const json = (await response.json()) as AccessTokenResponse;

        if (json.error) {
          throw new Error(json.error);
        }

        return json.body.accessToken;
      } else {
        throw new Error(response.statusText);
      }
    } catch (error) {
      console.log("Error requesting new access token:", error);
      return null;
    }
  }

  async function getUserInfo(accessToken: string) {
    try {
      const response = await fetch(`${API_URL}/Users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        const json = await response.json();
        console.log("User info recibido:", json.body);
        return json.body;
      } else {
        throw new Error(response.statusText);
      }
    } catch (error) {
      console.log("Error getting user info:", error);
      return null;
    }
  }

  async function CheckAuth() {
    if (accessToken) {
      SetIsAuthenticated(true);
      setAuthLoading(false);
      // el usuario esta autenticado
    } else {
      // el usuario no esta autenticado
      const token = getRefreshToken();
      if (token) {
        const newAccessToken = await requestNewAccessToken(token);
        if (newAccessToken) {
          const userInfo = await getUserInfo(newAccessToken);
          if (userInfo) {
            saveSessionData(newAccessToken, userInfo, token);
            setAuthLoading(false);
            return;
          }
        }
      }

      signOut(); // por si falla
      setAuthLoading(false);
    }
  }

  function saveSessionData(accessToken: string, userInfo: User, refreshToken: string) {
    setAccessToken(accessToken);
    localStorage.setItem("Token", JSON.stringify(refreshToken));
    SetIsAuthenticated(true);
    setUser(userInfo);
  }

  function signOut() {
    localStorage.removeItem("Token");
    setAccessToken("");
    setUser(undefined);
    SetIsAuthenticated(false);
  }

  function getAccessToken() {
    return accessToken;
  }

  function getRefreshToken(): string | null {
    const tokenData = localStorage.getItem("Token");
    if (tokenData) {
      return JSON.parse(tokenData);
    }
    return null;
  }

  function saveUser(userData: AuthResponse) {
    saveSessionData(userData.body.accessToken, userData.body.user, userData.body.refreshToken);
  }

  function getUser() {
    return User;
  }

  return (
    <AuthContext.Provider
      value={{
        IsAuthenticated,
        getAccessToken,
        saveUser,
        getRefreshToken,
        getUser,
        signOut,
        authLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
