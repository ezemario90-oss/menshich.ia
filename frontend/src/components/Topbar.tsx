import React from 'react';

const Topbar: React.FC<{ onToggleSidebar?: () => void }> = ({ onToggleSidebar }) => {
	return (
		<header className="topbar">
			<button className="menu-btn" onClick={onToggleSidebar} aria-label="Abrir menú">
				☰
			</button>
			<div className="search">
				<input type="text" placeholder="Buscar..." />
			</div>
			<div className="actions">
				<span className="notif">🔔</span>
				<span className="avatar">🙍‍♂️</span>
			</div>
			<style jsx>{`
				.topbar {
					display: flex;
					align-items: center;
					gap: 16px;
					padding: 12px 24px;
					background: var(--brand-surface);
					border-bottom: 1px solid var(--border);
				}
				.menu-btn {
					font-size: 24px;
					background: none;
					border: none;
					cursor: pointer;
				}
				.search input {
					border: 1px solid var(--border);
					border-radius: 8px;
					padding: 6px 12px;
					font-size: 15px;
				}
				.actions {
					margin-left: auto;
					display: flex;
					gap: 16px;
				}
				.notif { font-size: 20px; }
				.avatar { font-size: 22px; }
			`}</style>
		</header>
	);
};

export default Topbar;