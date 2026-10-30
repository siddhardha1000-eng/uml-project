import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Droplets, 
  Play, 
  Square, 
  Sliders, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  TrendingDown, 
  Zap, 
  ShieldCheck, 
  Flame, 
  RotateCcw,
  Sparkles,
  Gauge
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

export const SmartIrrigation: React.FC = () => {
  const { 
    telemetry, 
    weeklyWater, 
    startIrrigation, 
    stopIrrigation, 
    toggleAutoIrrigation, 
    setMoistureThreshold,
    isDroughtSimulated,
    simulateDroughtEvent,
    restoreNormalConditions
  } = useApp();

  const isBelowThreshold = telemetry.soilMoisture < telemetry.moistureThreshold;
  const isPumping = telemetry.irrigationStatus === 'Active';

  return (
    <div className="space-y-6">
      
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
            <Droplets className="w-7 h-7 text-cyan-600" />
            <span>Smart Irrigation Management</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Automated sensor-triggered drip system • Subsurface emitter grid Sector 4
          </p>
        </div>

        <div className="flex items-center gap-2">
          {!isDroughtSimulated ? (
            <button
              onClick={simulateDroughtEvent}
              className="px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 text-xs font-bold flex items-center gap-1.5 transition"
            >
              <Flame className="w-3.5 h-3.5 text-amber-600" />
              <span>Simulate Low Moisture (&lt;40%)</span>
            </button>
          ) : (
            <button
              onClick={restoreNormalConditions}
              className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-bold flex items-center gap-1.5 transition"
            >
              <RotateCcw className="w-3.5 h-3.5 text-emerald-600" />
              <span>Reset to 46% Moisture</span>
            </button>
          )}
        </div>
      </div>

      {/* 2. Low Moisture Warning Banner */}
      {isBelowThreshold && (
        <div className="p-4 rounded-3xl bg-amber-500 text-white shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-in slide-in-from-top-2">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/20 rounded-2xl">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm sm:text-base">
                CRITICAL WARNING: Soil Moisture ({telemetry.soilMoisture}%) Below Required Threshold ({telemetry.moistureThreshold}%)
              </h3>
              <p className="text-xs text-amber-100 mt-0.5">
                {telemetry.autoIrrigation
                  ? 'Autonomous irrigation logic has initiated valve opening. Dispensing micro-drip water.'
                  : 'Automatic irrigation is toggled OFF. Please press "Start Irrigation" below to avoid root dehydration.'}
              </p>
            </div>
          </div>

          {!isPumping && (
            <button
              onClick={startIrrigation}
              className="px-4 py-2 bg-white text-amber-900 rounded-xl text-xs font-extrabold hover:bg-amber-50 shadow-md transition self-start sm:self-center shrink-0 flex items-center gap-1.5"
            >
              <Play className="w-4 h-4 fill-amber-900" />
              <span>Start Irrigation Now</span>
            </button>
          )}
        </div>
      )}

      {/* 3. Primary Status Grid (Current Moisture, Threshold, Status, Usage, Last Irrigated) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        
        {/* Metric 1: Current Moisture */}
        <div className={`p-4 rounded-2xl border transition-all ${
          isBelowThreshold ? 'bg-amber-50 border-amber-300' : 'bg-white border-slate-200/80 shadow-xs'
        }`}>
          <span className="text-xs font-semibold text-slate-500">Current Moisture</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className={`text-3xl font-extrabold ${isBelowThreshold ? 'text-amber-600' : 'text-slate-900'}`}>
              {telemetry.soilMoisture}%
            </span>
          </div>
          <div className="mt-2 w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-500 ${isBelowThreshold ? 'bg-amber-500' : 'bg-cyan-500'}`}
              style={{ width: `${telemetry.soilMoisture}%` }}
            />
          </div>
          <span className={`text-[10px] font-bold block mt-1.5 ${isBelowThreshold ? 'text-amber-600' : 'text-emerald-600'}`}>
            {isBelowThreshold ? 'Below Safe Level' : 'Adequate Hydration'}
          </span>
        </div>

        {/* Metric 2: Moisture Threshold */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>Required Threshold</span>
            <Sliders className="w-3.5 h-3.5 text-slate-400" />
          </div>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-3xl font-extrabold text-slate-900">{telemetry.moistureThreshold}%</span>
          </div>
          <input
            type="range"
            min="20"
            max="60"
            value={telemetry.moistureThreshold}
            onChange={(e) => setMoistureThreshold(Number(e.target.value))}
            className="w-full mt-3 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-cyan-600"
          />
          <div className="flex justify-between text-[10px] text-slate-400 mt-1">
            <span>20% (Dry)</span>
            <span>60% (Moist)</span>
          </div>
        </div>

        {/* Metric 3: Irrigation Status */}
        <div className={`p-4 rounded-2xl border transition-all ${
          isPumping ? 'bg-cyan-50/80 border-cyan-300' : 'bg-white border-slate-200/80 shadow-xs'
        }`}>
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
            <span>Pump Status</span>
            <span className={`w-2.5 h-2.5 rounded-full ${isPumping ? 'bg-cyan-500 animate-ping' : 'bg-slate-300'}`} />
          </div>
          <div className="flex items-baseline gap-2 mt-1">
            <span className={`text-2xl font-extrabold ${isPumping ? 'text-cyan-700' : 'text-slate-800'}`}>
              {telemetry.irrigationStatus}
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-2">
            Flow Rate: <b>{isPumping ? '28.5 L/min' : '0.0 L/min'}</b>
          </p>
          <p className="text-[10px] text-slate-400">Valve Relay #02</p>
        </div>

        {/* Metric 4: Water Usage Today */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <span className="text-xs font-semibold text-slate-500">Water Usage Today</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-3xl font-extrabold text-slate-900">{telemetry.waterUsageToday}</span>
            <span className="text-xs font-semibold text-slate-400">Liters</span>
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-emerald-600 font-semibold">
            <TrendingDown className="w-3.5 h-3.5" />
            <span>18% below seasonal avg</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-1">Daily Cap: 1,500 L</p>
        </div>

        {/* Metric 5: Last Irrigation Time */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <span className="text-xs font-semibold text-slate-500">Last Irrigated</span>
          <div className="flex items-start gap-1.5 mt-2">
            <Clock className="w-4 h-4 text-cyan-600 mt-0.5 shrink-0" />
            <span className="text-xs font-bold text-slate-800 leading-snug">
              {telemetry.lastIrrigated}
            </span>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
            <span>Cycle Length</span>
            <span className="font-semibold text-slate-700">20 Mins</span>
          </div>
        </div>

      </div>

      {/* 4. Interactive Pump Controller & Animated Pipe Visualizer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Pump Visualizer & Controls */}
        <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-base font-bold text-slate-900">Irrigation Actuator Controls</h2>
              <p className="text-xs text-slate-500">Command pump valves & switch between automation modes</p>
            </div>

            {/* Auto Mode Switch */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-700">Auto Mode:</span>
              <button
                type="button"
                onClick={toggleAutoIrrigation}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  telemetry.autoIrrigation ? 'bg-emerald-600' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    telemetry.autoIrrigation ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Animated Water Pump Pipeline Visualizer */}
          <div className={`p-6 rounded-2xl border transition-all ${
            isPumping ? 'bg-gradient-to-r from-cyan-950 via-slate-900 to-cyan-950 text-white border-cyan-400' : 'bg-slate-900 text-white border-slate-800'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Gauge className={`w-5 h-5 ${isPumping ? 'text-cyan-400 animate-spin' : 'text-slate-400'}`} />
                <span className="font-bold text-xs">Sector 4 Subsurface Drip Line</span>
              </div>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                isPumping ? 'bg-cyan-500 text-white' : 'bg-slate-800 text-slate-400'
              }`}>
                {isPumping ? '🌊 WATER DISPENSING' : 'STANDBY'}
              </span>
            </div>

            {/* Dynamic Water Animation Bar */}
            <div className="relative h-6 bg-slate-800 rounded-full overflow-hidden border border-slate-700 flex items-center px-2">
              {isPumping ? (
                <div className="w-full h-3 bg-gradient-to-r from-cyan-500 via-sky-300 to-cyan-500 rounded-full animate-pulse shadow-sm shadow-cyan-400">
                  <div className="w-full h-full opacity-60 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,#0284c7_10px,#0284c7_20px)]" />
                </div>
              ) : (
                <div className="text-[10px] text-slate-400 mx-auto font-mono">
                  Valve Closed (Pressure: 2.4 Bar Ready)
                </div>
              )}
            </div>

            <div className="grid grid-cols-3 gap-2 mt-4 text-center text-xs">
              <div className="p-2 bg-white/5 rounded-xl">
                <p className="text-slate-400 text-[10px]">Active Pressure</p>
                <p className="font-bold text-white">{isPumping ? '2.8 Bar' : '0.0 Bar'}</p>
              </div>
              <div className="p-2 bg-white/5 rounded-xl">
                <p className="text-slate-400 text-[10px]">Discharge Rate</p>
                <p className="font-bold text-cyan-300">{isPumping ? '28.5 L/min' : '0 L/min'}</p>
              </div>
              <div className="p-2 bg-white/5 rounded-xl">
                <p className="text-slate-400 text-[10px]">Emitter Uniformity</p>
                <p className="font-bold text-emerald-400">98.2%</p>
              </div>
            </div>
          </div>

          {/* Action Buttons: Start / Stop Irrigation */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={startIrrigation}
              disabled={isPumping}
              className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition ${
                isPumping
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20'
              }`}
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Start Irrigation (Manual Override)</span>
            </button>

            <button
              onClick={stopIrrigation}
              disabled={!isPumping}
              className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition ${
                !isPumping
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  : 'bg-rose-600 hover:bg-rose-700 text-white shadow-md shadow-rose-600/20'
              }`}
            >
              <Square className="w-4 h-4 fill-current" />
              <span>Stop Irrigation</span>
            </button>
          </div>

        </div>

        {/* Right: Weekly Water Usage Chart */}
        <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-base font-bold text-slate-900">Weekly Water Consumption</h2>
              <p className="text-xs text-slate-500">Liters consumed vs Daily Budget</p>
            </div>
            <span className="text-[10px] font-bold text-cyan-800 bg-cyan-100 px-2 py-0.5 rounded-full">
              7-Day Log
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyWater} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} domain={[0, 2000]} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#ffffff', 
                    borderRadius: '12px', 
                    border: '1px solid #e2e8f0', 
                    fontSize: '12px' 
                  }} 
                />
                <Bar dataKey="liters" name="Liters Used" fill="#0284c7" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-xs text-slate-600 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-600 shrink-0" />
            <span>
              Autonomous threshold logic saved <b>4,200 Liters</b> of water this week by skipping unnecessary irrigation cycles.
            </span>
          </div>
        </div>

      </div>

    </div>
  );
};
