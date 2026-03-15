import React, { useState, useEffect } from 'react';
import MainLayout from '../src/layout/MainLayout';

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      window.location.href = "/login";
      return;
    }
    fetch("/admin/users", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((r) => {
        if (r.status === 401) {
          window.location.href = "/login";
          return null;
        }
        return r.json();
      })
      .then((data) => data && setUsers(data))
      .catch(() => {});
  }, []);

  const handleDelete = (id: string) => {
    setUsers(users.filter((u) => u.id !== id));
    // Aquí puedes agregar lógica para eliminar en backend
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