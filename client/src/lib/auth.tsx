import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export type UserRole = "PATIENT" | "DOCTOR";

export interface User {
  id: string;
  email: string;
  role: UserRole;
  firstName: string;
  lastName: string;
}

export const DEMO_PATIENT: User = {
  id: "1",
  email: "gusti@demo.ch",
  role: "PATIENT",
  firstName: "Gusti",
  lastName: "Brösmeli",
};

export const DEMO_DOCTOR: User = {
  id: "2",
  email: "farkas@evaz.ch",
  role: "DOCTOR",
  firstName: "Dr. Andras",
  lastName: "Farkas",
};

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback((u: User) => {
    setUser(u);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
