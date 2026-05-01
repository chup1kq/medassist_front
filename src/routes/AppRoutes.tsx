import {BrowserRouter, Routes, Route} from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import AdminLayout from "../layout/AdminLayout";

export const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout/>}>

                </Route>

                <Route element={<AdminLayout/>}>

                </Route>
            </Routes>
        </BrowserRouter>
    )
}