import React from 'react';

const sections = [
	{ label: 'Dashboard', icon: '🏠' },
	{ label: 'Productos', icon: '📦' },
	{ label: 'Variantes', icon: '🧩' },
	{ label: 'Pedidos', icon: '📝' },
	{ label: 'Canales', icon: '🔗' },
	{ label: 'Configurar canales', icon: '⚙️' },
	{ label: 'Mi Marca', icon: '⭐' },
	{ label: 'Usuarios', icon: '👥' },
	{ label: 'Perfil', icon: '🙍‍♂️' },
	{ label: 'Cerrar sesión', icon: '🚪' },
];

const Sidebar: React.FC = () => {
	return (
		<nav className="sidebar-nav">
			<ul>
				{sections.map((s) => (
					<li key={s.label}>
						<span className="icon">{s.icon}</span>
						<span>{s.label}</span>
					</li>
				))}
			</ul>
			<style jsx>{`
				.sidebar-nav {
					padding: 24px 0;
				}
				ul { list-style: none; margin: 0; padding: 0; }
				li {
					display: flex;
					align-items: center;
					gap: 12px;
					padding: 12px 24px;
					cursor: pointer;
					border-radius: 8px;
					transition: background 0.2s;
				}
				li:hover {
					background: var(--brand-primary);
					color: var(--brand-contrast);
				}
				.icon { font-size: 20px; }
			`}</style>
		</nav>
	);
};

export default Sidebar;