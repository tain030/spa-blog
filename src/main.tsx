import { StrictMode } from "react";
import { lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Route, Routes } from "react-router-dom";
import "./index.css";
const App = lazy(() => import("./App"));
const PostDetailPage = lazy(() => import("@/pages/post-detail"));

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HashRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/post/:postName" element={<PostDetailPage />} />
        </Routes>
      </Suspense>
    </HashRouter>
  </StrictMode>,
);
