import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CROP_KNOWLEDGE_BASE } from '../../data/mockData';
import { RecommendedCrop } from '../../types';
import { 
  Sprout, 
  Sparkles, 
  CheckCircle2, 
  Droplets, 
  Sun, 
  MapPin, 
  RefreshCw, 
  Layers, 
  Clock, 
  ArrowRight,
  TrendingUp,
  Cpu
} from 'lucide-react';

export const CropRecommendation: React.FC = () => {
  const { telemetry } = useApp();

  // Form State
  const [soilType, setSoilType] = useState('Loamy / Alluvial');
  const [moisture, setMoisture] = useState(telemetry.soilMoisture);
  const [temperature, setTemperature] = useState(telemetry.temperature);
  const [humidity, setHumidity] = useState(telemetry.humidity);
  const [season, setSeason] = useState('Rabi (Winter / Spring)');
  const [location, setLocation] = useState('Nashik Agri-Belt (Maharashtra)');
  const [waterAvailability, setWaterAvailability] = useState('Medium (Automated Drip)');
  
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [recommendations, setRecommendations] = useState<RecommendedCrop[]>(CROP_KNOWLEDGE_BASE);

  // Auto-fill from live telemetry
  const handleAutoFillSensors = () => {
    setMoisture(telemetry.soilMoisture);
    setTemperature(telemetry.temperature);
    setHumidity(telemetry.humidity);
  };

  const handleRecommend = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAnalyzing(true);

    setTimeout(() => {
      // Sort or filter slightly based on inputs
      const updated = [...CROP_KNOWLEDGE_BASE].map((crop, idx) => {
        let score = crop.matchScore;
        if (soilType.includes('Alluvial') && crop.id === 'crop-1') score = 98;
        if (season.includes('Rabi') && crop.id === 'crop-1') score = 97;
        if (soilType.includes('Clay') && crop.id === 'crop-3') score = 95;
        return { ...crop, matchScore: score };
      }).sort((a, b) => b.matchScore - a.matchScore);

      setRecommendations(updated);
      setIsAnalyzing(false);
    }, 600);
  };

  return (
    <div className="space-y-6">
      
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
            <Sprout className="w-7 h-7 text-emerald-600" />
            <span>AI Crop Recommendation Engine</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Data-driven agronomic modeling combining soil type, live telemetry, and seasonal climate
          </p>
        </div>

        <button
          type="button"
          onClick={handleAutoFillSensors}
          className="px-3.5 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-xl text-xs font-bold flex items-center gap-1.5 transition self-start sm:self-auto shadow-xs"
        >
          <Cpu className="w-3.5 h-3.5 text-emerald-600" />
          <span>Auto-fill from Live Sensors</span>
        </button>
      </div>

      {/* 2. Interactive Input Form */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs">
        <form onSubmit={handleRecommend} className="space-y-5">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            
            {/* Soil Type */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-emerald-600" />
                <span>Soil Type</span>
              </label>
              <select
                value={soilType}
                onChange={(e) => setSoilType(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
              >
                <option value="Loamy / Alluvial">Loamy / Alluvial Soil (Rich Organic)</option>
                <option value="Black Cotton Soil">Black Cotton Soil (High Clay)</option>
                <option value="Red Sandy Loam">Red Sandy Loam</option>
                <option value="Clayey Loam">Clayey Loam (Water Retentive)</option>
                <option value="Laterite Soil">Laterite Soil</option>
              </select>
            </div>

            {/* Soil Moisture */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Droplets className="w-3.5 h-3.5 text-cyan-600" />
                  <span>Soil Moisture</span>
                </span>
                <span className="font-extrabold text-emerald-700">{moisture}%</span>
              </label>
              <input
                type="range"
                min="10"
                max="80"
                value={moisture}
                onChange={(e) => setMoisture(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600 mt-2"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>10% (Dry)</span>
                <span>80% (Saturated)</span>
              </div>
            </div>

            {/* Temperature */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Sun className="w-3.5 h-3.5 text-orange-500" />
                  <span>Ambient Temperature</span>
                </span>
                <span className="font-extrabold text-orange-600">{temperature}°C</span>
              </label>
              <input
                type="range"
                min="15"
                max="45"
                value={temperature}
                onChange={(e) => setTemperature(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-orange-500 mt-2"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>15°C (Cool)</span>
                <span>45°C (Hot)</span>
              </div>
            </div>

            {/* Season */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Target Crop Season
              </label>
              <select
                value={season}
                onChange={(e) => setSeason(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
              >
                <option value="Rabi (Winter / Spring)">Rabi (Winter / Spring: Oct - Mar)</option>
                <option value="Kharif (Monsoon)">Kharif (Monsoon: Jun - Oct)</option>
                <option value="Zaid (Summer)">Zaid (Summer: Mar - Jun)</option>
                <option value="Perennial / Year-Round">Perennial / Year-Round</option>
              </select>
            </div>

            {/* Location / Region */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-rose-500" />
                <span>Geographic Agro-Climatic Zone</span>
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="e.g. Nashik Valley / Punjab Plains"
              />
            </div>

            {/* Water Availability */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Farm Irrigation Capacity
              </label>
              <select
                value={waterAvailability}
                onChange={(e) => setWaterAvailability(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
              >
                <option value="High (Abundant Canal / Tube-well)">High (Abundant Canal / Tube-well)</option>
                <option value="Medium (Automated Drip)">Medium (Automated Precision Drip)</option>
                <option value="Low (Rainfed / Drought Prone)">Low (Rainfed / Drought Prone)</option>
              </select>
            </div>

          </div>

          <div className="flex items-center justify-end pt-2 border-t border-slate-100">
            <button
              type="submit"
              disabled={isAnalyzing}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-600/20 flex items-center gap-2 transition"
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Analyzing Soil Matrix...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Recommended Crops</span>
                </>
              )}
            </button>
          </div>

        </form>
      </div>

      {/* 3. Recommended Crops Cards Grid (Concise & Information-rich) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Top Recommended Crops ({recommendations.length})
            </h2>
            <p className="text-xs text-slate-500">
              Ranked by agronomic compatibility score, weather resilience, and yield potential
            </p>
          </div>
          <span className="text-xs font-semibold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full">
            AI Algorithm: Multi-Factor KNN
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {recommendations.map(crop => (
            <div 
              key={crop.id}
              className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-lg transition-all group flex flex-col justify-between"
            >
              <div>
                {/* Crop Photo Header with Match Badge */}
                <div className="relative h-40 w-full overflow-hidden">
                  <img
                    src={crop.image}
                    alt={crop.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  
                  <div className="absolute top-3 right-3">
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500 text-white text-xs font-extrabold shadow-sm">
                      {crop.matchScore}% Match
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300">
                      {crop.category}
                    </span>
                    <h3 className="text-base font-extrabold leading-tight">{crop.name}</h3>
                  </div>
                </div>

                {/* Concise Info Points */}
                <div className="p-5 space-y-3.5">
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2 bg-slate-50 rounded-xl border border-slate-100">
                      <p className="text-[10px] text-slate-400 font-medium">Suitable Soil</p>
                      <p className="font-bold text-slate-800 truncate">{crop.suitableSoil}</p>
                    </div>
                    <div className="p-2 bg-slate-50 rounded-xl border border-slate-100">
                      <p className="text-[10px] text-slate-400 font-medium">Water Required</p>
                      <p className="font-bold text-cyan-700 truncate">{crop.requiredWater}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-600 px-1">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{crop.growthDuration}</span>
                    </span>
                    <span className="font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md">
                      {crop.suitableSeason}
                    </span>
                  </div>

                  {/* Recommendation Reason */}
                  <div className="p-2.5 bg-emerald-50/60 rounded-xl border border-emerald-100 text-xs text-emerald-900 leading-snug">
                    <p className="font-bold text-[11px] text-emerald-800 mb-0.5">Recommendation Rationale:</p>
                    <p className="text-[11px] text-slate-600">{crop.recommendationReason}</p>
                  </div>

                  {/* Key Benefits */}
                  <div className="space-y-1">
                    {crop.keyBenefits.map((b, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-[11px] text-slate-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Action */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 text-center">
                <button className="text-xs font-bold text-emerald-700 hover:text-emerald-800 transition flex items-center justify-center gap-1 mx-auto">
                  <span>View Cultivation Protocols</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
