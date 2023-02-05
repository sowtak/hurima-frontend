import React from 'react';
import { createBrowserRouter, Outlet } from 'react-router-dom'
import Footer from './components/Footer';
import Navbar from './components/Navbar/Navbar';
import './index.css';
import reportWebVitals from './reportWebVitals';
import About from './routes/about';
import Contact from './routes/contact';
import Home from './routes/home';
import Register from './routes/register'


export const BasicLayout = () => {
  return (
    <>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </>
  )
}


export const router = createBrowserRouter([
  {
    element: <BasicLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
        children: [
          {
            path: "register",
            element: <Register />,
          },
          {
            path: "about",
            element: <About />
          },
          {
            path: "contact",
            element: <Contact/>
          }
        ]
      },
    ]
  }, 
])

// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

