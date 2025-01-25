import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import App from "./App";
import PostDetailPage from "./pages/post-detail";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/post/:postName" element={<PostDetailPage />} />
      </Routes>
    </HashRouter>
  </StrictMode>,
);
