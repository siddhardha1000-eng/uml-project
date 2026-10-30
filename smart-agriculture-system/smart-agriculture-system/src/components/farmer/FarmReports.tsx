import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  FileSpreadsheet, 
  Download, 
  Printer, 
  CheckCircle2, 
  Droplets, 
  Layers, 
  Sprout, 
  TrendingUp, 
  ShieldCheck, 
  Activity 
} from 'lucide-react';

export const FarmReports: React.FC = () => {
  const { currentUser, telemetry } = useApp();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
            <FileSpreadsheet className="w-7 h-7 text-emerald-600" />
            <span>Farm Telemetry & Agronomy Reports</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Automated performance audit • Sensor uptime • Water efficiency analysis
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="px-3.5 py-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl text-xs font-bold shadow-xs flex items-center gap-1.5 transition"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Report</span>
          </button>
          <button
            onClick={() => alert('Telemetry report downloaded in CSV format.')}
            className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs flex items-center gap-1.5 transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Printable Report Document Card */}
      <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
        
        {/* Report Top Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 border-b border-slate-100 pb-6">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
              Official SAMS Audit Log
            </span>
            <h2 className="text-xl font-extrabold text-slate-900 mt-1">
              Field Telemetry & Resource Conservation Summary
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Farm: <b>{currentUser?.farmName || 'Green Valley Agro Farm'}</b> • Monitored Acreage: 14.5 Acres
            </p>
          </div>

          <div className="text-right text-xs text-slate-500">
            <p className="font-bold text-slate-800">Generated: {new Date().toLocaleDateString()}</p>
            <p className="text-[11px]">Audit Period: 30-Day Cycle</p>
            <p className="text-[11px] text-emerald-600 font-semibold">Sensor Health: 99.4%</p>
          </div>
        </div>

        {/* 4 Key Summary Performance Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200">
            <p className="text-xs text-emerald-800 font-semibold">Water Conserved</p>
            <p className="text-2xl font-extrabold text-emerald-900 mt-1">34,500 L</p>
            <p className="text-[11px] text-emerald-700 mt-1">~36% reduction vs conventional flood</p>
          </div>

          <div className="p-4 rounded-2xl bg-cyan-50/70 border border-cyan-200">
            <p className="text-xs text-cyan-800 font-semibold">Soil Moisture Stability</p>
            <p className="text-2xl font-extrabold text-cyan-900 mt-1">94.8%</p>
            <p className="text-[11px] text-cyan-700 mt-1">Maintained within 38-52% band</p>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200">
            <p className="text-xs text-amber-800 font-semibold">AI Disease Incidents</p>
            <p className="text-2xl font-extrabold text-amber-900 mt-1">1 Detected</p>
            <p className="text-[11px] text-amber-700 mt-1">Early Blight caught at 96% accuracy</p>
          </div>

          <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200">
            <p className="text-xs text-indigo-800 font-semibold">Forecasted Yield Impact</p>
            <p className="text-2xl font-extrabold text-indigo-900 mt-1">+22.4%</p>
            <p className="text-[11px] text-indigo-700 mt-1">Based on steady moisture & nutrients</p>
          </div>
        </div>

        {/* Sensor Node Readings Audit Table */}
        <div className="space-y-3 pt-2">
          <h3 className="font-bold text-sm text-slate-800">IoT Sensor Subsystem Readings</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider text-[10px] border-y border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Node ID</th>
                  <th className="py-2.5 px-3">Location / Depth</th>
                  <th className="py-2.5 px-3">Metric</th>
                  <th className="py-2.5 px-3">Current Value</th>
                  <th className="py-2.5 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                <tr>
                  <td className="py-2.5 px-3 font-mono font-bold">NODE-01</td>
                  <td className="py-2.5 px-3">Sector 4 (Topsoil 10cm)</td>
                  <td className="py-2.5 px-3">Capacitive Moisture</td>
                  <td className="py-2.5 px-3 font-semibold">{telemetry.soilDepthMoisture.top10cm}%</td>
                  <td className="py-2.5 px-3 text-emerald-600 font-bold">Online</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-mono font-bold">NODE-02</td>
                  <td className="py-2.5 px-3">Sector 4 (Rootzone 30cm)</td>
                  <td className="py-2.5 px-3">FDR Moisture Probe</td>
                  <td className="py-2.5 px-3 font-semibold">{telemetry.soilDepthMoisture.mid30cm}%</td>
                  <td className="py-2.5 px-3 text-emerald-600 font-bold">Online</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-mono font-bold">NODE-03</td>
                  <td className="py-2.5 px-3">Drip Valve Actuator #04</td>
                  <td className="py-2.5 px-3">Water Flow Telemetry</td>
                  <td className="py-2.5 px-3 font-semibold">{telemetry.waterUsageToday} L Dispensed</td>
                  <td className="py-2.5 px-3 text-cyan-600 font-bold">{telemetry.irrigationStatus}</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-mono font-bold">NODE-04</td>
                  <td className="py-2.5 px-3">Micro-Weather Canopy Mast</td>
                  <td className="py-2.5 px-3">Thermal & Relative Humidity</td>
                  <td className="py-2.5 px-3 font-semibold">{telemetry.temperature}°C / {telemetry.humidity}% RH</td>
                  <td className="py-2.5 px-3 text-emerald-600 font-bold">Online</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Agronomist Sign-off Box */}
        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Validated by Dr. Sarah Chen, Ph.D. (Agricultural Expert Portal)</span>
          </div>
          <span className="font-mono text-[11px] text-slate-400">Cryptographic IoT Stamp: SHA256-AGRI-0x992B</span>
        </div>

      </div>

    </div>
  );
};
