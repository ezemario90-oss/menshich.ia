// frontend/pages/admin/settings.jsx
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function SettingsAdmin() {
  const [configs, setConfigs] = useState([]);
  const [form, setForm] = useState({ channelName: '', config: {} });
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      router.push('/admin/login');
      return;
    }
    fetch('/admin/settings', {
      headers: { 'Authorization': 'Bearer ' + token }
    })
      .then(r => r.json())
      .then(setConfigs);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('admin_token');
    await fetch('/admin/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
      body: JSON.stringify(form)
    });
    fetch('/admin/settings', {
      headers: { 'Authorization': 'Bearer ' + token }
    })
      .then(r => r.json())
      .then(setConfigs);
    setForm({ channelName: '', config: {} });
  };

  return (
      <div style={{ padding: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24 }}>
          <img src="/logo.svg" alt="mengsinch.ia logo" style={{ height: 48, marginRight: 16 }} />
          <span style={{ fontSize: 28, color: '#1976D2', fontWeight: 'bold' }}>mengsinch.ia</span>
        </div>
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
