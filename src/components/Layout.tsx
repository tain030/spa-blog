import React, { useState, useEffect, ReactNode } from "react";
import Sidebar from "./Sidebar";
import { Moon, Sun } from "lucide-react";

interface AppLayoutProps {
  children: ReactNode; // children prop의 타입을 ReactNode로 지정
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("darkMode") === "true", // 초기값을 localStorage에서 가져옴
  );
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  return (
    <div
      className={`bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300`}
    >
      <div className="flex h-screen">
        <Sidebar
          isOpen={isSidebarCollapsed}
          setIsOpen={setIsSidebarCollapsed}
        />
        <div className="flex-1">
          <header className="fixed top-0 right-0 p-4 flex justify-end items-center z-10">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
            >
              {darkMode ? (
                <Sun className="w-6 h-6" />
              ) : (
                <Moon className="w-6 h-6" />
              )}
            </button>
          </header>

          <main className="mx-auto max-w-5xl pt-20 px-4 md:px-8 lg:px-16 space-y-12">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
