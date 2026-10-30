import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Sprout, 
  Droplets, 
  Layers, 
  ScanSearch, 
  ArrowRight, 
  CloudSun, 
  BellRing, 
  Cpu, 
  CheckCircle2, 
  Sparkles, 
  ChevronRight,
  TrendingUp,
  ShieldCheck,
  Zap,
  BarChart3
} from 'lucide-react';
import { UserRole } from '../../types';

export const LandingPage: React.FC = () => {
  const { setCurrentRole, setCurrentView } = useApp();

  const handleLaunchRole = (role: UserRole) => {
    setCurrentRole(role);
    setCurrentView('dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-900 via-emerald-800 to-slate-900 text-white pt-20 pb-28">
        
        {/* Subtle decorative grid and lighting */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:24px_24px]"></div>
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-green-500/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Heading, Tagline, Description, Actions */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>Next-Generation AgTech Platform</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                Smart Agriculture <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-green-300 to-teal-200">
                  Management System
                </span>
              </h1>

              <p className="text-lg sm:text-xl font-medium text-emerald-100">
                “Smart technology for better farming decisions.”
              </p>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
                A clean, practical web application that helps farmers monitor real-time soil and field conditions, automate precision irrigation using IoT sensor thresholds, diagnose crop leaf diseases with computer vision, and receive AI-backed crop advisories.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => handleLaunchRole('farmer')}
                  className="px-6 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white shadow-lg shadow-emerald-500/25 flex items-center gap-2 group transition-all transform hover:-translate-y-0.5"
                >
                  <span>Get Started (Farmer Demo)</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => setCurrentView('login')}
                  className="px-6 py-3.5 rounded-xl font-bold text-sm bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md transition-all"
                >
                  Login to Portal
                </button>
              </div>

              {/* Key Quick Stats Pills */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-emerald-700/50 max-w-lg">
                <div>
                  <p className="text-2xl font-extrabold text-emerald-300">35%</p>
                  <p className="text-xs text-slate-300">Water Conserved</p>
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-emerald-300">24/7</p>
                  <p className="text-xs text-slate-300">Continuous Sensing</p>
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-emerald-300">96%+</p>
                  <p className="text-xs text-slate-300">Disease Accuracy</p>
                </div>
              </div>

            </div>

            {/* Right Column: Hero Visual Card (SAMS Live Dashboard Preview) */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto rounded-3xl p-1 bg-gradient-to-tr from-emerald-500/40 via-green-500/20 to-teal-500/40 shadow-2xl backdrop-blur-xl">
                <div className="bg-slate-900/90 rounded-[22px] p-5 border border-emerald-500/30 text-white space-y-4">
                  
                  {/* Top Bar Preview */}
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                      <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                      <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                      <span className="text-xs font-mono text-slate-400 ml-1">SAMS Telemetry Live</span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-semibold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      IoT Online
                    </span>
                  </div>

                  {/* Telemetry Visual Cards */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80">
                      <div className="flex items-center justify-between text-xs text-slate-400">
                        <span>Soil Moisture</span>
                        <Layers className="w-3.5 h-3.5 text-emerald-400" />
                      </div>
                      <p className="text-2xl font-bold text-white mt-1">36%</p>
                      <div className="mt-2 w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-amber-400 h-full rounded-full" style={{ width: '36%' }}></div>
                      </div>
                      <p className="text-[10px] text-amber-400 mt-1 font-medium">Below 40% Threshold</p>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80">
                      <div className="flex items-center justify-between text-xs text-slate-400">
                        <span>Smart Pump</span>
                        <Droplets className="w-3.5 h-3.5 text-cyan-400" />
                      </div>
                      <p className="text-2xl font-bold text-emerald-400 mt-1">Pumping</p>
                      <div className="mt-2 flex items-center gap-1 text-[10px] text-emerald-300">
                        <Zap className="w-3 h-3" />
                        <span>Auto-triggered</span>
                      </div>
                    </div>
                  </div>

                  {/* Field Visual Image preview */}
                  <div className="relative rounded-xl overflow-hidden h-36 border border-slate-700">
                    <img 
                      src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&auto=format&fit=crop&q=80" 
                      alt="Smart Agriculture Field" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex items-end p-3">
                      <div>
                        <p className="text-xs font-bold text-white">Sector 4: High-Density Drip Block</p>
                        <p className="text-[10px] text-emerald-300">LoRa Node #02 • 12.5 Acres Monitored</p>
                      </div>
                    </div>
                  </div>

                  {/* Quick Role Switch Links */}
                  <div className="pt-1 flex items-center justify-between gap-2">
                    <button
                      onClick={() => handleLaunchRole('farmer')}
                      className="flex-1 py-1.5 px-2 bg-emerald-600/30 hover:bg-emerald-600/50 border border-emerald-500/40 rounded-lg text-center text-xs font-semibold text-emerald-200 transition"
                    >
                      Farmer View
                    </button>
                    <button
                      onClick={() => handleLaunchRole('expert')}
                      className="flex-1 py-1.5 px-2 bg-emerald-600/30 hover:bg-emerald-600/50 border border-emerald-500/40 rounded-lg text-center text-xs font-semibold text-emerald-200 transition"
                    >
                      Expert View
                    </button>
                    <button
                      onClick={() => handleLaunchRole('admin')}
                      className="flex-1 py-1.5 px-2 bg-emerald-600/30 hover:bg-emerald-600/50 border border-emerald-500/40 rounded-lg text-center text-xs font-semibold text-emerald-200 transition"
                    >
                      Admin View
                    </button>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. SYSTEM ARCHITECTURE & IOT WORKFLOW (Requested in prompt) */}
      <section className="py-16 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              System Architecture & Data Flow
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              From Soil Sensor to Automated Irrigation
            </h2>
            <p className="text-sm text-slate-600">
              SAMS connects field sensors to an intelligent rule and decision engine, executing automated farm actions in real time.
            </p>
          </div>

          {/* Interactive Flow Stepper */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
            
            {/* Step 1 */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-emerald-400 hover:shadow-md transition-all text-center space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto font-bold text-sm">
                1
              </div>
              <h3 className="font-bold text-sm text-slate-800">IoT Sensors</h3>
              <p className="text-xs text-slate-500">
                Measures soil moisture, ambient temperature, humidity, and micro-climate parameters.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-emerald-400 hover:shadow-md transition-all text-center space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto font-bold text-sm">
                2
              </div>
              <h3 className="font-bold text-sm text-slate-800">Data Aggregation</h3>
              <p className="text-xs text-slate-500">
                LoRaWAN / MQTT gateway streams encrypted telemetry to central SAMS cloud server.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-emerald-400 hover:shadow-md transition-all text-center space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto font-bold text-sm">
                3
              </div>
              <h3 className="font-bold text-sm text-slate-800">Threshold Analysis</h3>
              <p className="text-xs text-slate-500">
                System evaluates moisture level against crop setpoint (e.g. 40% threshold).
              </p>
            </div>

            {/* Step 4 */}
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-center space-y-2 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center mx-auto font-bold text-sm">
                4
              </div>
              <h3 className="font-bold text-sm text-emerald-900">Trigger Irrigation</h3>
              <p className="text-xs text-emerald-700">
                If moisture &lt; threshold, autonomous relay opens valve and initiates precision drip irrigation.
              </p>
            </div>

            {/* Step 5 */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-emerald-400 hover:shadow-md transition-all text-center space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto font-bold text-sm">
                5
              </div>
              <h3 className="font-bold text-sm text-slate-800">Alert Farmer</h3>
              <p className="text-xs text-slate-500">
                Push alert sent to farmer dashboard with water volume logged and soil health updated.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 3. FOUR CORE MODULE HIGHLIGHT CARDS (Requested in prompt) */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-100/60 px-3 py-1 rounded-full">
              Core Capabilities
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900">
              Engineered for Modern Precision Agriculture
            </h2>
            <p className="text-sm text-slate-600">
              Everything the modern farmer and agronomy expert needs, presented through concise cards and live telemetry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 1: Soil Monitoring */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 hover:border-emerald-300 hover:shadow-xl transition-all group flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  <Layers className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Soil Monitoring</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Real-time tracking of moisture percentage, temperature, pH levels, and NPK nutrient distribution across multi-depth root strata.
                </p>
                <div className="space-y-1.5 pt-2 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Multi-depth strata (10, 30, 60cm)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    <span>NPK & Electrical Conductivity</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => { setCurrentRole('farmer'); setCurrentView('soil'); }}
                className="mt-6 flex items-center gap-1.5 text-xs font-bold text-emerald-600 group-hover:text-emerald-700 transition"
              >
                <span>Explore Soil Telemetry</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Card 2: Smart Irrigation */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 hover:border-emerald-300 hover:shadow-xl transition-all group flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center group-hover:bg-cyan-600 group-hover:text-white transition-colors">
                  <Droplets className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Smart Irrigation</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Automated drip irrigation triggers when moisture drops below user threshold. Manual override and real-time water volume tracking.
                </p>
                <div className="space-y-1.5 pt-2 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500" />
                    <span>Threshold-driven valve triggers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500" />
                    <span>35% Average water conservation</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => { setCurrentRole('farmer'); setCurrentView('irrigation'); }}
                className="mt-6 flex items-center gap-1.5 text-xs font-bold text-cyan-600 group-hover:text-cyan-700 transition"
              >
                <span>Manage Irrigation</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Card 3: Crop Recommendation */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 hover:border-emerald-300 hover:shadow-xl transition-all group flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:bg-amber-600 group-hover:text-white transition-colors">
                  <Sprout className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Crop Recommendation</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Enter soil type, season, temperature, and water availability to receive high-yield, climate-resilient crop recommendations with match scores.
                </p>
                <div className="space-y-1.5 pt-2 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-500" />
                    <span>1-Click sensor data auto-fill</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-500" />
                    <span>Agronomic compatibility scoring</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => { setCurrentRole('farmer'); setCurrentView('crop-rec'); }}
                className="mt-6 flex items-center gap-1.5 text-xs font-bold text-amber-600 group-hover:text-amber-700 transition"
              >
                <span>Run Crop Advisor</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Card 4: Disease Detection */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 hover:border-emerald-300 hover:shadow-xl transition-all group flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center group-hover:bg-rose-600 group-hover:text-white transition-colors">
                  <ScanSearch className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Disease Detection</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Upload leaf photos to detect fungal, bacterial, or pest infestations with 96%+ AI confidence and immediate treatment remedies.
                </p>
                <div className="space-y-1.5 pt-2 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-rose-500" />
                    <span>Organic & chemical prescriptions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-rose-500" />
                    <span>1-Click expert agronomist review</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => { setCurrentRole('farmer'); setCurrentView('disease'); }}
                className="mt-6 flex items-center gap-1.5 text-xs font-bold text-rose-600 group-hover:text-rose-700 transition"
              >
                <span>Scan Crop Leaves</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* 4. PRESENTATION / VIVA DEMO MODES (One-Click Jump to Any Role) */}
      <section className="py-16 bg-white border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="p-8 rounded-3xl bg-gradient-to-r from-emerald-900 to-slate-900 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-300 text-xs font-semibold">
                <span>🎓 College Project Review Ready</span>
              </div>
              <h3 className="text-2xl font-bold">Try the 3 Multi-Role Portals</h3>
              <p className="text-xs text-slate-300 max-w-xl">
                Evaluate how different stakeholders interact with SAMS: Farmers handle daily telemetry, Agronomists review crop diseases, and Admins supervise the IoT network.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => handleLaunchRole('farmer')}
                className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition"
              >
                👨‍🌾 Farmer Dashboard
              </button>
              <button
                onClick={() => handleLaunchRole('expert')}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-bold text-xs transition"
              >
                🔬 Agronomist Portal
              </button>
              <button
                onClick={() => handleLaunchRole('admin')}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-bold text-xs transition"
              >
                🛡️ Admin Console
              </button>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
