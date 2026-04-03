
"use client";
import "./globals.css";
import "./styles/SidebarFuturista.css";
import Sidebar from "../components/Sidebar";
import { useEffect } from "react";

export default function RootLayout({ children }) {
  // Alternar modo claro/oscuro
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      if (saved === "dark") document.body.classList.add("dark");
      else document.body.classList.remove("dark");
    }
  }, []);

  function toggleTheme() {
    if (typeof window !== "undefined") {
      document.body.classList.toggle("dark");
      const isDark = document.body.classList.contains("dark");
      localStorage.setItem("theme", isDark ? "dark" : "light");
    }
  }

  return (
    <html lang="es" data-theme="default">
      <body className="bg-[rgb(var(--bg))] text-[rgb(var(--text))] font-sans min-h-screen">
        <div className="flex h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
          {/* Sidebar futurista */}
          <aside className="sidebar w-64 min-w-[16rem] bg-[rgba(255,255,255,0.7)] dark:bg-[rgba(32,34,48,0.7)] shadow-xl rounded-r-3xl m-2 flex flex-col justify-between border-r border-gray-200 dark:border-gray-700 backdrop-blur-xl transition-all duration-300">
            <Sidebar />
            <div className="p-4 text-xs text-center text-gray-400">© {new Date().getFullYear()} mengchig.ia</div>
          </aside>
          {/* Contenido principal */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Topbar */}
            <header className="h-16 flex items-center justify-between px-8 border-b bg-[rgba(255,255,255,0.8)] dark:bg-[rgba(32,34,48,0.8)] border-gray-200 dark:border-gray-700 shadow-sm backdrop-blur-xl z-10">
              <div className="flex items-center gap-4">
                <button className="md:hidden p-2 rounded-lg hover:bg-blue-100 dark:hover:bg-gray-700 transition" aria-label="Abrir menú">
                  <span className="text-2xl">☰</span>
                </button>
                <span className="font-extrabold text-xl tracking-widest text-[rgb(var(--brand-700))] dark:text-[rgb(var(--brand))] drop-shadow-md select-none">mengchig.ia Admin</span>
              </div>
              <div className="flex items-center gap-4">
                <button aria-label="Cambiar tema" className="p-2 rounded-full bg-gray-100 hover:bg-blue-200 dark:bg-gray-800 dark:hover:bg-blue-900 shadow transition" onClick={toggleTheme}>
                  <span className="text-xl">🌗</span>
                </button>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">Admin</span>
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-400 to-blue-700 dark:from-blue-700 dark:to-blue-400 border-2 border-white dark:border-gray-800 shadow-inner flex items-center justify-center">
                    <span className="font-bold text-white">A</span>
                  </div>
                </div>
              </div>
            </header>
            <main className="flex-1 p-8 overflow-auto bg-transparent">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
