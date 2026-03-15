import React from 'react';

type Product = { id: string; name: string; image?: string; price: number; stock: number };

interface Props {
  data: Product[];
  onEdit: (p: Product) => void;
  onDelete: (id: string) => void;
}


const ProductTable: React.FC<Props> = ({ data, onEdit, onDelete }) => {
  const [fadeIn, setFadeIn] = React.useState(false);
  React.useEffect(() => {
    setFadeIn(true);
  }, []);
  return (
    <table
      className={`w-full border-collapse bg-white rounded-lg shadow transition-all duration-700 ${fadeIn ? "opacity-100" : "opacity-0"}`}
    >
      <thead>
        <tr className="bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100">
          <th>Imagen</th>
          <th>Nombre</th>
          <th>Precio</th>
          <th>Stock</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {data.map((p) => (
          <tr
            key={p.id}
            className="hover:bg-blue-50 transition-colors group"
          >
            <td>
              {p.image ? (
                <img
                  src={p.image}
                  alt={`Imagen de producto: ${p.name}`}
                  width={40}
                  height={40}
                  loading="lazy"
                  className="rounded shadow-sm transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <span className="text-gray-400" aria-label="Sin imagen">—</span>
              )}
            </td>
            <td>{p.name}</td>
            <td>${p.price.toFixed(2)}</td>
            <td>{p.stock}</td>
            <td className="flex gap-2">
              <span className="relative group">
                <button
                  className="px-3 py-1 bg-purple-700 text-white rounded shadow hover:bg-purple-500 active:scale-95 transition-all duration-200 focus:outline-none"
                  onClick={() => onEdit(p)}
                  aria-label={`Editar producto ${p.name}`}
                >
                  Editar
                </button>
                <span className="absolute left-0 top-8 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">Editar producto</span>
              </span>
              <span className="relative group">
                <button
                  className="px-3 py-1 bg-red-700 text-white rounded shadow hover:bg-red-500 active:scale-95 transition-all duration-200 focus:outline-none"
                  onClick={() => onDelete(p.id)}
                  aria-label={`Eliminar producto ${p.name}`}
                >
                  Eliminar
                </button>
                <span className="absolute left-0 top-8 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">Eliminar producto</span>
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProductTable;
