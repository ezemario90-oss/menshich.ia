import { useEffect, useState } from "react";

type Conn = {
  id: string;
  provider: string;
  providerAccountId: string;
  connectedAt?: string;
};


export default function Dashboard() {
  const [connections, setConnections] = useState<Conn[]>([]);
  const [fadeIn, setFadeIn] = useState(false);
  useEffect(() => {
    setFadeIn(true);
    const token = localStorage.getItem("admin_token");
    if (!token) {
      window.location.href = "/login";
      return;
    }
    fetch("/api/connections", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((r) => {
        if (r.status === 401) {
          window.location.href = "/login";
          return null;
        }
        return r.json();
      })
      .then((data) => data && setConnections(data.connections ?? []))
      .catch(() => {});
  }, []);

  return (
    <div className={`min-h-screen p-8 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 transition-all duration-700 ${fadeIn ? "opacity-100" : "opacity-0"}`}>
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <span>Conexiones</span>
        <span className="relative group">
          <svg className="w-5 h-5 text-blue-500 hover:text-purple-500 transition-colors cursor-pointer" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z" />
          </svg>
          <span className="absolute left-6 top-0 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">¿Qué es una conexión?</span>
        </span>
      </h2>
      {connections.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-6 transition-shadow duration-300 hover:shadow-xl text-gray-500">Aún no has conectado ninguna cuenta.</div>
      ) : (
        <ul className="space-y-3">
          {connections.map((c) => (
            <li
              key={c.id}
              className="bg-white rounded-lg shadow p-4 flex items-center gap-4 hover:bg-blue-50 transition-colors group"
            >
              <span className="font-semibold text-purple-600">{c.provider}</span>
              <span className="text-gray-700">{c.providerAccountId}</span>
              <span className="relative group ml-auto">
                <button
                  className="px-3 py-1 bg-gradient-to-r from-blue-400 to-purple-400 text-white rounded shadow hover:scale-105 active:scale-95 transition-transform duration-200 focus:outline-none"
                  onClick={() => alert('Desconectar próximamente')}
                >
                  Desconectar
                </button>
                <span className="absolute left-0 top-8 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">Desconectar cuenta</span>
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}