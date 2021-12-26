import React, {FC} from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Home} from "../Home/Home";
import {NavBar} from "../../components/NavBar/NavBar";
import {NotFound} from "../NotFound/NotFound";
import {Container} from "react-bootstrap";

export const App: FC = () => {
    return (
        <div>
            <BrowserRouter basename="/">
                <NavBar/>
                <Container>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route element={<NotFound/>}/>
                    </Routes>
                </Container>
            </BrowserRouter>
        </div>
    );
};