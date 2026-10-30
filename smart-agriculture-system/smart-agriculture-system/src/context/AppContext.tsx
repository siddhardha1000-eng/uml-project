import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  User, 
  UserRole, 
  TelemetryData, 
  HistoricalReading, 
  AlertNotification, 
  DiseaseSample, 
  ExpertConsultation,
  AdminSensorNode
} from '../types';
import { 
  DEMO_USERS, 
  INITIAL_TELEMETRY, 
  HISTORICAL_READINGS_24H, 
  WEEKLY_WATER_USAGE,
  INITIAL_ALERTS, 
  EXPERT_CONSULTATIONS,
  ADMIN_SENSOR_NODES,
  PRELOADED_DISEASE_SAMPLES
} from '../data/mockData';

interface AppContextType {
  currentUser: User | null;
  currentRole: UserRole;
  currentView: string;
  telemetry: TelemetryData;
  historicalReadings: HistoricalReading[];
  weeklyWater: typeof WEEKLY_WATER_USAGE;
  alerts: AlertNotification[];
  expertConsultations: ExpertConsultation[];
  adminSensors: AdminSensorNode[];
  isDroughtSimulated: boolean;
  unreadAlertCount: number;
  
  // Actions
  login: (role: UserRole, email?: string) => void;
  logout: () => void;
  setCurrentView: (view: string) => void;
  setCurrentRole: (role: UserRole) => void;
  startIrrigation: () => void;
  stopIrrigation: () => void;
  toggleAutoIrrigation: () => void;
  setMoistureThreshold: (val: number) => void;
  simulateDroughtEvent: () => void;
  restoreNormalConditions: () => void;
  markAlertAsRead: (id: string) => void;
  clearAllAlerts: () => void;
  submitDiseaseToExpert: (sample: DiseaseSample) => void;
  submitExpertAdvisory: (consultationId: string, notes: string, prescription: string) => void;
  toggleSensorStatus: (sensorId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Start on landing page, or default to farmer if logged in
  const [currentUser, setCurrentUser] = useState<User | null>(DEMO_USERS.farmer);
  const [currentRole, setCurrentRoleState] = useState<UserRole>('farmer');
  const [currentView, setCurrentView] = useState<string>('dashboard');
  const [telemetry, setTelemetry] = useState<TelemetryData>(INITIAL_TELEMETRY);
  const [historicalReadings, setHistoricalReadings] = useState<HistoricalReading[]>(HISTORICAL_READINGS_24H);
  const [weeklyWater, setWeeklyWater] = useState(WEEKLY_WATER_USAGE);
  const [alerts, setAlerts] = useState<AlertNotification[]>(INITIAL_ALERTS);
  const [expertConsultations, setExpertConsultations] = useState<ExpertConsultation[]>(EXPERT_CONSULTATIONS);
  const [adminSensors, setAdminSensors] = useState<AdminSensorNode[]>(ADMIN_SENSOR_NODES);
  const [isDroughtSimulated, setIsDroughtSimulated] = useState<boolean>(false);

  // Unread alerts count
  const unreadAlertCount = alerts.filter(a => !a.read).length;

  // Active irrigation simulation interval
  useEffect(() => {
    let interval: any = null;
    if (telemetry.irrigationStatus === 'Active') {
      interval = setInterval(() => {
        setTelemetry(prev => {
          // If pumping, moisture rises slightly, water usage ticks up
          const newMoisture = Math.min(65, prev.soilMoisture + 0.4);
          const newCondition = newMoisture >= prev.moistureThreshold ? 'Optimal' : 'Dry - Needs Water';
          return {
            ...prev,
            soilMoisture: Number(newMoisture.toFixed(1)),
            waterUsageToday: prev.waterUsageToday + 5,
            soilCondition: newCondition,
            soilDepthMoisture: {
              ...prev.soilDepthMoisture,
              top10cm: Math.min(65, prev.soilDepthMoisture.top10cm + 0.5)
            }
          };
        });
      }, 2500);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [telemetry.irrigationStatus]);

  // Role switch handler
  const setCurrentRole = (role: UserRole) => {
    setCurrentRoleState(role);
    if (role === 'guest') {
      setCurrentUser(null);
      setCurrentView('landing');
    } else {
      setCurrentUser(DEMO_USERS[role]);
      setCurrentView('dashboard');
    }
  };

  const login = (role: UserRole, email?: string) => {
    const user = DEMO_USERS[role] || DEMO_USERS.farmer;
    if (email) {
      user.email = email;
    }
    setCurrentUser(user);
    setCurrentRoleState(role);
    setCurrentView('dashboard');
  };

  const logout = () => {
    setCurrentUser(null);
    setCurrentRoleState('guest');
    setCurrentView('landing');
  };

  // Irrigation Controls
  const startIrrigation = () => {
    setTelemetry(prev => ({
      ...prev,
      irrigationStatus: 'Active',
      lastIrrigated: 'Active now (Manual start)'
    }));
    
    // Add success alert
    const newAlert: AlertNotification = {
      id: `alt-${Date.now()}`,
      title: 'Irrigation Pump Activated',
      message: 'Subsurface micro-drip pump started in Sector 4. Dispensing at 28 L/min.',
      severity: 'info',
      category: 'irrigation',
      timestamp: 'Just now',
      read: false
    };
    setAlerts(prev => [newAlert, ...prev]);
  };

  const stopIrrigation = () => {
    setTelemetry(prev => ({
      ...prev,
      irrigationStatus: 'Idle',
      lastIrrigated: 'Just stopped'
    }));

    const newAlert: AlertNotification = {
      id: `alt-${Date.now()}`,
      title: 'Irrigation Pump Halted',
      message: 'Irrigation valve closed. Current soil moisture is stabilized.',
      severity: 'success',
      category: 'irrigation',
      timestamp: 'Just now',
      read: false
    };
    setAlerts(prev => [newAlert, ...prev]);
  };

  const toggleAutoIrrigation = () => {
    setTelemetry(prev => {
      const nextState = !prev.autoIrrigation;
      return {
        ...prev,
        autoIrrigation: nextState
      };
    });
  };

  const setMoistureThreshold = (val: number) => {
    setTelemetry(prev => {
      const needsIrrigation = prev.soilMoisture < val;
      return {
        ...prev,
        moistureThreshold: val,
        soilCondition: needsIrrigation ? 'Dry - Needs Water' : 'Optimal',
        irrigationStatus: (prev.autoIrrigation && needsIrrigation) ? 'Active' : prev.irrigationStatus
      };
    });
  };

  // Simulation: Trigger Dry Soil / Low Moisture
  const simulateDroughtEvent = () => {
    setIsDroughtSimulated(true);
    setTelemetry(prev => ({
      ...prev,
      soilMoisture: 28.5,
      temperature: 34.2,
      humidity: 44,
      soilCondition: 'Dry - Needs Water',
      irrigationStatus: prev.autoIrrigation ? 'Active' : 'Idle',
      lastIrrigated: prev.autoIrrigation ? 'Auto-triggered by critical drought event' : prev.lastIrrigated,
      soilDepthMoisture: {
        top10cm: 22,
        mid30cm: 28,
        deep60cm: 36
      }
    }));

    // Add high severity alert
    const droughtAlert: AlertNotification = {
      id: `drought-${Date.now()}`,
      title: 'CRITICAL: Severe Soil Moisture Deficit (28.5%)',
      message: 'Moisture dropped drastically below threshold (40%). High crop stress detected. ' + 
        (telemetry.autoIrrigation ? 'Smart pump automatically engaged!' : 'Manual pump trigger required immediately!'),
      severity: 'critical',
      category: 'moisture',
      timestamp: 'Just now',
      read: false,
      actionLabel: 'Open Irrigation',
      actionType: 'irrigation'
    };
    setAlerts(prev => [droughtAlert, ...prev]);
  };

  const restoreNormalConditions = () => {
    setIsDroughtSimulated(false);
    setTelemetry(prev => ({
      ...prev,
      soilMoisture: 46.5,
      temperature: 27.8,
      humidity: 65,
      soilCondition: 'Optimal',
      irrigationStatus: 'Idle',
      lastIrrigated: '30 mins ago',
      soilDepthMoisture: {
        top10cm: 44,
        mid30cm: 47,
        deep60cm: 52
      }
    }));

    const restoredAlert: AlertNotification = {
      id: `restore-${Date.now()}`,
      title: 'Soil Moisture Restored to Optimal Range',
      message: 'Moisture at 46.5%. Root zone well hydrated. Pump set to idle standby.',
      severity: 'success',
      category: 'moisture',
      timestamp: 'Just now',
      read: false
    };
    setAlerts(prev => [restoredAlert, ...prev]);
  };

  const markAlertAsRead = (id: string) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, read: true } : a));
  };

  const clearAllAlerts = () => {
    setAlerts(prev => prev.map(a => ({ ...a, read: true })));
  };

  const submitDiseaseToExpert = (sample: DiseaseSample) => {
    const newConsultation: ExpertConsultation = {
      id: `cons-${Date.now()}`,
      farmerName: currentUser?.name || 'Ramesh Patel',
      farmLocation: currentUser?.farmLocation || 'Sector 4, Green Valley',
      crop: sample.cropName,
      sampleImage: sample.leafImageUrl,
      aiDiagnosis: sample.diseaseName,
      confidence: sample.confidence,
      submittedAt: 'Just now',
      status: 'Pending Review'
    };
    setExpertConsultations(prev => [newConsultation, ...prev]);

    // Add alert
    const newAlert: AlertNotification = {
      id: `alt-expert-${Date.now()}`,
      title: 'Consultation Sent to Agronomist',
      message: `Disease scan for ${sample.cropName} submitted to Dr. Sarah Chen. You will receive prescription notes shortly.`,
      severity: 'info',
      category: 'disease',
      timestamp: 'Just now',
      read: false
    };
    setAlerts(prev => [newAlert, ...prev]);
  };

  const submitExpertAdvisory = (consultationId: string, notes: string, prescription: string) => {
    setExpertConsultations(prev => prev.map(item => {
      if (item.id === consultationId) {
        return {
          ...item,
          status: 'Advisory Sent',
          expertNotes: notes,
          prescription: prescription
        };
      }
      return item;
    }));

    // Generate farmer alert
    const target = expertConsultations.find(c => c.id === consultationId);
    const newAlert: AlertNotification = {
      id: `advisory-${Date.now()}`,
      title: `Expert Advisory from Dr. Sarah Chen`,
      message: `Diagnosis for ${target?.crop || 'crop'} verified: "${notes.substring(0, 70)}..." Check full prescription in Disease Center.`,
      severity: 'success',
      category: 'disease',
      timestamp: 'Just now',
      read: false,
      actionLabel: 'View Advisory',
      actionType: 'disease'
    };
    setAlerts(prev => [newAlert, ...prev]);
  };

  const toggleSensorStatus = (sensorId: string) => {
    setAdminSensors(prev => prev.map(sensor => {
      if (sensor.id === sensorId) {
        const nextStatus = sensor.status === 'Online' ? 'Offline' : 'Online';
        return {
          ...sensor,
          status: nextStatus
        };
      }
      return sensor;
    }));
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        currentRole,
        currentView,
        telemetry,
        historicalReadings,
        weeklyWater,
        alerts,
        expertConsultations,
        adminSensors,
        isDroughtSimulated,
        unreadAlertCount,
        login,
        logout,
        setCurrentView,
        setCurrentRole,
        startIrrigation,
        stopIrrigation,
        toggleAutoIrrigation,
        setMoistureThreshold,
        simulateDroughtEvent,
        restoreNormalConditions,
        markAlertAsRead,
        clearAllAlerts,
        submitDiseaseToExpert,
        submitExpertAdvisory,
        toggleSensorStatus
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
