import { NavLink, useNavigate } from "react-router-dom";
import "../static/AdminSidebar.scss";
import {useAuth} from "../context/AuthProvider";

const AdminSidebar = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const { user } = useAuth();

    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };

    return (
        <aside className="admin-sidebar">
            <div className="sidebar-top">
                <h2 className="logo">{user?.login}</h2>

                <nav className="nav">
                    <NavLink to="/admin" end>
                        Главная
                    </NavLink>

                    <NavLink to="/admin/specializations">
                        Специализации
                    </NavLink>

                    <NavLink to="/admin/documentTypes">
                        Типы документов
                    </NavLink>

                    <NavLink to="/admin/conditions">
                        Условия приема
                    </NavLink>

                    <div className="divider"/>

                    <NavLink to="/">
                        На сайт
                    </NavLink>
                </nav>
            </div>

            <div className="sidebar-bottom">
                <button onClick={handleLogout}>
                    Выйти
                </button>
            </div>
        </aside>
    );
};

export default AdminSidebar;