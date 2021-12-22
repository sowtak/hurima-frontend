import React, {FC} from 'react';
import './App.css';
import {Route, Switch} from "react-router-dom";
import {Home} from "../Home/Home";

export const App: FC = () => {
  return(
      <>
        <Switch>
          <Route exact path="/" component={Home}/>
        </Switch>
      </>
  );
};