import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { ApplicationModal } from './components/ApplicationModal';

import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { ServiceDetailPage } from './pages/ServiceDetailPage';
import { ApplicationStatusPage } from './pages/ApplicationStatusPage';
import { DocumentsPage } from './pages/DocumentsPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { HelpPage } from './pages/HelpPage';
import { AboutPage } from './pages/AboutPage';
import { CitizenDashboard } from './pages/CitizenDashboard';
import { AdminMonitoringPage } from './pages/AdminMonitoringPage';

function AppContent() {
  const [activePage, setActivePage] = useState('home');
  const [selectedService, setSelectedService] = useState(null);
  const [applyService, setApplyService] = useState(null);
  const [applicationModalOpen, setApplicationModalOpen] = useState(false);
  const { authModalOpen, setAuthModalOpen } = useAuth();

  const handlePageChange = (pageId) => {
    setActivePage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleApplyDirect = (service) => {
    setApplyService(service);
    setApplicationModalOpen(true);
  };

  return (
    <div className="app-container">
      <Navbar
        activePage={activePage}
        setActivePage={handlePageChange}
        onOpenAuth={() => setAuthModalOpen(true)}
      />

      <main className="main-content">
        {activePage === 'home' && (
          <HomePage
            setActivePage={handlePageChange}
            setSelectedService={setSelectedService}
            onApplyDirect={handleApplyDirect}
            onOpenAuth={() => setAuthModalOpen(true)}
          />
        )}

        {activePage === 'services' && (
          <ServicesPage
            setActivePage={handlePageChange}
            setSelectedService={setSelectedService}
            onApplyDirect={handleApplyDirect}
          />
        )}

        {activePage === 'service-detail' && (
          <ServiceDetailPage
            service={selectedService}
            setActivePage={handlePageChange}
            onApplyDirect={handleApplyDirect}
          />
        )}

        {activePage === 'applications' && (
          <ApplicationStatusPage
            setActivePage={handlePageChange}
          />
        )}

        {activePage === 'documents' && (
          <DocumentsPage />
        )}

        {activePage === 'notifications' && (
          <NotificationsPage />
        )}

        {activePage === 'help' && (
          <HelpPage />
        )}

        {activePage === 'about' && (
          <AboutPage setActivePage={handlePageChange} />
        )}

        {activePage === 'dashboard' && (
          <CitizenDashboard
            setActivePage={handlePageChange}
            setSelectedService={setSelectedService}
            onApplyDirect={handleApplyDirect}
            onOpenAuth={() => setAuthModalOpen(true)}
          />
        )}

        {/* Hidden System Administration Page */}
        {activePage === 'admin' && (
          <AdminMonitoringPage />
        )}
      </main>

      <Footer setActivePage={handlePageChange} />

      {/* Global Modals */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />

      <ApplicationModal
        service={applyService}
        isOpen={applicationModalOpen}
        onClose={() => {
          setApplicationModalOpen(false);
          setApplyService(null);
        }}
        onSuccess={(newApp) => {
          console.log("Application Submitted", newApp);
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
