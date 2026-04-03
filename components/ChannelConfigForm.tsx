import React from 'react';

interface ChannelConfigFormProps {
  channel?: string;
}

const ChannelConfigForm: React.FC<ChannelConfigFormProps> = ({ channel }) => {
  return (
    <div>
      <h2>Configuración de canal {channel ? `: ${channel}` : ''}</h2>
      {/* Aquí puedes agregar los campos de configuración específicos */}
      <p>Formulario de configuración próximamente...</p>
    </div>
  );
};

export default ChannelConfigForm;
