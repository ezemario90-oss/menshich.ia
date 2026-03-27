import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const sections = [
  { label: 'Dashboard', icon: '🏠', href: '/dashboard' },
  { label: 'Productos', icon: '📦', href: '/productos' },
  { label: 'Variantes', icon: '🧩', href: '/variantes' },
  { label: 'Pedidos', icon: '📝', href: '/pedidos' },
  { label: 'Canales', icon: '🔗', href: '/canales' },
  { label: 'Configurar canales', icon: '⚙️', href: '/configurar-canales' },
  { label: 'Mi Marca', icon: '⭐', href: '/marca' },
  { label: 'Usuarios', icon: '👥', href: '/usuarios' },
  { label: 'Perfil', icon: '🙍‍♂️', href: '/perfil' },
  { label: 'Cerrar sesión', icon: '🚪', href: '/logout' },
];

const Sidebar: React.FC = () => {
  const router = useRouter();
  const pathname = router.pathname;
  return (
    <nav className="sidebar-nav">
      <ul>
        {sections.map((s) => {
          const isActive = pathname === s.href || (s.href !== '/' && pathname.startsWith(s.href));
          return (
            <li key={s.label} className={isActive ? 'active' : ''}>
              <Link href={s.href} className="sidebar-link">
                <span className="icon">{s.icon}</span>
                <span className="label-text">{s.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Sidebar;