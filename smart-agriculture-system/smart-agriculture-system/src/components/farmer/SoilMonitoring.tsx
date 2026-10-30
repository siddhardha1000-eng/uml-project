import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Layers, 
  Thermometer, 
  Droplets, 
  Activity, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Radio, 
  Battery, 
  ArrowDown, 
  Sparkles,
  Info
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

export const SoilMonitoring: React.FC = () => {
  const { telemetry, historicalReadings, setCurrentView } = useApp();
  const [activeTab, setActiveTab] = useState<'moisture' | 'temperature' | 'nutrients'>('moisture');

  const nutrientData = [
    { name: 'Nitrogen (N)', current: telemetry.soilNutrients.nitrogen, ideal: 140, unit: 'mg/kg', status: 'Optimal' },
    { name: 'Phosphorus (P)', current: telemetry.soilNutrients.phosphorus, ideal: 45, unit: 'mg/kg', status: 'Optimal' },
    { name: 'Potassium (K)', current: telemetry.soilNutrients.potassium, ideal: 200, unit: 'mg/kg', status: 'High (Good)' },
    { name: 'Electrical Cond (EC)', current: telemetry.soilNutrients.ec * 100, ideal: 120, unit: 'x10 dS/m', status: 'Optimal' },
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
            <Layers className="w-7 h-7 text-emerald-600" />
            <span>Soil Monitoring & Strata Analytics</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Real-time multi-depth subterranean sensor array • Sector 4 LoRa Mesh
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            Sensor Array Online
          </span>
          <button
            onClick={() => setCurrentView('irrigation')}
            className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-xs transition"
          >
            Adjust Irrigation
          </button>
        </div>
      </div>

      {/* 1. Soil Strata Telemetry Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Top Soil Layer (0 - 10 cm) */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-bold text-slate-700">Topsoil (0 - 10 cm)</span>
            <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 text-[10px] font-bold">
              Evaporative Zone
            </span>
          </div>
          
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-slate-900">
              {telemetry.soilDepthMoisture.top10cm}%
            </span>
            <span className="text-xs text-slate-500 font-medium">Moisture</span>
          </div>

          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-amber-500 h-full rounded-full transition-all duration-500" 
              style={{ width: `${telemetry.soilDepthMoisture.top10cm}%` }} 
            />
          </div>

          <p className="text-[11px] text-slate-500 leading-snug">
            High solar exposure causing active moisture loss. Drip emitters replenish this layer first.
          </p>
        </div>

        {/* Root Zone (10 - 30 cm) */}
        <div className="bg-white p-5 rounded-3xl border border-emerald-200 shadow-xs space-y-3 relative">
          <div className="absolute top-3 right-3">
            <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-bold">
              Primary Active Root Zone
            </span>
          </div>
          
          <div className="flex items-center text-xs text-slate-500">
            <span className="font-bold text-slate-700">Mid Strata (10 - 30 cm)</span>
          </div>
          
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-emerald-600">
              {telemetry.soilDepthMoisture.mid30cm}%
            </span>
            <span className="text-xs text-emerald-700 font-semibold">Active Absorption</span>
          </div>

          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-emerald-500 h-full rounded-full transition-all duration-500" 
              style={{ width: `${telemetry.soilDepthMoisture.mid30cm}%` }} 
            />
          </div>

          <p className="text-[11px] text-slate-500 leading-snug">
            80% of crop feeder roots reside here. Main system threshold ({telemetry.moistureThreshold}%) is calibrated to this depth.
          </p>
        </div>

        {/* Deep Soil Substrata (30 - 60 cm) */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-bold text-slate-700">Deep Subsoil (30 - 60 cm)</span>
            <span className="px-2 py-0.5 rounded-md bg-blue-100 text-blue-800 text-[10px] font-bold">
              Water Reserve
            </span>
          </div>
          
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-slate-900">
              {telemetry.soilDepthMoisture.deep60cm}%
            </span>
            <span className="text-xs text-slate-500 font-medium">Deep Moisture</span>
          </div>

          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-blue-500 h-full rounded-full transition-all duration-500" 
              style={{ width: `${telemetry.soilDepthMoisture.deep60cm}%` }} 
            />
          </div>

          <p className="text-[11px] text-slate-500 leading-snug">
            Deep water retention layer. Prevents percolation stress during warm dry spells.
          </p>
        </div>

      </div>

      {/* 2. Interactive Charts Section with Tabs */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">Soil Telemetry Trends & Nutrients</h2>
            <p className="text-xs text-slate-500">View diurnal curve, thermal fluctuation, and mineral breakdown</p>
          </div>

          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 self-start sm:self-center">
            <button
              onClick={() => setActiveTab('moisture')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                activeTab === 'moisture' 
                  ? 'bg-white text-emerald-800 shadow-xs' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Soil Moisture
            </button>
            <button
              onClick={() => setActiveTab('temperature')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                activeTab === 'temperature' 
                  ? 'bg-white text-emerald-800 shadow-xs' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Temperature Trend
            </button>
            <button
              onClick={() => setActiveTab('nutrients')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                activeTab === 'nutrients' 
                  ? 'bg-white text-emerald-800 shadow-xs' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              NPK Nutrients
            </button>
          </div>
        </div>

        {/* Tab 1: Soil Moisture Area Chart */}
        {activeTab === 'moisture' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="font-semibold text-emerald-700">24-Hour Soil Moisture Profile (% vs Time)</span>
              <span className="font-medium">Threshold Line: <b>{telemetry.moistureThreshold}%</b></span>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={historicalReadings} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="soilMoistGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#059669" stopOpacity={0.5}/>
                      <stop offset="95%" stopColor="#059669" stopOpacity={0.0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="time" stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} domain={[20, 60]} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#ffffff', 
                      borderRadius: '12px', 
                      border: '1px solid #e2e8f0', 
                      fontSize: '12px' 
                    }} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="soilMoisture" 
                    name="Moisture (%)" 
                    stroke="#059669" 
                    strokeWidth={2.5} 
                    fill="url(#soilMoistGrad)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Tab 2: Temperature Trend */}
        {activeTab === 'temperature' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="font-semibold text-orange-600">Subterranean vs Ambient Temperature (°C)</span>
              <span>Optimal range: 18°C - 30°C</span>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={historicalReadings} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="time" stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} domain={[15, 35]} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#ffffff', 
                      borderRadius: '12px', 
                      border: '1px solid #e2e8f0', 
                      fontSize: '12px' 
                    }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="temperature" 
                    name="Ambient Temp (°C)" 
                    stroke="#ea580c" 
                    strokeWidth={2.5} 
                    dot={{ r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Tab 3: NPK Nutrient Chart */}
        {activeTab === 'nutrients' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="font-semibold text-indigo-700">Current vs Recommended Soil Nutrients</span>
              <span>Spectroscopic NPK probe data</span>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={nutrientData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#ffffff', 
                      borderRadius: '12px', 
                      border: '1px solid #e2e8f0', 
                      fontSize: '12px' 
                    }} 
                  />
                  <Bar dataKey="current" name="Measured Value" fill="#10b981" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="ideal" name="Target Benchmark" fill="#cbd5e1" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

      </div>

      {/* 3. Soil Sensor Hardware Diagnostic Card */}
      <div className="p-5 rounded-3xl bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-emerald-400" />
            <span className="font-bold text-sm">Probe Diagnostic: Soil-MultiDepth-S4</span>
          </div>
          <p className="text-xs text-slate-400">
            Capacitive FDR sensor • Factory calibrated on loam matrix • Firmware v2.4.1
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5 text-slate-300">
            <Battery className="w-4 h-4 text-emerald-400" />
            <span>94% Battery</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-300">
            <Radio className="w-4 h-4 text-emerald-400" />
            <span>-68 dBm (Strong)</span>
          </div>
          <div className="px-3 py-1 bg-emerald-500/20 text-emerald-300 font-bold rounded-xl border border-emerald-500/30">
            Healthy
          </div>
        </div>
      </div>

    </div>
  );
};
