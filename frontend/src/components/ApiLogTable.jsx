import React, { useState } from 'react';
import { Activity, Clock, FileCode, CheckCircle, AlertTriangle } from 'lucide-react';

export const ApiLogTable = ({ logs = [] }) => {
  const [selectedLog, setSelectedLog] = useState(null);

  return (
    <div>
      <div className="data-table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Method</th>
              <th>Endpoint / Gateway</th>
              <th>Status Code</th>
              <th>Latency (ms)</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {logs.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>
                  No API transaction logs recorded yet.
                </td>
              </tr>
            ) : (
              logs.map((log) => (
                <tr key={log.id}>
                  <td style={{ fontSize: '0.8rem', color: '#64748b' }}>
                    {log.timestamp ? new Date(log.timestamp).toLocaleTimeString() : 'Recent'}
                  </td>
                  <td>
                    <span
                      style={{
                        padding: '0.15rem 0.45rem',
                        borderRadius: '4px',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        backgroundColor: log.method === 'POST' ? '#eff6ff' : '#f1f5f9',
                        color: log.method === 'POST' ? '#1d4ed8' : '#0f172a'
                      }}
                    >
                      {log.method}
                    </span>
                  </td>
                  <td style={{ fontFamily: 'monospace', fontSize: '0.82rem', fontWeight: 600, color: '#0f2942' }}>
                    {log.endpoint}
                  </td>
                  <td>
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        color: log.status_code < 400 ? '#059669' : '#dc2626',
                        fontWeight: 700,
                        fontSize: '0.82rem'
                      }}
                    >
                      {log.status_code < 400 ? <CheckCircle size={13} /> : <AlertTriangle size={13} />}
                      {log.status_code}
                    </span>
                  </td>
                  <td style={{ fontSize: '0.82rem', color: '#475569' }}>
                    {log.latency_ms} ms
                  </td>
                  <td>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => setSelectedLog(selectedLog?.id === log.id ? null : log)}
                      style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem' }}
                    >
                      <FileCode size={13} /> Inspect JSON
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {selectedLog && (
        <div
          style={{
            marginTop: '1rem',
            backgroundColor: '#0f172a',
            color: '#38bdf8',
            borderRadius: '8px',
            padding: '1rem',
            fontFamily: 'monospace',
            fontSize: '0.82rem',
            boxShadow: 'var(--shadow-md)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8', marginBottom: '0.5rem', borderBottom: '1px solid #334155', paddingBottom: '0.4rem' }}>
            <span>REST Payload Inspector (ID: #{selectedLog.id})</span>
            <button
              onClick={() => setSelectedLog(null)}
              style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
            >
              ✕ Close
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <div style={{ color: '#f59e0b', marginBottom: '0.25rem', fontWeight: 700 }}>Request Body:</div>
              <pre style={{ whiteSpace: 'pre-wrap', color: '#e2e8f0' }}>
                {typeof selectedLog.request_payload === 'object'
                  ? JSON.stringify(selectedLog.request_payload, null, 2)
                  : selectedLog.request_payload || '{}'}
              </pre>
            </div>
            <div>
              <div style={{ color: '#10b981', marginBottom: '0.25rem', fontWeight: 700 }}>Response Payload:</div>
              <pre style={{ whiteSpace: 'pre-wrap', color: '#e2e8f0' }}>
                {typeof selectedLog.response_payload === 'object'
                  ? JSON.stringify(selectedLog.response_payload, null, 2)
                  : selectedLog.response_payload || '{}'}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
