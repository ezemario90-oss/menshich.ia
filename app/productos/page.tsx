"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const productosMock = [
  { id: 1, nombre: "Producto A", stock: 120, precio: "$25.00" },
  { id: 2, nombre: "Producto B", stock: 80, precio: "$40.00" },
  { id: 3, nombre: "Producto C", stock: 50, precio: "$15.00" },
];

export default function ProductosPage() {
  const sessionData = useSession() || {};
  const { data: session, status } = sessionData;
  const router = useRouter();
  if (status === "loading") return <div className="p-6">Cargando...</div>;
  if (!session) {
    router.push("/login");
    return null;
  }
  return (
    <section className="max-w-2xl mx-auto p-6 bg-white rounded-md shadow-md">
      <h1 className="text-xl font-semibold mb-4">Productos</h1>
      <table className="w-full border text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-3 py-2 text-left">Nombre</th>
            <th className="px-3 py-2 text-left">Stock</th>
            <th className="px-3 py-2 text-left">Precio</th>
          </tr>
        </thead>
        <tbody>
          {productosMock.map((p) => (
            <tr key={p.id} className="border-t">
              <td className="px-3 py-2">{p.nombre}</td>
              <td className="px-3 py-2">{p.stock}</td>
              <td className="px-3 py-2">{p.precio}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}