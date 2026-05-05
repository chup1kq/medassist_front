import { useState } from "react";
import "../../static/Auth.scss";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";

type AuthMode = "login" | "register";

const Auth = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { login, register } = useAuth();

    const mode: AuthMode =
        location.pathname.includes("register") ? "register" : "login";

    const isLogin = mode === "login";

    const [form, setForm] = useState({
        login: "",
        password: "",
        confirmPassword: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (mode === "register") {
                if (form.password !== form.confirmPassword) {
                    alert("Пароли не совпадают");
                    return;
                }

                await register({
                    login: form.login,
                    password: form.password,
                });

            } else {
                await login({
                    login: form.login,
                    password: form.password,
                });
            }

            navigate("/admin");

        } catch (e) {
            alert("Ошибка авторизации");
        }
    };

    const toggleMode = () => {
        navigate(isLogin ? "/register" : "/login");
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>{isLogin ? "Вход" : "Регистрация"}</h2>

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="login"
                        placeholder="Имя пользователя"
                        value={form.login}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Пароль"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />

                    {!isLogin && (
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Повторите пароль"
                            value={form.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    )}

                    <button type="submit">
                        {isLogin ? "Войти" : "Зарегистрироваться"}
                    </button>
                </form>

                <p onClick={toggleMode} className="switch">
                    {isLogin
                        ? "Создать профиль"
                        : "Войти в профиль"}
                </p>
            </div>
        </div>
    );
};

export default Auth;