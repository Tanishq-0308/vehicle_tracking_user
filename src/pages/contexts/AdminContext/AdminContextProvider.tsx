import React, { ReactNode, useState } from "react";
import AdminContext from "./AdminContext"

interface AdminContextProviderProps {
  children: ReactNode;
}

const AdminContextProvider: React.FC<AdminContextProviderProps> = ({ children }) => {
  const [truckDetail, setTruckDetails] = useState<string>('');
  const [driverDetail, setDriverDetail] = useState<string>('');
  const [helperDetail, setHelperDetail] = useState<string>('');
  return (
    <AdminContext.Provider value={{ truckDetail, driverDetail, helperDetail, setTruckDetails, setDriverDetail, setHelperDetail }}>
      {children}
    </AdminContext.Provider>
  )
}

export default AdminContextProvider;