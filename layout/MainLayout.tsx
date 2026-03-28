import React from 'react';
import { ThemeProvider } from '../theme/ThemeProvider';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import '../frontend/styles/SidebarFuturista.css';

interface Props {
  children: React.ReactNode;
  onToggleSidebar?: () => void;
}

const MainLayout: React.FC<Props> = ({ children, onToggleSidebar }) => {
  return (
    <ThemeProvider>
      <div className="app-shell">
        <aside className="sidebar" aria-label="Navegación">
          <Sidebar />
        </aside>
        <div className="main">
          <Topbar onToggleSidebar={onToggleSidebar} />
          <main className="content">{children}</main>
        </div>
      </div>
      <style jsx>{`
        .app-shell {
          display: grid;
          grid-template-columns: 260px 1fr;
          min-height: 100vh;
        }
        .sidebar {
          border-right: 1px solid var(--border);
          background: var(--brand-surface);
        }
        .main {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }
        .content {
          padding: 24px;
          flex: 1;
        }
      `}</style>
    </ThemeProvider>
  );
};

export default MainLayout;
