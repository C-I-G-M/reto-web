import { useContext, createContext, useState, useEffect } from "react";
interface AuthProviderProps{
    children: React.ReactNode;
}

const AuthContext = createContext({
IsAuthenticated: false,

});
export function AuthProvider({children}: AuthProviderProps){

    const[IsAuthenticated, SetIsAuthenticated] = useState(false);

    return (<AuthContext.Provider value={{IsAuthenticated}}>
        {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);