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
    saveUserData: () => void;
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
        const token = localStorage.getItem("userToken");
        if (token) {
            try {
                const decoded = jwtDecode<{ // Explicitly type the decoded token
                    id: string;
                    name: string;
                    email: string;
                    // Add other expected claims here
                }>(token);
                
                // Map the decoded token to your User interface
                const user: User = {
                    id: decoded.id,
                    name: decoded.name,
                    email: decoded.email
                };
                
                setUserData(user);
            } catch (error) {
                console.error("Invalid token", error);
                localStorage.removeItem("userToken");
                setUserData(null);
            }
        } else {
            setUserData(null);
        }
    };
 
    useEffect(() => {
        saveUserData(); // Always try to load user data on initial render
    }, []);

    return (
        <AuthContext.Provider value={{ userData, saveUserData }}>
            {children}
        </AuthContext.Provider>
    );
}