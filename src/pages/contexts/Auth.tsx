import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the AuthContext
const AuthContext = createContext<any>(null);

// Custom hook to access authentication state
export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider component to provide the authentication state globally
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Check if the user is authenticated by looking for a token in localStorage
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true); // User is authenticated if token exists
    }
  }, []);

  // Login function to authenticate the user and store token in localStorage
  const loginAuth = () => {
    setIsAuthenticated(true);
    // const token= localStorage.getItem('token');
    // localStorage.setItem('access_token', token); // Save token to localStorage
  };

  // Logout function to clear token and set authentication state to false
  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('access_token'); // Remove token from localStorage
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, loginAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
