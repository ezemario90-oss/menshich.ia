"use client";
import MetricCard from "../../components/MetricCard";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") return <div className="p-6">Cargando...</div>;
  if (!session) {
    router.push("/login");
    return null;
  }

  // Mensaje de bienvenida visual
  const nombreCliente = session?.user?.name || session?.user?.email || "Cliente";

  return (
    <>
      <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-[rgb(var(--brand))] via-[rgb(var(--brand-surface))] to-white border border-[rgb(var(--brand))] text-[rgb(var(--brand))] font-semibold text-lg flex items-center gap-4 animate-fade-in">
        <span className="text-3xl">✅</span>
        <div>
          <div className="text-xl font-bold">¡Hola, {nombreCliente}!</div>
          <div>Bienvenido a <span className="font-bold">mengchig.ia</span>. <span className="text-green-600">La aplicación está activa</span> y lista para ayudarte.</div>
        </div>
      </div>
      <section aria-label="Dashboard" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Ventas" value="$12,430" delta="+8.2%" color="bg-brand-500" />
        <MetricCard title="Pedidos" value="1,240" delta="+2.1%" />
        <MetricCard title="Stock" value="780" delta="-1.3%" color="bg-brand-600" />
        <MetricCard title="Mensajes" value="58" delta="+5%" color="bg-brand-700" />
      </section>
      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 1s ease;
        }
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(-20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}
