import React, { useState, useEffect, ReactNode } from 'react';
import { AuthContext } from './auth';

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

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      const decoded = parseJwt(storedToken);
      if (decoded) {
        setToken(storedToken);
        setUserName(decoded.userName);
        setUserId(decoded.userId);
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem('authToken');
      }
    }
  }, []);

  const login = (newToken: string, name: string) => {
    const decoded = parseJwt(newToken);
    localStorage.setItem('authToken', newToken);
    setToken(newToken);
    setUserName(name);
    setUserId(decoded?.userId || null);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setToken(null);
    setUserName(null);
    setUserId(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userName, userId, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
