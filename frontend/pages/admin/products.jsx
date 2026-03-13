// frontend/pages/admin/products.jsx
import { useState, useEffect } from 'react';

export default function ProductsAdmin() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: '', description: '', price: '', imageUrl: '', variants: [] });

  useEffect(() => {
    fetch('/admin/products').then(r => r.json()).then(setProducts);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('/admin/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    fetch('/admin/products').then(r => r.json()).then(setProducts);
    setForm({ name: '', description: '', price: '', imageUrl: '', variants: [] });
  };

  return (
    <div>
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
