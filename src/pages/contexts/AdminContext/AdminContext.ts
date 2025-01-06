import { createContext } from "react";

interface AdminContextType{
    truckDetail: string;
    setTruckDetails: React.Dispatch<React.SetStateAction<string>>;
    driverDetail: string;
    setDriverDetail: React.Dispatch<React.SetStateAction<string>>;
    helperDetail: string;
    setHelperDetail: React.Dispatch<React.SetStateAction<string>>;
}

const AdminContext= createContext<AdminContextType | undefined>(undefined);

export default AdminContext;