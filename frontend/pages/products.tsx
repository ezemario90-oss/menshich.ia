import React, { useState, useEffect } from 'react';
import MainLayout from '../src/layout/MainLayout';
import ProductTable from '../src/components/ProductTable';

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState([]);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(true);
    const token = localStorage.getItem("admin_token");
    if (!token) {
      window.location.href = "/login";
      return;
    }
    fetch("/admin/products", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((r) => {
        if (r.status === 401) {
          window.location.href = "/login";
          return null;
        }
        return r.json();
      })
      .then((data) => data && setProducts(data))
      .catch(() => {});
  }, []);

  const handleEdit = (p: any) => {
    alert('Editar producto: ' + p.name);
  };
  const handleDelete = (id: string) => {
    setProducts(products.filter((p) => p.id !== id));
    // Aquí puedes agregar lógica para eliminar en backend
  };

  return (
    <MainLayout>
      <div className={`min-h-screen p-8 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 transition-all duration-700 ${fadeIn ? "opacity-100" : "opacity-0"}`}>
        <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <span>Productos</span>
          <span className="relative group">
            <svg className="w-5 h-5 text-blue-500 hover:text-purple-500 transition-colors cursor-pointer" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z" />
            </svg>
            <span className="absolute left-6 top-0 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">Gestión de productos</span>
          </span>
        </h1>
        <ProductTable data={products} onEdit={handleEdit} onDelete={handleDelete} />
      </div>
    </MainLayout>
  );
};

export default ProductsPage;