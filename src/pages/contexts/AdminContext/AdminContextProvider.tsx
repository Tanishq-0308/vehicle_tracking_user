import React, { ReactNode, useState } from "react";
import AdminContext from "./AdminContext"

interface AdminContextProviderProps {
  children: ReactNode;
}

const AdminContextProvider: React.FC<AdminContextProviderProps> = ({ children }) => {
  const [adminName, setAdminName] = useState<string>('');
  const [companyName, setCompanyName] = useState<string>('');
  return (
    <AdminContext.Provider value={{ adminName, companyName, setAdminName, setCompanyName }}>
      {children}
    </AdminContext.Provider>
  )
}

export default AdminContextProvider;