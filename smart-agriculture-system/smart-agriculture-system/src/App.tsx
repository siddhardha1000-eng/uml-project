import React, { useState } from 'react';
import { useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { Footer } from './components/layout/Footer';
import { LandingPage } from './components/landing/LandingPage';
import { LoginPage } from './components/auth/LoginPage';
import { FarmerDashboard } from './components/farmer/FarmerDashboard';
import { SoilMonitoring } from './components/farmer/SoilMonitoring';
import { SmartIrrigation } from './components/farmer/SmartIrrigation';
import { CropRecommendation } from './components/farmer/CropRecommendation';
import { DiseaseDetection } from './components/farmer/DiseaseDetection';
import { WeatherMonitoring } from './components/farmer/WeatherMonitoring';
import { AlertsCenter } from './components/farmer/AlertsCenter';
import { FarmReports } from './components/farmer/FarmReports';
import { ExpertDashboard } from './components/expert/ExpertDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';

export const App: React.FC = () => {
  const { currentUser, currentRole, currentView } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // If user is on the standalone login view
  if (currentView === 'login') {
    return <LoginPage />;
  }

  // If user is guest on landing page
  if (currentRole === 'guest' || currentView === 'landing') {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50">
        <Navbar />
        <main className="flex-1">
          <LandingPage />
        </main>
        <Footer />
      </div>
    );
  }

  // Active Authenticated Layout (Farmer / Expert / Admin)
  const renderMainContent = () => {
    // If expert dashboard view
    if (currentRole === 'expert' && (currentView === 'dashboard' || currentView === 'expert-farmers' || currentView === 'expert-disease')) {
      return <ExpertDashboard />;
    }

    // If admin dashboard view
    if (currentRole === 'admin' && (currentView === 'dashboard' || currentView === 'admin-sensors' || currentView === 'admin-users')) {
      return <AdminDashboard />;
    }

    // Standard Views (Accessible to Farmer and cross-checked by Expert/Admin)
    switch (currentView) {
      case 'dashboard':
        return <FarmerDashboard />;
      case 'soil':
        return <SoilMonitoring />;
      case 'irrigation':
        return <SmartIrrigation />;
      case 'crop-rec':
        return <CropRecommendation />;
      case 'disease':
        return <DiseaseDetection />;
      case 'weather':
        return <WeatherMonitoring />;
      case 'alerts':
        return <AlertsCenter />;
      case 'reports':
        return <FarmReports />;
      default:
        return <FarmerDashboard />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 text-slate-800">
      
      {/* Top Navbar */}
      <Navbar 
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
        sidebarOpen={sidebarOpen} 
      />

      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        
        {/* Responsive Sidebar Navigation */}
        <Sidebar 
          isOpen={sidebarOpen} 
          onClose={() => setSidebarOpen(false)} 
        />

        {/* Dynamic Page Container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 lg:ml-64 transition-all overflow-x-hidden">
          {renderMainContent()}
        </main>

      </div>

      {/* Footer */}
      <div className="lg:ml-64">
        <Footer />
      </div>

    </div>
  );
};
