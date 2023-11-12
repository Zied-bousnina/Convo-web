
import React from "react";
import ReactDOM from "react-dom/client";
import "assets/vendor/nucleo/css/nucleo.css";
import "assets/vendor/font-awesome/css/font-awesome.min.css";
import "assets/scss/argon-design-system-react.scss?v1.1.0";
// import "./index.css"
import { ChakraProvider, ColorModeProvider  } from '@chakra-ui/react'



import "./assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/scss/argon-dashboard-react.scss";
import store from './Redux/store';
import { Provider } from "react-redux";
import App from "App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>

  <ChakraProvider>
  <ColorModeProvider options={{ initialColorMode: "light" }}>

 <App/>
  </ColorModeProvider>
  </ChakraProvider>
  </Provider>
);
