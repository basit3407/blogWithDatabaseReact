import React from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom";
// import { transitions, positions, Provider as AlertProvider } from "react-alert";
// import AlertTemplate from "react-alert-template-basic";
import "./index.css";
import App from "./App";

// const options = {
//   // you can also just use 'bottom center'
//   position: positions.BOTTOM_CENTER,
//   timeout: 5000,
//   offset: "30px",
//   // you can also just use 'scale'
//   transition: transitions.SCALE,
// };

// const Root = () => (
//   <BrowserRouter>
//     <AlertProvider template={AlertTemplate} {...options}>
//       <App />
//     </AlertProvider>
//   </BrowserRouter>
// );

// render(<Root />, document.getElementById("root"));

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
