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

  return (
    <MainLayout>
      <h1>Usuarios</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.nombre}</td>
              <td>{u.email}</td>
              <td>
                <button className="btn btn--danger" onClick={() => handleDelete(u.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </MainLayout>
  );
};

export default UsersPage;
