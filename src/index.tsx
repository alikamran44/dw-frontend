import React, { Suspense } from "react";
import ReactDOM, { hydrate, render } from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { persistor, store } from "./app/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
// STYLE
import "./styles/index.scss";
import "./index.css";
import "./fonts/line-awesome-1.3.0/css/line-awesome.css";
//
const RtlImportCssLazy = React.lazy(() => import("RtlImportCss"));
//

document
  .getElementsByTagName("html")[0]
  .setAttribute("dir", import.meta.env.VITE_LRT_OR_RTL);

const rootElement = document.getElementById("root");

if(!rootElement){
  render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />

        {import.meta.env.VITE_LRT_OR_RTL === "rtl" && (
          <Suspense fallback={<div />}>
            <RtlImportCssLazy />
          </Suspense>
        )}
      </PersistGate>
    </Provider>,
    rootElement
  );
}else{
  if (rootElement.hasChildNodes()) {
    hydrate(
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />

          {import.meta.env.VITE_LRT_OR_RTL === "rtl" && (
            <Suspense fallback={<div />}>
              <RtlImportCssLazy />
            </Suspense>
          )}
        </PersistGate>
      </Provider>,
      rootElement
    );
  } else {
    render(
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />

          {import.meta.env.VITE_LRT_OR_RTL === "rtl" && (
            <Suspense fallback={<div />}>
              <RtlImportCssLazy />
            </Suspense>
          )}
        </PersistGate>
      </Provider>,
      rootElement
    );
  }
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
