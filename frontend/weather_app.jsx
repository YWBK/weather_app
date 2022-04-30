import React from "react";
import ReactDOM from "react-dom/client";
import Root from "./components/root";

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("root");
  const root = ReactDOM.createRoot(container)
  root.render(<Root />);
});