/**
 * @author  Sowa Takayanagi
 * @since   12/23/2021 1:45 AM
 * @version 1.0.0
 */
import React, {FC} from "react"
import {NavBar} from "../../components/NavBar/NavBar";
import {Footer} from "../../components/Footer/Footer";

export const Home: FC = () => {
    //const dispatch = useDispatch();

    return (
        <>
            <NavBar/>
            <h1>flema</h1>
            <Footer/>
        </>

)
}