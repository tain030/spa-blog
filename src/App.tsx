import React from "react";
import AppLayout from "./components/Layout";
import HomePage from "./pages/home";

const App: React.FC = () => {
  return (
    <AppLayout>
      <HomePage />
    </AppLayout>
  );
};

export default App;
