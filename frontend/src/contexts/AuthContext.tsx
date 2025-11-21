import React, { createContext, useState, useEffect } from 'react';

interface DecodedToken {
  userName: string;
  userId: number;
  iat: number;
  exp: number;
}

function parseJwt(token: string): DecodedToken | null {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error parsing JWT:', error);
    return null;
  }
}

export interface AuthContextType {
  isAuthenticated: boolean;
  userName: string | null;
  token: string | null;
  login: (token: string, userName: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      const decoded = parseJwt(storedToken);
      if (decoded) {
        setToken(storedToken);
        setUserName(decoded.userName);
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem('authToken');
      }
    }
  }, []);

  const login = (newToken: string, name: string) => {
    localStorage.setItem('authToken', newToken);
    setToken(newToken);
    setUserName(name);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setToken(null);
    setUserName(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userName, token, login, logout }}>{children}</AuthContext.Provider>
  );
};
