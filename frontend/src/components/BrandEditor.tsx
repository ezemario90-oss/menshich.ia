import React, { useState } from 'react';

type BrandDraft = {
  logoUrl?: string;
  primary: string;
  background: string;
  text: string;
  surface: string;
};

const BrandEditor: React.FC = () => {
  const [draft, setDraft] = useState<BrandDraft>({
    logoUrl: '',
    primary: '#4F46E5',
    background: '#F7F8FB',
    text: '#1F2937',
    surface: '#FFFFFF',
  });
  const [fadeIn, setFadeIn] = useState(false);
  useEffect(() => {
    setFadeIn(true);
  }, []);

  return (
    <div className={`brand-editor transition-all duration-700 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
      <section className="editor">
        <div className="field relative group">
          <label>Logo
            <span className="absolute left-20 top-0 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">URL de imagen PNG/JPG</span>
          </label>
          <input type="text" placeholder="URL de logo" value={draft.logoUrl ?? ''} onChange={(e) => setDraft({ ...draft, logoUrl: e.target.value })} className="transition-colors duration-300 focus:border-blue-400" />
        </div>
        <div className="field relative group">
          <label>Color primario
            <span className="absolute left-24 top-0 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">Color principal de marca</span>
          </label>
          <input type="color" value={draft.primary} onChange={(e) => setDraft({ ...draft, primary: e.target.value })} className="cursor-pointer transition-all duration-300" />
        </div>
        <div className="field relative group">
          <label>Fondo
            <span className="absolute left-16 top-0 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">Color de fondo general</span>
          </label>
          <input type="color" value={draft.background} onChange={(e) => setDraft({ ...draft, background: e.target.value })} className="cursor-pointer transition-all duration-300" />
        </div>
        <div className="field relative group">
          <label>Texto
            <span className="absolute left-16 top-0 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">Color de texto</span>
          </label>
          <input type="color" value={draft.text} onChange={(e) => setDraft({ ...draft, text: e.target.value })} className="cursor-pointer transition-all duration-300" />
        </div>
        <div className="field relative group">
          <label>Fondo de superficie
            <span className="absolute left-32 top-0 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">Paneles y tarjetas</span>
          </label>
          <input type="color" value={draft.surface} onChange={(e) => setDraft({ ...draft, surface: e.target.value })} className="cursor-pointer transition-all duration-300" />
        </div>
      </section>

      <section className="preview" aria-label="Vista previa de branding">
        <div className="preview-header bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 transition-all duration-700" style={{ background: draft.background, color: draft.text }}>
          {draft.logoUrl ? <img src={draft.logoUrl} alt="Logo" style={{ height: 40 }} /> : <span>Logo aquí</span>}
          <span className="brand-title" style={{ color: draft.text }}>Mi Marca</span>
        </div>
        <div className="preview-body" style={{ background: draft.surface, color: draft.text }}>
          <h3 style={{ color: draft.text }}>Vista previa</h3>
          <p>Texto de ejemplo en el tema elegido. Este panel muestra cómo se verá la app con tu branding.</p>
          <button
            className="btn transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none bg-gradient-to-r from-blue-400 to-purple-400 text-white"
            style={{ background: draft.primary, color: '#fff' }}
          >
            Acción ejemplo
          </button>
        </div>
      </section>

      <style jsx>{`
        .brand-editor { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; align-items: start; }
        .field { display: flex; flex-direction: column; margin-bottom: 12px; position: relative; }
        .field label { font-size: 12px; color: var(--text-muted); margin-bottom: 6px; }
        .preview { border: 1px solid var(--border); border-radius: 12px; overflow: hidden; }
        .preview-header { display: flex; align-items: center; gap: 12px; padding: 12px 16px; font-weight: 600; }
        .preview-body { padding: 16px; }
        .brand-title { font-size: 18px; font-weight: 700; }
      `}</style>
    </div>
  );
};

export default BrandEditor;
