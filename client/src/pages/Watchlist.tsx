/**
 * @author v Sowa Takayanagi
 * @since   12/28/2021 1:40 AM
 * @version 1.0.0
 */
import React, {FC} from "react"
import {NavBar} from "../components/NavBar";
import {Footer} from "../components/Footer";
import {Typography} from "@mui/material";

export const Watchlist: FC = () => {
    return (
        <>
            <NavBar/>
            <Typography variant={'h4'}>Watch List</Typography>
            <Footer/>
        </>
    )
}