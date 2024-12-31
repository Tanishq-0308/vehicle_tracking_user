import { createContext } from "react";

interface AdminContextType{
    adminName: string;
    setAdminName: React.Dispatch<React.SetStateAction<string>>;
    companyName: string;
    setCompanyName: React.Dispatch<React.SetStateAction<string>>;
}

const AdminContext= createContext<AdminContextType | undefined>(undefined);

export default AdminContext;