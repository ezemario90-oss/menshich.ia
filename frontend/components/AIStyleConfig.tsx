import React, { useState, useEffect } from 'react';
import { FaSmile, FaBriefcase, FaBolt, FaGraduationCap, FaGlobe, FaLightbulb, FaLaugh, FaHandshake, FaRocket } from 'react-icons/fa';

const STYLES = [
  { key: 'amigable', label: 'Amigable', icon: <FaSmile color="#4CAF50" /> },
  { key: 'formal', label: 'Formal', icon: <FaBriefcase color="#2196F3" /> },
  { key: 'comercial', label: 'Comercial', icon: <FaHandshake color="#FF9800" /> },
  { key: 'breve', label: 'Breve', icon: <FaBolt color="#9C27B0" /> },
  { key: 'experto', label: 'Experto', icon: <FaLightbulb color="#607D8B" /> },
  { key: 'humorístico', label: 'Humorístico', icon: <FaLaugh color="#E91E63" /> },
  { key: 'motivador', label: 'Motivador', icon: <FaRocket color="#F44336" /> },
  { key: 'educativo', label: 'Educativo', icon: <FaGraduationCap color="#3F51B5" /> },
  { key: 'multilingüe', label: 'Multilingüe', icon: <FaGlobe color="#009688" /> },
];

const EXAMPLES = {
  amigable: '¡Hola! ¿En qué puedo ayudarte hoy? 😊',
  formal: 'Estimado cliente, ¿cómo puedo asistirle?',
  comercial: '¡Tenemos ofertas especiales para ti! ¿Te interesa algún producto?',
  breve: '¿Qué necesitas?',
  experto: 'Según mi experiencia, te recomiendo este producto.',
  humorístico: '¡No te preocupes, no muerdo! 😄 ¿Qué buscas?',
  motivador: '¡Tú puedes lograrlo! ¿Te ayudo a elegir?',
  educativo: 'Te explico cómo funciona paso a paso.',
  multilingüe: 'Hello! Bonjour! ¿Prefieres otro idioma?',
};

export default function AIStyleConfig({ userStyles, onSave }) {
  const [selected, setSelected] = useState(userStyles ? userStyles.split(',') : []);
  const [example, setExample] = useState('');

  useEffect(() => {
    if (selected.length === 0) setExample('Elige uno o más estilos para ver ejemplos.');
    else setExample(selected.map(s => EXAMPLES[s]).filter(Boolean).join(' | '));
  }, [selected]);

  const toggleStyle = (key) => {
    setSelected(selected.includes(key)
      ? selected.filter(s => s !== key)
      : [...selected, key]);
  };

  useEffect(() => {
    if (onSave) onSave(selected.join(','));
  }, [selected, onSave]);

  return (
    <div style={{ padding: 24, background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px #eee' }}>
      <h2 style={{ marginBottom: 8 }}>Estilos de IA</h2>
      <p style={{ color: '#666', marginBottom: 16 }}>Personaliza cómo responde la inteligencia artificial a tus clientes. Puedes combinar varios estilos.</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 24 }}>
        {STYLES.map(({ key, label, icon }) => (
          <button
            key={key}
            onClick={() => toggleStyle(key)}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '8px 16px', borderRadius: 20,
              border: selected.includes(key) ? '2px solid #4CAF50' : '1px solid #ccc',
              background: selected.includes(key) ? '#E8F5E9' : '#fafafa',
              fontWeight: selected.includes(key) ? 'bold' : 'normal',
              cursor: 'pointer', boxShadow: '0 1px 4px #eee',
              transition: 'all 0.2s',
            }}
          >
            {icon} {label}
          </button>
        ))}
      </div>
      <div style={{ background: '#f5f5f5', borderRadius: 8, padding: 16, fontStyle: 'italic', color: '#333' }}>
        <span>Ejemplo de respuesta IA:</span>
        <div style={{ marginTop: 8 }}>{example}</div>
      </div>
    </div>
  );
}
