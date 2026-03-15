"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function UsuariosPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!session) return;
    fetch("/api/usuarios")
      .then(res => res.json())
      .then(data => {
        setUsuarios(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Error al cargar usuarios");
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
      <h1 className="text-xl font-semibold mb-4">Usuarios</h1>
      <table className="w-full border text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-3 py-2 text-left">Nombre</th>
            <th className="px-3 py-2 text-left">Correo</th>
            <th className="px-3 py-2 text-left">Rol</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u: any) => (
            <tr key={u.id} className="border-t">
              <td className="px-3 py-2">{u.nombre}</td>
              <td className="px-3 py-2">{u.correo}</td>
              <td className="px-3 py-2">{u.rol}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}