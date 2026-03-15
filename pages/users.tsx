import React, { useState } from 'react';
import MainLayout from '../layout/MainLayout';

const mockUsers = [
  { id: 'u1', nombre: 'Admin', email: 'admin@demo.com' },
  { id: 'u2', nombre: 'Juan', email: 'juan@demo.com' },
  { id: 'u3', nombre: 'Ana', email: 'ana@demo.com' },
];

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState(mockUsers);

  const handleDelete = (id: string) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  const [fadeIn, setFadeIn] = useState(false);
  useEffect(() => {
    setFadeIn(true);
  }, []);
  return (
    <MainLayout>
      <div className={`min-h-screen p-8 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 transition-all duration-700 ${fadeIn ? "opacity-100" : "opacity-0"}`}>
        <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <span>Usuarios</span>
          <span className="relative group">
            <svg className="w-5 h-5 text-blue-500 hover:text-purple-500 transition-colors cursor-pointer" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z" />
            </svg>
            <span className="absolute left-6 top-0 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">Gestión de usuarios</span>
          </span>
        </h1>
        <table className="w-full border-collapse bg-white rounded-lg shadow transition-all duration-700">
          <thead>
            <tr className="bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100">
              <th>Nombre</th>
              <th>Email</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-blue-50 transition-colors group">
                <td>{u.nombre}</td>
                <td>{u.email}</td>
                <td className="flex gap-2">
                  <span className="relative group">
                    <button
                      className="px-3 py-1 bg-red-500 text-white rounded shadow hover:bg-red-600 active:scale-95 transition-all duration-200 focus:outline-none"
                      onClick={() => handleDelete(u.id)}
                    >
                      Eliminar
                    </button>
                    <span className="absolute left-0 top-8 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">Eliminar usuario</span>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </MainLayout>
  );
};

export default UsersPage;