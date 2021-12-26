import React, {FC} from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Home} from "../Home/Home";
import {NavBar} from "../../components/NavBar/NavBar";
import {NotFound} from "../NotFound/NotFound";

export const App: FC = () => {
    return (
        <>
            <BrowserRouter>
                <NavBar/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route element={<NotFound/>}/>
                </Routes>
            </BrowserRouter>
        </>
    );
};