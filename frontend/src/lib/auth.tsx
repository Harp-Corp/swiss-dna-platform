'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { api } from './api';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'PATIENT' | 'DOCTOR' | 'LAB_TECHNICIAN' | 'ADMIN' | 'SUPER_ADMIN';
  gender?: string;
  dateOfBirth?: string;
  phone?: string;
  consentGiven: boolean;
  consentDate?: string;
}

interface LoginResponse {
  user: { id: string; email: string; role: string; firstName?: string; lastName?: string };
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<LoginResponse>;
  register: (data: { email: string; password: string; firstName: string; lastName: string }) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setUser(null);
        return;
      }
      const profile = await api.getProfile();
      setUser(profile);
    } catch {
      setUser(null);
      localStorage.removeItem('token');
    }
  };

  useEffect(() => {
    refreshUser().finally(() => setLoading(false));
  }, []);

  const login = async (email: string, password: string): Promise<LoginResponse> => {
    const res = await api.login(email, password);
    localStorage.setItem('token', res.accessToken);
    if (res.refreshToken) {
      localStorage.setItem('refreshToken', res.refreshToken);
    }
    await refreshUser();
    return { user: res.user };
  };

  const register = async (data: { email: string; password: string; firstName: string; lastName: string }) => {
    const res = await api.register(data);
    localStorage.setItem('token', res.accessToken);
    if (res.refreshToken) {
      localStorage.setItem('refreshToken', res.refreshToken);
    }
    await refreshUser();
  };

  const logout = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        await api.logout(refreshToken);
      }
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('demo_role');
      localStorage.removeItem('demo_name');
      localStorage.removeItem('demo_email');
      setUser(null);
      window.location.href = '/';
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
