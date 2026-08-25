import React from 'react';
import { CheckCircle, Clock, AlertTriangle, ShieldCheck, XCircle } from 'lucide-react';

export const StatusBadge = ({ status }) => {
  const s = (status || '').toLowerCase();

  if (s.includes('approved') || s.includes('connected') || s.includes('success')) {
    return (
      <span className="status-badge status-badge-approved">
        <CheckCircle size={14} />
        {status}
      </span>
    );
  }

  if (s.includes('verification') || s.includes('processing') || s.includes('pending')) {
    return (
      <span className="status-badge status-badge-processing">
        <Clock size={14} />
        {status}
      </span>
    );
  }

  if (s.includes('degraded') || s.includes('maintenance')) {
    return (
      <span className="status-badge status-badge-processing" style={{ backgroundColor: '#fff7ed', color: '#ea580c', borderColor: 'rgba(234,88,12,0.2)' }}>
        <AlertTriangle size={14} />
        {status}
      </span>
    );
  }

  if (s.includes('disconnected') || s.includes('rejected') || s.includes('failed')) {
    return (
      <span className="status-badge status-badge-disconnected">
        <XCircle size={14} />
        {status}
      </span>
    );
  }

  return (
    <span className="status-badge status-badge-verification">
      <ShieldCheck size={14} />
      {status || 'Submitted'}
    </span>
  );
};
