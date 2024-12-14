import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";

const RoutesApp = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Home />}/>
            </Routes>
        </BrowserRouter>
    );
}

export default RoutesApp;