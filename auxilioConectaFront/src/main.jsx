// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import './index.css';
import i18n from './i18n'; 
import { I18nextProvider } from 'react-i18next';

ReactDOM.createRoot(document.getElementById("root")).render(
    <BrowserRouter>
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </BrowserRouter>

);