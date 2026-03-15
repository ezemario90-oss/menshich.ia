import React, { useState } from 'react';
import MainLayout from '../src/layout/MainLayout';

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState({ nombre: 'Admin', email: 'admin@demo.com' });

  const [fadeIn, setFadeIn] = useState(false);
  useEffect(() => {
    setFadeIn(true);
  }, []);
  return (
    <MainLayout>
      <div className={`min-h-screen p-8 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 transition-all duration-700 ${fadeIn ? "opacity-100" : "opacity-0"}`}>
        <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <span>Perfil</span>
          <span className="relative group">
            <svg className="w-5 h-5 text-blue-500 hover:text-purple-500 transition-colors cursor-pointer" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z" />
            </svg>
            <span className="absolute left-6 top-0 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">Editar perfil</span>
          </span>
        </h1>
        <form className="max-w-xs mx-auto bg-white rounded-lg shadow p-6 transition-all duration-700">
          <div className="mb-4 relative group">
            <label htmlFor="nombre" className="block text-sm font-medium mb-1">Nombre
              <span className="absolute left-20 top-0 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">Nombre completo</span>
            </label>
            <input
              id="nombre"
              type="text"
              value={user.nombre}
              onChange={e => setUser({ ...user, nombre: e.target.value })}
              className="w-full px-3 py-2 rounded border border-gray-300 focus:border-blue-400 transition-all duration-300 focus:outline-none hover:border-purple-400"
              aria-label="Nombre completo"
            />
          </div>
          <div className="mb-4 relative group">
            <label htmlFor="email" className="block text-sm font-medium mb-1">Email
              <span className="absolute left-16 top-0 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">Correo electrónico</span>
            </label>
            <input
              id="email"
              type="email"
              value={user.email}
              onChange={e => setUser({ ...user, email: e.target.value })}
              className="w-full px-3 py-2 rounded border border-gray-300 focus:border-blue-400 transition-all duration-300 focus:outline-none hover:border-purple-400"
              aria-label="Correo electrónico"
            />
          </div>
          <button
            className="w-full mt-2 px-4 py-2 bg-purple-700 text-white rounded shadow hover:bg-purple-500 active:scale-95 transition-transform duration-200 focus:outline-none"
            type="submit"
            aria-label="Guardar perfil"
          >
            Guardar
          </button>
        </form>
      </div>
    </MainLayout>
  );
};

export default ProfilePage;