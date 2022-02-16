import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import { i18n } from '@lingui/core';
import {messages as frMessages} from './locales/fr/messages';
import {messages as enMessages} from './locales/en/messages';
import {messages as csMessages} from './locales/en/messages';
import {messages as daMessages} from './locales/en/messages';
import { I18nProvider } from '@lingui/react';

import App from "./components/app";

i18n.load({
  en: enMessages,
  fr: frMessages,
  cs: csMessages,
  da: daMessages
})
i18n.activate('en')

ReactDOM.render(
  <React.StrictMode>
      <Router>
        <ThemeProvider>
          <CSSReset />
          <I18nProvider i18n={i18n}>
          <App />
          </I18nProvider>
        </ThemeProvider>
      </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
