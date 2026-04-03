"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const sessionData = useSession() || {};
  const { data: session, status } = sessionData;
  const router = useRouter();

  // Mensaje de bienvenida visual (sin login obligatorio en home)
  const nombreCliente = session?.user?.name || session?.user?.email || "Invitado";

  return (
    <>
      {/* Mensaje de bienvenida visual */}
      <div className="mb-8 p-6 rounded-3xl bg-gradient-to-r from-[rgb(var(--brand-700))] via-[rgb(var(--brand))] to-white dark:from-[rgb(var(--brand-700))] dark:via-[rgb(var(--brand))] dark:to-[rgb(var(--surface))] border-2 border-[rgb(var(--brand-600))] text-white font-semibold text-lg flex items-center gap-6 shadow-xl animate-fade-in">
        <span className="text-5xl drop-shadow-lg">🚀</span>
        <div>
          <div className="text-2xl font-extrabold tracking-wide drop-shadow">¡Bienvenido, {nombreCliente}!</div>
          <div className="text-base text-white/90">Esta es la página principal de <span className="font-bold text-yellow-300">mengchig.ia</span>. Disfruta de la nueva experiencia visual y navega por el panel futurista.</div>
        </div>
      </div>
      {/* Tarjetas métricas con glassmorphism y animaciones */}
      <section aria-label="Dashboard" className="dashboard-cards">
        <div className="dashboard-card" style={{'--card-accent': '#3B82F6'} as any}>
          <div className="card-icon bg-gradient-to-tr from-blue-400 to-blue-700 shadow-lg">
            <span style={{fontSize: '2.6rem', filter: 'drop-shadow(0 2px 8px #3B82F6AA)'}}>💡</span>
          </div>
          <div className="card-title">Innovación</div>
          <div className="card-value">100%</div>
          <div className="card-diff text-green-600">+100%</div>
        </div>
        <div className="dashboard-card" style={{'--card-accent': '#22d3ee'} as any}>
          <div className="card-icon bg-gradient-to-tr from-cyan-400 to-cyan-700 shadow-lg">
            <span style={{fontSize: '2.6rem', filter: 'drop-shadow(0 2px 8px #22d3eeAA)'}}>🌐</span>
          </div>
          <div className="card-title">Conectividad</div>
          <div className="card-value">24/7</div>
          <div className="card-diff text-green-600">Siempre</div>
        </div>
        <div className="dashboard-card" style={{'--card-accent': '#f59e42'} as any}>
          <div className="card-icon bg-gradient-to-tr from-yellow-400 to-yellow-700 shadow-lg">
            <span style={{fontSize: '2.6rem', filter: 'drop-shadow(0 2px 8px #f59e42AA)'}}>⭐</span>
          </div>
          <div className="card-title">Calidad</div>
          <div className="card-value">Premium</div>
          <div className="card-diff text-green-600">Top</div>
        </div>
        <div className="dashboard-card" style={{'--card-accent': '#a855f7'} as any}>
          <div className="card-icon bg-gradient-to-tr from-purple-400 to-purple-700 shadow-lg">
            <span style={{fontSize: '2.6rem', filter: 'drop-shadow(0 2px 8px #a855f7AA)'}}>🚀</span>
          </div>
          <div className="card-title">Crecimiento</div>
          <div className="card-value">+∞</div>
          <div className="card-diff text-green-600">Sin límites</div>
        </div>
      </section>
      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 1s ease;
        }
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(-20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .dashboard-cards {
          display: flex;
          gap: 32px;
          flex-wrap: wrap;
          justify-content: center;
        }
        .dashboard-card {
          background: var(--card-glass);
          box-shadow: var(--shadow);
          border-radius: 1.5rem;
          padding: 2.5rem 2.5rem 2rem 2.5rem;
          min-width: 220px;
          min-height: 180px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          transition: transform 0.2s, box-shadow 0.2s, background 0.3s;
          border: 2px solid var(--card-accent, #3B82F6);
          backdrop-filter: blur(8px);
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }
        .dashboard-card:hover {
          transform: translateY(-8px) scale(1.04) rotate(-1deg);
          box-shadow: 0 16px 48px 0 rgba(59,130,246,0.18), 0 2px 24px 0 #00fff744;
          background: rgba(255,255,255,0.96);
          z-index: 2;
        }
        .card-icon {
          width: 3.5rem;
          height: 3.5rem;
          border-radius: 1.2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2.2rem;
          margin-bottom: 1.2rem;
          box-shadow: 0 2px 16px #00fff7cc44;
        }
        .card-title {
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--card-accent, #3B82F6);
          margin-bottom: 0.5rem;
          letter-spacing: 0.04em;
        }
        .card-value {
          font-size: 2.2rem;
          font-weight: 800;
          color: rgb(var(--text));
          margin-bottom: 0.2rem;
          text-shadow: 0 2px 8px #00fff7cc44;
        }
        .card-diff {
          font-size: 1rem;
          font-weight: 500;
        }
        @media (max-width: 900px) {
          .dashboard-cards {
            flex-direction: column;
            gap: 20px;
            align-items: center;
          }
        }
      `}</style>
    </>
  );
}
