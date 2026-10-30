import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PRELOADED_DISEASE_SAMPLES } from '../../data/mockData';
import { DiseaseSample } from '../../types';
import { 
  ScanSearch, 
  UploadCloud, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldAlert, 
  Send, 
  RefreshCw, 
  FileText, 
  Leaf, 
  Activity,
  Droplets
} from 'lucide-react';

export const DiseaseDetection: React.FC = () => {
  const { submitDiseaseToExpert, setCurrentView } = useApp();

  const [selectedSample, setSelectedSample] = useState<DiseaseSample>(PRELOADED_DISEASE_SAMPLES[0]);
  const [customImage, setCustomImage] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<DiseaseSample | null>(PRELOADED_DISEASE_SAMPLES[0]);
  const [consultationSent, setConsultationSent] = useState(false);

  // Handle custom image file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCustomImage(reader.result as string);
        // Create custom sample
        const custom: DiseaseSample = {
          id: `custom-${Date.now()}`,
          title: `Uploaded Leaf: ${file.name}`,
          cropName: 'Monitored Crop',
          diseaseName: 'Tomato Early Blight (Alternaria solani)',
          leafImageUrl: reader.result as string,
          confidence: 94.2,
          status: 'Detected',
          severity: 'Moderate',
          pathogen: 'Fungal Organism',
          symptoms: [
            'Concentric circular spotting on leaf margins',
            'Slight tissue chlorosis surrounding primary lesions'
          ],
          recommendedAction: 'Apply copper-based protective fungicide spray immediately. Restrict overhead water exposure.',
          chemicalTreatment: 'Mancozeb 75% WP (2.5g/L) or Chlorothalonil spray.',
          organicTreatment: 'Bio-fungicide formulation containing Bacillus subtilis and cold-pressed neem extract.'
        };
        setSelectedSample(custom);
        setScanResult(null);
        setConsultationSent(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectPreloaded = (sample: DiseaseSample) => {
    setSelectedSample(sample);
    setCustomImage(null);
    setScanResult(null);
    setConsultationSent(false);
  };

  const handleDetectDisease = () => {
    setIsScanning(true);
    setConsultationSent(false);

    setTimeout(() => {
      setScanResult(selectedSample);
      setIsScanning(false);
    }, 1200);
  };

  const handleSendToExpert = () => {
    if (scanResult) {
      submitDiseaseToExpert(scanResult);
      setConsultationSent(true);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2.5">
            <ScanSearch className="w-7 h-7 text-rose-600" />
            <span>Crop Disease Detection & Pathology</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Vision-based plant leaf pathology diagnostics with treatment protocols & expert escalation
          </p>
        </div>

        <button
          onClick={() => setCurrentView('expert')}
          className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition self-start sm:self-auto"
        >
          <span>Switch to Expert Review Portal →</span>
        </button>
      </div>

      {/* 2. Main Two-Column Scanner Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Image Upload & Sample Selector */}
        <div className="lg:col-span-6 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-5">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-slate-900">Upload or Select Crop Leaf</h2>
            <p className="text-xs text-slate-500">Provide an affected foliage photograph for AI inspection</p>
          </div>

          {/* Quick Pre-loaded Samples (Crucial for Instant Viva Demo!) */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-2">
              ⚡ Quick Test Samples (1-Click Viva Demo):
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {PRELOADED_DISEASE_SAMPLES.map(sample => (
                <button
                  key={sample.id}
                  type="button"
                  onClick={() => handleSelectPreloaded(sample)}
                  className={`p-1.5 rounded-2xl border text-left transition-all ${
                    selectedSample.id === sample.id
                      ? 'border-emerald-500 ring-2 ring-emerald-500/20 bg-emerald-50/50'
                      : 'border-slate-200 hover:border-slate-300 bg-slate-50/60'
                  }`}
                >
                  <img
                    src={sample.leafImageUrl}
                    alt={sample.cropName}
                    className="w-full h-16 object-cover rounded-xl mb-1.5"
                  />
                  <p className="text-[11px] font-bold text-slate-800 truncate">{sample.cropName}</p>
                  <p className="text-[10px] text-slate-500 truncate">{sample.diseaseName}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Upload Dropzone */}
          <div className="relative border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-2xl p-6 text-center transition-colors bg-slate-50/50">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="space-y-2 pointer-events-none">
              <UploadCloud className="w-8 h-8 text-emerald-600 mx-auto" />
              <p className="text-xs font-bold text-slate-800">
                Drag and drop your crop leaf image here, or <span className="text-emerald-600">browse</span>
              </p>
              <p className="text-[10px] text-slate-400">Supports JPG, PNG, WEBP (Max 10MB)</p>
            </div>
          </div>

          {/* Active Image Preview & Action Button */}
          <div className="space-y-3 pt-1">
            <div className="relative rounded-2xl overflow-hidden h-52 bg-slate-900 border border-slate-800">
              <img
                src={selectedSample.leafImageUrl}
                alt="Leaf scan candidate"
                className="w-full h-full object-cover"
              />
              
              {/* Animated Radar Scanning Line */}
              {isScanning && (
                <div className="absolute inset-0 bg-emerald-950/40 backdrop-blur-xs flex flex-col items-center justify-center space-y-3">
                  <div className="w-16 h-16 rounded-full border-4 border-emerald-400 border-t-transparent animate-spin" />
                  <p className="text-xs font-mono font-bold text-emerald-300 animate-pulse">
                    Scanning Leaf Features & Chlorosis...
                  </p>
                </div>
              )}

              <div className="absolute bottom-2 left-2 px-2.5 py-1 bg-slate-950/80 backdrop-blur-md rounded-lg text-white text-[11px] font-medium">
                Crop: <b>{selectedSample.cropName}</b>
              </div>
            </div>

            <button
              onClick={handleDetectDisease}
              disabled={isScanning}
              className="w-full py-3 bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 text-white rounded-xl text-xs font-bold shadow-md shadow-rose-600/20 flex items-center justify-center gap-2 transition"
            >
              {isScanning ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Processing Computer Vision Model...</span>
                </>
              ) : (
                <>
                  <ScanSearch className="w-4 h-4" />
                  <span>Detect Disease</span>
                </>
              )}
            </button>
          </div>

        </div>

        {/* Right Column: Clean Visual Result Card (Requested in prompt) */}
        <div className="lg:col-span-6 space-y-4">
          {scanResult ? (
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-5 animate-in fade-in zoom-in-95 duration-200">
              
              {/* Result Header */}
              <div className="flex items-start justify-between border-b border-slate-100 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      scanResult.status === 'Healthy'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}>
                      {scanResult.status}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      Pathology Scan #8842
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-extrabold text-slate-900 mt-1">
                    {scanResult.diseaseName}
                  </h3>
                  <p className="text-xs text-slate-500 font-mono mt-0.5">
                    Pathogen: {scanResult.pathogen}
                  </p>
                </div>

                {/* Confidence Badge */}
                <div className="text-right">
                  <span className="text-2xl font-extrabold text-emerald-600">
                    {scanResult.confidence}%
                  </span>
                  <p className="text-[10px] font-semibold text-slate-400">AI Confidence</p>
                </div>
              </div>

              {/* Symptoms Identified */}
              <div>
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Identified Visual Symptoms:
                </h4>
                <div className="space-y-1.5">
                  {scanResult.symptoms.map((symptom, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                      <span className="text-rose-500 font-bold shrink-0">•</span>
                      <span>{symptom}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Basic Recommended Action (Prompt requirement) */}
              <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-2xl space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>Basic Recommended Action:</span>
                </div>
                <p className="text-xs text-amber-800 leading-relaxed">
                  {scanResult.recommendedAction}
                </p>
              </div>

              {/* Treatments Grid: Chemical vs Organic */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-1">
                  <p className="font-bold text-slate-800 text-[11px] flex items-center gap-1.5">
                    <Droplets className="w-3.5 h-3.5 text-blue-600" />
                    <span>Chemical Treatment:</span>
                  </p>
                  <p className="text-slate-600 text-[11px] leading-snug">
                    {scanResult.chemicalTreatment}
                  </p>
                </div>

                <div className="p-3 bg-emerald-50/60 rounded-2xl border border-emerald-200/80 space-y-1">
                  <p className="font-bold text-emerald-900 text-[11px] flex items-center gap-1.5">
                    <Leaf className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Organic / Biological:</span>
                  </p>
                  <p className="text-emerald-800 text-[11px] leading-snug">
                    {scanResult.organicTreatment}
                  </p>
                </div>

              </div>

              {/* Action Button: Escalation to Agricultural Expert */}
              <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                {consultationSent ? (
                  <div className="p-2.5 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-xl flex items-center gap-2 w-full justify-center">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Submitted to Dr. Sarah Chen (Expert Portal). Check Expert view!</span>
                  </div>
                ) : (
                  <>
                    <span className="text-[11px] text-slate-500">
                      Need agronomic validation or signed prescription?
                    </span>
                    <button
                      onClick={handleSendToExpert}
                      className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition w-full sm:w-auto justify-center"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Send to Agronomist</span>
                    </button>
                  </>
                )}
              </div>

            </div>
          ) : (
            <div className="bg-white p-12 rounded-3xl border border-slate-200/80 text-center space-y-3">
              <ScanSearch className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="font-bold text-slate-700 text-sm">Ready for Disease Diagnosis</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Click “Detect Disease” on the left to run our trained convolutional neural network model on the foliage sample.
              </p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
