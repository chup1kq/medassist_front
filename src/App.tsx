import React from 'react';
import {AppRoutes} from "./routes/AppRoutes";

function App() {
    return (
        <div className={`${process.env.REACT_APP_MAIN_THEME}`}>
            <AppRoutes/>
        </div>
    );
}

export default App;
