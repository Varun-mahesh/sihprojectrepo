import React, { useState, useEffect } from 'react';
import { User, FileText, Clock, Bell, FolderCheck, HelpCircle, Layers, CheckCircle, ArrowRight, ShieldCheck, Download, Sparkles, Award } from 'lucide-react';
import { StatusBadge } from '../components/StatusBadge';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';

export const CitizenDashboard = ({ setActivePage, setSelectedService, onApplyDirect, onOpenAuth }) => {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [popularServices, setPopularServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadDashboardData();
    }
  }, [user]);

  const loadDashboardData = async () => {
    try {
      const [appsRes, notifsRes, servsRes] = await Promise.all([
        api.getApplications(user?.id),
        api.getNotifications(),
        api.getServices()
      ]);

      setApplications(appsRes.applications || []);
      setNotifications(notifsRes.notifications || []);
      setPopularServices((servsRes.services || []).slice(0, 3));
    } catch (e) {
      console.error("Dashboard data load error", e);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="container" style={{ padding: '4rem 1.5rem', textAlign: 'center' }}>
        <div className="card" style={{ maxWidth: '450px', margin: '0 auto', padding: '2.5rem' }}>
          <User size={48} style={{ color: '#1e3a8a', marginBottom: '1rem' }} />
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f2942', marginBottom: '0.5rem' }}>
            Citizen Sign In Required
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
            Please sign in to access your unified citizen dashboard, track active applications, and view stored documents.
          </p>
          <button className="btn btn-primary" style={{ width: '100%' }} onClick={onOpenAuth}>
            Login / Register
          </button>
        </div>
      </div>
    );
  }

  const approvedApps = applications.filter(a => a.status.toLowerCase() === 'approved');
  const pendingApps = applications.filter(a => a.status.toLowerCase() !== 'approved');

  return (
    <div>
      {/* Dashboard Top Hero */}
      <section className="page-header-banner">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                <span className="hero-badge" style={{ margin: 0 }}>
                  <ShieldCheck size={14} /> Verified Citizen Account
                </span>
                <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Citizen ID: {user.citizen_id}</span>
              </div>
              <h1 className="page-header-title">Welcome back, {user.full_name}</h1>
              <p className="page-header-subtitle">
                State Jurisdiction: {user.state} ({user.district})
              </p>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button className="btn btn-accent" onClick={() => setActivePage('services')}>
                <Layers size={16} /> Browse Services
              </button>
              <button className="btn btn-secondary" onClick={() => setActivePage('applications')}>
                <Clock size={16} /> Track Application
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="container" style={{ padding: '2.5rem 1.5rem' }}>
        {/* Quick Action Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '1rem', marginBottom: '2.5rem' }}>
          {[
            { title: "Browse Services", val: "12+ Available", icon: Layers, color: "#1e3a8a", bg: "#eff6ff", page: "services" },
            { title: "My Applications", val: `${applications.length} Total`, icon: FileText, color: "#2563eb", bg: "#eff6ff", page: "applications" },
            { title: "My Documents", val: `${approvedApps.length} Issued`, icon: FolderCheck, color: "#059669", bg: "#ecfdf5", page: "documents" },
            { title: "Track Application", val: `${pendingApps.length} Active`, icon: Clock, color: "#d97706", bg: "#fffbeb", page: "applications" },
            { title: "Notifications", val: `${notifications.length} Alerts`, icon: Bell, color: "#ea580c", bg: "#fff7ed", page: "notifications" },
            { title: "Help & Support", val: "Toll-Free 1800", icon: HelpCircle, color: "#0891b2", bg: "#ecfeff", page: "help" },
          ].map((card, idx) => {
            const IconComp = card.icon;
            return (
              <div
                key={idx}
                className="card card-interactive"
                onClick={() => setActivePage(card.page)}
                style={{ cursor: 'pointer', padding: '1.25rem' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <div style={{ width: '38px', height: '38px', borderRadius: '8px', backgroundColor: card.bg, color: card.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <IconComp size={20} />
                  </div>
                  <span style={{ fontSize: '1rem', fontWeight: 800, color: card.color }}>{card.val}</span>
                </div>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0f172a' }}>{card.title}</h4>
              </div>
            );
          })}
        </div>

        {/* Two Column Dashboard View */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
          {/* Left Column: Recent Applications */}
          <div>
            <div className="card" style={{ marginBottom: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.75rem' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f2942', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <FileText size={18} style={{ color: '#1e3a8a' }} />
                  Recent Applications
                </h3>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => setActivePage('applications')}
                >
                  View All Applications
                </button>
              </div>

              {applications.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '2.5rem 0', color: '#64748b' }}>
                  <FileText size={36} style={{ margin: '0 auto 0.75rem auto', color: '#cbd5e1' }} />
                  <p>No application submissions found.</p>
                  <button className="btn btn-primary btn-sm" style={{ marginTop: '1rem' }} onClick={() => setActivePage('services')}>
                    Apply For Government Service
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {applications.slice(0, 4).map((app) => (
                    <div
                      key={app.id}
                      style={{
                        border: '1px solid #e2e8f0',
                        borderRadius: '10px',
                        padding: '1.1rem',
                        backgroundColor: '#ffffff',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.75rem'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#1e3a8a', fontFamily: 'monospace' }}>
                              {app.application_id}
                            </span>
                            <span style={{ color: '#94a3b8', fontSize: '0.75rem' }}>• {app.service_category}</span>
                          </div>
                          <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a' }}>
                            {app.service_title}
                          </h4>
                          <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                            🏛️ {app.department}
                          </span>
                        </div>

                        <StatusBadge status={app.status} />
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.5rem', borderTop: '1px solid #f1f5f9' }}>
                        <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                          Submitted: {app.submitted_at ? new Date(app.submitted_at).toLocaleDateString() : 'Recent'}
                        </span>
                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={() => {
                            setActivePage('applications');
                            window.location.hash = `#track-${app.application_id}`;
                          }}
                        >
                          View Status Details <ArrowRight size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Frequently Used & Recommended Services */}
            <div className="card">
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f2942', marginBottom: '1rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.5rem' }}>
                Frequently Used & Recommended Services
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                {popularServices.map((serv) => (
                  <div
                    key={serv.id}
                    style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1rem', backgroundColor: '#f8fafc' }}
                  >
                    <div style={{ fontSize: '0.75rem', color: '#1e3a8a', fontWeight: 700, marginBottom: '0.2rem' }}>{serv.category}</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>{serv.title}</div>
                    <button
                      className="btn btn-primary btn-sm"
                      style={{ width: '100%', fontSize: '0.78rem' }}
                      onClick={() => onApplyDirect(serv)}
                    >
                      Access Service
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Profile Summary & Notifications */}
          <div>
            {/* Citizen Profile Summary Card */}
            <div className="card" style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f2942', marginBottom: '1rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.5rem' }}>
                Citizen Profile Summary
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.88rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748b' }}>Full Name:</span>
                  <span style={{ fontWeight: 600, color: '#0f172a' }}>{user.full_name}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748b' }}>Citizen ID:</span>
                  <span style={{ fontWeight: 700, color: '#1e3a8a', fontFamily: 'monospace' }}>{user.citizen_id}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748b' }}>Aadhaar Ref:</span>
                  <span style={{ fontWeight: 600, color: '#0f172a' }}>{user.aadhaar_mock_id}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748b' }}>Mobile:</span>
                  <span style={{ fontWeight: 600, color: '#0f172a' }}>{user.mobile}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748b' }}>Email:</span>
                  <span style={{ fontWeight: 600, color: '#0f172a', fontSize: '0.82rem' }}>{user.email}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748b' }}>Jurisdiction:</span>
                  <span style={{ fontWeight: 600, color: '#0f172a' }}>{user.state} ({user.district})</span>
                </div>
              </div>
            </div>

            {/* Notifications Widget */}
            <div className="card">
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f2942', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Bell size={16} style={{ color: '#ea580c' }} /> Service Notifications
                </span>
                <button
                  style={{ background: 'none', border: 'none', color: '#2563eb', cursor: 'pointer', fontSize: '0.78rem', fontWeight: 600 }}
                  onClick={() => setActivePage('notifications')}
                >
                  View All
                </button>
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {notifications.slice(0, 3).map((n) => (
                  <div
                    key={n.id}
                    style={{
                      borderLeft: '3px solid #2563eb',
                      backgroundColor: '#f8fafc',
                      padding: '0.65rem 0.85rem',
                      borderRadius: '0 6px 6px 0'
                    }}
                  >
                    <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#0f172a', marginBottom: '0.2rem' }}>
                      {n.title}
                    </div>
                    <p style={{ fontSize: '0.8rem', color: '#475569', lineHeight: 1.4 }}>
                      {n.message}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
