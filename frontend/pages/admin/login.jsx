import React, { useState } from 'react';
import { useRouter } from 'next/router';

export default function AdminLogin() {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (data.token) {
        localStorage.setItem('admin_token', data.token);
        router.push('/admin/products');
      } else {
        setError(data.error || 'Error de autenticación');
      }
    } catch (err) {
      setError('Error de red');
    }
  };

  return (
      <div style={{ padding: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24 }}>
          <img src="/logo.svg" alt="mengsinch.ia logo" style={{ height: 48, marginRight: 16 }} />
          <span style={{ fontSize: 28, color: '#1976D2', fontWeight: 'bold' }}>mengsinch.ia</span>
        </div>
        <h1>Login Admin</h1>
      <form onSubmit={onSubmit} style={{ maxWidth: 320 }}>
        <div>
          <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Usuario" required />
        </div>
        <div>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Contraseña" required />
        </div>
        <button type="submit" style={{ marginTop: 10 }}>Entrar</button>
        {error && <div style={{ color: 'red', marginTop: 10 }}>{error}</div>}
      </form>
    </div>
  );
}
