import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const sections = [
  { label: 'Dashboard', icon: '🏠', href: '/dashboard' },
  { label: 'Productos', icon: '📦', href: '/productos' },
  { label: 'Variantes', icon: '🧩', href: '/variantes' },
  { label: 'Pedidos', icon: '📄', href: '/pedidos' },
  { label: 'Canales', icon: '🔗', href: '/canales' },
  { label: 'Configurar canales', icon: '⚙️', href: '/configurar-canales' },
  { label: 'Mi Marca', icon: '⭐', href: '/marca' },
];

const Sidebar: React.FC = () => {
  const pathname = usePathname();
  return (
    <nav className="sidebar">
      <div className="sidebar-title">Panel Futurista</div>
      {sections.map((item, idx) => {
        const isActive = pathname === item.href || (item.href !== '/' && pathname && pathname.startsWith(item.href));
        return (
          <Link
            href={item.href}
            key={item.label}
            className={`menu-item${isActive ? ' active' : ''}`}
          >
            <i>{item.icon}</i>
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default Sidebar;
