import React, {createContext, FC} from 'react';
import {Route, Routes, useLocation} from "react-router-dom";
import {Home} from "../Home/Home";
import {NavBar} from "../../components/NavBar/NavBar";
import {NotFound} from "../NotFound/NotFound";
import {Login} from "../Login/Login";
import {Watchlist} from "../Watchlist/Watchlist";
import {Registration} from "../Registration/Registration";
import {Items} from "../Items/Items";
import {Hoge} from "../Hoge/Hoge";
import {Fuga} from "../Hoge/Fuga";

export const App: FC = () => {

  return (
    <>
      <NavBar/>
      <main className='py-3'>
        <Routes>
          <Route path="/fuga" element={<Fuga/>}/>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/registration" element={<Registration/>}/>
          <Route element={<NotFound/>}/>
          <Route path="/items/" element={<Items/>}>
            <Route path="watchlist" element={<Watchlist/>}/>
          </Route>
        </Routes>
      </main>
    </>
  );
};