import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "../@/components/ui/toaster.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store/store.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Toaster />
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
