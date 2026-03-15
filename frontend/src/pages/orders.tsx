import React, { useState } from 'react';
import MainLayout from '../layout/MainLayout';

const mockOrders = [
  { id: '101', customer: 'Juan Pérez', total: 320, status: 'Enviado' },
  { id: '102', customer: 'Ana López', total: 150, status: 'Pendiente' },
  { id: '103', customer: 'Carlos Ruiz', total: 210, status: 'Entregado' },
];

const OrdersPage: React.FC = () => {
  const [orders] = useState(mockOrders);

  return (
    <MainLayout>
      <h1>Pedidos</h1>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th>Total</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id}>
              <td>{o.id}</td>
              <td>{o.customer}</td>
              <td>${o.total}</td>
              <td>{o.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </MainLayout>
  );
};

export default OrdersPage;
