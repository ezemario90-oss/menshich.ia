// Spinner animado
const Spinner = () => (
  <svg className="animate-spin" width="20" height="20" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke="#10B981" strokeWidth="4" opacity="0.2" />
    <path d="M12 2a10 10 0 0 1 10 10" stroke="#10B981" strokeWidth="4" strokeLinecap="round" />
  </svg>
);
// Iconos para canales
const IconWhatsApp = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="12" fill="#10B981" />
    <path d="M16.7 13.2c-.3-.2-.7-.3-1-.2-.2.1-.4.2-.6.4-.2.2-.4.3-.7.3-.3 0-.6-.1-.9-.3-.7-.4-1.3-1-1.7-1.7-.2-.3-.3-.6-.3-.9 0-.3.1-.5.3-.7.2-.2.3-.4.4-.6.1-.3 0-.7-.2-1l-.5-.9c-.2-.3-.5-.4-.8-.4-.3 0-.6.1-.8.3-.6.6-.9 1.4-.9 2.2 0 1.2.5 2.3 1.3 3.1.8.8 1.9 1.3 3.1 1.3.8 0 1.6-.3 2.2-.9.2-.2.3-.5.3-.8 0-.3-.1-.6-.4-.8l-.9-.5z" fill="#fff" />
  </svg>
);
const IconMessenger = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="12" fill="#10B981" />
    <path d="M7.5 15l3.5-4 2.5 2 3.5-4.5-7.5 6.5z" fill="#fff" />
  </svg>
);
const IconInstagram = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="12" fill="#10B981" />
    <rect x="7" y="7" width="10" height="10" rx="3" fill="#fff" />
    <circle cx="12" cy="12" r="3" fill="#10B981" />
    <circle cx="16" cy="8" r="1" fill="#10B981" />
  </svg>
);

import React, { useEffect, useState } from "react";
import MainLayout from "../src/layout/MainLayout";

const mockChannels = [
  { name: "WhatsApp", status: "Conectado", lastSync: "hace 2h" },
  { name: "Messenger", status: "Desconectado", lastSync: "hace 1d" },
  { name: "Instagram", status: "Conectado", lastSync: "hace 3h" },
];

const statusColors = {
  Conectado: "text-green-600",
  Desconectado: "text-red-600",
};

const ChannelsPage: React.FC = () => {
  const [channels, setChannels] = useState(mockChannels);
  // Para datos reales, usar useEffect y fetch a /api/canales
  // useEffect(() => {
  //   fetch("/api/canales")
  //     .then(res => res.json())
  //     .then(data => setChannels(data));
  // }, []);

  return (
    <MainLayout>
      <h1 className="text-xl font-semibold mb-6">Canales</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {channels.map((c) => (
          <div
            key={c.name}
            className="border border-gray-200 rounded-xl p-6 bg-white shadow-sm flex flex-col min-w-[160px] transition-all duration-300 hover:shadow-lg hover:scale-[1.03] opacity-0 animate-fadein"
            aria-label={`Canal ${c.name}`}
          >
            <div className="flex items-center gap-2 mb-2">
              {c.name === "WhatsApp" && <IconWhatsApp />}
              {c.name === "Messenger" && <IconMessenger />}
              {c.name === "Instagram" && <IconInstagram />}
              <span className="font-semibold text-lg">{c.name}</span>
            </div>
            <div className={`${statusColors[c.status] || "text-gray-500"} font-medium mb-1 flex items-center gap-2`}>
              {c.status === "Sincronizando" && <Spinner />}
              {c.status}
            </div>
            <div className="text-xs text-gray-500 mb-4">Última sincronización: {c.lastSync}</div>
            <button
              className="px-4 py-2 rounded-md bg-[rgb(var(--brand))] text-white hover:bg-[rgb(var(--brand-600))] focus:outline-none focus:ring focus:ring-brand-400 transition-transform duration-200 active:scale-95 relative overflow-hidden"
              style={{ marginTop: 12 }}
              aria-label={`Configurar canal ${c.name}`}
              onClick={e => {
                const btn = e.currentTarget;
                const ripple = document.createElement("span");
                ripple.className = "ripple";
                ripple.style.left = `${e.nativeEvent.offsetX}px`;
                ripple.style.top = `${e.nativeEvent.offsetY}px`;
                btn.appendChild(ripple);
                setTimeout(() => ripple.remove(), 600);
              }}
            >
              Configurar
            </button>


export default ChannelsPage;