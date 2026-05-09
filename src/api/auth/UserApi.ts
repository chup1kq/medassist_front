import {User} from "../../data/auth/Auth";

const USER_API = process.env.REACT_APP_USER_API;

export const register = async (data: {
    login: string;
    password: string;
}): Promise<User> => {
    const res = await fetch(USER_API + "/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include",
    });

    if (!res.ok) {
        throw new Error("Register failed");
    }

    return res.json();
};