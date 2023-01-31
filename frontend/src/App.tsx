import React from 'react';
import { createBrowserRouter } from 'react-router-dom'
import './index.css';
import reportWebVitals from './reportWebVitals';
import About from './routes/about';
import Register from './routes/register'
import Root from './routes/root';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "about",
        element: <About />
      }
    ]
  }, 
])

// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

