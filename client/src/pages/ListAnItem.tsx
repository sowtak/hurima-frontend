/**
 * @author  Sowa Takayanagi
 * @since   12/28/2021 3:36 PM
 * @version 1.0.0
 */
import React, {FC} from "react"
import {NavBar} from "../components/NavBar";
import {Typography} from "@mui/material";
import {Footer} from "../components/Footer";

export const ListAnItem: FC = () => {

    return (
        <>
            <NavBar/>
            <Typography variant={'h3'}>
                List an item
            </Typography>
            <Footer/>
        </>
    )
}