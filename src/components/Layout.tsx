import React, { useState, useEffect, ReactNode } from "react";
import Sidebar from "./Sidebar";
import { Moon, Sun, Menu } from "lucide-react";

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("darkMode") === "true",
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  return (
    <main
      className={`flex bg-background dark:bg-background text-foreground dark:text-foreground transition-colors duration-300 min-h-screen`}
    >
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* 오버레이 (모바일에서만 표시) */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div className="flex-1 duration-300">
        {/* 헤더 */}
        <header className="fixed top-0 right-0 p-4 flex justify-between items-center w-full z-10">
          {/* 모바일에서만 보이는 사이드바 열기 버튼 */}
          {!isSidebarOpen && (
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden p-2 bg-background text-foreground"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}

          {/* 다크 모드 토글 버튼 */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full hover:bg-accent dark:hover:bg-accent transition-colors duration-300 ml-auto"
          >
            {darkMode ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>
        </header>

        {/* 컨텐츠 */}
        <section className="mx-auto max-w-5xl py-20 px-4 md:px-8 lg:px-16 space-y-12 h-full">
          {children}
        </section>
      </div>
    </main>
  );
};

export default AppLayout;
