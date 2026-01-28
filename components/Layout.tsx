
import React from 'react';
import { ViewMode, User } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: ViewMode;
  onTabChange: (tab: ViewMode) => void;
  title: string;
  user: User;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, onTabChange, title, user, onLogout }) => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Navbar */}
      <nav className="glass sticky top-0 z-50 border-b border-slate-100 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-10">
            <div 
              onClick={() => onTabChange('home')} 
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-xl shadow-indigo-100 group-hover:scale-110 transition-all">
                L
              </div>
              <span className="font-black text-xl text-slate-800 tracking-tighter">LingoMaster</span>
            </div>

            <div className="hidden md:flex items-center gap-1">
              {[
                { id: 'home', label: 'Dashboard', icon: '🏠' },
                { id: 'lessons', label: 'Academy', icon: '🎓' },
                { id: 'mocks', label: 'Mocks', icon: '📝' },
                { id: 'scan', label: 'AI Scan', icon: '✨' },
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id as ViewMode)}
                  className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${activeTab === item.id ? 'bg-indigo-50 text-indigo-600' : 'text-slate-500 hover:bg-slate-100'}`}
                >
                  <span className="text-base">{item.icon}</span>
                  {item.label}
                </button>
              ))}
              {user.role === 'admin' && (
                <button
                  onClick={() => onTabChange('admin')}
                  className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 ${activeTab === 'admin' ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-100'}`}
                >
                  <span>⚙️</span> Admin
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end mr-2 hidden sm:flex">
              <span className="text-sm font-black text-slate-800">{user.name}</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{user.role}</span>
            </div>
            <button 
              onClick={onLogout}
              className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-red-50 hover:text-red-600 transition-all active:scale-95"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 pb-20">
        <header className="px-6 py-10 bg-white border-b border-slate-50 mb-4">
          <div className="max-w-7xl mx-auto">
             <h2 className="text-4xl font-black text-slate-800 tracking-tight">{title}</h2>
             <p className="text-slate-400 mt-2 font-medium">LingoMaster platformasida o'z natijangizni kuzating</p>
          </div>
        </header>
        <div className="max-w-7xl mx-auto px-6">
          {children}
        </div>
      </main>

      {/* Mobile Nav (faqat mobil uchun pastki qismda qoladi) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 z-50 pointer-events-none">
        <nav className="glass rounded-3xl shadow-2xl border border-white/50 flex items-center justify-around p-2 pointer-events-auto max-w-sm mx-auto">
            {[
              { id: 'home', icon: '🏠' },
              { id: 'lessons', icon: '🎓' },
              { id: 'scan', icon: '✨' },
              { id: 'mocks', icon: '📝' },
            ].map(item => (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id as ViewMode)}
                className={`p-4 rounded-2xl text-xl transition-all ${activeTab === item.id ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400'}`}
              >
                {item.icon}
              </button>
            ))}
        </nav>
      </div>
    </div>
  );
};

export default Layout;
