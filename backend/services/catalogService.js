// backend/services/catalogService.js
// Catálogo en memoria para este MVP (más adelante lo conectas a PostgreSQL)
const products = [
  { id: 'p1', name: 'Zapatillas', stock: 20, variants: ['38','39','40','41','42','43','44'], price: 59.99, image_url: '' },
  { id: 'p2', name: 'Remera', stock: 15, variants: ['S','M','L','XL'], price: 24.99, image_url: '' }
];

function getStockContext() {
  const lines = products.map(p => {
    const tallas = p.variants ? p.variants.join('/') : '';
    return `${p.name} (tallas ${tallas}) - stock ${p.stock} - ${p.price.toFixed(2)} USD`;
  });
  return lines.length ? `Productos disponibles: ${lines.join('; ')}` : 'Sin stock disponible';
}

module.exports = { getStockContext, products };
