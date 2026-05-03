import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const PublicRoute = () => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return <div>Загрузка...</div>;
    }

    if (isAuthenticated) {
        return <Navigate to="/admin" replace />;
    }

    return <Outlet />;
};

export default PublicRoute;