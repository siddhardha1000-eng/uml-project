import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  BellRing, 
  AlertTriangle, 
  CheckCircle2, 
  Info, 
  Flame, 
  Droplets, 
  CloudRain, 
  ScanSearch, 
  Trash2, 
  Check, 
  Filter 
} from 'lucide-react';

export const AlertsCenter: React.FC = () => {
  const { alerts, markAlertAsRead, clearAllAlerts, setCurrentView } = useApp();
  const [filterSeverity, setFilterSeverity] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const filteredAlerts = alerts.filter(alert => {
    if (filterSeverity !== 'all' && alert.severity !== filterSeverity) return false;
    if (filterCategory !== 'all' && alert.category !== filterCategory) return false;
    return true;
  });

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'critical':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-rose-100 text-rose-800 border border-rose-200">
            Critical Severity
          </span>
        );
      case 'warning':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-amber-100 text-amber-800 border border-amber-200">
            Warning
          </span>
        );
      case 'info':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-blue-100 text-blue-800 border border-blue-200">
            Information
          </span>
        );
      case 'success':
        return (
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-emerald-100 text-emerald-800 border border-emerald-200">
            Resolved
          </span>
        );
      default:
        return null;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'moisture':
        return <Droplets className="w-5 h-5 text-cyan-600" />;
      case 'temperature':
        return <Flame className="w-5 h-5 text-orange-500" />;
      case 'weather':
        return <CloudRain className="w-5 h-5 text-blue-500" />;
      case 'disease':
        return <ScanSearch className="w-5 h-5 text-rose-500" />;
      case 'irrigation':
        return <Droplets className="w-5 h-5 text-emerald-600" />;
      default:
        return <Info className="w-5 h-5 text-slate-500" />;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
            <BellRing className="w-7 h-7 text-emerald-600" />
            <span>Alerts & Notifications Center</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Real-time farm threshold exceptions, weather warnings, and crop health triggers
          </p>
        </div>

        <button
          onClick={clearAllAlerts}
          className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-emerald-700 hover:bg-slate-50 text-xs font-bold shadow-xs flex items-center gap-1.5 transition self-start sm:self-auto"
        >
          <Check className="w-3.5 h-3.5" />
          <span>Mark All as Read</span>
        </button>
      </div>

      {/* 2. Filter Pills */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-3xl border border-slate-200/80 shadow-xs">
        
        {/* Severity Filters */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs font-semibold">
          <span className="text-slate-400 mr-1 text-[11px] uppercase tracking-wider">Severity:</span>
          {['all', 'critical', 'warning', 'info', 'success'].map(sev => (
            <button
              key={sev}
              onClick={() => setFilterSeverity(sev)}
              className={`px-3 py-1.5 rounded-xl capitalize transition ${
                filterSeverity === sev
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {sev}
            </button>
          ))}
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs font-semibold">
          <span className="text-slate-400 mr-1 text-[11px] uppercase tracking-wider">Type:</span>
          {['all', 'moisture', 'temperature', 'disease', 'weather', 'irrigation'].map(cat => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1.5 rounded-xl capitalize transition ${
                filterCategory === cat
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

      </div>

      {/* 3. Alerts Feed List */}
      <div className="space-y-3">
        {filteredAlerts.length > 0 ? (
          filteredAlerts.map(alert => (
            <div
              key={alert.id}
              className={`p-5 rounded-3xl border transition-all ${
                alert.read ? 'bg-white/80 border-slate-200 opacity-80' : 
                alert.severity === 'critical' ? 'bg-rose-50/80 border-rose-300 shadow-xs' :
                alert.severity === 'warning' ? 'bg-amber-50/80 border-amber-300 shadow-xs' :
                'bg-white border-slate-200 shadow-xs'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-2xl bg-white shadow-xs border border-slate-100 shrink-0">
                    {getCategoryIcon(alert.category)}
                  </div>

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-bold text-sm text-slate-900">{alert.title}</h3>
                      {getSeverityBadge(alert.severity)}
                      {!alert.read && (
                        <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                      )}
                    </div>
                    
                    <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">
                      {alert.message}
                    </p>

                    <p className="text-[10px] text-slate-400 font-medium pt-1">
                      Logged {alert.timestamp} • Sector 4 Mesh
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                  {alert.actionLabel && alert.actionType && (
                    <button
                      onClick={() => setCurrentView(alert.actionType!)}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs transition"
                    >
                      {alert.actionLabel}
                    </button>
                  )}

                  {!alert.read && (
                    <button
                      onClick={() => markAlertAsRead(alert.id)}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition"
                    >
                      Mark Read
                    </button>
                  )}
                </div>

              </div>
            </div>
          ))
        ) : (
          <div className="bg-white p-12 rounded-3xl border border-slate-200/80 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
            <h3 className="font-bold text-slate-800 text-base">No Alerts Match Filter</h3>
            <p className="text-xs text-slate-500">
              All monitored field telemetry is operating within acceptable threshold limits.
            </p>
          </div>
        )}
      </div>

    </div>
  );
};
