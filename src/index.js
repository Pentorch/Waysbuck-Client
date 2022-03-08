import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { UserContextProvider } from "./context/AppContext";
import App from "./pages/App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/styles/style.scss";

import AOS from "aos";
import "aos/dist/aos.css";
AOS.init();

ReactDOM.render(
  <React.StrictMode>
    <UserContextProvider>
      <App />
    </UserContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
