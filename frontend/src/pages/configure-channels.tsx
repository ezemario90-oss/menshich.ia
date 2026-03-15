import React, { useState } from 'react';
import MainLayout from '../layout/MainLayout';
import ChannelConfigForm from '../components/ChannelConfigForm';

const channels = ['WhatsApp', 'Messenger', 'Instagram'];

const ConfigureChannelsPage: React.FC = () => {
  const [configs, setConfigs] = useState<any>({});

  const handleSave = (channel: string, config: any) => {
    setConfigs((prev: any) => ({ ...prev, [channel]: config }));
  };

  return (
    <MainLayout>
      <h1>Configurar Canales</h1>
      <div style={{ display: 'flex', gap: 32 }}>
        {channels.map((c) => (
          <ChannelConfigForm
            key={c}
            channelName={c}
            onSave={(config) => handleSave(c, config)}
          />
        ))}
      </div>
      <pre style={{ marginTop: 32, background: '#f7f8fb', padding: 16, borderRadius: 8 }}>
        {JSON.stringify(configs, null, 2)}
      </pre>
    </MainLayout>
  );
};

export default ConfigureChannelsPage;
