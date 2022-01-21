import React, {FC} from 'react';
import {Route, Routes} from "react-router-dom";
import {Home} from "./pages/Home/Home";
import {NavBar} from "./components/NavBar/NavBar";
import {NotFound} from "./pages/NotFound/NotFound";
import {Login} from "./pages/Login/Login";
import {Watchlist} from "./pages/Watchlist/Watchlist";
import {Items} from "./pages/Items/Items";
import {Footer} from "./components/Footer/Footer";
import {useSelector} from "react-redux";
import {AppState} from "./store/rootReducer";
import {UserProfile} from "./pages/User/UserProfile/UserProfile";
import {Settings} from "./pages/User/Settings";
import {Notification} from "./pages/User/Notification/Notification";
import {Registration} from "./pages/Registration/Registration";
import {EmailVerification} from "./pages/Login/EmailVerification";

export const App: FC = () => {
    //const isLoggedIn = localStorage.getItem("isLoggedIn");
    const username = useSelector((state: AppState) => state.auth.user.username);

    return (
        <>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/account">
                    <Route path="signin" element={<Login/>}/>
                    <Route path="signup" element={<Registration/>}/>
                    <Route path="verify-email" element={<EmailVerification/>}/>
                    <Route path="signup/activate/:code" element={<Login/>}/>
                </Route>
                <Route path="watchlist" element={<Watchlist/>}/>
                <Route path="items" element={<Items/>}/>
                <Route path={`/${username}`} element={<UserProfile/>}/>
                <Route path='settings' element={<Settings/>}>
                    <Route path='profile' element={<UserProfile/>}/>
                    <Route path='notification' element={<Notification/>}/>
                </Route>
                <Route path="*" element={<NotFound/>}/>
            </Routes>

        </>
    );
};