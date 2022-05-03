import React from "react";
import ReactDOM from "react-dom/client";
import Root from "./components/root";
import Modal from "react-modal";


document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("root");
  const root = ReactDOM.createRoot(container)
  Modal.setAppElement('#root');
  root.render(<Root />);
});