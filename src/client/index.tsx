import React from "react";
import { hydrate } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "@common/components/app";

const renderApp = () =>
  hydrate(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    document.getElementById("root")
  );

renderApp();
