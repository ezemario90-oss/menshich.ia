"use client";
import { useEffect, useMemo, useState } from "react";

function hexToRgb(hex: string) {
  const h = hex.replace("#", "");
  const bigint = parseInt(h.length === 3 ? h.split("").map((c) => c + c).join("") : h, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return { r, g, b };
}
function setBrandFromHex(hex: string) {
  const { r, g, b } = hexToRgb(hex);
  const root = document.documentElement;
  root.style.setProperty("--brand", `${r},${g},${b}`);
  root.style.setProperty("--brand-600", `${Math.round(r * 0.85)},${Math.round(g * 0.85)},${Math.round(b * 0.85)}`);
  root.style.setProperty("--brand-700", `${Math.round(r * 0.75)},${Math.round(g * 0.75)},${Math.round(b * 0.75)}`);
}
function useBrandingPersistence(defaultHex: string) {
  const [color, setColor] = useState<string>(defaultHex);
  useEffect(() => {
    const saved = localStorage.getItem("branding-color");
    if (saved) {
      setColor(saved);
      setBrandFromHex(saved);
    } else {
      setBrandFromHex(defaultHex);
    }
  }, [defaultHex]);

  const apply = (hex: string) => {
    setColor(hex);
    setBrandFromHex(hex);
    localStorage.setItem("branding-color", hex);
  };

  return { color, apply };
}

export default function MarcaPage() {
  const { color, apply } = useBrandingPersistence("#3B82F6"); // default azul

  const rgb = useMemo(() => {
    const { r, g, b } = hexToRgb(color);
    return `rgb(${r}, ${g}, ${b})`;
  }, [color]);

  return (
    <section className="max-w-2xl mx-auto p-8 rounded-3xl shadow-2xl bg-[rgba(255,255,255,0.85)] dark:bg-[rgba(32,34,48,0.85)] border-2 border-[rgb(var(--brand-600))] backdrop-blur-xl animate-fade-in space-y-8">
      <h1 className="text-2xl font-extrabold mb-6 text-[rgb(var(--brand-700))] dark:text-[rgb(var(--brand))] tracking-wide drop-shadow">Configurar Marca</h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Preview */}
        <div className="p-6 border-2 border-[rgb(var(--brand-600))] rounded-2xl bg-[rgba(255,255,255,0.95)] dark:bg-[rgba(32,34,48,0.95)] shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <strong className="text-lg text-[rgb(var(--brand-700))] dark:text-[rgb(var(--brand))]">Vista previa de branding</strong>
            <span className="text-xs text-gray-500">Live preview</span>
          </div>
          <div className="h-12 rounded-xl shadow-inner border-2 border-[rgb(var(--brand-600))]" style={{ background: rgb }} aria-label="Color de marca" />
          <div className="mt-3 text-sm text-gray-700 dark:text-gray-200">Color principal: {color}</div>
          <button className="mt-3 px-4 py-2 rounded-md bg-[rgb(var(--brand))] text-white shadow-lg hover:scale-105 transition" style={{ background: rgb }}>
            Acción de ejemplo
          </button>
        </div>

        {/* Editor */}
        <div className="p-6 border-2 border-[rgb(var(--brand-600))] rounded-2xl bg-[rgba(255,255,255,0.95)] dark:bg-[rgba(32,34,48,0.95)] shadow-lg flex flex-col items-center justify-center">
          <div className="mb-4 font-semibold text-[rgb(var(--brand-700))] dark:text-[rgb(var(--brand))]">Color principal de la marca</div>
          <input
            type="color"
            value={color}
            onChange={e => apply(e.target.value)}
            className="w-20 h-20 p-0 border-4 border-[rgb(var(--brand-600))] rounded-full bg-transparent cursor-pointer shadow-lg transition-all duration-200 hover:scale-110"
            aria-label="Color principal"
          />
          <div className="mt-4 w-full">
            <label className="block text-sm mb-1 text-gray-600 dark:text-gray-300">Código hex</label>
            <input
              type="text"
              value={color}
              onChange={e => {
                const val = e.target.value;
                if (/^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/.test(val)) {
                  apply(val);
                }
              }}
              className="w-full border-2 border-[rgb(var(--brand-600))] rounded-md px-3 py-2 text-sm bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 shadow"
              placeholder="#3B82F6"
            />
          </div>
          <div className="mt-3 text-xs text-gray-500 text-center">
            Tip: también puedes definir variantes para hover/accent secundaria en data-theme.
          </div>
        </div>
      </div>

      <div className="p-6 border-2 border-[rgb(var(--brand-600))] rounded-2xl bg-[rgba(255,255,255,0.95)] dark:bg-[rgba(32,34,48,0.95)] shadow-lg">
        <h3 className="text-sm font-semibold mb-2 text-[rgb(var(--brand-700))] dark:text-[rgb(var(--brand))]">Guarda preset de branding</h3>
        <button
          className="px-4 py-2 rounded-md bg-[rgb(var(--brand))] text-white hover:bg-[rgb(var(--brand-600))] shadow-lg transition"
          onClick={() => {
            localStorage.setItem("branding-color", color);
            alert("Preset guardado.");
          }}
        >
          Guardar preset
        </button>
        <p className="text-xs text-gray-500 mt-2">
          Este preset se aplica a toda la app mediante variables CSS (tema por cliente).
        </p>
      </div>

      <div className="p-6 border-2 border-[rgb(var(--brand-600))] rounded-2xl bg-[rgba(255,255,255,0.95)] dark:bg-[rgba(32,34,48,0.95)] shadow-lg">
        <h3 className="text-sm font-semibold mb-2 text-[rgb(var(--brand-700))] dark:text-[rgb(var(--brand))]">Logotipo (placeholder)</h3>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-[rgb(var(--brand))] rounded-md flex items-center justify-center text-white font-bold text-xl shadow">L</div>
          <div className="text-sm text-gray-700 dark:text-gray-200">Logo de muestra. Reemplázalo con tu SVG/PNG en producción.</div>
        </div>
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