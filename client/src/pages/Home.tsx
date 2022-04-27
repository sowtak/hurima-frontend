/**
 * @author  Sowa Takayanagi
 * @since   12/23/2021 1:45 AM
 * @version 1.0.0
 */
import React, {FC} from "react"
import {NavBar} from "../components/NavBar";
import {Footer} from "../components/Footer";
import {Typography} from "@mui/material";

export const Home: FC = () => {
    //const dispatch = useDispatch();

    return (
        <>
            <NavBar/>
            <Typography variant={'h4'}>flema</Typography>
            <Footer/>
        </>

)
}