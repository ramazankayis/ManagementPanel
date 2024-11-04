import { createRoot } from "react-dom/client";

import App from "./App.jsx";
import { store } from "./redux/store.jsx";
import { Provider } from "react-redux";
import Layout from "./MainLayout.jsx";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <Layout>
        <App />
      </Layout>
    </Provider>
  </BrowserRouter>
);
