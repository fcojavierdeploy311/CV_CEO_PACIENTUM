import { useState } from 'react';
import SystemOverview from './components/SystemOverview';
import DeploymentHistory from './components/DeploymentHistory';
import PacientumEngine from './components/PacientumEngine';
import TheVault from './components/TheVault';

function App() {
  const [activeTab, setActiveTab] = useState('overview');

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
    <div className="min-h-screen bg-[#0a0f18] text-slate-300 font-sans flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <nav className="w-full md:w-64 bg-[#0d131f] border-b md:border-b-0 md:border-r border-slate-800 p-6 flex flex-col shadow-xl z-40">
        <div className="mb-10 h-auto">
          <h1 className="text-white font-bold text-2xl tracking-tight leading-none" style={{ fontFamily: 'Space Grotesk' }}>
            <span className="text-blue-500">&lt;</span>
            PACO_DEV
            <span className="text-blue-500">/&gt;</span>
          </h1>
          <p className="text-xs text-slate-500 mt-2 tracking-widest uppercase">QA Lead / Architect</p>
        </div>

        <div className="flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-4 md:pb-0">
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

        <div className="hidden md:flex mt-auto border-t border-slate-800 pt-6 items-center gap-2 text-xs font-mono text-slate-500">
          <span className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0"></span>
          <span>System Online: Optimal</span>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 relative overflow-y-auto overflow-x-hidden">
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
