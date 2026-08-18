import "./dev.ts";

import { StrictMode } from "react";
import { render } from "react-dom";
import { GlobalStyles } from "react-magma-dom";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";

import SvgGradients from "./components/SvgGradients/SvgGradients.tsx";
import router from "./router.tsx";
import store from "./store/store.ts";

render(
  <StrictMode>
    <GlobalStyles />
    <SvgGradients />

    <Provider store={store}>
      <RouterProvider router={router} future={{ v7_startTransition: true }} />
    </Provider>
  </StrictMode>,
  document.getElementById("root"),
);
