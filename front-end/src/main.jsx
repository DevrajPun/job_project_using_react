import React, { createContext, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

export const Context = createContext({
  isAuthorized: false,
});
const AppWrapper = () => {
  const [isAuthorized, setAuthorized] = useState(false);
  const [user, setUser] = useState({});
  return (
    <Context.Provider value={{ isAuthorized, setAuthorized, user, setUser }}>
      <App />
    </Context.Provider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AppWrapper/>
  </BrowserRouter>
);
