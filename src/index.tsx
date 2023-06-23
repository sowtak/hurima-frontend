import React from "react";
import ReactDOM from "react-dom/client";
import { Amplify } from "aws-amplify";
import awsConfig from "@/aws-exports"
import "./index.css";
import { router } from "./App";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider } from "react-router";
import { ErrorPage } from "./routes/error-page";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from "react-redux";
import { extendTheme, ChakraProvider } from "@chakra-ui/react"
import store from "./store";

Amplify.configure({
  ...awsConfig,
  ssr: true,
})
const theme = extendTheme();
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(

  <GoogleOAuthProvider clientId='512118331474-nrqe2pcksg5ao8r4alup5eqkhijvt0hi.apps.googleusercontent.com'>
    <React.StrictMode>
      <ChakraProvider theme={theme}>
        <Provider store={store}>
          <RouterProvider router={router} fallbackElement={<ErrorPage />} />
        </Provider>
      </ChakraProvider>
    </React.StrictMode>
  </GoogleOAuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
