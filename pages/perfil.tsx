import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function PerfilPage() {
  const sessionData = useSession() || {};
  const { data: session, status } = sessionData;
  const router = useRouter();
  if (status === "loading") return <div className="p-6">Cargando...</div>;
  if (!session) {
    if (typeof window !== "undefined") router.push("/login");
    return null;
  }
  return (
    <section className="max-w-xl mx-auto p-8 bg-[rgba(30,32,60,0.92)] rounded-2xl shadow-2xl border-2 border-[#00fff7] backdrop-blur-md animate-fade-in">
      <h1 className="text-3xl font-extrabold mb-8 text-center text-[#fff200] tracking-widest drop-shadow-lg font-[Orbitron,sans-serif] uppercase animate-title-glow">
        Perfil de usuario
      </h1>
      <div className="space-y-6">
        <div className="flex flex-col gap-1">
          <label className="block text-base font-bold text-[#00fff7] mb-1 tracking-wide">Nombre</label>
          <input className="w-full border-2 border-[#00fff7] rounded-lg px-4 py-3 text-base bg-[rgba(255,255,255,0.08)] text-white font-semibold focus:outline-none focus:ring-2 focus:ring-[#fff200] transition-all duration-300 shadow-inner placeholder:text-[#00fff7bb]" placeholder="Nombre completo" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="block text-base font-bold text-[#00fff7] mb-1 tracking-wide">Correo</label>
          <input className="w-full border-2 border-[#00fff7] rounded-lg px-4 py-3 text-base bg-[rgba(255,255,255,0.08)] text-white font-semibold focus:outline-none focus:ring-2 focus:ring-[#fff200] transition-all duration-300 shadow-inner placeholder:text-[#00fff7bb]" placeholder="correo@cliente.com" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="block text-base font-bold text-[#00fff7] mb-1 tracking-wide">Rol</label>
          <input className="w-full border-2 border-[#00fff7] rounded-lg px-4 py-3 text-base bg-[rgba(255,255,255,0.08)] text-white font-semibold focus:outline-none focus:ring-2 focus:ring-[#fff200] transition-all duration-300 shadow-inner placeholder:text-[#00fff7bb]" placeholder="Administrador" />
        </div>
        <button className="mt-6 w-full px-6 py-3 rounded-xl bg-gradient-to-r from-[#00fff7] to-[#7f00ff] text-[#23243a] font-extrabold text-lg tracking-widest shadow-lg border-2 border-[#fff200] hover:scale-105 hover:shadow-2xl hover:bg-gradient-to-l hover:from-[#fff200] hover:to-[#00fff7] transition-all duration-300 animate-pulse-glow">
          Guardar cambios
        </button>
      </div>
    </section>
  );
}
