import React from 'react';
import { createBrowserRouter, Outlet } from 'react-router-dom'
import Footer from './components/Footer';
import Navbar from './components/Navbar/Navbar';
import './index.css';
import reportWebVitals from './reportWebVitals';
import About from './routes/about';
import Contact from './routes/contact';
import Home from './routes/home';
import Register from './routes/register';


export const BasicLayout = () => {
  return (
    <>
      <header>
        <Navbar/>
      </header>
      <Outlet />
      <Footer/>
    </>
  )
}


export const router = createBrowserRouter([
  {
    path: "/",
    element: <BasicLayout />,
    children: [
      {
        element: (
          <>
            <Home />
            <Outlet />
          </>),
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

reportWebVitals();

