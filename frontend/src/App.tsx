import React, {FC} from 'react';
import {Route, Routes} from "react-router-dom";
import {Home} from "./pages/Home/Home";
import {NavBar} from "./components/NavBar/NavBar";
import {NotFound} from "./pages/NotFound/NotFound";
import {Login} from "./pages/Login/Login";
import {Watchlist} from "./pages/Watchlist/Watchlist";
import {Items} from "./pages/Items/Items";
import {Footer} from "./components/Footer/Footer";
import {ResetPassword} from "./pages/ForgotPassword/ResetPassword/ResetPassword";
import {useSelector} from "react-redux";
import {AppState} from "./store/rootReducer";
import {UserProfile} from "./pages/User/UserProfile/UserProfile";
import {Settings} from "./pages/User/Settings";
import {Notification} from "./pages/User/Notification/Notification";
import {AppProps} from "./types/types";
import {Registration} from "./pages/Registration/Registration";
import {FindEmail} from "./pages/ForgotPassword/FindEmail/FindEmail";

export const App: FC = () => {
  //const isLoggedIn = localStorage.getItem("isLoggedIn");
  const username = useSelector((state: AppState) => state.auth.user.username);

  return (
    <>
      <NavBar/>
      <main className='py-5'>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/account">
            <Route path="login" element={<Login/>}/>
            <Route path="registration" element={<Registration/>}/>
            <Route path="registration/activate/:code" element={<Login/>}/>
            <Route path="forgot-password" element={<FindEmail/>}>
              <Route path="send-password-reset-code" element={<PasswordReset/>}/>
            </Route>
          </Route>
          <Route path="/watchlist" element={<Watchlist/>}/>
          <Route path="/items/" element={<Items/>}/>
          <Route path={`/${username}`} element={<UserProfile/>}/>
          <Route path='settings' element={<Settings/>}>
            <Route path='profile' element={<UserProfile/>}/>
            <Route path='notification' element={<Notification/>}/>
          </Route>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </main>
      <Footer/>
    </>
  );
};