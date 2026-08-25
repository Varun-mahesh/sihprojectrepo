import React from 'react';
import { ShieldCheck, CheckCircle, HeartHandshake, Layers, Award, UserCheck } from 'lucide-react';

export const AboutPage = ({ setActivePage }) => {
  return (
    <div>
      <section className="page-header-banner">
        <div className="container">
          <h1 className="page-header-title">About Unified Citizen Portal</h1>
          <p className="page-header-subtitle">
            Connecting citizens directly with government services through one unified, convenient, and transparent digital gateway.
          </p>
        </div>
      </section>

      <div className="container" style={{ padding: '3rem 1.5rem' }}>
        {/* Core Vision Banner */}
        <div className="card" style={{ marginBottom: '2.5rem', background: 'linear-gradient(135deg, #0f2942 0%, #1e3a8a 100%)', color: '#ffffff', padding: '2.5rem' }}>
          <div style={{ maxWidth: '800px' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Public Digital Infrastructure
            </span>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, marginTop: '0.5rem', marginBottom: '1rem', color: '#ffffff' }}>
              Eliminating Digital Service Fragmentation
            </h2>
            <p style={{ fontSize: '1.05rem', color: '#cbd5e1', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              In the past, Indian citizens had to navigate multiple independent government websites, manage separate login accounts, and re-enter personal information for every individual service request. The <strong>Unified Government Citizen Service Portal</strong> changes this paradigm by bringing multiple government digital services into a single, cohesive public interface.
            </p>
          </div>
        </div>

        {/* 6 Key Pillars Grid */}
        <div style={{ marginBottom: '3rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f2942', marginBottom: '0.5rem' }}>
              Key Portal Benefits
            </h2>
            <p style={{ color: '#64748b', fontSize: '1rem' }}>
              Designed around citizen convenience, transparency, and administrative efficiency.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {[
              { title: "One Unified Interface", desc: "Access Election, Identity, Revenue, Welfare, and Transport services through one consistent website layout.", icon: Layers },
              { title: "Single Citizen Login", desc: "Sign in once using your verified citizen profile without maintaining separate credentials for every department.", icon: UserCheck },
              { title: "Government Interoperability", desc: "Connects disparate government platforms behind the scenes while presenting a simple, unified interface.", icon: HeartHandshake },
              { title: "Transparent Tracking", desc: "Follow every step of your application's progress from submission to official department approval.", icon: CheckCircle },
              { title: "Digital Document Storage", desc: "All approved e-Certificates and identity cards are stored in your secure citizen document vault.", icon: Award },
              { title: "Secure & Trusted", desc: "Built with official security standards to protect citizen data privacy and prevent unauthorized access.", icon: ShieldCheck },
            ].map((pillar, idx) => {
              const IconComp = pillar.icon;
              return (
                <div key={idx} className="card">
                  <div style={{ width: '42px', height: '42px', borderRadius: '10px', backgroundColor: '#eff6ff', color: '#1e3a8a', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                    <IconComp size={22} />
                  </div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>
                    {pillar.title}
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: 1.5 }}>
                    {pillar.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Call to Action */}
        <div className="card" style={{ textAlign: 'center', padding: '3rem 1.5rem', backgroundColor: '#f8fafc' }}>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f2942', marginBottom: '0.5rem' }}>
            Ready to Access Government Services?
          </h2>
          <p style={{ color: '#64748b', fontSize: '1rem', marginBottom: '1.5rem', maxWidth: '600px', margin: '0 auto 1.5rem auto' }}>
            Discover services, apply online, or track your application status from your unified citizen account.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button className="btn btn-primary" onClick={() => setActivePage('services')}>
              Browse Services Directory
            </button>
            <button className="btn btn-secondary" onClick={() => setActivePage('applications')}>
              Track Application Status
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
