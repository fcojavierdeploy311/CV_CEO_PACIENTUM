import { useState, useEffect } from 'react';
import SystemOverview from './components/SystemOverview';
import DeploymentHistory from './components/DeploymentHistory';
import PacientumEngine from './components/PacientumEngine';
import TheVault from './components/TheVault';

function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Listen for sidebar collapse/expand events from PdfViewerModal
  useEffect(() => {
    const handleCollapse = () => setSidebarCollapsed(true);
    const handleExpand = () => setSidebarCollapsed(false);

    window.addEventListener('sidebar:collapse', handleCollapse);
    window.addEventListener('sidebar:expand', handleExpand);

    return () => {
      window.removeEventListener('sidebar:collapse', handleCollapse);
      window.removeEventListener('sidebar:expand', handleExpand);
    };
  }, []);

  const tabs = [
    { id: 'overview', label: 'SYSTEM OVERVIEW', icon: 'dashboard' },
    { id: 'history', label: 'DEPLOYMENT HISTORY', icon: 'history' },
    { id: 'engine', label: 'PACIÉNTUM ENGINE', icon: 'settings_system_daydream' },
    { id: 'vault', label: 'THE VAULT', icon: 'lock' },
  ];

  const renderTab = () => {
    switch (activeTab) {
      case 'overview': return <SystemOverview />;
      case 'history': return <DeploymentHistory />;
      case 'engine': return <PacientumEngine />;
      case 'vault': return <TheVault />;
      default: return <SystemOverview />;
    }
  };

  return (
    <div className="h-screen bg-[#0a0f18] text-slate-300 font-sans flex flex-col md:flex-row w-full overflow-hidden">

      {/* Sidebar Navigation */}
      <nav
        className={`bg-[#0d131f] border-b md:border-b-0 md:border-r border-slate-800 flex flex-col shadow-xl z-40 transition-all duration-300 ease-in-out shrink-0 ${sidebarCollapsed
          ? 'md:w-0 md:min-w-0 md:overflow-hidden md:p-0 md:border-r-0 w-full p-6'
          : 'w-full md:w-64 md:min-w-[16rem] p-6'
          }`}
      >
        <div className={`mb-10 h-auto transition-opacity duration-200 flex items-start gap-3 ${sidebarCollapsed ? 'md:opacity-0' : 'opacity-100'}`}>
          {/* Sidebar Toggle — inside header, proper flex spacing */}
          <button
            onClick={() => setSidebarCollapsed(prev => !prev)}
            className="w-9 h-9 flex items-center justify-center rounded-lg bg-slate-800/60 border border-slate-700/50 text-slate-400 hover:text-white hover:border-cyan-500/40 transition-all duration-200 shrink-0 mt-0.5"
            title={sidebarCollapsed ? 'Expandir sidebar' : 'Colapsar sidebar'}
          >
            <span className="material-symbols-outlined text-lg transition-transform duration-300" style={{ transform: sidebarCollapsed ? 'rotate(0deg)' : 'rotate(90deg)' }}>
              menu
            </span>
          </button>
          <div className="min-w-0">
            <h1 className="text-white font-semibold text-lg tracking-tight leading-tight" style={{ fontFamily: 'Space Grotesk' }}>
              Q. Francisco
            </h1>
            <p className="text-[11px] text-slate-500 mt-1 tracking-wide">
              <span className="text-slate-600">|</span> Clinical Data Architect
            </p>
          </div>
        </div>

        <div className={`flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-4 md:pb-0 transition-opacity duration-200 ${sidebarCollapsed ? 'md:opacity-0' : 'opacity-100'}`}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 whitespace-nowrap ${activeTab === tab.id
                ? 'bg-slate-800/50 text-white border border-slate-700 shadow-[0_0_15px_rgba(45,212,191,0.15)]'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/30'
                }`}
            >
              <span className="material-symbols-outlined text-[20px]">{tab.icon}</span>
              {tab.label}
              {activeTab === tab.id && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              )}
            </button>
          ))}
        </div>

        <div className={`hidden md:flex mt-auto border-t border-slate-800 pt-6 items-center gap-2 text-xs font-mono text-slate-500 transition-opacity duration-200 ${sidebarCollapsed ? 'md:opacity-0' : 'opacity-100'}`}>
          <span className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0"></span>
          <span>System Online: Optimal</span>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 relative overflow-y-auto overflow-x-hidden transition-all duration-300 ease-in-out">
        {/* Floating toggle — only when sidebar is collapsed (to re-open) */}
        {sidebarCollapsed && (
          <button
            onClick={() => setSidebarCollapsed(false)}
            className="fixed top-4 left-4 z-50 w-10 h-10 flex items-center justify-center rounded-lg bg-[#0d131f]/90 border border-slate-700/50 text-slate-400 hover:text-white hover:border-cyan-500/50 backdrop-blur-md transition-all duration-200 shadow-lg hover:shadow-cyan-500/10"
            title="Expandir sidebar"
          >
            <span className="material-symbols-outlined text-xl">menu</span>
          </button>
        )}

        {/* Subtle Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-500/5 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="relative z-10 p-6 md:p-10 min-h-full">
          {renderTab()}
        </div>
      </main>
    </div>
  );
}

export default App;
