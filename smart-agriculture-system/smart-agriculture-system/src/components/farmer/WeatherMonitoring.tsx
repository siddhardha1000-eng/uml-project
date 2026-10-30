import React from 'react';
import { FORECAST_5_DAYS } from '../../data/mockData';
import { 
  CloudSun, 
  Sun, 
  CloudRain, 
  CloudLightning, 
  Wind, 
  Droplets, 
  Thermometer, 
  Compass, 
  Eye, 
  Umbrella, 
  AlertTriangle,
  CheckCircle2
} from 'lucide-react';

export const WeatherMonitoring: React.FC = () => {
  const getWeatherIcon = (iconName: string, className = "w-6 h-6") => {
    switch (iconName) {
      case 'sun':
        return <Sun className={`${className} text-amber-500`} />;
      case 'cloud-rain':
        return <CloudRain className={`${className} text-blue-500`} />;
      case 'cloud-lightning':
        return <CloudLightning className={`${className} text-purple-500`} />;
      case 'wind':
        return <Wind className={`${className} text-teal-500`} />;
      default:
        return <CloudSun className={`${className} text-amber-500`} />;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
            <CloudSun className="w-7 h-7 text-amber-500" />
            <span>Weather & Micro-Climate Station</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Local agro-meteorological station telemetry • Sector 4 Grid
          </p>
        </div>

        <span className="px-3 py-1 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold self-start sm:self-auto flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          Live Weather Stream
        </span>
      </div>

      {/* 2. Today's Highlight Weather Card */}
      <div className="bg-gradient-to-br from-emerald-800 via-teal-900 to-slate-900 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="absolute right-0 bottom-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          
          <div className="md:col-span-6 space-y-3">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-bold uppercase tracking-wider">
                Current Field Conditions
              </span>
              <span className="text-xs text-emerald-300">Updated 2m ago</span>
            </div>

            <div className="flex items-center gap-4">
              <Sun className="w-16 h-16 text-amber-400" />
              <div>
                <span className="text-5xl font-extrabold tracking-tight">31°C</span>
                <p className="text-sm font-semibold text-emerald-200">Partly Sunny • RealFeel 33°C</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 max-w-md">
              High solar radiation today with dry breezes. Evapotranspiration will peak between 1:00 PM and 3:30 PM.
            </p>
          </div>

          <div className="md:col-span-6 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            
            <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md border border-white/10">
              <Droplets className="w-5 h-5 text-cyan-300 mx-auto mb-1" />
              <p className="text-[10px] text-slate-300">Humidity</p>
              <p className="text-lg font-bold text-white">58%</p>
            </div>

            <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md border border-white/10">
              <Umbrella className="w-5 h-5 text-blue-300 mx-auto mb-1" />
              <p className="text-[10px] text-slate-300">Rain Prob.</p>
              <p className="text-lg font-bold text-white">15%</p>
            </div>

            <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md border border-white/10">
              <Wind className="w-5 h-5 text-teal-300 mx-auto mb-1" />
              <p className="text-[10px] text-slate-300">Wind</p>
              <p className="text-lg font-bold text-white">12 km/h</p>
            </div>

            <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md border border-white/10">
              <Compass className="w-5 h-5 text-amber-300 mx-auto mb-1" />
              <p className="text-[10px] text-slate-300">Wind Dir.</p>
              <p className="text-lg font-bold text-white">NE</p>
            </div>

          </div>

        </div>
      </div>

      {/* 3. 5-Day Weather Forecast (Requested in prompt) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900">5-Day Agricultural Weather Forecast</h2>
          <span className="text-xs text-slate-500 font-medium">Includes Agro-Spray Feasibility</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
          {FORECAST_5_DAYS.map((item, index) => (
            <div
              key={index}
              className={`p-4 rounded-3xl border transition-all flex flex-col justify-between ${
                item.day === 'Today'
                  ? 'bg-emerald-50/70 border-emerald-300 shadow-sm'
                  : 'bg-white border-slate-200/80 hover:shadow-md'
              }`}
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-bold text-slate-800">{item.day}</span>
                  <span className="text-slate-400 text-[10px]">{item.date}</span>
                </div>

                <div className="my-3 text-center">
                  <div className="mx-auto flex justify-center mb-1">
                    {getWeatherIcon(item.icon, "w-8 h-8")}
                  </div>
                  <p className="text-xs font-bold text-slate-800">{item.condition}</p>
                </div>

                <div className="flex items-baseline justify-center gap-2 text-center">
                  <span className="text-xl font-extrabold text-slate-900">{item.tempMax}°</span>
                  <span className="text-xs text-slate-400">{item.tempMin}°</span>
                </div>

                <div className="mt-3 space-y-1 text-[11px] text-slate-500 border-t border-slate-100 pt-2">
                  <div className="flex justify-between">
                    <span>Rain Risk:</span>
                    <span className="font-bold text-blue-600">{item.rainProb}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Humidity:</span>
                    <span>{item.humidity}%</span>
                  </div>
                </div>
              </div>

              {/* Spray Advisory Badge */}
              <div className="mt-4 pt-2 border-t border-slate-100 text-center">
                <span className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-bold ${
                  item.sprayAdvisory === 'Optimal'
                    ? 'bg-emerald-100 text-emerald-800'
                    : item.sprayAdvisory === 'Moderate'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-rose-100 text-rose-800'
                }`}>
                  Spray: {item.sprayAdvisory}
                </span>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* 4. Agricultural Micro-Climate Notice */}
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl flex items-start gap-3 text-xs text-blue-900">
        <Umbrella className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
        <div>
          <p className="font-bold">Autonomous Rain Delay Protection</p>
          <p className="text-blue-800 mt-0.5">
            Heavy showers forecasted for Friday (Oct 03 - 65% chance). SAMS automated irrigation logic will automatically pause routine drip cycles 12 hours ahead to prevent waterlogging and root rot.
          </p>
        </div>
      </div>

    </div>
  );
};
