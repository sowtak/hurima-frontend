import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BasicLayout, router } from './App';
import reportWebVitals from './reportWebVitals';
import { RouterProvider } from 'react-router';
import { ErrorPage } from './routes/error-page';
import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <GoogleOAuthProvider clientId=''>
    <React.StrictMode>
      <RouterProvider
        router={router}
        fallbackElement={<ErrorPage/>}
      />
    </React.StrictMode>
  </GoogleOAuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
