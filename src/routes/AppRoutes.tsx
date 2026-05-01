import {BrowserRouter, Routes, Route} from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import AdminLayout from "../layout/AdminLayout";
import Auth from "../pages/admin/Auth";

export const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout/>}>

                </Route>

                <Route element={<AdminLayout/>}>
                    <Route
                        path="/login"
                        element={<Auth/>}
                    />
                    <Route
                        path="/register"
                        element={<Auth/>}
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}