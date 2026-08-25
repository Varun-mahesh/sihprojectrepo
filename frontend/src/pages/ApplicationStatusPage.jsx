import React, { useState, useEffect } from 'react';
import { Search, Clock, CheckCircle, FileText, Download, AlertCircle, ShieldCheck, Printer, RefreshCw } from 'lucide-react';
import { StatusBadge } from '../components/StatusBadge';
import { TimelineTracker } from '../components/TimelineTracker';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';

export const ApplicationStatusPage = ({ setActivePage }) => {
  const { user } = useAuth();
  const [searchId, setSearchId] = useState('APP-2026-00125');
  const [application, setApplication] = useState(null);
  const [myApplications, setMyApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if tracking ID passed via hash
    const hash = window.location.hash;
    if (hash.startsWith('#track-')) {
      const id = hash.replace('#track-', '').trim();
      setSearchId(id);
      fetchStatus(id);
    } else {
      fetchStatus('APP-2026-00125');
    }

    if (user) {
      api.getApplications(user.id).then(res => setMyApplications(res.applications || [])).catch(() => {});
    }
  }, [user]);

  const fetchStatus = async (idToTrack) => {
    if (!idToTrack) return;
    setLoading(true);
    setError('');

    try {
      const res = await api.trackApplication(idToTrack);
      if (res.status === 'success' && res.application) {
        setApplication(res.application);
      } else {
        setError(res.message || 'No application record found.');
        setApplication(null);
      }
    } catch (err) {
      setError(`No active application found matching ID "${idToTrack}". Please verify the application reference.`);
      setApplication(null);
    } finally {
      setLoading(false);
    }
  };

  const handleTrackSubmit = (e) => {
    e.preventDefault();
    fetchStatus(searchId.trim());
  };

  return (
    <div>
      <section className="page-header-banner">
        <div className="container">
          <h1 className="page-header-title">Application Status Tracking</h1>
          <p className="page-header-subtitle">
            Enter your unique Application Reference ID (APP-2026-XXXXX) to track live department verification progress.
          </p>
        </div>
      </section>

      <div className="container" style={{ padding: '2.5rem 1.5rem' }}>
        {/* Search Tracker Input */}
        <div className="card" style={{ marginBottom: '2rem', padding: '1.5rem' }}>
          <form onSubmit={handleTrackSubmit} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ flex: 1, minWidth: '280px', position: 'relative' }}>
              <Search size={20} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
              <input
                type="text"
                className="form-input"
                style={{ paddingLeft: '2.5rem', fontFamily: 'monospace', fontWeight: 700, fontSize: '1rem' }}
                placeholder="Enter Application ID (e.g. APP-2026-00125)..."
                value={searchId}
                onChange={(e) => setSearchId(e.target.value.toUpperCase())}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? <RefreshCw size={16} className="animate-spin" /> : <Search size={16} />} Search Application
            </button>

            {myApplications.length > 0 && (
              <select
                className="form-input"
                style={{ width: 'auto' }}
                onChange={(e) => {
                  if (e.target.value) {
                    setSearchId(e.target.value);
                    fetchStatus(e.target.value);
                  }
                }}
              >
                <option value="">-- Quick Select My Application --</option>
                {myApplications.map(a => (
                  <option key={a.id} value={a.application_id}>
                    {a.application_id} - {a.service_title}
                  </option>
                ))}
              </select>
            )}
          </form>
        </div>

        {error && (
          <div className="card" style={{ backgroundColor: '#fef2f2', borderColor: '#fca5a5', color: '#991b1b', padding: '1.5rem', textStyle: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <AlertCircle size={24} style={{ color: '#dc2626' }} />
              <div>
                <h4 style={{ fontWeight: 700, fontSize: '1.05rem' }}>Application Record Not Found</h4>
                <p style={{ fontSize: '0.9rem', color: '#7f1d1d' }}>{error}</p>
              </div>
            </div>
          </div>
        )}

        {application && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Summary Box */}
            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '1rem' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                    <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#1e3a8a', fontFamily: 'monospace' }}>
                      Application ID: {application.application_id}
                    </span>
                    <StatusBadge status={application.status} />
                  </div>
                  <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a' }}>
                    {application.service_title}
                  </h2>
                  <span style={{ fontSize: '0.88rem', color: '#64748b', fontWeight: 600 }}>
                    🏛️ Department: {application.department} ({application.service_category})
                  </span>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Submitted Date</div>
                  <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.95rem' }}>
                    {application.submitted_at ? new Date(application.submitted_at).toLocaleDateString() : '2026-08-24'}
                  </div>
                </div>
              </div>

              {/* Status Progress Timeline */}
              <div style={{ backgroundColor: '#f8fafc', borderRadius: '12px', padding: '1.5rem', border: '1px solid #e2e8f0', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f2942', marginBottom: '0.5rem' }}>
                  Stage Verification Timeline
                </h3>
                <TimelineTracker timeline={application.timeline} currentStatus={application.status} />
              </div>

              {/* Department Remarks */}
              <div style={{ backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '8px', padding: '1rem 1.25rem', marginBottom: '1.5rem' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#1e40af', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                  Department Remarks & Status Update
                </div>
                <div style={{ fontSize: '0.95rem', color: '#1e3a8a', fontWeight: 500 }}>
                  💬 {application.remarks}
                </div>
              </div>

              {/* Official Document Download Preview (If Approved) */}
              {application.status.toLowerCase() === 'approved' && (
                <div style={{ border: '2px dashed #059669', borderRadius: '12px', backgroundColor: '#ecfdf5', padding: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#059669', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <CheckCircle size={28} />
                      </div>
                      <div>
                        <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#065f46' }}>
                          Official Digitally Signed Document Available
                        </h4>
                        <p style={{ fontSize: '0.85rem', color: '#047857' }}>
                          Ref ID: <strong>{application.official_doc_ref || 'CERT-REV-2026-90412'}</strong> • Verified via e-District Repository
                        </p>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => window.print()}
                      >
                        <Printer size={14} /> Print Summary
                      </button>
                      <button
                        className="btn btn-primary btn-sm"
                        style={{ backgroundColor: '#059669' }}
                        onClick={() => alert(`Downloading official PDF e-Certificate (Ref: ${application.official_doc_ref || 'CERT-REV-2026-90412'})`)}
                      >
                        <Download size={14} /> Download Official e-Certificate
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
