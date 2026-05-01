import {Outlet} from "react-router-dom";
import React, {useState} from "react";
import Sidebar from "../components/Sidebar";
import "../static/MainLayout.scss"

const MainLayout: React.FC = () => {

    const [expanded, setExpanded] = useState(false);

    return (
        <div className={`main-layout ${expanded ? "expanded" : ""}`}>
            <Sidebar expanded={expanded} onToggle={() => setExpanded(!expanded)}/>
            <div className="main-content">
                <div className="content-container">
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}

export default MainLayout;