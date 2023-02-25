import React from 'react';
import { createBrowserRouter, Outlet } from 'react-router-dom'
import Footer from './components/Footer';
import Navbar from './components/Navbar/Navbar';
import './index.css';
import reportWebVitals from './reportWebVitals';
import About from './routes/about';
import Contact from './routes/contact';
import Home from './routes/home';
import LocalLoginForm from './routes/local-login';
import LoginForm from './routes/login';
import Profile from './routes/profile';


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
    element: <>
      <BasicLayout />
    </>,
    children: [
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "login",
        element: <LoginForm/>,
      },
      {
        path: "about",
        element: <About />
      },
      {
        path: "contact",
        element: <Contact/>
      },
      {
        path: "profile",
        element: <Profile/>
      },
      {
        path: "local-login",
        element: <LocalLoginForm/>
      }
      
    ]
  }, 
])

reportWebVitals();

