// frontend/pages/admin/settings.jsx
import { useState, useEffect } from 'react';

export default function SettingsAdmin() {
  const [configs, setConfigs] = useState([]);
  const [form, setForm] = useState({ channelName: '', config: {} });

  useEffect(() => {
    fetch('/admin/settings').then(r => r.json()).then(setConfigs);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('/admin/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    fetch('/admin/settings').then(r => r.json()).then(setConfigs);
    setForm({ channelName: '', config: {} });
  };

  return (
    <div>
      <h2>Configuración de canales</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Canal" value={form.channelName} onChange={e => setForm({ ...form, channelName: e.target.value })} />
        <input placeholder="Config JSON" value={JSON.stringify(form.config)} onChange={e => setForm({ ...form, config: JSON.parse(e.target.value || '{}') })} />
        <button type="submit">Guardar</button>
      </form>
      <ul>
        {configs.map(c => (
          <li key={c.id}>
            <b>{c.channelName}</b>: {JSON.stringify(c.config)}
          </li>
        ))}
      </ul>
    </div>
  );
}
