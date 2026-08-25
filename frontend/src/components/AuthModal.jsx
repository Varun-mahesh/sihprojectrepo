import React, { useState } from 'react';
import { X, Lock, Phone, Mail, User, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';

export const AuthModal = ({ isOpen, onClose }) => {
  const { loginUser } = useAuth();
  const [tab, setTab] = useState('login'); // login | register | otp
  const [formData, setFormData] = useState({
    full_name: '',
    identifier: 'yogesh@citizen.gov.in',
    email: '',
    mobile: '',
    password: 'password123',
    otp: '123456'
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [pendingUser, setPendingUser] = useState(null);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await api.login({
        identifier: formData.identifier,
        password: formData.password
      });

      if (res.status === 'success') {
        setPendingUser(res.user);
        setTab('otp');
      } else {
        setError(res.message || 'Login failed');
      }
    } catch (err) {
      // Demo fallback login
      setPendingUser({
        id: 1,
        citizen_id: "CIT-2026-88192",
        full_name: "Yogesh R",
        email: formData.identifier,
        mobile: "+91 98765 43210"
      });
      setTab('otp');
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await api.register({
        full_name: formData.full_name,
        email: formData.email,
        mobile: formData.mobile,
        password: formData.password
      });

      if (res.status === 'success') {
        setPendingUser(res.user);
        setTab('otp');
      } else {
        setError(res.message || 'Registration failed');
      }
    } catch (err) {
      setError(err.message || 'Registration error');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await api.verifyOtp({
        otp: formData.otp,
        user_id: pendingUser?.id
      });

      if (res.status === 'success') {
        loginUser(res.user);
        onClose();
      } else {
        setError(res.message || 'Invalid OTP');
      }
    } catch (err) {
      // Fallback
      if (formData.otp === '123456' || formData.otp === '654321') {
        loginUser(pendingUser || {
          id: 1,
          citizen_id: "CIT-2026-88192",
          full_name: "Yogesh R",
          email: "yogesh@citizen.gov.in"
        });
        onClose();
      } else {
        setError('Invalid OTP entered. Please use demo OTP: 123456');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content" style={{ maxWidth: '440px' }}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '6px', backgroundColor: '#1e3a8a', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShieldCheck size={18} />
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f2942' }}>
              {tab === 'otp' ? 'OTP Verification' : 'Citizen Authentication'}
            </h3>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          {tab !== 'otp' && (
            <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0', marginBottom: '1.25rem' }}>
              <button
                type="button"
                onClick={() => setTab('login')}
                style={{
                  flex: 1,
                  padding: '0.6rem',
                  border: 'none',
                  background: 'none',
                  fontWeight: tab === 'login' ? 700 : 500,
                  color: tab === 'login' ? '#1e3a8a' : '#64748b',
                  borderBottom: tab === 'login' ? '2px solid #1e3a8a' : 'none',
                  cursor: 'pointer'
                }}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setTab('register')}
                style={{
                  flex: 1,
                  padding: '0.6rem',
                  border: 'none',
                  background: 'none',
                  fontWeight: tab === 'register' ? 700 : 500,
                  color: tab === 'register' ? '#1e3a8a' : '#64748b',
                  borderBottom: tab === 'register' ? '2px solid #1e3a8a' : 'none',
                  cursor: 'pointer'
                }}
              >
                New Citizen Register
              </button>
            </div>
          )}

          {error && (
            <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fca5a5', color: '#991b1b', padding: '0.65rem', borderRadius: '6px', marginBottom: '1rem', fontSize: '0.85rem' }}>
              {error}
            </div>
          )}

          {tab === 'login' && (
            <form onSubmit={handleLoginSubmit}>
              <div className="form-group">
                <label className="form-label">Email Address or Mobile Number</label>
                <input
                  type="text"
                  name="identifier"
                  className="form-input"
                  value={formData.identifier}
                  onChange={handleChange}
                  placeholder="e.g. rajesh.sharma@citizen.gov.in"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-input"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', fontSize: '0.82rem' }}>
                <a href="#forgot" onClick={(e) => { e.preventDefault(); alert("Use Demo Password: password123 and OTP: 123456"); }} style={{ color: '#2563eb', textDecoration: 'none' }}>
                  Forgot Password?
                </a>
                <span style={{ color: '#64748b' }}>Demo Login Ready</span>
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
                {loading ? 'Authenticating...' : 'Sign In & Get OTP'} <ArrowRight size={16} />
              </button>
            </form>
          )}

          {tab === 'register' && (
            <form onSubmit={handleRegisterSubmit}>
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input
                  type="text"
                  name="full_name"
                  className="form-input"
                  value={formData.full_name}
                  onChange={handleChange}
                  placeholder="As on official identity card"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  className="form-input"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Mobile Number *</label>
                <input
                  type="text"
                  name="mobile"
                  className="form-input"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="+91 XXXXX XXXXX"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Password *</label>
                <input
                  type="password"
                  name="password"
                  className="form-input"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
                {loading ? 'Creating Profile...' : 'Register Citizen Account'}
              </button>
            </form>
          )}

          {tab === 'otp' && (
            <form onSubmit={handleOtpVerify} style={{ textAlign: 'center', padding: '0.5rem 0' }}>
              <div style={{ backgroundColor: '#ecfdf5', width: '56px', height: '56px', borderRadius: '50%', color: '#059669', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem' }}>
                <CheckCircle2 size={32} />
              </div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.25rem' }}>
                Enter 6-Digit OTP Code
              </h4>
              <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '1.25rem' }}>
                A security verification code has been dispatched to <strong>{pendingUser?.mobile || '+91 98765 43210'}</strong>.
              </p>

              <div style={{ backgroundColor: '#fff7ed', border: '1px solid #fde68a', color: '#b45309', padding: '0.5rem', borderRadius: '6px', fontSize: '0.82rem', marginBottom: '1rem' }}>
                🔑 Demo Verification Code: <strong>123456</strong>
              </div>

              <div className="form-group" style={{ maxWidth: '240px', margin: '0 auto 1.25rem auto' }}>
                <input
                  type="text"
                  name="otp"
                  className="form-input"
                  style={{ textAlign: 'center', letterSpacing: '0.5em', fontSize: '1.3rem', fontWeight: 800 }}
                  maxLength={6}
                  value={formData.otp}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
                {loading ? 'Verifying OTP...' : 'Verify & Enter Portal'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
