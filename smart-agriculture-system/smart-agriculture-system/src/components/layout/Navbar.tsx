import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Sprout, 
  Bell, 
  Droplets, 
  Flame, 
  RotateCcw, 
  ChevronDown, 
  LogOut, 
  UserCheck, 
  ShieldCheck, 
  Stethoscope, 
  Menu, 
  X,
  ExternalLink,
  Activity
} from 'lucide-react';
import { UserRole } from '../../types';

interface NavbarProps {
  onToggleSidebar?: () => void;
  sidebarOpen?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar, sidebarOpen }) => {
  const { 
    currentUser, 
    currentRole, 
    setCurrentRole, 
    setCurrentView, 
    logout, 
    telemetry,
    alerts, 
    unreadAlertCount, 
    markAlertAsRead, 
    isDroughtSimulated, 
    simulateDroughtEvent, 
    restoreNormalConditions 
  } = useApp();

  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const handleRoleSelect = (role: UserRole) => {
    setCurrentRole(role);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Left: Brand Logo & Mobile Toggle */}
          <div className="flex items-center gap-3">
            {currentUser && (
              <button
                onClick={onToggleSidebar}
                className="p-2 rounded-lg text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 lg:hidden focus:outline-none"
                aria-label="Toggle Navigation"
              >
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            )}

            <button 
              onClick={() => {
                if (currentRole === 'guest') setCurrentView('landing');
                else setCurrentView('dashboard');
              }}
              className="flex items-center gap-2.5 text-left group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-green-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
                <Sprout className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-xl text-slate-800 tracking-tight">SAMS</span>
                  <span className="px-1.5 py-0.5 text-[10px] font-semibold uppercase bg-emerald-100 text-emerald-800 rounded">AgTech</span>
                </div>
                <p className="text-[11px] text-slate-500 font-medium hidden sm:block">Smart Agriculture System</p>
              </div>
            </button>
          </div>

          {/* Center: Presentation Role Switcher (Crucial for College Project Viva!) */}
          <div className="hidden md:flex items-center bg-slate-100/80 p-1 rounded-xl border border-slate-200">
            <span className="text-[11px] font-semibold text-slate-500 px-2 uppercase tracking-wider">Demo Mode:</span>
            
            <button
              onClick={() => handleRoleSelect('farmer')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                currentRole === 'farmer'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-emerald-700 hover:bg-slate-200/60'
              }`}
            >
              <span>👨‍🌾 Farmer</span>
            </button>

            <button
              onClick={() => handleRoleSelect('expert')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                currentRole === 'expert'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-emerald-700 hover:bg-slate-200/60'
              }`}
            >
              <span>🔬 Expert</span>
            </button>

            <button
              onClick={() => handleRoleSelect('admin')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                currentRole === 'admin'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-emerald-700 hover:bg-slate-200/60'
              }`}
            >
              <span>🛡️ Admin</span>
            </button>

            <button
              onClick={() => {
                setCurrentRole('guest');
                setCurrentView('landing');
              }}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                currentRole === 'guest'
                  ? 'bg-slate-800 text-white'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <span>Home</span>
            </button>
          </div>

          {/* Right: Simulation Quick Trigger & Notifications & User Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Live Drought Simulation Trigger (Shows interactive trigger during presentation) */}
            {currentUser && currentRole === 'farmer' && (
              <div className="hidden sm:flex items-center">
                {!isDroughtSimulated ? (
                  <button
                    onClick={simulateDroughtEvent}
                    title="Simulate low moisture to trigger automatic alert & pump"
                    className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100 transition-colors shadow-xs"
                  >
                    <Flame className="w-3.5 h-3.5 text-amber-600" />
                    <span>Test Dry Soil &lt;40%</span>
                  </button>
                ) : (
                  <button
                    onClick={restoreNormalConditions}
                    title="Reset sensor telemetry to optimal moisture"
                    className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100 transition-colors shadow-xs"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Reset Telemetry</span>
                  </button>
                )}
              </div>
            )}

            {/* Notification Bell Dropdown */}
            {currentUser && (
              <div className="relative">
                <button
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className="relative p-2 rounded-xl text-slate-600 hover:text-emerald-700 hover:bg-emerald-50/60 transition-colors"
                  aria-label="Alerts"
                >
                  <Bell className="w-5 h-5" />
                  {unreadAlertCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white shadow-xs">
                      {unreadAlertCount}
                    </span>
                  )}
                </button>

                {/* Notifications Popup */}
                {notificationsOpen && (
                  <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-200/80 p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-sm text-slate-800">Alerts & Telemetry Events</span>
                        <span className="bg-emerald-100 text-emerald-800 text-[10px] font-semibold px-1.5 py-0.5 rounded-full">
                          {alerts.length}
                        </span>
                      </div>
                      <button 
                        onClick={() => {
                          setNotificationsOpen(false);
                          setCurrentView('alerts');
                        }}
                        className="text-xs text-emerald-600 hover:text-emerald-700 font-semibold"
                      >
                        View All
                      </button>
                    </div>

                    <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                      {alerts.slice(0, 4).map(alert => (
                        <div
                          key={alert.id}
                          onClick={() => {
                            markAlertAsRead(alert.id);
                            if (alert.actionType) {
                              setCurrentView(alert.actionType);
                              setNotificationsOpen(false);
                            }
                          }}
                          className={`p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${
                            alert.read ? 'bg-slate-50/60 border-slate-100 opacity-80' : 
                            alert.severity === 'critical' ? 'bg-rose-50/60 border-rose-200' :
                            alert.severity === 'warning' ? 'bg-amber-50/60 border-amber-200' :
                            'bg-emerald-50/60 border-emerald-200'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-1">
                            <span className="font-bold text-slate-800">{alert.title}</span>
                            <span className="text-[10px] text-slate-400 whitespace-nowrap">{alert.timestamp}</span>
                          </div>
                          <p className="text-slate-600 mt-1 line-clamp-2">{alert.message}</p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-2 pt-2 border-t border-slate-100 text-center">
                      <button
                        onClick={() => {
                          setCurrentView('alerts');
                          setNotificationsOpen(false);
                        }}
                        className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 w-full py-1 rounded-lg hover:bg-emerald-50 transition"
                      >
                        Open Notification Center →
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Profile Dropdown / Login CTA */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 transition-colors"
                >
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-emerald-500/30"
                  />
                  <div className="hidden lg:block text-left text-xs leading-tight">
                    <p className="font-bold text-slate-800">{currentUser.name}</p>
                    <p className="text-[10px] text-emerald-600 font-semibold capitalize">{currentUser.role}</p>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200/80 p-2 z-50">
                    <div className="p-2 border-b border-slate-100">
                      <p className="font-bold text-xs text-slate-800">{currentUser.name}</p>
                      <p className="text-[11px] text-slate-500 truncate">{currentUser.email}</p>
                      {currentUser.farmName && (
                        <p className="text-[10px] text-emerald-700 font-medium mt-1">🌾 {currentUser.farmName}</p>
                      )}
                    </div>

                    <div className="py-1">
                      <button
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          setCurrentView('reports');
                        }}
                        className="w-full text-left px-3 py-1.5 text-xs text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 rounded-lg flex items-center gap-2"
                      >
                        <Activity className="w-3.5 h-3.5" />
                        <span>Farm Performance Summary</span>
                      </button>
                    </div>

                    <div className="pt-1 border-t border-slate-100">
                      <button
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          logout();
                        }}
                        className="w-full text-left px-3 py-1.5 text-xs text-rose-600 hover:bg-rose-50 rounded-lg flex items-center gap-2"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentView('login')}
                  className="px-4 py-2 text-xs font-bold text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50 rounded-xl transition"
                >
                  Log In
                </button>
                <button
                  onClick={() => {
                    handleRoleSelect('farmer');
                  }}
                  className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-sm hover:shadow transition"
                >
                  Live Demo
                </button>
              </div>
            )}

          </div>

        </div>
      </div>
    </header>
  );
};
