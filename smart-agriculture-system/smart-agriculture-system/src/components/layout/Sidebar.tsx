import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  LayoutDashboard, 
  Layers, 
  Droplets, 
  Sprout, 
  ScanSearch, 
  CloudSun, 
  BellRing, 
  FileSpreadsheet, 
  LogOut, 
  Users, 
  Radio, 
  UserCheck, 
  Stethoscope,
  ChevronRight,
  ShieldAlert,
  HelpCircle,
  Wifi
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: any;
  badge: string | null;
  badgeColor?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { 
    currentRole, 
    currentView, 
    setCurrentView, 
    logout, 
    telemetry,
    unreadAlertCount 
  } = useApp();

  const handleNavClick = (view: string) => {
    setCurrentView(view);
    onClose();
  };

  // Farmer Navigation Items
  const farmerNavItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard Overview', icon: LayoutDashboard, badge: null },
    { id: 'soil', label: 'Soil Monitoring', icon: Layers, badge: 'Live' },
    { 
      id: 'irrigation', 
      label: 'Smart Irrigation', 
      icon: Droplets, 
      badge: telemetry.irrigationStatus === 'Active' ? 'Pumping' : null,
      badgeColor: telemetry.irrigationStatus === 'Active' ? 'bg-cyan-500 text-white animate-pulse' : ''
    },
    { id: 'crop-rec', label: 'Crop Recommendation', icon: Sprout, badge: 'AI' },
    { id: 'disease', label: 'Disease Detection', icon: ScanSearch, badge: 'Vision' },
    { id: 'weather', label: 'Weather & Spray Forecast', icon: CloudSun, badge: null },
    { 
      id: 'alerts', 
      label: 'Alerts & Notifications', 
      icon: BellRing, 
      badge: unreadAlertCount > 0 ? `${unreadAlertCount} New` : null,
      badgeColor: 'bg-rose-500 text-white' 
    },
    { id: 'reports', label: 'Farm Analytics & Reports', icon: FileSpreadsheet, badge: null }
  ];

  // Expert Navigation Items
  const expertNavItems: NavItem[] = [
    { id: 'dashboard', label: 'Expert Overview', icon: LayoutDashboard, badge: null },
    { id: 'expert-farmers', label: 'Farmer & Field Directory', icon: Users, badge: '24 Farms' },
    { id: 'expert-disease', label: 'Disease Diagnostic Queue', icon: Stethoscope, badge: '1 Pending', badgeColor: 'bg-amber-500 text-white' },
    { id: 'weather', label: 'Regional Weather Outlook', icon: CloudSun, badge: null },
    { id: 'alerts', label: 'Regional Agri Alerts', icon: BellRing, badge: unreadAlertCount > 0 ? `${unreadAlertCount}` : null },
    { id: 'reports', label: 'Agronomy Reports', icon: FileSpreadsheet, badge: null }
  ];

  // Administrator Navigation Items
  const adminNavItems: NavItem[] = [
    { id: 'dashboard', label: 'System Overview', icon: LayoutDashboard, badge: null },
    { id: 'admin-sensors', label: 'IoT Sensors & Gateways', icon: Radio, badge: '4,520' },
    { id: 'admin-users', label: 'User Directory', icon: UserCheck, badge: '1,248' },
    { id: 'irrigation', label: 'Irrigation Node Grid', icon: Droplets, badge: null },
    { id: 'alerts', label: 'System Logs & Alerts', icon: ShieldAlert, badge: unreadAlertCount > 0 ? `${unreadAlertCount}` : null },
    { id: 'reports', label: 'Infrastructure Audit', icon: FileSpreadsheet, badge: null }
  ];

  const currentNavItems = 
    currentRole === 'expert' ? expertNavItems :
    currentRole === 'admin' ? adminNavItems :
    farmerNavItems;

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-40 lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside 
        className={`fixed top-16 bottom-0 left-0 z-40 w-64 bg-white border-r border-slate-200/80 flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          
          {/* Active Farm or System Context Pill */}
          <div className="p-3 bg-gradient-to-br from-emerald-50 to-green-50/50 rounded-2xl border border-emerald-100/80">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold tracking-wider text-emerald-800 uppercase">
                {currentRole === 'farmer' ? 'Active Field' : currentRole === 'expert' ? 'Assigned Region' : 'IoT Network'}
              </span>
              <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-600">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                Live
              </span>
            </div>
            <p className="font-bold text-xs text-slate-800 mt-1 truncate">
              {currentRole === 'farmer' ? 'Sector 4 - Green Valley' : currentRole === 'expert' ? 'Nashik Agro-Zone' : 'SAMS Central LoRa Gateway'}
            </p>
            <div className="flex items-center gap-2 mt-2 text-[11px] text-slate-500">
              <span className="flex items-center gap-1">
                <Wifi className="w-3 h-3 text-emerald-600" />
                <span>LoRaWAN 868MHz</span>
              </span>
              <span>•</span>
              <span>{currentRole === 'farmer' ? '14.5 Ac' : currentRole === 'expert' ? '24 Farms' : '4.5k Nodes'}</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-1">
            <div className="px-3 pb-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              {currentRole === 'farmer' ? 'Farm Controls' : currentRole === 'expert' ? 'Expert Console' : 'Administration'}
            </div>
            
            {currentNavItems.map(item => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/20'
                      : 'text-slate-600 hover:text-emerald-700 hover:bg-emerald-50/70'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-emerald-600'}`} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-bold ${
                      isActive 
                        ? 'bg-white/20 text-white' 
                        : item.badgeColor || 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* College Project Viva / Presentation Banner */}
          <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-2xl text-[11px] text-slate-600 space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-slate-800">
              <span className="text-amber-500">🎓</span>
              <span>College Project Review</span>
            </div>
            <p className="text-[10px] text-slate-500 leading-snug">
              Demonstrates complete IoT pipeline: Sensor telemetry → Rule-based irrigation trigger → AI Disease & Crop analytics.
            </p>
          </div>

        </div>

        {/* Sidebar Bottom Footer: Sign out / Switch role */}
        <div className="p-3 border-t border-slate-100 space-y-1 bg-slate-50/50">
          <button
            onClick={() => {
              setCurrentView('landing');
              onClose();
            }}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition"
          >
            <span>Back to Public Site</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          </button>

          <button
            onClick={() => {
              logout();
              onClose();
            }}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 transition"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};
