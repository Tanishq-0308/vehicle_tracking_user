import { createContext, useState } from "react";

interface LoginContextType{
    user: string;
    setUser: React.Dispatch<React.SetStateAction<any>>;
}

const AuthContext= createContext<LoginContextType | undefined>(undefined);

export default AuthContext;