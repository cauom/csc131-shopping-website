import React from "react";
import ReactDOM from "react-dom/client";
// import App from "./App.tsx";
// import Login from './Login.tsx'
// import Navbar from './Navbar.tsx'
import Navbar from './Navbar.tsx'
import "./index.css";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";

Amplify.configure(outputs);


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Navbar />
  </React.StrictMode>
);
