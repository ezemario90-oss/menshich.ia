import React from 'react';
import Link from 'next/link';

const sections = [
  { label: 'Dashboard', icon: '🏠', href: '/dashboard' },
  { label: 'Productos', icon: '📦', href: '/productos' },
  { label: 'Pedidos', icon: '📝', href: '/pedidos' },
  { label: 'Usuarios', icon: '👥', href: '/usuarios' },
  { label: 'Marca', icon: '⭐', href: '/marca' },
  { label: 'Canales', icon: '🔗', href: '/canales' },
  { label: 'Configurar Canales', icon: '⚙️', href: '/configurar-canales' },
  { label: 'Perfil', icon: '🙍‍♂️', href: '/perfil' },
];


import { usePathname } from 'next/navigation';


const Sidebar: React.FC = () => {
  const pathname = usePathname();
  return (
    <nav className="sidebar-nav">
      <ul>
        {sections.map((s) => {
          // Resalta si la ruta es exactamente igual o si pathname empieza con href y href no es '/'
          const isActive =
            pathname === s.href ||
            (s.href !== '/' && pathname && pathname.startsWith(s.href));
          return (
            <li key={s.label} className={isActive ? 'active' : ''}>
              <Link href={s.href} className="sidebar-link">
                <span className="icon bounce">{s.icon}</span>
                <span className="label-text">{s.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
      {/* Los estilos ahora están en globals.css */}
    </nav>
  );
};

export default Sidebar;

export default Sidebar;
