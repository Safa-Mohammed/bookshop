import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

// Define your User interface
interface User {
    id: string;
    name: string;
    email: string;
    // Add any other required user properties here
}

// Define the expected JWT payload shape
interface JwtPayload {
    id: string;
    name: string;
    email: string;
    iat?: number;
    exp?: number;
    [key: string]: any; // Allow additional properties
}

interface AuthContextType {
    userData: User | null;
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
        const token = localStorage.getItem("userToken");
        if (!token) {
            setUserData(null);
            return;
        }

        try {
            const decoded = jwtDecode<JwtPayload>(token);
            
            // Validate required fields
            if (!decoded.id || !decoded.email) {
                throw new Error("Invalid token structure");
            }

            // Check token expiration
            if (decoded.exp && Date.now() >= decoded.exp * 1000) {
                throw new Error("Token expired");
            }

            // Map to User interface
            const user: User = {
                id: decoded.id,
                name: decoded.name || '', // Provide default if optional
                email: decoded.email
            };

            setUserData(user);
        } catch (error) {
            console.error("Authentication error:", error);
            localStorage.removeItem("userToken");
            setUserData(null);
        }
    };

    const logout = () => {
        localStorage.removeItem("userToken");
        setUserData(null);
    };
 
    useEffect(() => {
        saveUserData();
        
        // Optional: Add token refresh logic or periodic validation
        const interval = setInterval(() => {
            const token = localStorage.getItem("userToken");
            if (token) {
                try {
                    const { exp } = jwtDecode(token);
                    if (exp && Date.now() >= exp * 1000) {
                        logout();
                    }
                } catch (error) {
                    logout();
                }
            }
        }, 60000); // Check every minute

        return () => clearInterval(interval);
    }, []);

    return (
        <AuthContext.Provider value={{ userData, saveUserData, logout }}>
            {children}
        </AuthContext.Provider>
    );
}