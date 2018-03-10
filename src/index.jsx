import React from "react";
import ReactDOM from "react-dom";
import App from "./front/app";

// const rdiv = document.createElement('div');
// document.body.appendChild(rdiv);
console.log("rendering app");
ReactDOM.render(<App />, document.getElementById("react-root"));