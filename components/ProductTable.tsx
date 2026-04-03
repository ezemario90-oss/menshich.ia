import React from 'react';

interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  stock: number;
}


interface ProductTableProps {
  data: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}


const ProductTable: React.FC<ProductTableProps> = ({ data, onEdit, onDelete }) => {
  return (
    <table className="min-w-full border">
      <thead>
        <tr>
          <th className="border px-4 py-2">ID</th>
          <th className="border px-4 py-2">Nombre</th>
          <th className="border px-4 py-2">Precio</th>
          <th className="border px-4 py-2">Stock</th>
          <th className="border px-4 py-2">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {data.map((product) => (
          <tr key={product.id}>
            <td className="border px-4 py-2">{product.id}</td>
            <td className="border px-4 py-2">{product.name}</td>
            <td className="border px-4 py-2">${product.price}</td>
            <td className="border px-4 py-2">{product.stock}</td>
            <td className="border px-4 py-2">
              <button onClick={() => onEdit(product)} className="mr-2 text-blue-600">Editar</button>
              <button onClick={() => onDelete(product.id)} className="text-red-600">Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;
