import React, { createContext, useState, ReactNode } from 'react';

// Define the type for the context value
interface TripContextType {
  current: string;
  setCurrent: React.Dispatch<React.SetStateAction<string>>;
  destination: string;
  setDestination: React.Dispatch<React.SetStateAction<string>>;
}

// Create the context with a default value of undefined
const TripContext = createContext<TripContextType | undefined>(undefined);

export default TripContext;