import React from 'react';
import MainLayout from '../layout/MainLayout';
import BrandEditor from '../components/BrandEditor';

const BrandPage: React.FC = () => {
  return (
    <MainLayout>
      <h1>Mi Marca</h1>
      <BrandEditor />
    </MainLayout>
  );
};

export default BrandPage;
