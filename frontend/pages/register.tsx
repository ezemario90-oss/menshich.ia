import React, { useState } from 'react';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    // Llama al backend para crear usuario
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (res.ok) setSuccess(true);
  };

  return (
    <div style={{ maxWidth: 400, margin: '80px auto', background: '#fff', borderRadius: 16, boxShadow: '0 2px 16px #2c5364', padding: 32, fontFamily: 'Orbitron, sans-serif' }}>
      <h2 style={{ color: '#00c6fb', fontWeight: 800, fontSize: 28, marginBottom: 24 }}>Crear cuenta</h2>
      {success ? (
        <div style={{ color: '#43e97b', fontWeight: 700, fontSize: 20 }}>¡Cuenta creada! Ya puedes ingresar a la app.</div>
      ) : (
        <form onSubmit={handleRegister}>
          <label style={{ color: '#2c5364', fontWeight: 700 }}>Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #00c6fb', marginBottom: 16 }} />
          <label style={{ color: '#2c5364', fontWeight: 700 }}>Contraseña</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #43e97b', marginBottom: 24 }} />
          <button type="submit" style={{ background: 'linear-gradient(90deg, #43e97b 0%, #00c6fb 100%)', color: '#fff', fontWeight: 900, fontSize: 18, padding: '12px 32px', borderRadius: 12, border: 'none', cursor: 'pointer', boxShadow: '0 2px 8px #2c5364' }}>Crear cuenta</button>
        </form>
      )}
    </div>
  );
}
