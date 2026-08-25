import React from 'react';
import { ShieldCheck, Phone, Mail, HelpCircle, FileText, Lock } from 'lucide-react';

export const Footer = ({ setActivePage }) => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-brand-title">🏛️ Unified Citizen Service Portal</div>
            <p className="footer-text">
              A single-window national digital platform designed to provide citizens with seamless access to multiple government services through one unified, secure interface.
            </p>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'rgba(255,255,255,0.08)', padding: '0.4rem 0.8rem', borderRadius: '6px', fontSize: '0.8rem', color: '#f59e0b' }}>
              <ShieldCheck size={15} /> Official Government Citizen Services Gateway
            </div>
          </div>

          <div>
            <div className="footer-heading">Citizen Services</div>
            <ul className="footer-links">
              <li><a href="#home" onClick={(e) => { e.preventDefault(); setActivePage('home'); }}>Home & Overview</a></li>
              <li><a href="#services" onClick={(e) => { e.preventDefault(); setActivePage('services'); }}>Government Services Directory</a></li>
              <li><a href="#applications" onClick={(e) => { e.preventDefault(); setActivePage('applications'); }}>Track Application Status</a></li>
              <li><a href="#dashboard" onClick={(e) => { e.preventDefault(); setActivePage('dashboard'); }}>Citizen Dashboard</a></li>
            </ul>
          </div>

          <div>
            <div className="footer-heading">Support & Information</div>
            <ul className="footer-links">
              <li><a href="#help" onClick={(e) => { e.preventDefault(); setActivePage('help'); }}>Help & FAQs</a></li>
              <li><a href="#about" onClick={(e) => { e.preventDefault(); setActivePage('about'); }}>About Unified Portal</a></li>
              <li><a href="#documents" onClick={(e) => { e.preventDefault(); setActivePage('documents'); }}>My Digital Documents</a></li>
              <li><a href="#notifications" onClick={(e) => { e.preventDefault(); setActivePage('notifications'); }}>Service Alerts & Updates</a></li>
            </ul>
          </div>

          <div>
            <div className="footer-heading">Citizen Support Helpline</div>
            <ul className="footer-links">
              <li style={{ color: '#cbd5e1', fontSize: '0.85rem' }}>Toll Free Helpline: 1800-11-2026</li>
              <li style={{ color: '#cbd5e1', fontSize: '0.85rem' }}>Email Support: helpdesk@citizen.gov.in</li>
              <li style={{ color: '#cbd5e1', fontSize: '0.85rem' }}>Hours: Mon - Sat (09:00 AM - 06:00 PM)</li>
              <li style={{ color: '#cbd5e1', fontSize: '0.85rem' }}>Central Secretariat, New Delhi</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div>
            © 2026 Unified Government Citizen Service Portal. All Rights Reserved.
          </div>
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <a href="#privacy" onClick={(e) => e.preventDefault()} style={{ color: '#94a3b8', textDecoration: 'none' }}>Privacy Policy</a>
            <a href="#terms" onClick={(e) => e.preventDefault()} style={{ color: '#94a3b8', textDecoration: 'none' }}>Terms of Service</a>
            <a
              href="#admin"
              onClick={(e) => { e.preventDefault(); setActivePage('admin'); }}
              style={{ color: '#64748b', textDecoration: 'none', fontSize: '0.78rem' }}
            >
              System Administration
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
