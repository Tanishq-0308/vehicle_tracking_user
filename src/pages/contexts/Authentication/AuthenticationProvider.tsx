import { useState } from "react";
import AuthContext from "./AuthContext";

interface AuthProviderType{
    children:React.ReactNode;
}

const AuthContextProvider:React.FC<AuthProviderType>=({children})=>{
    const [user,setUser]=useState<string>('');
    // const [isAuthenticated, setIsAuthenticated]= useState(false);

    // const login=()=>{

    // }
    return(
        <AuthContext.Provider value={{user, setUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;
