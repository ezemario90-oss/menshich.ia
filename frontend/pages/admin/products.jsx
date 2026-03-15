// frontend/pages/admin/products.jsx
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function ProductsAdmin() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: '', description: '', price: '', imageUrl: '', variants: [] });
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      router.push('/admin/login');
      return;
    }
    fetch('/admin/products', {
      headers: { 'Authorization': 'Bearer ' + token }
    })
      .then(r => r.json())
      .then(setProducts);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('admin_token');
    await fetch('/admin/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
      body: JSON.stringify(form)
    });
    fetch('/admin/products', {
      headers: { 'Authorization': 'Bearer ' + token }
    })
      .then(r => r.json())
      .then(setProducts);
    setForm({ name: '', description: '', price: '', imageUrl: '', variants: [] });
  };

  return (
      <div style={{ padding: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24 }}>
          <img src="/logo.svg" alt="mengsinch.ia logo" style={{ height: 48, marginRight: 16 }} />
          <span style={{ fontSize: 28, color: '#1976D2', fontWeight: 'bold' }}>mengsinch.ia</span>
        </div>
        <h2>Productos</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Nombre" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Descripción" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
        <input placeholder="Precio" type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
        <input placeholder="URL Imagen" value={form.imageUrl} onChange={e => setForm({ ...form, imageUrl: e.target.value })} />
        <button type="submit">Crear producto</button>
      </form>
      <ul>
        {products.map(p => (
          <li key={p.id}>
            <b>{p.name}</b> - {p.description} - ${p.price}
            <br />Imagen: {p.imageUrl}
            <br />Variants: {p.variants.map(v => `${v.size}: ${v.stock}`).join(', ')}
          </li>
        ))}
      </ul>
    </div>
  );
}
