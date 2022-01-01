import React, {FC} from 'react';
import {Route, Routes} from "react-router-dom";
import {Home} from "../Home/Home";
import {NavBar} from "../../components/NavBar/NavBar";
import {NotFound} from "../NotFound/NotFound";
import {Login} from "../Login/Login";
import {Watchlist} from "../Watchlist/Watchlist";
import {Registration} from "../Registration/Registration";
import {Items} from "../Items/Items";

export const App: FC = () => {
  return (
    <>
      <NavBar/>
      <main className='py-3'>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/registration" element={<Registration/>}/>
          <Route path="/watchlist" element={<Watchlist/>}/>
          <Route path="/items/" element={<Items/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </main>
    </>
  );
};