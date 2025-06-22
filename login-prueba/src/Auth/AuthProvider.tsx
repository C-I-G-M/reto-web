import { useContext, createContext, useState, useEffect } from "react";
import type { AuthResponse } from "../types/types";
interface AuthProviderProps{
    children: React.ReactNode;
}

const AuthContext = createContext({
IsAuthenticated: false,
getAccessToken: () => {},
saveUser: (userData: AuthResponse) => {}
});
export function AuthProvider({children}: AuthProviderProps){

    const[IsAuthenticated, SetIsAuthenticated] = useState(false);
    const [accessToken, setAccessToken] = useState<string>("");
    const [refereshToken, setRefreshToken] = useState<string>("");

    function getAccessToken() {
        return accessToken;

    }

    function saveUser(userData: AuthResponse){
    setAccessToken(userData.body.accessToken);
    setRefreshToken(userData.body.refreshToken);

    localStorage.setItem("Token", JSON.stringify(userData.body.refreshToken));
    SetIsAuthenticated(true);

    }

    return (<AuthContext.Provider value={{IsAuthenticated, getAccessToken, saveUser}}>
        {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);