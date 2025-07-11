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

// Create a custom hook for using the auth context
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
            const decodedToken = jwtDecode<User>(encodedToken);
            setUserData(decodedToken);
        }
    };
 
    useEffect(() => {
        if (localStorage.getItem("userToken")) {
            saveUserData();
        }
    }, []);

    return (
        <AuthContext.Provider value={{ userData, saveUserData }}>
            {children}
        </AuthContext.Provider>
    );
}