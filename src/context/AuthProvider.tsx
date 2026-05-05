import React, { createContext, useContext, useEffect, useState } from "react";
import {
    getMe,
    login as loginApi,
    logout as logoutApi,
} from "../api/AuthApi";
import { register as registerApi } from "../api/UserApi";
import { User } from "../data/auth/Auth";

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;

    login: (data: { login: string; password: string }) => Promise<void>;
    register: (data: { login: string; password: string }) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const isAuthenticated = !!user;

    const checkAuth = async () => {
        try {
            const me = await getMe();
            setUser(me);
        } catch {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    const login = async (data: { login: string; password: string }) => {
        const user = await loginApi(data);
        setUser(user);
    };

    const register = async (data: { login: string; password: string }) => {
        const user = await registerApi(data);
        setUser(user);
    };

    const logout = async () => {
        await logoutApi();
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated,
                loading,
                login,
                register,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider");
    }
    return context;
};