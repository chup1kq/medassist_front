import {Outlet} from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import "../static/AdminLayout.scss";

const AdminLayout = () => {
    return (
        <div className="admin-layout">
            {<AdminSidebar />}

            <main className="admin-content">
                <div className="admin-container">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;