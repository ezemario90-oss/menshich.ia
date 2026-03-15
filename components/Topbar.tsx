import React from 'react';

interface Props {
  onToggleSidebar?: () => void;
}

const Topbar: React.FC<Props> = ({ onToggleSidebar }) => (
  <header style={{ padding: 16, borderBottom: '1px solid var(--border)', background: 'var(--brand-surface)' }}>
    <button onClick={onToggleSidebar} style={{ marginRight: 16 }}>☰</button>
    <span>mengchig.ia Admin</span>
  </header>
);

export default Topbar;
