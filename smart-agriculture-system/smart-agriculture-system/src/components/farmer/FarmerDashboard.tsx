import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Layers, 
  Thermometer, 
  Droplets, 
  CloudSun, 
  Play, 
  Square, 
  AlertTriangle, 
  CheckCircle2, 
  Activity, 
  ArrowUpRight, 
  Flame, 
  RotateCcw,
  Sparkles,
  Zap,
  TrendingUp,
  Cpu
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

export const FarmerDashboard: React.FC = () => {
  const { 
    currentUser, 
    telemetry, 
    historicalReadings, 
    setCurrentView,
    startIrrigation, 
    stopIrrigation,
    isDroughtSimulated,
    simulateDroughtEvent,
    restoreNormalConditions
  } = useApp();

  const isMoistureBelowThreshold = telemetry.soilMoisture < telemetry.moistureThreshold;

  return (
    <div className="space-y-6">
      
      {/* 1. Header Banner & Farm Selector */}
      <div className="bg-gradient-to-r from-emerald-800 to-green-900 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-bold tracking-wide uppercase border border-emerald-400/20">
                Live Farm Telemetry
              </span>
              <span className="flex items-center gap-1 text-[11px] text-emerald-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                Sensors Synchronized
              </span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome back, {currentUser?.name || 'Farmer'}
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100 max-w-xl">
              {currentUser?.farmName || 'Green Valley Agro Farm'} • {currentUser?.farmLocation || 'Sector 4, Nashik Agri-Belt'} (14.5 Acres)
            </p>
          </div>

          {/* Quick Simulation Trigger Pill (Very useful for Viva demonstration!) */}
          <div className="flex flex-wrap items-center gap-2 bg-emerald-950/60 p-2 rounded-2xl border border-emerald-700/50 backdrop-blur-md">
            <span className="text-[11px] font-medium text-emerald-300 px-1">IoT Simulation:</span>
            {!isDroughtSimulated ? (
              <button
                onClick={simulateDroughtEvent}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-400/30 text-xs font-semibold transition"
                title="Simulate low moisture to trigger automatic alert & pump"
              >
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                <span>Trigger Dry Soil (&lt;40%)</span>
              </button>
            ) : (
              <button
                onClick={restoreNormalConditions}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/30 hover:bg-emerald-500/40 text-emerald-200 border border-emerald-400/30 text-xs font-semibold transition"
              >
                <RotateCcw className="w-3.5 h-3.5 text-emerald-400" />
                <span>Reset to Optimal</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 2. Urgent Threshold Alert Banner (If soil moisture < threshold) */}
      {isMoistureBelowThreshold && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 text-amber-900 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-in fade-in duration-200">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-amber-200/70 text-amber-800 shrink-0 mt-0.5">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-sm">
                Attention: Soil Moisture ({telemetry.soilMoisture}%) is below Required Threshold ({telemetry.moistureThreshold}%)
              </p>
              <p className="text-xs text-amber-700 mt-0.5">
                {telemetry.autoIrrigation 
                  ? '⚡ Autonomous smart pump has engaged to protect crops from water deficit.'
                  : 'Manual irrigation trigger recommended to prevent permanent crop wilting.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center">
            {telemetry.irrigationStatus === 'Idle' ? (
              <button
                onClick={startIrrigation}
                className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition"
              >
                <Play className="w-3.5 h-3.5" />
                <span>Start Pump</span>
              </button>
            ) : (
              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-xl text-xs font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
                Pump Currently Active
              </span>
            )}
            
            <button
              onClick={() => setCurrentView('irrigation')}
              className="px-3 py-1.5 bg-amber-200 hover:bg-amber-300 text-amber-900 rounded-xl text-xs font-semibold transition"
            >
              Irrigation Settings →
            </button>
          </div>
        </div>
      )}

      {/* 3. Five Overview Telemetry Cards (Soil Moisture, Temp, Humidity, Weather, Irrigation) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        
        {/* Card 1: Soil Moisture */}
        <div className={`p-4 rounded-2xl border transition-all ${
          isMoistureBelowThreshold 
            ? 'bg-amber-50/70 border-amber-300 shadow-sm' 
            : 'bg-white border-slate-200/80 hover:shadow-md'
        }`}>
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span className="font-semibold">Soil Moisture</span>
            <Layers className={`w-4 h-4 ${isMoistureBelowThreshold ? 'text-amber-600' : 'text-emerald-600'}`} />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-extrabold text-slate-900">{telemetry.soilMoisture}%</span>
            <span className="text-xs text-slate-400 font-medium">/ 100%</span>
          </div>
          
          <div className="mt-2.5 w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-500 ${
                isMoistureBelowThreshold ? 'bg-amber-500' : 'bg-emerald-500'
              }`}
              style={{ width: `${Math.min(100, telemetry.soilMoisture)}%` }}
            />
          </div>

          <div className="flex items-center justify-between mt-2 text-[11px]">
            <span className="text-slate-500 font-medium">Target: {telemetry.moistureThreshold}%</span>
            <span className={`font-bold ${isMoistureBelowThreshold ? 'text-amber-600' : 'text-emerald-600'}`}>
              {isMoistureBelowThreshold ? 'Low Deficit' : 'Optimal'}
            </span>
          </div>
        </div>

        {/* Card 2: Temperature */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 hover:shadow-md transition-all">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span className="font-semibold">Temperature</span>
            <Thermometer className="w-4 h-4 text-orange-500" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-extrabold text-slate-900">{telemetry.temperature}°C</span>
          </div>

          <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-500">
            <span>Soil Temp: 24.1°C</span>
            <span className="text-emerald-600 font-bold">Safe Range</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-1">Optimal for photosynthesis</p>
        </div>

        {/* Card 3: Humidity */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 hover:shadow-md transition-all">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span className="font-semibold">Air Humidity</span>
            <Droplets className="w-4 h-4 text-cyan-500" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-extrabold text-slate-900">{telemetry.humidity}%</span>
          </div>

          <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-500">
            <span>Dew Point: 18°C</span>
            <span className="text-cyan-700 font-bold">Favorable</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-1">Low fungal risk index</p>
        </div>

        {/* Card 4: Weather Status */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 hover:shadow-md transition-all">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span className="font-semibold">Weather Outlook</span>
            <CloudSun className="w-4 h-4 text-amber-500" />
          </div>
          <div>
            <span className="text-xl font-bold text-slate-900 block truncate">Partly Cloudy</span>
            <p className="text-xs text-slate-500 mt-0.5">Rain Prob: 15%</p>
          </div>

          <div className="mt-2 flex items-center justify-between text-[11px] pt-1 border-t border-slate-100">
            <span className="text-slate-400">Wind: 12 km/h</span>
            <span className="text-emerald-600 font-bold">Good Spray</span>
          </div>
        </div>

        {/* Card 5: Irrigation Status */}
        <div className={`p-4 rounded-2xl border transition-all ${
          telemetry.irrigationStatus === 'Active'
            ? 'bg-cyan-50/70 border-cyan-300 shadow-sm'
            : 'bg-white border-slate-200/80 hover:shadow-md'
        }`}>
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span className="font-semibold">Irrigation Pump</span>
            <span className={`w-2.5 h-2.5 rounded-full ${
              telemetry.irrigationStatus === 'Active' ? 'bg-cyan-500 animate-ping' : 'bg-slate-300'
            }`} />
          </div>

          <div className="flex items-baseline justify-between">
            <span className={`text-2xl font-extrabold ${
              telemetry.irrigationStatus === 'Active' ? 'text-cyan-700' : 'text-slate-800'
            }`}>
              {telemetry.irrigationStatus}
            </span>
            <span className="text-[10px] uppercase font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
              {telemetry.autoIrrigation ? 'Auto' : 'Manual'}
            </span>
          </div>

          <div className="mt-2 flex items-center justify-between pt-1 border-t border-slate-100 text-[11px]">
            <span className="text-slate-500">Today: {telemetry.waterUsageToday} L</span>
            {telemetry.irrigationStatus === 'Active' ? (
              <button 
                onClick={stopIrrigation}
                className="text-rose-600 hover:text-rose-700 font-bold"
              >
                Stop
              </button>
            ) : (
              <button 
                onClick={startIrrigation}
                className="text-emerald-600 hover:text-emerald-700 font-bold"
              >
                Start
              </button>
            )}
          </div>
        </div>

      </div>

      {/* 4. Main Analytics: 24-Hour Telemetry Graph & Soil Condition Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Historical Soil Moisture & Temperature Chart */}
        <div className="lg:col-span-8 bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div>
              <h2 className="font-bold text-base text-slate-900">Historical Soil Readings (24 Hours)</h2>
              <p className="text-xs text-slate-500">Real-time IoT telemetry logged every 2 hours</p>
            </div>
            <div className="flex items-center gap-4 text-xs font-medium">
              <div className="flex items-center gap-1.5 text-emerald-700">
                <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                <span>Soil Moisture (%)</span>
              </div>
              <div className="flex items-center gap-1.5 text-orange-600">
                <span className="w-3 h-3 rounded-full bg-orange-400"></span>
                <span>Temperature (°C)</span>
              </div>
            </div>
          </div>

          <div className="h-64 sm:h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={historicalReadings} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="moistureGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0}/>
                  </linearGradient>
                  <linearGradient id="tempGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="time" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} domain={[15, 60]} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                    borderRadius: '12px', 
                    border: '1px solid #e2e8f0', 
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    fontSize: '12px' 
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="soilMoisture" 
                  name="Soil Moisture (%)" 
                  stroke="#059669" 
                  strokeWidth={2.5} 
                  fillOpacity={1} 
                  fill="url(#moistureGrad)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="temperature" 
                  name="Temperature (°C)" 
                  stroke="#ea580c" 
                  strokeWidth={2} 
                  fillOpacity={1} 
                  fill="url(#tempGrad)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-500">
            <span>Threshold set at <b>{telemetry.moistureThreshold}%</b></span>
            <button 
              onClick={() => setCurrentView('soil')}
              className="text-emerald-700 hover:text-emerald-800 font-bold"
            >
              Full Depth Strata Analysis →
            </button>
          </div>
        </div>

        {/* Right Column: Soil Condition & Sensor Hardware Health */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Soil Condition Card */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-sm text-slate-800">Current Soil Health</h3>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                telemetry.soilCondition === 'Optimal' 
                  ? 'bg-emerald-100 text-emerald-800' 
                  : 'bg-amber-100 text-amber-800'
              }`}>
                {telemetry.soilCondition}
              </span>
            </div>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-500">Soil pH</span>
                  <span className="font-bold text-slate-800">{telemetry.soilNutrients.ph} (Neutral)</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: '68%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-500">Nitrogen (N)</span>
                  <span className="font-bold text-slate-800">{telemetry.soilNutrients.nitrogen} mg/kg</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: '72%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-500">Phosphorus (P)</span>
                  <span className="font-bold text-slate-800">{telemetry.soilNutrients.phosphorus} mg/kg</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: '64%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-500">Potassium (K)</span>
                  <span className="font-bold text-slate-800">{telemetry.soilNutrients.potassium} mg/kg</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: '85%' }} />
                </div>
              </div>
            </div>

            <button
              onClick={() => setCurrentView('crop-rec')}
              className="w-full py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Get Crop Suggestions for this Soil</span>
            </button>
          </div>

          {/* IoT Sensor Node Status */}
          <div className="bg-slate-900 text-white p-5 rounded-3xl border border-slate-800 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-emerald-400" />
                <span className="font-bold text-xs">LoRa Sensor Node #02</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-semibold">
                Online
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs pt-1">
              <div className="p-2 bg-slate-800/80 rounded-xl border border-slate-700/60">
                <p className="text-slate-400 text-[10px]">Battery Level</p>
                <p className="font-bold text-emerald-400">{telemetry.sensorHealth.battery}%</p>
              </div>
              <div className="p-2 bg-slate-800/80 rounded-xl border border-slate-700/60">
                <p className="text-slate-400 text-[10px]">Signal (RSSI)</p>
                <p className="font-bold text-slate-200">{telemetry.sensorHealth.signalStrength} dBm</p>
              </div>
            </div>

            <p className="text-[10px] text-slate-400">
              Last heartbeat sync: <span className="text-slate-200 font-mono">{telemetry.sensorHealth.lastPing}</span>
            </p>
          </div>

        </div>

      </div>

      {/* 5. Quick Access Action Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        <div 
          onClick={() => setCurrentView('irrigation')}
          className="p-4 bg-white rounded-2xl border border-slate-200/80 hover:border-cyan-300 hover:shadow-md cursor-pointer transition flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center group-hover:bg-cyan-600 group-hover:text-white transition">
              <Droplets className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-xs text-slate-800">Smart Irrigation Controls</h4>
              <p className="text-[11px] text-slate-500">Configure threshold & pump cycles</p>
            </div>
          </div>
          <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-600 transition" />
        </div>

        <div 
          onClick={() => setCurrentView('crop-rec')}
          className="p-4 bg-white rounded-2xl border border-slate-200/80 hover:border-amber-300 hover:shadow-md cursor-pointer transition flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:bg-amber-600 group-hover:text-white transition">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-xs text-slate-800">Crop Recommendation</h4>
              <p className="text-[11px] text-slate-500">AI analysis for maximum yield</p>
            </div>
          </div>
          <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 transition" />
        </div>

        <div 
          onClick={() => setCurrentView('disease')}
          className="p-4 bg-white rounded-2xl border border-slate-200/80 hover:border-rose-300 hover:shadow-md cursor-pointer transition flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center group-hover:bg-rose-600 group-hover:text-white transition">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-xs text-slate-800">Leaf Disease Detection</h4>
              <p className="text-[11px] text-slate-500">Diagnose symptoms with AI vision</p>
            </div>
          </div>
          <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-rose-600 transition" />
        </div>

      </div>

    </div>
  );
};
