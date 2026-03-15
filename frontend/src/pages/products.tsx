import React, { useState } from 'react';
import MainLayout from '../layout/MainLayout';
import ProductTable from '../components/ProductTable';

const mockProducts = [
  { id: '1', name: 'Producto A', image: '', price: 120, stock: 10 },
  { id: '2', name: 'Producto B', image: '', price: 80, stock: 5 },
  { id: '3', name: 'Producto C', image: '', price: 150, stock: 20 },
];

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState(mockProducts);

  const handleEdit = (p: any) => {
    alert('Editar producto: ' + p.name);
  };
  const handleDelete = (id: string) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <MainLayout>
      <h1>Productos</h1>
      <ProductTable data={products} onEdit={handleEdit} onDelete={handleDelete} />
    </MainLayout>
  );
};

export default ProductsPage;
