import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { UserProvider } from "./contexts/app.context";

import "./index.scss";

const rootElement = document.getElementById("container");

render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
            <App />
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>,
  rootElement
);
