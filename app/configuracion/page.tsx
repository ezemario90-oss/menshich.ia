"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function ConfiguracionPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  if (status === "loading") return <div className="p-6">Cargando...</div>;
  if (!session) {
    router.push("/login");
    return null;
  }
  return (
    <section className="max-w-xl mx-auto p-6 bg-white rounded-md shadow-md">
      <h1 className="text-xl font-semibold mb-4">Configuración de usuario</h1>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Idioma</label>
          <select className="w-full border rounded-md px-3 py-2 text-sm">
            <option>Español</option>
            <option>Inglés</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Notificaciones</label>
          <input type="checkbox" className="mr-2" /> Recibir notificaciones
        </div>
        <button className="mt-4 px-4 py-2 rounded-md bg-[rgb(var(--brand))] text-white">Guardar configuración</button>
      </div>
    </section>
  );
}