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
    <section className="max-w-2xl mx-auto p-6 bg-white rounded-md shadow-md">
      <h1 className="text-xl font-semibold mb-4">Pedidos</h1>
      <table className="w-full border text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-3 py-2 text-left">Cliente</th>
            <th className="px-3 py-2 text-left">Estado</th>
            <th className="px-3 py-2 text-left">Total</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.map((p: any) => (
            <tr key={p.id} className="border-t">
              <td className="px-3 py-2">{p.cliente}</td>
              <td className="px-3 py-2">{p.estado}</td>
              <td className="px-3 py-2">{p.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}