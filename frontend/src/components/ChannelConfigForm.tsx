import React, { useState } from 'react';

interface Props {
  channelName: string;
  onSave: (config: any) => void;
}

const ChannelConfigForm: React.FC<Props> = ({ channelName, onSave }) => {
  const [token, setToken] = useState('');
  const [endpoint, setEndpoint] = useState('');
  const [status, setStatus] = useState('Desconectado');

  const handleConnect = () => {
    // Aquí iría la lógica de verificación real
    setStatus('Conectado');
    onSave({ token, endpoint, status: 'Conectado' });
  };

  return (
    <form style={{ maxWidth: 320 }}>
      <h3>Configurar {channelName}</h3>
      <div style={{ marginBottom: 12 }}>
        <label>Token / Credencial</label>
        <input type="text" value={token} onChange={e => setToken(e.target.value)} style={{ width: '100%', padding: 8, borderRadius: 8, border: '1px solid var(--border)' }} />
      </div>
      <div style={{ marginBottom: 12 }}>
        <label>Endpoint</label>
        <input type="text" value={endpoint} onChange={e => setEndpoint(e.target.value)} style={{ width: '100%', padding: 8, borderRadius: 8, border: '1px solid var(--border)' }} />
      </div>
      <button className="btn" type="button" onClick={handleConnect} style={{ marginTop: 8 }}>Conectar</button>
      <div style={{ marginTop: 12, color: status === 'Conectado' ? '#10B981' : '#EF4444' }}>
        Estado: {status}
      </div>
    </form>
  );
};

export default ChannelConfigForm;
