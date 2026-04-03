"use client";
import React from 'react';
type Props = {
  title: string;
  value: string | number;
  delta?: string;
  icon?: React.ReactNode;
  color?: string;
};

export default function MetricCard({ title, value, delta, icon, color = "bg-brand-500" }: Props) {
  return (
    <div className="dashboard-card animate-fade-in" style={{'--card-accent': color}}>
      <div className="card-icon bg-gradient-to-tr from-blue-400 to-blue-700">
        {icon ?? <span>🏷️</span>}
      </div>
      <div className="card-title">{title}</div>
      <div className="card-value">{value}</div>
      {delta && <div className="card-diff text-green-600">{delta}</div>}
      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 1s ease;
        }
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(-20px); }
          100% { opacity: 1; transform: translateY(0); }
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
          .dashboard-card {
            min-width: 90vw;
            padding: 2rem 1rem;
          }
        }
      `}</style>
    </div>
  );
}
