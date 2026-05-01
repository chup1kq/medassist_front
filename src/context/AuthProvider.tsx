import React, { createContext, useContext, useEffect, useState } from "react";
import { getMe, login, logout, refresh } from "../api/AuthApi";
import { User } from "../data/auth/Auth";

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    login: (data: { username: string; password: string }) => Promise<void>;
    logout: () => Promise<void>;
    refresh: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const isAuthenticated = !!user;

    const checkAuth = async () => {
        try {
            const user = await getMe();
            setUser(user);
        } catch {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    const loginHandler = async (data: { username: string; password: string }) => {
        const user = await login(data);
        setUser(user);
    };

    const logoutHandler = async () => {
        await logout();
        setUser(null);
    };

    const refreshHandler = async () => {
        await refresh();
        await checkAuth();
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated,
                loading,
                login: loginHandler,
                logout: logoutHandler,
                refresh: refreshHandler,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used inside AuthProvider");
    return context;
};