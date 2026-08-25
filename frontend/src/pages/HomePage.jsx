import React, { useState, useEffect } from 'react';
import { Search, Vote, ShieldCheck, Award, HeartHandshake, GraduationCap, Briefcase, Activity, Car, ArrowRight, CheckCircle, Sparkles, Shield, UserCheck, Layers, FileText } from 'lucide-react';
import { ServiceCard } from '../components/ServiceCard';
import { api } from '../services/api';

export const HomePage = ({ setActivePage, setSelectedService, onApplyDirect, onOpenAuth }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState([]);
  const [popularServices, setPopularServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHomeData();
  }, []);

  const loadHomeData = async () => {
    try {
      const [catsRes, servsRes] = await Promise.all([
        api.getCategories(),
        api.getServices()
      ]);

      setCategories(catsRes.categories || []);
      setPopularServices((servsRes.services || []).slice(0, 6));
    } catch (e) {
      console.error("Failed loading homepage data", e);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setActivePage('services');
      window.location.hash = `#search-${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <div>
      {/* Citizen Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay-grid" />
        <div className="container">
          <div className="hero-grid">
            <div>
              <div className="hero-badge">
                <Sparkles size={14} /> Official Government Citizen Platform
              </div>
              <h1 className="hero-headline">
                One Portal. Multiple Government Services.
              </h1>
              <p className="hero-subtext">
                Access multiple government services from one secure and convenient portal. Discover services, submit applications, and track progress without managing separate logins for different departments.
              </p>

              {/* Citizen Search Bar */}
              <form onSubmit={handleSearchSubmit} className="search-box-hero">
                <Search size={22} style={{ color: '#64748b', marginLeft: '0.5rem' }} />
                <input
                  type="text"
                  className="search-input-hero"
                  placeholder="Search for a government service (e.g. Birth Certificate, Voter Card, Driving Licence)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="btn btn-primary" style={{ padding: '0.75rem 1.5rem', whiteSpace: 'nowrap' }}>
                  Search Services <ArrowRight size={16} />
                </button>
              </form>

              {/* Popular Search Shortcuts */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '1rem', flexWrap: 'wrap', fontSize: '0.85rem' }}>
                <span style={{ color: '#cbd5e1' }}>Popular:</span>
                {['Voter ID Card', 'Income Certificate', 'Driving Licence Renewal', 'PM-KISAN'].map((tag, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSearchQuery(tag);
                      setActivePage('services');
                    }}
                    style={{
                      background: 'rgba(255, 255, 255, 0.15)',
                      border: '1px solid rgba(255, 255, 255, 0.25)',
                      color: '#ffffff',
                      padding: '0.25rem 0.65rem',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '0.8rem'
                    }}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Right Hero Quick Access Box */}
            <div>
              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '16px',
                  padding: '1.75rem',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.75rem' }}>
                  <span style={{ fontWeight: 700, fontSize: '1rem', color: '#ffffff' }}>🏛️ Key Citizen Portals Included</span>
                  <span className="status-badge status-badge-connected" style={{ fontSize: '0.75rem' }}>Unified Access</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {[
                    { title: "Election Commission Services", icon: "🗳️", status: "Available" },
                    { title: "Identity & DigiLocker Documents", icon: "🪪", status: "Available" },
                    { title: "State Revenue Certificates", icon: "📜", status: "Available" },
                    { title: "Social Welfare & DBT Schemes", icon: "🤝", status: "Available" },
                    { title: "Transport & RTO Services", icon: "🚘", status: "Available" },
                  ].map((sys, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(0,0,0,0.2)', padding: '0.6rem 0.85rem', borderRadius: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        <span style={{ fontSize: '1.1rem' }}>{sys.icon}</span>
                        <span style={{ fontSize: '0.88rem', color: '#e2e8f0', fontWeight: 500 }}>{sys.title}</span>
                      </div>
                      <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 600 }}>{sys.status}</span>
                    </div>
                  ))}
                </div>

                <button
                  className="btn btn-accent btn-sm"
                  style={{ width: '100%', marginTop: '1.25rem' }}
                  onClick={() => setActivePage('services')}
                >
                  <Layers size={15} /> Explore All Services Directory
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Categories Grid */}
      <section style={{ padding: '3.5rem 0', backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f2942', marginBottom: '0.5rem' }}>
              Service Directory Categories
            </h2>
            <p style={{ color: '#64748b', fontSize: '1.05rem', maxWidth: '650px', margin: '0 auto' }}>
              Select a category to discover services available from central and state government departments.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="card card-interactive"
                onClick={() => {
                  setActivePage('services');
                  window.location.hash = `#category-${encodeURIComponent(cat.name)}`;
                }}
                style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
              >
                <div style={{ width: '42px', height: '42px', borderRadius: '8px', backgroundColor: '#eff6ff', color: '#1e3a8a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Award size={22} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.25rem' }}>
                    {cat.name}
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.4 }}>
                    {cat.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Services Section */}
      <section style={{ padding: '3.5rem 0', backgroundColor: '#f8fafc' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
            <div>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f2942', marginBottom: '0.35rem' }}>
                Popular Government Services
              </h2>
              <p style={{ color: '#64748b', fontSize: '1rem' }}>
                Frequently requested citizen services available for immediate online application.
              </p>
            </div>
            <button className="btn btn-secondary" onClick={() => setActivePage('services')}>
              View All Services ({popularServices.length}+) <ArrowRight size={16} />
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {popularServices.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onSelectService={(s) => {
                  setSelectedService(s);
                  setActivePage('service-detail');
                }}
                onApplyDirect={(s) => onApplyDirect(s)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section style={{ padding: '4rem 0', backgroundColor: '#ffffff', borderTop: '1px solid #e2e8f0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ea580c', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Simplified Citizen Journey
            </span>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f2942', marginTop: '0.25rem' }}>
              How The Unified Portal Works
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem' }}>
            {[
              { num: "1", title: "Find Service", desc: "Search and select from a consolidated directory of government services." },
              { num: "2", title: "Fill Details", desc: "Submit your details using pre-filled verified profile information." },
              { num: "3", title: "Track Progress", desc: "Monitor department verification stages in real time with SMS alerts." },
              { num: "4", title: "Get Document", desc: "Download digitally signed certificates directly into your secure document vault." }
            ].map((step, idx) => (
              <div key={idx} className="card" style={{ position: 'relative', overflow: 'hidden' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#1e3a8a', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, marginBottom: '1rem' }}>
                  {step.num}
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: 1.5 }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section style={{ padding: '3.5rem 0', backgroundColor: '#f8fafc', borderTop: '1px solid #e2e8f0' }}>
        <div className="container">
          <div className="card" style={{ background: 'linear-gradient(135deg, #0f2942 0%, #1e3a8a 100%)', color: '#ffffff', padding: '3rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem', alignItems: 'center' }}>
              <div>
                <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1rem', color: '#ffffff' }}>
                  Benefits of a Unified Portal
                </h2>
                <p style={{ color: '#cbd5e1', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  Citizens no longer need to remember dozens of different government website URLs or manage multiple usernames. Our portal provides one clean, trustworthy gateway for public digital services.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {[
                    "One single login for all central & state services",
                    "Clear step-by-step guidance and document checklists",
                    "Transparent stage tracking from submission to approval",
                    "Secure document storage linked with your citizen profile"
                  ].map((point, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#e2e8f0', fontSize: '0.92rem' }}>
                      <CheckCircle size={18} style={{ color: '#10b981' }} />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '12px', padding: '2rem' }}>
                <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#f59e0b', marginBottom: '1rem' }}>
                  Unified Citizen Guarantee
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.88rem', color: '#e2e8f0' }}>
                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <Shield size={20} style={{ color: '#38bdf8', flexShrink: 0 }} />
                    <div>
                      <strong>Verified & Secure:</strong> Official digital government service gateway with strict privacy.
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <UserCheck size={20} style={{ color: '#38bdf8', flexShrink: 0 }} />
                    <div>
                      <strong>Single Identity:</strong> Access all services with your single verified citizen account.
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <FileText size={20} style={{ color: '#38bdf8', flexShrink: 0 }} />
                    <div>
                      <strong>Digital Signatures:</strong> Download officially signed certificates directly.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
