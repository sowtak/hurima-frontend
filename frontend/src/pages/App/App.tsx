import React, {FC} from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Home} from "../Home/Home";
import {NavBar} from "../../components/NavBar/NavBar";
import {NotFound} from "../NotFound/NotFound";
import {Container} from "react-bootstrap";
import {Login} from "../Login/Login";

export const App: FC = () => {
    return (
        <div>
            <NavBar/>
            <Container>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route element={<NotFound/>}/>
                </Routes>
            </Container>
        </div>
    );
};