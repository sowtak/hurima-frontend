import React from "react";
import { createBrowserRouter, Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar/Navbar";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import About from "./routes/about";
import Contact from "./routes/contact";
import Home from "./routes/home";
import LoginForm from "./routes/login";
import PrivacyPolicy from "./routes/privacy-policy";
import Profile from "./routes/profile";
import TermsOfService from "./routes/terms-of-service";

export const BasicLayout = () => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <body>
        <Outlet />
      </body>
      <Footer />
    </>
  );
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <BasicLayout />
      </>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "login",
        element: <LoginForm />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "terms-of-service",
        element: <TermsOfService />,
      },
    ],
  },
]);

reportWebVitals();
