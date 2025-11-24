import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import store from "./services/store";
import { Provider } from "react-redux";
import { DEST_ROOT } from "../target_config";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/main.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter basename={DEST_ROOT}>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
