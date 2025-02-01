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
    <>
      <main className="flex bg-background dark:bg-background text-foreground dark:text-foreground transition-colors duration-300 min-h-screen">
        <Sidebar
          isOpen={isSidebarCollapsed}
          setIsOpen={setIsSidebarCollapsed}
        />
        <div className="flex-1 ml-60">
          <header className="fixed top-0 right-0 p-4 flex justify-end items-center z-10">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full hover:bg-accent dark:hover:bg-accent transition-colors duration-300"
            >
              {darkMode ? (
                <Sun className="w-6 h-6" />
              ) : (
                <Moon className="w-6 h-6" />
              )}
            </button>
          </header>

          <section className="mx-auto max-w-5xl py-20 px-4 md:px-8 lg:px-16 space-y-12 h-full">
            {children}
          </section>
        </div>
      </main>
    </>
  );
};

export default AppLayout;
