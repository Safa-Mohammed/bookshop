// AuthContext.tsx
import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

interface User {
    id: string;
    name: string;
    email: string;
}

interface AuthContextType {
    userData: User | null;
    isAuthenticated: boolean;
    saveUserData: () => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuthContext must be used within an AuthContextProvider");
    }
    return context;
};

interface AuthContextProviderProps {
    children: ReactNode;
}

export default function AuthContextProvider({ children }: AuthContextProviderProps) {
    const [userData, setUserData] = useState<User | null>(null);

    const saveUserData = () => { 
        const encodedToken = localStorage.getItem("userToken");
        if (encodedToken) { 
            try {
                const decodedToken = jwtDecode<User>(encodedToken);
                setUserData(decodedToken);
            } catch (error) {
                console.error("Token decoding failed:", error);
                logout();
            }
        }
    };

    const logout = () => {
        localStorage.removeItem("userToken");
        setUserData(null);
    };
 
    useEffect(() => {
        saveUserData();
    }, []);

    return (
        <AuthContext.Provider value={{ 
            userData, 
            saveUserData,
            logout,
            isAuthenticated: !!userData
        }}>
            {children}
        </AuthContext.Provider>
    );
}