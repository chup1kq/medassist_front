import { User } from "../data/auth/Auth";

const AUTH_API = process.env.AUTH_API;

export const getMe = async (): Promise<User> => {
    const res = await fetch(`${AUTH_API}/me`, {
        method: "GET",
        credentials: "include",
    });

    if (!res.ok) throw new Error("Not authenticated");

    return res.json();
};

export const login = async (data: {
    username: string;
    password: string;
}): Promise<User> => {
    const res = await fetch(`${AUTH_API}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
    });

    if (!res.ok) throw new Error("Login failed");

    return res.json();
};

export const logout = async (): Promise<void> => {
    const res = await fetch(`${AUTH_API}/logout`, {
        method: "POST",
        credentials: "include",
    });

    if (!res.ok) throw new Error("Logout failed");
};

export const refresh = async (): Promise<void> => {
    const res = await fetch(`${AUTH_API}/refresh`, {
        method: "POST",
        credentials: "include",
    });

    if (!res.ok) throw new Error("Refresh failed");
};