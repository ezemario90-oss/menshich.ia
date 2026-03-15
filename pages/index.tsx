import React from 'react';
import MainLayout from '../layout/MainLayout';
import DashboardCard from '../components/DashboardCard';

const mockMetrics = [
  { metricLabel: 'Ventas', value: 1200, delta: '+12%' },
  { metricLabel: 'Pedidos', value: 340, delta: '+5%' },
  { metricLabel: 'Stock', value: 150, delta: '-2%' },
  { metricLabel: 'Nuevos mensajes', value: 23, delta: '+8%' },
];

const HomePage: React.FC = () => {
  return (
    <MainLayout>
      <h1>Mi Dashboard</h1>
      <div style={{ display: 'flex', gap: 24 }}>
        {mockMetrics.map((m) => (
          <DashboardCard key={m.metricLabel} {...m} />
        ))}
      </div>
    </MainLayout>
  );
};

export default HomePage;