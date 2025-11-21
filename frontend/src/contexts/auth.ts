import React, { createContext } from 'react';

export interface AuthContextType {
  isAuthenticated: boolean;
  userName: string | null;
  userId: number | null;
  token: string | null;
  login: (token: string, userName: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
