// AuthContext.tsx
import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState, type ReactNode } from "react";

export const AuthContext = createContext<AuthContextType>({
  userData: null,
  saveUserData: () => {},
  token: null,
});

interface AuthContextProviderProps {
  children: ReactNode;
}

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  userData: User | null;
  saveUserData: () => void;
  token: string | null;
}

export default function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [userData, setUserData] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const saveUserData = () => {
    const encodedToken = localStorage.getItem("userToken");
    if (encodedToken) {
      const decodedToken = jwtDecode<User>(encodedToken);
      setUserData(decodedToken);
      setToken(encodedToken);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      saveUserData();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ userData, saveUserData, token }}>
      {children}
    </AuthContext.Provider>
  );
}