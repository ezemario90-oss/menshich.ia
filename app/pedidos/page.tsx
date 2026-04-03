"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function PedidosPage() {
  const sessionData = useSession() || {};
  const { data: session, status } = sessionData;
  const router = useRouter();
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!session) return;
    fetch("/api/pedidos")
      .then(res => res.json())
      .then(data => {
        setPedidos(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Error al cargar pedidos");
        setLoading(false);
      });
  }, [session]);

  if (status === "loading" || loading) return <div className="p-6">Cargando...</div>;
  if (!session) {
    router.push("/login");
    return null;
  }
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <section className="max-w-3xl mx-auto p-8 rounded-3xl shadow-2xl bg-[rgba(255,255,255,0.85)] dark:bg-[rgba(32,34,48,0.85)] border-2 border-[rgb(var(--brand-600))] backdrop-blur-xl animate-fade-in">
      <h1 className="text-2xl font-extrabold mb-6 text-[rgb(var(--brand-700))] dark:text-[rgb(var(--brand))] tracking-wide drop-shadow">Pedidos</h1>
      <div className="overflow-x-auto rounded-2xl">
        <table className="w-full text-sm rounded-2xl overflow-hidden">
          <thead>
            <tr className="bg-gradient-to-r from-[rgb(var(--brand-600))] to-[rgb(var(--brand))] text-white">
              <th className="px-5 py-3 text-left font-semibold">Cliente</th>
              <th className="px-5 py-3 text-left font-semibold">Estado</th>
              <th className="px-5 py-3 text-left font-semibold">Total</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.map((p: any, idx: number) => (
              <tr key={p.id} className={`border-b last:border-0 ${idx % 2 === 0 ? 'bg-white/70 dark:bg-gray-900/40' : 'bg-white/40 dark:bg-gray-800/40'}`}>
                <td className="px-5 py-3 font-medium text-gray-800 dark:text-gray-100">{p.cliente}</td>
                <td className="px-5 py-3">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${p.estado === 'Entregado' ? 'bg-green-100 text-green-700' : p.estado === 'Pendiente' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-200 text-gray-700'}`}>{p.estado}</span>
                </td>
                <td className="px-5 py-3 text-right font-semibold text-[rgb(var(--brand-700))] dark:text-[rgb(var(--brand))]">{p.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 1s ease;
        }
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(-20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}