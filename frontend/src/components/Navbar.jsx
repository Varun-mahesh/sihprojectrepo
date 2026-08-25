import React from 'react';
import { Home, Layers, FileText, FolderCheck, Bell, HelpCircle, Info, User, LogOut, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Navbar = ({ activePage, setActivePage, onOpenAuth }) => {
  const { user, logoutUser, unreadNotifications } = useAuth();

  // Navigation when logged out
  const publicNavItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'services', label: 'Services', icon: Layers },
    { id: 'applications', label: 'Applications', icon: FileText },
    { id: 'help', label: 'Help', icon: HelpCircle },
    { id: 'about', label: 'About', icon: Info },
  ];

  // Navigation when logged in
  const authenticatedNavItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'services', label: 'Services', icon: Layers },
    { id: 'applications', label: 'My Applications', icon: FileText },
    { id: 'documents', label: 'Documents', icon: FolderCheck },
    { id: 'notifications', label: 'Notifications', icon: Bell, badge: unreadNotifications },
    { id: 'help', label: 'Help', icon: HelpCircle },
  ];

  const currentNavItems = user ? authenticatedNavItems : publicNavItems;

  return (
    <header className="navbar">
      {/* Top National Strip */}
      <div className="gov-top-strip" />

      {/* Official Government Subheader */}
      <div className="gov-subheader">
        <div className="container gov-subheader-flex">
          <div className="gov-emblem-tag">
            <Shield size={14} style={{ color: '#ff9933' }} />
            <span>Government of India • Unified Citizen Digital Portal</span>
          </div>
          <div className="gov-links-quick">
            <span style={{ color: '#e2e8f0' }}>Toll Free Helpline: 1800-11-2026</span>
            <span style={{ color: '#475569' }}>|</span>
            <a href="#accessibility" onClick={(e) => e.preventDefault()}>Accessibility Options</a>
            <a href="#lang" onClick={(e) => e.preventDefault()}>English / हिंदी</a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container">
        <div className="navbar-inner">
          {/* Logo & Portal Name */}
          <button
            className="brand-logo-area"
            onClick={() => setActivePage('home')}
            style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
          >
            <div className="brand-emblem-badge">
              🏛️
            </div>
            <div className="brand-titles">
              <span className="brand-title-main">Unified Citizen Service Portal</span>
              <span className="brand-subtitle-gov">One Portal. Multiple Government Services.</span>
            </div>
          </button>

          {/* Citizen Navigation Links */}
          <ul className="nav-links">
            {currentNavItems.map((item) => {
              const IconComp = item.icon;
              const isActive = activePage === item.id;
              return (
                <li key={item.id}>
                  <button
                    className={`nav-item-btn ${isActive ? 'active' : ''}`}
                    onClick={() => setActivePage(item.id)}
                    style={{ position: 'relative' }}
                  >
                    <IconComp size={16} />
                    {item.label}
                    {item.badge > 0 && (
                      <span
                        style={{
                          backgroundColor: '#dc2626',
                          color: '#ffffff',
                          fontSize: '0.68rem',
                          padding: '0.1rem 0.35rem',
                          borderRadius: '99px',
                          fontWeight: 800,
                          marginLeft: '0.2rem'
                        }}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* User Auth Controls */}
          <div className="nav-actions">
            {user ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <button
                  className="nav-item-btn"
                  onClick={() => setActivePage('dashboard')}
                  style={{
                    backgroundColor: activePage === 'dashboard' ? '#eff6ff' : '#f8fafc',
                    border: '1px solid #cbd5e1',
                    padding: '0.45rem 0.85rem',
                    borderRadius: '8px'
                  }}
                >
                  <User size={16} style={{ color: '#1e3a8a' }} />
                  <span style={{ fontWeight: 600, color: '#0f2942' }}>{user.full_name.split(' ')[0]}</span>
                </button>

                <button
                  className="btn btn-secondary btn-sm"
                  onClick={logoutUser}
                  title="Sign Out"
                >
                  <LogOut size={15} /> Sign Out
                </button>
              </div>
            ) : (
              <button className="btn btn-primary btn-sm" onClick={onOpenAuth}>
                <User size={15} /> Login / Register
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
