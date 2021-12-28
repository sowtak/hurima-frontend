import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './pages/App/App';
import {Provider} from "react-redux";
import store from "./store";
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter} from "react-router-dom";

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
