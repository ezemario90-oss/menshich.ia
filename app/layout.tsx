import "./globals.css";
import "./globals.css";
import "./styles/SidebarFuturista.css";
import Sidebar from "../components/Sidebar";
import { useState } from "react";

export default function RootLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <html lang="es" data-theme="default">
      <body className="bg-[rgb(var(--bg))] text-[rgb(var(--text))]">
        <div className="flex h-screen">
          {/* Sidebar futurista único */}
          <aside className={`sidebar ${collapsed ? "w-16" : "w-64"} transition-all duration-200 flex flex-col`}>
            <Sidebar />
          </aside>
          {/* Contenido principal */}
          <div className="flex-1 flex flex-col">
            {/* Topbar */}
            <header className="h-14 flex items-center justify-between px-4 border-b bg-white border-gray-200">
              <div className="flex items-center gap-3">
                <button className="md:hidden" aria-label="Abrir menú"></button>
                <div className="w-full max-w-md">
                  <input type="text" placeholder="PRUEBA RENDER" className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm" />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button aria-label="Cambiar tema" className="p-2 rounded-md bg-gray-100 hover:bg-gray-200">🌗</button>
                <div className="flex items-center gap-2">
                  <span className="text-sm">Admin</span>
                  <div className="w-8 h-8 rounded-full bg-gray-300" />
                </div>
              </div>
            </header>
            <main className="p-6 overflow-auto">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
