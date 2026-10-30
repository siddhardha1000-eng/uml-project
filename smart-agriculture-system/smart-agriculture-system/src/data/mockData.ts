import { 
  User, 
  TelemetryData, 
  HistoricalReading, 
  RecommendedCrop, 
  DiseaseSample, 
  WeatherDay, 
  AlertNotification,
  ExpertConsultation,
  AdminSensorNode
} from '../types';

export const DEMO_USERS: Record<string, User> = {
  farmer: {
    id: 'user-01',
    name: 'Ramesh Patel',
    email: 'farmer@sams.agri',
    role: 'farmer',
    avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=150&auto=format&fit=crop&q=80',
    farmName: 'Green Valley Agro Farm',
    farmLocation: 'Sector 4, Nashik Agri-Belt',
    farmSize: '14.5 Acres'
  },
  expert: {
    id: 'user-02',
    name: 'Dr. Sarah Chen, Ph.D.',
    email: 'expert@sams.agri',
    role: 'expert',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    specialty: 'Senior Agronomist & Crop Pathology Specialist'
  },
  admin: {
    id: 'user-03',
    name: 'Devraj Sharma',
    email: 'admin@sams.agri',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80'
  }
};

export const INITIAL_TELEMETRY: TelemetryData = {
  soilMoisture: 36, // Below 40% threshold! Triggers warning
  temperature: 28.4,
  humidity: 62,
  soilCondition: 'Dry - Needs Water',
  weatherStatus: 'Partly Cloudy',
  weatherIcon: 'cloud-sun',
  irrigationStatus: 'Active', // automatically activated because < threshold
  moistureThreshold: 40,
  autoIrrigation: true,
  waterUsageToday: 1250, // Liters
  lastIrrigated: '15 mins ago (Auto-triggered)',
  soilDepthMoisture: {
    top10cm: 32,
    mid30cm: 36,
    deep60cm: 45
  },
  soilNutrients: {
    nitrogen: 145, // mg/kg
    phosphorus: 44, // mg/kg
    potassium: 220, // mg/kg
    ph: 6.8, // Neutral
    ec: 1.25 // dS/m
  },
  sensorHealth: {
    battery: 94,
    signalStrength: -68,
    status: 'Online',
    lastPing: 'Just now'
  }
};

export const HISTORICAL_READINGS_24H: HistoricalReading[] = [
  { time: '00:00', soilMoisture: 48, temperature: 21.2, humidity: 78, waterUsage: 0 },
  { time: '02:00', soilMoisture: 47, temperature: 20.5, humidity: 82, waterUsage: 0 },
  { time: '04:00', soilMoisture: 46, temperature: 19.8, humidity: 85, waterUsage: 0 },
  { time: '06:00', soilMoisture: 44, temperature: 21.0, humidity: 80, waterUsage: 150 },
  { time: '08:00', soilMoisture: 42, temperature: 24.3, humidity: 72, waterUsage: 300 },
  { time: '10:00', soilMoisture: 39, temperature: 27.5, humidity: 65, waterUsage: 200 },
  { time: '12:00', soilMoisture: 36, temperature: 30.2, humidity: 58, waterUsage: 0 },
  { time: '14:00', soilMoisture: 34, temperature: 31.8, humidity: 54, waterUsage: 0 },
  { time: '16:00', soilMoisture: 33, temperature: 30.5, humidity: 57, waterUsage: 250 },
  { time: '18:00', soilMoisture: 35, temperature: 27.8, humidity: 63, waterUsage: 350 },
  { time: '20:00', soilMoisture: 36, temperature: 25.1, humidity: 68, waterUsage: 0 },
  { time: '22:00', soilMoisture: 36, temperature: 23.4, humidity: 74, waterUsage: 0 }
];

export const WEEKLY_WATER_USAGE = [
  { day: 'Mon', liters: 1420, target: 1500 },
  { day: 'Tue', liters: 1280, target: 1500 },
  { day: 'Wed', liters: 1650, target: 1500 },
  { day: 'Thu', liters: 950, target: 1500 }, // Rained!
  { day: 'Fri', liters: 1320, target: 1500 },
  { day: 'Sat', liters: 1510, target: 1500 },
  { day: 'Sun (Today)', liters: 1250, target: 1500 }
];

export const CROP_KNOWLEDGE_BASE: RecommendedCrop[] = [
  {
    id: 'crop-1',
    name: 'Wheat (Triticum aestivum)',
    category: 'Cereal / Grain',
    matchScore: 96,
    suitableSoil: 'Alluvial / Loamy soil',
    requiredWater: '450 - 650 mm / season',
    suitableSeason: 'Rabi (Winter)',
    growthDuration: '110 - 130 Days',
    recommendationReason: 'Current ambient temperature (20-28°C) and balanced N-P-K nutrient status provide ideal germination and tillering conditions with moderate irrigation.',
    keyBenefits: ['High market demand', 'Compatible with existing soil pH (6.8)', 'Low risk to current weather outlook'],
    image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'crop-2',
    name: 'Sweet Corn / Maize',
    category: 'Cereal / Fodder',
    matchScore: 91,
    suitableSoil: 'Deep Well-Drained Loam',
    requiredWater: '500 - 800 mm / season',
    suitableSeason: 'Kharif / Zaid',
    growthDuration: '85 - 100 Days',
    recommendationReason: 'High photosynthetic efficiency in current sunlight hours; tolerates fluctuating soil moisture when supported by automated drip irrigation.',
    keyBenefits: ['Rapid growth cycle', 'Excellent rotational crop', 'High biomass yield'],
    image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'crop-3',
    name: 'Chickpea / Bengal Gram',
    category: 'Legumes / Pulses',
    matchScore: 88,
    suitableSoil: 'Clayey Loam / Black Soil',
    requiredWater: '250 - 350 mm / season',
    suitableSeason: 'Rabi',
    growthDuration: '95 - 115 Days',
    recommendationReason: 'Extremely water-efficient legume that enriches soil through atmospheric nitrogen fixation; optimal for current low-moisture conservation goals.',
    keyBenefits: ['Enhances soil fertility naturally', 'Drought-tolerant deep root system', 'High nutritional and sale value'],
    image: 'https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'crop-4',
    name: 'Tomato (Hybrid Solanum)',
    category: 'Horticulture / Vegetable',
    matchScore: 84,
    suitableSoil: 'Sandy Loam with organic matter',
    requiredWater: '600 - 800 mm / season',
    suitableSeason: 'All Year / Rabi & Kharif',
    growthDuration: '70 - 90 Days',
    recommendationReason: 'Well-suited to monitored micro-irrigation; current soil potassium levels (220 mg/kg) support superior fruit development.',
    keyBenefits: ['Multiple harvest pickings', 'Excellent drip irrigation ROI', 'High market margins'],
    image: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=400&auto=format&fit=crop&q=80'
  },
  {
    id: 'crop-5',
    name: 'Soybean',
    category: 'Oilseed / Legume',
    matchScore: 79,
    suitableSoil: 'Fertile Loam / Black Cotton Soil',
    requiredWater: '450 - 700 mm / season',
    suitableSeason: 'Kharif (Monsoon)',
    growthDuration: '90 - 110 Days',
    recommendationReason: 'Balances nitrogen utilization with high protein synthesis; thriving when soil moisture stays between 40% and 60%.',
    keyBenefits: ['Improves soil structure', 'Steady commercial market', 'Minimal synthetic nitrogen needed'],
    image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=400&auto=format&fit=crop&q=80'
  }
];

export const PRELOADED_DISEASE_SAMPLES: DiseaseSample[] = [
  {
    id: 'sample-1',
    title: 'Tomato Early Blight (Alternaria solani)',
    cropName: 'Tomato',
    diseaseName: 'Early Blight (Alternaria solani)',
    leafImageUrl: 'https://images.unsplash.com/photo-1597916829826-02e5bb4a54e0?w=600&auto=format&fit=crop&q=80',
    confidence: 96.4,
    status: 'Detected',
    severity: 'High',
    pathogen: 'Fungal Pathogen (Alternaria solani)',
    symptoms: [
      'Concentric ring lesions (target-like pattern) on older lower leaves',
      'Yellow chlorotic halos surrounding brown necrosis',
      'Early leaf defoliation reducing photosynthetic capacity'
    ],
    recommendedAction: 'Isolate affected sector immediately. Switch to subsurface drip irrigation to prevent leaf wetness. Apply protective fungicide spray within 24 hours.',
    chemicalTreatment: 'Mancozeb 75% WP (2.5g/L) or Chlorothalonil 75% WP spray every 7-10 days.',
    organicTreatment: 'Copper sulfate spray or Bacillus subtilis bio-fungicide combined with neem oil extract (5ml/L).'
  },
  {
    id: 'sample-2',
    title: 'Rice Bacterial Leaf Blight',
    cropName: 'Paddy / Rice',
    diseaseName: 'Bacterial Leaf Blight (Xanthomonas oryzae)',
    leafImageUrl: 'https://images.unsplash.com/photo-1536939459926-301728717817?w=600&auto=format&fit=crop&q=80',
    confidence: 94.8,
    status: 'Detected',
    severity: 'High',
    pathogen: 'Bacterium (Xanthomonas oryzae pv. oryzae)',
    symptoms: [
      'Water-soaked to yellowish stripes along leaf margins',
      'Leaves wilt and roll up, turning greyish-white (Kresek phase)',
      'Milky bacterial ooze visible under high relative humidity'
    ],
    recommendedAction: 'Drain stagnant water from paddy field. Avoid high nitrogen fertilizer application temporarily.',
    chemicalTreatment: 'Copper oxychloride 50% WP (500g/acre) mixed with Streptocycline (30g/acre).',
    organicTreatment: 'Spray 5% fresh cow dung slurry extract or Pseudomonas fluorescens culture.'
  },
  {
    id: 'sample-3',
    title: 'Apple / Grape Powdery Mildew',
    cropName: 'Horticulture (Grape / Apple)',
    diseaseName: 'Powdery Mildew (Erysiphe necator)',
    leafImageUrl: 'https://images.unsplash.com/photo-1528498033373-3c6c08e93d51?w=600&auto=format&fit=crop&q=80',
    confidence: 92.1,
    status: 'Detected',
    severity: 'Moderate',
    pathogen: 'Fungus (Ascomycete)',
    symptoms: [
      'White to dusty gray fungal patches on upper leaf surfaces',
      'Distortion and curling of young tender leaves',
      'Premature leaf fall and stunted shoot growth'
    ],
    recommendedAction: 'Prune dense canopy foliage to enhance airflow and sunlight penetration. Avoid excess overhead irrigation.',
    chemicalTreatment: 'Wettable Sulfur 80% WDG (2g/L) or Hexaconazole 5% EC (1ml/L).',
    organicTreatment: 'Potassium bicarbonate (3g/L) solution mixed with horticultural paraffinic oil.'
  },
  {
    id: 'sample-4',
    title: 'Healthy Maize Leaf (Control)',
    cropName: 'Maize / Corn',
    diseaseName: 'Healthy Crop (No Disease Detected)',
    leafImageUrl: 'https://images.unsplash.com/photo-1508784411316-02b8cd4d3a3a?w=600&auto=format&fit=crop&q=80',
    confidence: 99.2,
    status: 'Healthy',
    severity: 'None',
    pathogen: 'None (Optimal Plant Health)',
    symptoms: [
      'Deep emerald green pigmentation with high chlorophyll index',
      'No lesions, chlorosis, or necrotic spotting detected',
      'Vigorous leaf venation and cell turgidity'
    ],
    recommendedAction: 'Maintain current automated micro-irrigation schedule and standard balanced NPK nutrition regime.',
    chemicalTreatment: 'None required.',
    organicTreatment: 'Preventive seaweed extract spray or vermicompost tea to sustain strong immunity.'
  }
];

export const FORECAST_5_DAYS: WeatherDay[] = [
  {
    day: 'Today',
    date: 'Oct 01',
    tempMax: 31,
    tempMin: 22,
    humidity: 58,
    rainProb: 15,
    condition: 'Partly Cloudy',
    icon: 'cloud-sun',
    sprayAdvisory: 'Optimal'
  },
  {
    day: 'Tomorrow',
    date: 'Oct 02',
    tempMax: 33,
    tempMin: 23,
    humidity: 52,
    rainProb: 10,
    condition: 'Sunny & Warm',
    icon: 'sun',
    sprayAdvisory: 'Optimal'
  },
  {
    day: 'Friday',
    date: 'Oct 03',
    tempMax: 29,
    tempMin: 21,
    humidity: 74,
    rainProb: 65,
    condition: 'Scattered Showers',
    icon: 'cloud-rain',
    sprayAdvisory: 'Poor'
  },
  {
    day: 'Saturday',
    date: 'Oct 04',
    tempMax: 27,
    tempMin: 20,
    humidity: 82,
    rainProb: 80,
    condition: 'Thunderstorms Likely',
    icon: 'cloud-lightning',
    sprayAdvisory: 'Poor'
  },
  {
    day: 'Sunday',
    date: 'Oct 05',
    tempMax: 30,
    tempMin: 21,
    humidity: 65,
    rainProb: 25,
    condition: 'Clearing / Breezy',
    icon: 'wind',
    sprayAdvisory: 'Moderate'
  }
];

export const INITIAL_ALERTS: AlertNotification[] = [
  {
    id: 'alt-1',
    title: 'Low Soil Moisture Warning',
    message: 'Sensor #02 in Sector 4 reads 36% (below 40% threshold). Automated irrigation triggered to prevent crop wilt.',
    severity: 'critical',
    category: 'moisture',
    timestamp: '15 mins ago',
    read: false,
    actionLabel: 'Check Irrigation',
    actionType: 'irrigation'
  },
  {
    id: 'alt-2',
    title: 'High Afternoon Temperature Alert',
    message: 'Peak temperature forecasted to hit 33°C tomorrow. Soil evapotranspiration expected to surge by 28%.',
    severity: 'warning',
    category: 'temperature',
    timestamp: '1 hour ago',
    read: false,
    actionLabel: 'Adjust Threshold',
    actionType: 'irrigation'
  },
  {
    id: 'alt-3',
    title: 'Disease Diagnosis Ready',
    message: 'Leaf scan on Tomato Sector detected Early Blight with 96.4% confidence. Treatment advisory available.',
    severity: 'critical',
    category: 'disease',
    timestamp: '3 hours ago',
    read: false,
    actionLabel: 'View Treatment',
    actionType: 'disease'
  },
  {
    id: 'alt-4',
    title: 'Upcoming Rain Expected (Friday)',
    message: '65% probability of rain on Oct 03 (approx 18mm). Automated irrigation will pause to conserve water.',
    severity: 'info',
    category: 'weather',
    timestamp: '5 hours ago',
    read: true,
    actionLabel: 'View Forecast',
    actionType: 'weather'
  },
  {
    id: 'alt-5',
    title: 'Irrigation Cycle Completed',
    message: 'Sector 2 micro-drip cycle completed. 450 Liters delivered across 2.5 acres.',
    severity: 'success',
    category: 'irrigation',
    timestamp: 'Yesterday',
    read: true
  }
];

export const EXPERT_CONSULTATIONS: ExpertConsultation[] = [
  {
    id: 'cons-1',
    farmerName: 'Ramesh Patel',
    farmLocation: 'Green Valley Agro Farm (Sector 4)',
    crop: 'Tomato (Hybrid)',
    sampleImage: 'https://images.unsplash.com/photo-1597916829826-02e5bb4a54e0?w=600&auto=format&fit=crop&q=80',
    aiDiagnosis: 'Tomato Early Blight (Alternaria solani)',
    confidence: 96.4,
    submittedAt: 'Today, 09:30 AM',
    status: 'Pending Review'
  },
  {
    id: 'cons-2',
    farmerName: 'Suresh Verma',
    farmLocation: 'Sunrise Orchards, Block B',
    crop: 'Grapevine',
    sampleImage: 'https://images.unsplash.com/photo-1528498033373-3c6c08e93d51?w=600&auto=format&fit=crop&q=80',
    aiDiagnosis: 'Powdery Mildew (Erysiphe necator)',
    confidence: 92.1,
    submittedAt: 'Yesterday, 04:15 PM',
    status: 'Advisory Sent',
    expertNotes: 'Confirmed fungal hyphae pattern. Foliage canopy is too dense.',
    prescription: 'Apply Wettable Sulfur 80% WDG (2g/L). Conduct canopy thinning immediately to improve air circulation.'
  },
  {
    id: 'cons-3',
    farmerName: 'Anil Kumar',
    farmLocation: 'Krishna Delta Farms',
    crop: 'Paddy Rice',
    sampleImage: 'https://images.unsplash.com/photo-1536939459926-301728717817?w=600&auto=format&fit=crop&q=80',
    aiDiagnosis: 'Bacterial Leaf Blight',
    confidence: 94.8,
    submittedAt: '2 days ago',
    status: 'Advisory Sent',
    expertNotes: 'High humidity after recent rainfall triggered bacterial spread.',
    prescription: 'Suspend urea top dressing. Spray Streptocycline (30g) + Copper Oxychloride (500g) per acre.'
  }
];

export const ADMIN_SENSOR_NODES: AdminSensorNode[] = [
  {
    id: 'NODE-01',
    nodeName: 'Soil-MultiDepth-S4',
    farmName: 'Green Valley Agro Farm',
    farmer: 'Ramesh Patel',
    type: 'Soil Multi-Depth',
    status: 'Online',
    battery: 94,
    lastReading: '30s ago (Moisture: 36%, Temp: 28.4°C)',
    firmware: 'v2.4.1'
  },
  {
    id: 'NODE-02',
    nodeName: 'SmartValve-Relay-S4',
    farmName: 'Green Valley Agro Farm',
    farmer: 'Ramesh Patel',
    type: 'Irrigation Valve',
    status: 'Online',
    battery: 98,
    lastReading: 'Pumping Active (Flow: 28 L/min)',
    firmware: 'v2.2.0'
  },
  {
    id: 'NODE-03',
    nodeName: 'MicroClimate-Station-Alpha',
    farmName: 'Green Valley Agro Farm',
    farmer: 'Ramesh Patel',
    type: 'Weather Station',
    status: 'Online',
    battery: 91,
    lastReading: 'Wind: 12km/h NE, UV: 5.8',
    firmware: 'v3.0.4'
  },
  {
    id: 'NODE-04',
    nodeName: 'Canopy-Cam-AI-01',
    farmName: 'Sunrise Orchards',
    farmer: 'Suresh Verma',
    type: 'Canopy Cam',
    status: 'Online',
    battery: 88,
    lastReading: 'Optical health scan OK',
    firmware: 'v1.9.8'
  },
  {
    id: 'NODE-05',
    nodeName: 'Soil-Probe-WestRidge',
    farmName: 'Hilltop Terrace Farms',
    farmer: 'Maya Patil',
    type: 'Soil Multi-Depth',
    status: 'Alert',
    battery: 21,
    lastReading: 'Low Battery Warning (21%)',
    firmware: 'v2.1.0'
  },
  {
    id: 'NODE-06',
    nodeName: 'SolarPump-Telemetry-09',
    farmName: 'Krishna Delta Farms',
    farmer: 'Anil Kumar',
    type: 'Irrigation Valve',
    status: 'Online',
    battery: 100,
    lastReading: 'Standby / Solar Array 440W',
    firmware: 'v2.3.5'
  }
];

export const ADMIN_STATS = {
  totalFarmers: 1248,
  totalFarms: 1890,
  totalSensors: 4520,
  onlineSensorsPercent: 98.4,
  activeIrrigationSystems: 412,
  diseaseReportsResolved: 624,
  activeDiseaseReports: 14,
  systemAlerts: 8,
  waterSavedGallons: '3.4M Liters',
  avgCropYieldIncrease: '+24.5%'
};
