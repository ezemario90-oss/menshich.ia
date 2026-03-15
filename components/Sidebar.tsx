import React from 'react';

const Sidebar: React.FC = () => (
  <nav>
    <ul>
      <li><a href="/">Dashboard</a></li>
      <li><a href="/products">Productos</a></li>
      <li><a href="/orders">Pedidos</a></li>
      <li><a href="/users">Usuarios</a></li>
      <li><a href="/brand">Marca</a></li>
      <li><a href="/channels">Canales</a></li>
      <li><a href="/configure-channels">Configurar Canales</a></li>
      <li><a href="/profile">Perfil</a></li>
    </ul>
  </nav>
);

export default Sidebar;
