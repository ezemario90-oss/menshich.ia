import React, { useState } from 'react';
import MainLayout from '../layout/MainLayout';

const mockChannels = [
  { name: 'WhatsApp', status: 'Conectado', lastSync: 'hace 2h' },
  { name: 'Messenger', status: 'Desconectado', lastSync: 'hace 1d' },
  { name: 'Instagram', status: 'Conectado', lastSync: 'hace 3h' },
];

const ChannelsPage: React.FC = () => {
  const [channels] = useState(mockChannels);

  return (
    <MainLayout>
      <h1>Canales</h1>
      <div style={{ display: 'flex', gap: 24 }}>
        {channels.map((c) => (
          <div key={c.name} style={{ border: '1px solid var(--border)', borderRadius: 12, padding: 16, minWidth: 160 }}>
            <div style={{ fontWeight: 600 }}>{c.name}</div>
            <div style={{ color: c.status === 'Conectado' ? '#10B981' : '#EF4444' }}>
              {c.status}
            </div>
            <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>Última sincronización: {c.lastSync}</div>
            <button className="btn" style={{ marginTop: 12 }}>Configurar</button>
          </div>
        ))}
      </div>
    </MainLayout>
  );
};

export default ChannelsPage;