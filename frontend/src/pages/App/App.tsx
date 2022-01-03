import React, {FC} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {Home} from "../Home/Home";
import {NavBar} from "../../components/NavBar/NavBar";
import {NotFound} from "../NotFound/NotFound";
import {Login} from "../Login/Login";
import {Watchlist} from "../Watchlist/Watchlist";
import {Registration} from "../Registration/Registration";
import {Items} from "../Items/Items";
import {Footer} from "../../components/Footer/Footer";
import {Account} from "../Account/Account";
import {useSelector} from "react-redux";
import {AppStateType} from "../../redux/reducers/root-reducer";

export const App: FC = () => {
  const isLoggedIn = useSelector((state: AppStateType) => state.user.isLoggedIn);
  return (
    <>
      <NavBar/>
      <main className='py-5'>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/registration" element={<Registration/>}/>
          <Route path="/registration/activate/:code" element={<Login/>}/>
          <Route path="/watchlist" element={<Watchlist/>}/>
          <Route path="/items/" element={<Items/>}/>
          <Route path="/account" element={(isLoggedIn || localStorage.getItem("isLoggedIn")) ? <Account/> : <Navigate to='/login'/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </main>
      <Footer/>
    </>
  );
};