import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './store/store';
import App from "./App";
import { UserProvider } from "./contexts/app.context";
import mockServer from "./utils/mock-servers/axios-mock/mock-server";
import './utils/i18n';

import "./index.scss";

const rootElement = document.getElementById("container");

render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>,
  rootElement
);
