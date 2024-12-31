import TripContext from "./TripContext";
import { ReactNode, useState } from "react";


interface TripContextProviderProps {
    children: ReactNode;
  }
  
  const TripContextProvider: React.FC<TripContextProviderProps> = ({ children }) => {
    const [current, setCurrent] = useState<string>('');
    const [destination, setDestination] = useState<string>('');
  
    return (
      <TripContext.Provider value={{ current, setCurrent, destination, setDestination }}>
        {children}
      </TripContext.Provider>
    );
  };
  
  export default TripContextProvider;