import React, { useState } from 'react';
import MainLayout from '../layout/MainLayout';

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState({ nombre: 'Admin', email: 'admin@demo.com' });

  return (
    <MainLayout>
      <h1>Perfil</h1>
      <form style={{ maxWidth: 320 }}>
        <div style={{ marginBottom: 16 }}>
          <label>Nombre</label>
          <input type="text" value={user.nombre} onChange={e => setUser({ ...user, nombre: e.target.value })} style={{ width: '100%', padding: 8, borderRadius: 8, border: '1px solid var(--border)' }} />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>Email</label>
          <input type="email" value={user.email} onChange={e => setUser({ ...user, email: e.target.value })} style={{ width: '100%', padding: 8, borderRadius: 8, border: '1px solid var(--border)' }} />
        </div>
        <button className="btn" type="submit">Guardar</button>
      </form>
    </MainLayout>
  );
};

export default ProfilePage;