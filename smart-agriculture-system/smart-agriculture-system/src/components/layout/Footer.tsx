import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sprout, Mail, Phone, MapPin, Heart, Shield, Cpu, Activity } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentView, setCurrentRole } = useApp();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          
          {/* Brand & Mission */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
                <Sprout className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-lg text-white tracking-tight">SAMS</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Smart Agriculture Management System delivers real-time soil telemetry, autonomous precision irrigation, AI disease diagnostics, and agronomic insights to optimize crop yield and conserve water.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
              <Activity className="w-3.5 h-3.5 animate-pulse" />
              <span>IoT Telemetry Online • MQTT Active</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-200 mb-3.5">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button 
                  onClick={() => { setCurrentRole('guest'); setCurrentView('landing'); }} 
                  className="hover:text-emerald-400 transition"
                >
                  Home / Project Concept
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setCurrentRole('farmer'); setCurrentView('dashboard'); }} 
                  className="hover:text-emerald-400 transition"
                >
                  Farmer Telemetry Dashboard
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setCurrentRole('expert'); setCurrentView('dashboard'); }} 
                  className="hover:text-emerald-400 transition"
                >
                  Agricultural Expert Portal
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setCurrentRole('admin'); setCurrentView('dashboard'); }} 
                  className="hover:text-emerald-400 transition"
                >
                  Administrator Console
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setCurrentView('login'); }} 
                  className="hover:text-emerald-400 transition"
                >
                  Role-Based Authentication
                </button>
              </li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-200 mb-3.5">
              Core Features
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center gap-1.5">
                <span className="text-emerald-400">✓</span> Multi-depth Soil Moisture Telemetry
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-emerald-400">✓</span> Threshold-triggered Automated Irrigation
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-emerald-400">✓</span> Machine Learning Crop Recommendation
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-emerald-400">✓</span> Computer Vision Leaf Disease Detection
              </li>
              <li className="flex items-center gap-1.5">
                <span className="text-emerald-400">✓</span> 5-Day Micro-Climate Spray Advisory
              </li>
            </ul>
          </div>

          {/* Project Team & Contact */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-200 mb-3.5">
              Project Team & Viva Info
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="p-2.5 bg-slate-800/80 rounded-xl border border-slate-700/60">
                <p className="font-semibold text-slate-200">Final Year Capstone Project</p>
                <p className="text-[11px] text-emerald-400 mt-0.5">Smart Agriculture IoT System</p>
                <p className="text-[10px] text-slate-400 mt-1">Ready for Demonstration & Evaluation</p>
              </div>

              <div className="space-y-1.5 pt-1">
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-emerald-400" />
                  <span>support@smartagri-system.edu</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Precision Agro IoT Research Lab</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Smart Agriculture Management System (SAMS). All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Cpu className="w-3.5 h-3.5 text-emerald-400" />
              <span>IoT Protocol: MQTT / LoRaWAN</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span>Multi-Role RBAC</span>
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
