import React, {FC} from 'react';
import {Route, Routes} from "react-router-dom";
import {Home} from "./pages/Home";
import {NavBar} from "./components/NavBar";
import {NotFound} from "./pages/NotFound";
import {Login} from "./pages/Login";
import {Watchlist} from "./pages/Watchlist";
import {ListAnItem} from "./pages/ListAnItem";
import {Footer} from "./components/Footer";
import {useSelector} from "react-redux";
import {AppState} from "./store/rootReducer";
import {UserProfile} from "./pages/User/UserProfile/UserProfile";
import {Settings} from "./pages/User/Settings";
import {Notification} from "./pages/User/Notification/Notification";
import {Registration} from "./pages/Registration";
import {EnterPasswordResetCode} from "./pages/EnterPasswordResetCode";
import {ResetPassword} from "./pages/ResetPassword";

export const App: FC = () => {
    const username = useSelector((state: AppState) => state.user.user.username);

    return (
        <>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/account'>
                    <Route path='signin' element={<Login/>}/>
                    <Route path='signup' element={<Registration/>}/>
                    <Route path='reset-password' element={<ResetPassword/>}/>
                    <Route path='enter-password-reset-code' element={<EnterPasswordResetCode/>}/>
                </Route>
                <Route path='watchlist' element={<Watchlist/>}/>
                <Route path='list-an-item' element={<ListAnItem/>}/>
                <Route path={`/@${username}`} element={<UserProfile/>}/>
                <Route path='settings' element={<Settings/>}>
                    <Route path='profile' element={<UserProfile/>}/>
                    <Route path='notification' element={<Notification/>}/>
                </Route>
                <Route path='*' element={<NotFound/>}/>
            </Routes>

        </>
    );
};