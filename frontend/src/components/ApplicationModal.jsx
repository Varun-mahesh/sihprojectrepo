import React, { useState } from 'react';
import { X, Send, CheckCircle, AlertCircle, ShieldCheck } from 'lucide-react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';

export const ApplicationModal = ({ service, isOpen, onClose, onSuccess }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    full_name: user?.full_name || 'Yogesh R',
    mobile: user?.mobile || '+91 98765 43210',
    aadhaar_no: user?.aadhaar_mock_id || 'XXXX-XXXX-4910',
    address: user?.address || 'Civil Lines, New Delhi',
    state: user?.state || 'Delhi NCR',
    district: user?.district || 'New Delhi',
    pincode: user?.pincode || '110054',
    reason_remarks: 'Official application submitted via Unified Government Portal.'
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [submittedResult, setSubmittedResult] = useState(null);

  if (!isOpen || !service) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const payload = {
        service_id: service.id,
        user_id: user?.id || 1,
        form_data: formData
      };

      const res = await api.submitApplication(payload);
      if (res.status === 'success') {
        setSubmittedResult(res);
        if (onSuccess) onSuccess(res.application);
      } else {
        setError(res.message || 'Failed to submit application.');
      }
    } catch (err) {
      setError(err.message || 'Error connecting to government integration server.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content" style={{ maxWidth: '650px' }}>
        <div className="modal-header">
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#2563eb', textTransform: 'uppercase' }}>
              Integrated Government Gateway
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0f2942' }}>
              Application for: {service.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
          >
            <X size={22} />
          </button>
        </div>

        <div className="modal-body">
          {submittedResult ? (
            <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  backgroundColor: '#ecfdf5',
                  color: '#059669',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem'
                }}
              >
                <CheckCircle size={36} />
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
                Application Submitted Successfully!
              </h3>
              <p style={{ color: '#475569', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
                Your request has been dispatched via the <strong>Integration Adapter Layer</strong> directly to the <strong>{service.department}</strong> server.
              </p>

              <div
                style={{
                  backgroundColor: '#f8fafc',
                  border: '1px border #cbd5e1',
                  borderRadius: '10px',
                  padding: '1.25rem',
                  marginBottom: '1.5rem',
                  textAlign: 'left'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ color: '#64748b', fontSize: '0.85rem' }}>Application Reference ID:</span>
                  <span style={{ fontWeight: 800, color: '#1e3a8a', fontSize: '1rem' }}>
                    {submittedResult.application.application_id}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ color: '#64748b', fontSize: '0.85rem' }}>Target Gateway System:</span>
                  <span style={{ fontWeight: 600, color: '#0f172a', fontSize: '0.85rem' }}>
                    {submittedResult.integration_response?.system || service.department}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748b', fontSize: '0.85rem' }}>Department Ack Ref:</span>
                  <span style={{ fontWeight: 600, color: '#059669', fontSize: '0.85rem' }}>
                    {submittedResult.integration_response?.department_ack_id || 'ACK-DISPATCH-2026'}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
                <button
                  className="btn btn-secondary"
                  onClick={onClose}
                >
                  Close Window
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    onClose();
                    window.location.hash = `#track-${submittedResult.application.application_id}`;
                  }}
                >
                  Track Status Now
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {error && (
                <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fca5a5', color: '#991b1b', padding: '0.75rem', borderRadius: '6px', marginBottom: '1rem', fontSize: '0.88rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <AlertCircle size={18} />
                  <span>{error}</span>
                </div>
              )}

              <div style={{ backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '8px', padding: '0.75rem 1rem', marginBottom: '1.25rem', fontSize: '0.82rem', color: '#1e40af', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ShieldCheck size={18} />
                <span>Pre-filled from e-KYC DigiLocker Citizen Profile. Interoperability Layer handles payload transformation.</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Applicant Full Name *</label>
                  <input
                    type="text"
                    name="full_name"
                    className="form-input"
                    value={formData.full_name}
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
                    required
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Aadhaar Reference ID *</label>
                  <input
                    type="text"
                    name="aadhaar_no"
                    className="form-input"
                    value={formData.aadhaar_no}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">State Jurisdiction *</label>
                  <input
                    type="text"
                    name="state"
                    className="form-input"
                    value={formData.state}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Residential Address *</label>
                <input
                  type="text"
                  name="address"
                  className="form-input"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Remarks / Additional Info</label>
                <textarea
                  name="reason_remarks"
                  className="form-input"
                  rows={2}
                  value={formData.reason_remarks}
                  onChange={handleChange}
                />
              </div>

              <div className="modal-footer" style={{ margin: '1rem -1.5rem -1.5rem -1.5rem' }}>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={onClose}
                  disabled={submitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={submitting}
                >
                  {submitting ? 'Dispatching to API...' : 'Submit Application'} <Send size={15} />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
