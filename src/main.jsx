import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { ConfigProvider } from "antd";
import { BrowserRouter as Router } from "react-router-dom";

import "./index.css";

createRoot(document.getElementById("root")).render(
  <ConfigProvider
    theme={{
      token: {
        borderRadius: 6,
        fontFamily: "Roboto, sans-serif",
        colorPrimary: "#1b4cc3",
        controlHeight: 36,
      },
      components: {
        Rate: {
          starColor: "#f4ba0c",
          starBg: "#b4b4b4",
        },
      },
    }}
  >
    <Router>
      <App />
    </Router>
  </ConfigProvider>
);
