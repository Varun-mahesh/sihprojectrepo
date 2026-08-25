import React from 'react';
import { Award, CheckCircle, FileText, Clock, ArrowRight, ShieldCheck, HelpCircle, ChevronRight, Layers } from 'lucide-react';

export const ServiceDetailPage = ({ service, setActivePage, onApplyDirect }) => {
  if (!service) {
    return (
      <div className="container" style={{ padding: '4rem 1.5rem', textAlign: 'center' }}>
        <div className="card" style={{ maxWidth: '500px', margin: '0 auto' }}>
          <Layers size={48} style={{ color: '#1e3a8a', marginBottom: '1rem' }} />
          <h3>No Service Selected</h3>
          <p style={{ color: '#64748b', margin: '1rem 0' }}>Please select a service from the main directory.</p>
          <button className="btn btn-primary" onClick={() => setActivePage('services')}>
            Browse Services Directory
          </button>
        </div>
      </div>
    );
  }

  const eligibilityList = Array.isArray(service.eligibility) ? service.eligibility : [service.eligibility];
  const requiredDocsList = Array.isArray(service.required_docs) ? service.required_docs : [service.required_docs];

  return (
    <div>
      <section className="page-header-banner">
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#f59e0b', marginBottom: '0.5rem' }}>
            <span>Services Directory</span>
            <ChevronRight size={14} />
            <span>{service.category}</span>
          </div>
          <h1 className="page-header-title">{service.title}</h1>
          <p className="page-header-subtitle">
            🏛️ Department: <strong>{service.department}</strong> • Service Code: <strong>{service.service_code}</strong>
          </p>
        </div>
      </section>

      <div className="container" style={{ padding: '2.5rem 1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
          {/* Main Info Left Column */}
          <div>
            {/* Overview */}
            <div className="card" style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f2942', marginBottom: '0.75rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.5rem' }}>
                Service Overview
              </h3>
              <p style={{ fontSize: '0.95rem', color: '#334155', lineHeight: 1.6, marginBottom: '1rem' }}>
                {service.detailed_desc}
              </p>
            </div>

            {/* Eligibility Requirements */}
            <div className="card" style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f2942', marginBottom: '1rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.5rem' }}>
                Eligibility Criteria
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {eligibilityList.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                    <CheckCircle size={18} style={{ color: '#059669', flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ fontSize: '0.9rem', color: '#334155' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Required Documents */}
            <div className="card" style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f2942', marginBottom: '1rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.5rem' }}>
                Mandatory Supporting Documents
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem' }}>
                {requiredDocsList.map((doc, idx) => (
                  <div key={idx} style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0.75rem 1rem', backgroundColor: '#f8fafc', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <FileText size={18} style={{ color: '#1e3a8a' }} />
                    <span style={{ fontSize: '0.88rem', fontWeight: 600, color: '#0f172a' }}>{doc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Application Workflow Steps */}
            <div className="card">
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f2942', marginBottom: '1.25rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.5rem' }}>
                Step-by-Step Application Steps
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {[
                  { step: "Step 1", title: "Fill Citizen Gateway Form", desc: "Complete basic identity & residential details pre-populated from DigiLocker e-KYC." },
                  { step: "Step 2", title: "Integration Adapter Processing", desc: "The Flask Backend securely transforms and transmits application data to the target department API." },
                  { step: "Step 3", title: "Department Official Verification", desc: "Authorized verification officer (BLO / Tahsildar / RTO) conducts digital review." },
                  { step: "Step 4", title: "Approval & Digital Certificate Issuance", desc: "Download the digitally signed certificate or EPIC card directly from your Citizen Dashboard." }
                ].map((s, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '1rem' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#1e3a8a', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.85rem', flexShrink: 0 }}>
                      {idx + 1}
                    </div>
                    <div>
                      <h4 style={{ fontSize: '0.98rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.2rem' }}>
                        {s.title}
                      </h4>
                      <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.4 }}>
                        {s.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Action Bar */}
          <div>
            <div className="card" style={{ position: 'sticky', top: '90px' }}>
              <div style={{ backgroundColor: '#eff6ff', borderRadius: '8px', padding: '1rem', marginBottom: '1.25rem' }}>
                <div style={{ fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700, marginBottom: '0.25rem' }}>
                  Processing Information
                </div>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1e3a8a', marginBottom: '0.5rem' }}>
                  ⏱️ {service.processing_time}
                </div>
                <div style={{ fontSize: '0.85rem', color: '#0f172a', fontWeight: 600 }}>
                  Government Fee: <span style={{ color: '#059669', fontWeight: 800 }}>{service.fee}</span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <button
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '0.8rem', fontSize: '1rem' }}
                  onClick={() => onApplyDirect(service)}
                >
                  Start Application <ArrowRight size={18} />
                </button>

                <button
                  className="btn btn-secondary"
                  style={{ width: '100%' }}
                  onClick={() => setActivePage('applications')}
                >
                  Check Application Status
                </button>
              </div>

              <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '1rem', fontSize: '0.8rem', color: '#64748b', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <ShieldCheck size={16} style={{ color: '#059669' }} />
                  <span>Verified Government API Adapter</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <HelpCircle size={16} style={{ color: '#2563eb' }} />
                  <span>Need help? Call Toll-Free 1800-11-2026</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
