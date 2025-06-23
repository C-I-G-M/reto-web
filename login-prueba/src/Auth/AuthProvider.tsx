import { useContext, createContext, useState, useEffect } from "react";
import type { AccessTokenResponse, AuthResponse, User } from "../types/types";
import { API_URL } from "./constants";
interface AuthProviderProps{
    children: React.ReactNode;
}

const AuthContext = createContext({
IsAuthenticated: false,
getAccessToken: () => {},
saveUser: (userData: AuthResponse) => {},
getRefreshToken: () => {},
getUser: () => ({} as User | undefined),
signOut: () => {},
});
export function AuthProvider({children}: AuthProviderProps){

    const[IsAuthenticated, SetIsAuthenticated] = useState(false);
    const [accessToken, setAccessToken] = useState<string>("");
    const [User, setUser] = useState<User>();
 
    
    useEffect(() => {CheckAuth();}, []);
    async function requestNewAccessToken(refreshToken: string){
        try {
            console.log(refreshToken);
            const response = await fetch(`${API_URL}/refreshtoken`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${refreshToken}`,
                },
             });

             if (response.ok){
                const json = await response.json() as AccessTokenResponse;

                if (json.error){
                    throw new Error(json.error);
                }

                return json.body.accessToken;

             } else {
                throw new Error (response.statusText);

             }

            } catch (error) {
                console.log(error);
                return null;
            }
        }

    async function getUserInfo(accessToken: string) {

        try {
            
            const response = await fetch(`${API_URL}/Users`,{
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
             });

             if (response.ok){
                const json = await response.json();
                console.log("User info recibido:", json.body);
                return json.body; 

             } else {
                throw new Error (response.statusText);

             }

            } catch (error) {
                console.log(error);
                return null;
            }
    }

    async function CheckAuth(){
    if(accessToken){
// el usuario esta autenticado
    } else{
        // el usuario no esta autenticado
        const token = getRefreshToken();
        if(token){
            const newAccessToken = await requestNewAccessToken(token);
            if(newAccessToken){
                const userInfo = await getUserInfo(newAccessToken);
                if(userInfo){
                    saveSessionData(newAccessToken, userInfo, token);

                } 
            } 
        }

    }
        
}

function saveSessionData(
    accessToken: string,
     userInfo: User,
      refreshToken: string) {
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

    function saveUser(userData: AuthResponse){
   saveSessionData(
         userData.body.accessToken,
         userData.body.user, 
         userData.body.refreshToken);

    }

    function getUser(){
        return User;
    }

    return (<AuthContext.Provider value={{IsAuthenticated, getAccessToken, saveUser, getRefreshToken, getUser, signOut }}>
        {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);