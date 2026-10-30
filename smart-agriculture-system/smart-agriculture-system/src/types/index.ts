export type UserRole = 'farmer' | 'expert' | 'admin' | 'guest';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  farmName?: string;
  farmLocation?: string;
  farmSize?: string;
  specialty?: string;
}

export interface TelemetryData {
  soilMoisture: number; // percentage (e.g. 38%)
  temperature: number; // celsius (e.g. 27.5)
  humidity: number; // percentage (e.g. 64%)
  soilCondition: 'Dry - Needs Water' | 'Optimal' | 'Saturated';
  weatherStatus: string;
  weatherIcon: string;
  irrigationStatus: 'Active' | 'Idle';
  moistureThreshold: number; // setpoint (e.g. 40%)
  autoIrrigation: boolean;
  waterUsageToday: number; // in Liters
  lastIrrigated: string;
  soilDepthMoisture: {
    top10cm: number;
    mid30cm: number;
    deep60cm: number;
  };
  soilNutrients: {
    nitrogen: number; // mg/kg
    phosphorus: number; // mg/kg
    potassium: number; // mg/kg
    ph: number; // 6.5
    ec: number; // 1.2 dS/m
  };
  sensorHealth: {
    battery: number;
    signalStrength: number; // RSSI dBm e.g. -72
    status: 'Online' | 'Offline' | 'Calibrating';
    lastPing: string;
  };
}

export interface HistoricalReading {
  time: string;
  soilMoisture: number;
  temperature: number;
  humidity: number;
  waterUsage?: number;
}

export interface CropRecommendationInput {
  soilType: string;
  soilMoisture: number;
  temperature: number;
  humidity: number;
  season: string;
  location: string;
  waterAvailability: string;
}

export interface RecommendedCrop {
  id: string;
  name: string;
  matchScore: number;
  suitableSoil: string;
  requiredWater: string;
  suitableSeason: string;
  growthDuration: string;
  recommendationReason: string;
  keyBenefits: string[];
  image: string;
  category: string;
}

export interface DiseaseSample {
  id: string;
  title: string;
  leafImageUrl: string;
  cropName: string;
  diseaseName: string;
  confidence: number;
  status: 'Detected' | 'Healthy' | 'Needs Review';
  severity: 'Low' | 'Moderate' | 'High' | 'None';
  pathogen: string;
  symptoms: string[];
  recommendedAction: string;
  chemicalTreatment: string;
  organicTreatment: string;
}

export interface WeatherDay {
  day: string;
  date: string;
  tempMax: number;
  tempMin: number;
  humidity: number;
  rainProb: number;
  condition: string;
  icon: string;
  sprayAdvisory: 'Optimal' | 'Moderate' | 'Poor';
}

export interface AlertNotification {
  id: string;
  title: string;
  message: string;
  severity: 'critical' | 'warning' | 'info' | 'success';
  category: 'moisture' | 'temperature' | 'weather' | 'disease' | 'irrigation' | 'system';
  timestamp: string;
  read: boolean;
  actionLabel?: string;
  actionType?: string;
}

export interface ExpertConsultation {
  id: string;
  farmerName: string;
  farmLocation: string;
  crop: string;
  sampleImage: string;
  aiDiagnosis: string;
  confidence: number;
  submittedAt: string;
  status: 'Pending Review' | 'Advisory Sent';
  expertNotes?: string;
  prescription?: string;
}

export interface AdminSensorNode {
  id: string;
  nodeName: string;
  farmName: string;
  farmer: string;
  type: 'Soil Multi-Depth' | 'Weather Station' | 'Irrigation Valve' | 'Canopy Cam';
  status: 'Online' | 'Offline' | 'Alert' | 'Maintenance';
  battery: number;
  lastReading: string;
  firmware: string;
  firmwareUpdateAvailable?: boolean;
}
