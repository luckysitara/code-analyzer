import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css"; // optional styles (you can remove if not using Tailwind or custom css)
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
