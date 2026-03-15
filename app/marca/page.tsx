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
    <section className="space-y-6">
      <h1 className="text-xl font-semibold">Configurar Marca</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Preview */}
        <div className="p-4 border rounded-md bg-white">
          <div className="flex items-center justify-between mb-3">
            <strong>Vista previa de branding</strong>
            <span className="text-xs text-gray-500">Live preview</span>
          </div>

          <div className="h-12 rounded-md" style={{ background: rgb }} aria-label="Color de marca" />
          <div className="mt-3 text-sm text-gray-700">Color principal: {color}</div>
          <button className="mt-3 px-4 py-2 rounded-md bg-[rgb(var(--brand))] text-white" style={{ background: rgb }}>
            Acción de ejemplo
          </button>
        </div>

        <div className="p-4 border rounded-md bg-white">
          <div className="mb-2 text-sm text-gray-600">Selecciona color principal</div>
          <input
            type="color"
            value={color}
            onChange={(e) => apply(e.target.value)}
            className="w-14 h-9 border rounded"
            aria-label="Color principal"
          />
          <div className="mt-4">
            <label className="block text-sm mb-1">Código hex</label>
            <input
              type="text"
              value={color}
              onChange={(e) => {
                const val = e.target.value;
                if (/^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/.test(val)) {
                  apply(val);
                }
              }}
              className="w-full border rounded-md px-3 py-2 text-sm"
              placeholder="#3B82F6"
            />
          </div>
          <div className="mt-3 text-xs text-gray-500">
            Tip: también puedes definir variantes para hover/acc. secundaria en data-theme.
          </div>
        </div>
      </div>

      <div className="p-4 border rounded-md bg-white">
        <h3 className="text-sm font-semibold mb-2">Guarda preset de branding</h3>
        <button
          className="px-4 py-2 rounded-md bg-[rgb(var(--brand))] text-white hover:bg-[rgb(var(--brand-600))]"
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

      <div className="p-4 border rounded-md bg-white">
        <h3 className="text-sm font-semibold mb-2">Logotipo (placeholder)</h3>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-[rgb(var(--brand))] rounded-md flex items-center justify-center text-white font-bold">L</div>
          <div className="text-sm text-gray-700">Logo de muestra. Reemplázalo con tu SVG/PNG en producción.</div>
        </div>
      </div>
    </section>
  );
}