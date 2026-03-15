import React, { useState } from 'react';
import MainLayout from '../layout/MainLayout';
import ChannelConfigForm from '../components/ChannelConfigForm';

const channels = ['WhatsApp', 'Messenger', 'Instagram'];

const ConfigureChannelsPage: React.FC = () => {
  const [configs, setConfigs] = useState<any>({});

  // Protección de acceso
  React.useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      window.location.href = "/login";
    }
    // Aquí puedes agregar fetch protegido para cargar configs
    // fetch("/admin/settings", { headers: { Authorization: `Bearer ${token}` } })
  }, []);

  const handleSave = (channel: string, config: any) => {
    setConfigs((prev: any) => ({ ...prev, [channel]: config }));
    // Ejemplo de cómo enviar token en fetch:
    // const token = localStorage.getItem("admin_token");
    // fetch("/admin/settings", {
    //   method: "PUT",
    //   headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    //   body: JSON.stringify({ channel, config })
    // });
  };

  return (
    <MainLayout>
      <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <span>Configurar canales</span>
        <span className="relative group">
          <svg className="w-5 h-5 text-blue-500 hover:text-purple-500 transition-colors cursor-pointer" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z" />
          </svg>
          <span className="absolute left-6 top-0 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">¿Cómo funciona?</span>
        </span>
      </h1>
      <p className="mb-6 text-gray-700">Aquí puedes conectar y configurar tus canales de venta.</p>
      <div className="bg-white rounded-lg shadow p-6 transition-shadow duration-300 hover:shadow-xl">
        <span className="text-gray-500">Próximamente: configuración avanzada de canales.</span>
        <button
          className="mt-4 px-4 py-2 bg-gradient-to-r from-blue-400 to-purple-400 text-white rounded shadow hover:scale-105 active:scale-95 transition-transform duration-200 focus:outline-none relative overflow-hidden"
          onClick={() => alert("Próximamente")}
        >
          <span className="relative z-10">Configurar</span>
          <span className="absolute inset-0 bg-white opacity-0 hover:opacity-10 transition-opacity duration-300" />
        </button>
      </div>
    </MainLayout>
  );
};

export default ConfigureChannelsPage;