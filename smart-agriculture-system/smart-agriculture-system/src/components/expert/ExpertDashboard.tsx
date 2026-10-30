import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Stethoscope, 
  Users, 
  Sprout, 
  ScanSearch, 
  Send, 
  CheckCircle2, 
  Clock, 
  FileText, 
  AlertTriangle, 
  Search, 
  MapPin, 
  Sparkles,
  ChevronRight,
  Eye,
  Check
} from 'lucide-react';
import { ExpertConsultation } from '../../types';

export const ExpertDashboard: React.FC = () => {
  const { 
    currentUser, 
    expertConsultations, 
    submitExpertAdvisory, 
    setCurrentView 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'queue' | 'farmers' | 'advisory'>('queue');
  const [selectedConsultation, setSelectedConsultation] = useState<ExpertConsultation | null>(null);
  const [expertNotes, setExpertNotes] = useState('');
  const [prescription, setPrescription] = useState('');
  const [advisorySentSuccess, setAdvisorySentSuccess] = useState(false);

  // Farmer directory mock
  const registeredFarms = [
    {
      id: 'farm-1',
      farmer: 'Ramesh Patel',
      farmName: 'Green Valley Agro Farm',
      location: 'Sector 4, Nashik Agri-Belt',
      crop: 'Tomato (Hybrid) & Wheat',
      acreage: '14.5 Acres',
      soilHealth: 'Optimal (pH 6.8)',
      moistureStatus: 'Monitored (36% - Pumping)',
      alertsCount: 1
    },
    {
      id: 'farm-2',
      farmer: 'Suresh Verma',
      farmName: 'Sunrise Orchards',
      location: 'Block B, Nashik Valley',
      crop: 'Grapevine (Thompson Seedless)',
      acreage: '22.0 Acres',
      soilHealth: 'Optimal (pH 7.1)',
      moistureStatus: '44% (Adequate)',
      alertsCount: 0
    },
    {
      id: 'farm-3',
      farmer: 'Anil Kumar',
      farmName: 'Krishna Delta Farms',
      location: 'Sector 1, Godavari Basin',
      crop: 'Paddy Rice & Sugarcane',
      acreage: '30.0 Acres',
      soilHealth: 'Clayey (pH 6.5)',
      moistureStatus: '62% (Saturated)',
      alertsCount: 0
    },
    {
      id: 'farm-4',
      farmer: 'Maya Patil',
      farmerRole: 'Organic Co-op',
      farmName: 'Hilltop Terrace Farms',
      location: 'North Ridge Slope',
      crop: 'Sweet Corn & Soybeans',
      acreage: '18.0 Acres',
      soilHealth: 'Sandy Loam (pH 6.6)',
      moistureStatus: '39% (Normal)',
      alertsCount: 1
    }
  ];

  const handleOpenReviewModal = (item: ExpertConsultation) => {
    setSelectedConsultation(item);
    setExpertNotes(item.expertNotes || 'Verified leaf symptoms confirm fungal target spots characteristic of Alternaria solani.');
    setPrescription(item.prescription || 'Spray Mancozeb 75% WP (2.5g per Liter) or Chlorothalonil. Avoid overhead spray to minimize leaf surface wetness.');
    setAdvisorySentSuccess(false);
  };

  const handleSendAdvisory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedConsultation) return;

    submitExpertAdvisory(selectedConsultation.id, expertNotes, prescription);
    setAdvisorySentSuccess(true);
    setTimeout(() => {
      setSelectedConsultation(null);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      
      {/* 1. Expert Top Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold uppercase tracking-wider border border-emerald-400/20">
                Agronomic Decision Support
              </span>
              <span className="text-xs text-emerald-200">Regional Oversight Portal</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Dr. Sarah Chen, Ph.D.
            </h1>
            <p className="text-xs text-slate-300">
              Senior Plant Pathologist & Chief Agronomist • Nashik Agro-Climatic Zone (24 Monitored Holdings)
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white/10 p-2 rounded-2xl border border-white/10 backdrop-blur-md">
            <div className="text-right px-2">
              <p className="text-[10px] text-slate-300">Pending Reviews</p>
              <p className="text-lg font-extrabold text-amber-400">
                {expertConsultations.filter(c => c.status === 'Pending Review').length} Cases
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Four Quick Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-semibold">Assigned Farms</span>
            <Users className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900 mt-1">24</p>
          <p className="text-[11px] text-slate-500 mt-1">84.5 Total Monitored Acres</p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-semibold">Diagnostic Queue</span>
            <ScanSearch className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-2xl font-extrabold text-amber-600 mt-1">
            {expertConsultations.filter(c => c.status === 'Pending Review').length}
          </p>
          <p className="text-[11px] text-amber-700 mt-1">Awaiting Expert Verification</p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-semibold">Advisories Issued</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900 mt-1">182</p>
          <p className="text-[11px] text-emerald-700 mt-1">98.4% Treatment Success Rate</p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-semibold">Crop Health Index</span>
            <Sprout className="w-4 h-4 text-teal-600" />
          </div>
          <p className="text-2xl font-extrabold text-emerald-600 mt-1">92.6%</p>
          <p className="text-[11px] text-slate-500 mt-1">Regional Average (Good)</p>
        </div>

      </div>

      {/* 3. Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('queue')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeTab === 'queue'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <span>Disease Diagnostic Queue</span>
          <span className="ml-2 px-1.5 py-0.5 rounded-full text-[10px] bg-white/20 text-white font-bold">
            {expertConsultations.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('farmers')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
            activeTab === 'farmers'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <span>Farmer & Field Directory</span>
        </button>
      </div>

      {/* 4. Tab Content 1: Disease Consultation Queue */}
      {activeTab === 'queue' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900">
              Farmer Pathology Submissions & Requests
            </h2>
            <p className="text-xs text-slate-500">
              Review AI preliminary diagnosis and attach certified agronomic recommendations
            </p>
          </div>

          <div className="space-y-3">
            {expertConsultations.map(item => (
              <div
                key={item.id}
                className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-5 hover:border-emerald-300 transition-all"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.sampleImage}
                    alt={item.crop}
                    className="w-20 h-20 rounded-2xl object-cover shrink-0 border border-slate-200"
                  />
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        item.status === 'Pending Review'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {item.status}
                      </span>
                      <span className="text-xs text-slate-400">{item.submittedAt}</span>
                    </div>

                    <h3 className="font-extrabold text-sm text-slate-900">
                      {item.crop} • {item.aiDiagnosis}
                    </h3>
                    <p className="text-xs text-slate-500">
                      Farmer: <b>{item.farmerName}</b> • {item.farmLocation}
                    </p>
                    <p className="text-[11px] text-emerald-700 font-semibold">
                      AI Diagnostic Confidence: {item.confidence}%
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                  <button
                    onClick={() => handleOpenReviewModal(item)}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs flex items-center gap-1.5 transition"
                  >
                    <Stethoscope className="w-3.5 h-3.5" />
                    <span>{item.status === 'Pending Review' ? 'Review & Prescribe' : 'Edit Advisory'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. Tab Content 2: Farmer & Field Directory (Requested in prompt) */}
      {activeTab === 'farmers' && (
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <h2 className="text-base font-bold text-slate-900">Registered Farm Directory</h2>
              <p className="text-xs text-slate-500">Farms under agronomic advisory in Sector 4 & Nashik Belt</p>
            </div>
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search farmer or crop..."
                className="w-full text-xs pl-9 pr-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Farmer / Farm</th>
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-4">Crops</th>
                  <th className="py-3 px-4">Acreage</th>
                  <th className="py-3 px-4">Soil Matrix</th>
                  <th className="py-3 px-4">Moisture Telemetry</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {registeredFarms.map(f => (
                  <tr key={f.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3 px-4">
                      <p className="font-bold text-slate-900">{f.farmer}</p>
                      <p className="text-[11px] text-emerald-700 font-medium">{f.farmName}</p>
                    </td>
                    <td className="py-3 px-4 text-slate-500">{f.location}</td>
                    <td className="py-3 px-4 font-semibold text-slate-800">{f.crop}</td>
                    <td className="py-3 px-4">{f.acreage}</td>
                    <td className="py-3 px-4">{f.soilHealth}</td>
                    <td className="py-3 px-4">
                      <span className="font-semibold text-emerald-700">{f.moistureStatus}</span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button 
                        onClick={() => setCurrentView('soil')}
                        className="text-emerald-700 hover:text-emerald-800 font-bold hover:underline"
                      >
                        Inspect Sensors →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 6. Expert Review & Prescription Modal */}
      {selectedConsultation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150 space-y-4 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Stethoscope className="w-5 h-5 text-emerald-600" />
                <h3 className="font-bold text-base text-slate-900">
                  Agronomic Advisory & Prescription
                </h3>
              </div>
              <button
                onClick={() => setSelectedConsultation(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {/* Case Summary */}
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-center gap-3">
              <img
                src={selectedConsultation.sampleImage}
                alt={selectedConsultation.crop}
                className="w-16 h-16 rounded-xl object-cover"
              />
              <div className="text-xs space-y-0.5">
                <p className="font-bold text-slate-800">{selectedConsultation.crop}</p>
                <p className="text-slate-500">Farmer: {selectedConsultation.farmerName}</p>
                <p className="text-emerald-700 font-semibold">AI Scan: {selectedConsultation.aiDiagnosis} ({selectedConsultation.confidence}%)</p>
              </div>
            </div>

            {advisorySentSuccess ? (
              <div className="p-4 bg-emerald-100 border border-emerald-300 rounded-2xl text-emerald-900 text-xs flex items-center gap-2 font-bold">
                <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
                <span>Advisory successfully transmitted to Farmer Dashboard and alert dispatched!</span>
              </div>
            ) : (
              <form onSubmit={handleSendAdvisory} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Expert Agronomist Assessment Notes:
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={expertNotes}
                    onChange={(e) => setExpertNotes(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs"
                    placeholder="Enter diagnostic notes..."
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Treatment Prescription & Dosages:
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={prescription}
                    onChange={(e) => setPrescription(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs"
                    placeholder="Prescribe chemical/organic formulations..."
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setSelectedConsultation(null)}
                    className="px-4 py-2 border border-slate-200 rounded-xl font-semibold text-slate-600 hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold shadow-md shadow-emerald-600/20 flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Official Advisory</span>
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
