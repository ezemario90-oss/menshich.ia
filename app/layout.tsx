"use client";
import Link from "next/link";
import { useState } from "react";

const NAV = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/productos", label: "Productos" },
  { href: "/pedidos", label: "Pedidos" },
  { href: "/usuarios", label: "Usuarios" },
  { href: "/marca", label: "Marca" },
  { href: "/canales", label: "Canales" },
  { href: "/configurar-canales", label: "Configurar Canales" },
  { href: "/perfil", label: "Perfil" },
];

export default function RootLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <html lang="es" data-theme="default">
      <body className="bg-[rgb(var(--bg))] text-[rgb(var(--text))]">
        <div className="flex h-screen">
          {/* Sidebar */}
          <aside className={`${collapsed ? "w-16" : "w-64"} bg-[rgb(var(--surface))] border-r border-gray-200 z-10 transition-all duration-200`}>
            <div className="h-12 flex items-center justify-between p-4 border-b">
              <span className="font-semibold text-lg">mengchig.ia</span>
              <button aria-label="Ocultar menú" onClick={() => setCollapsed(!collapsed)}>
                <span>{collapsed ? ">" : "<"}</span>
              </button>
            </div>
            <nav className="mt-4">
              {NAV.map((n) => (
                <Link key={n.href} href={n.href} className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100">
                  <span className="text-sm">{n.label}</span>
                </Link>
              ))}
            </nav>
          </aside>
          {/* Contenido principal */}
          <div className="flex-1 flex flex-col">
            {/* Topbar */}
            <header className="h-14 flex items-center justify-between px-4 border-b bg-white border-gray-200">
              <div className="flex items-center gap-3">
                <button className="md:hidden" aria-label="Abrir menú"></button>
                <div className="w-full max-w-md">
                  <input type="text" placeholder="Buscar en la app..." className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm" />
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
