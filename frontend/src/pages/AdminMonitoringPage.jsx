import React, { useState, useEffect } from 'react';
import { Activity, Server, Clock, CheckCircle, AlertTriangle, ShieldCheck, RefreshCw, Power } from 'lucide-react';
import { ApiLogTable } from '../components/ApiLogTable';
import { api } from '../services/api';

export const AdminMonitoringPage = () => {
  const [metrics, setMetrics] = useState(null);
  const [integrations, setIntegrations] = useState([]);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [togglingId, setTogglingId] = useState(null);

  useEffect(() => {
    loadAdminData();
  }, []);

  const loadAdminData = async () => {
    try {
      const [metRes, igRes, logRes] = await Promise.all([
        api.getAdminMetrics(),
        api.getIntegrations(),
        api.getApiLogs(25)
      ]);

      setMetrics(metRes.metrics || {});
      setIntegrations(igRes.integrations || []);
      setLogs(logRes.logs || []);
    } catch (e) {
      console.error("Error loading admin monitoring data", e);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (integrationId, currentStatus) => {
    const nextStatus = currentStatus === 'Connected' ? 'Disconnected' : 'Connected';
    setTogglingId(integrationId);

    try {
      await api.toggleIntegrationStatus(integrationId, nextStatus);
      await loadAdminData();
    } catch (e) {
      alert("Failed toggling integration status.");
    } finally {
      setTogglingId(null);
    }
  };

  return (
    <div>
      <section className="page-header-banner">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h1 className="page-header-title">System Admin & API Monitoring</h1>
              <p className="page-header-subtitle">
                Real-time API health diagnostics, response latency metrics, transaction logs, and platform connection controls.
              </p>
            </div>
            <button className="btn btn-secondary" onClick={loadAdminData}>
              <RefreshCw size={15} /> Refresh Diagnostics
            </button>
          </div>
        </div>
      </section>

      <div className="container" style={{ padding: '2.5rem 1.5rem' }}>
        {/* Top Health Metrics Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
          {[
            { label: "System Uptime", val: metrics?.system_uptime || "99.98%", color: "#059669", bg: "#ecfdf5", icon: Server },
            { label: "Active Gateways", val: metrics?.active_platforms || "5/5", color: "#2563eb", bg: "#eff6ff", icon: ShieldCheck },
            { label: "Successful Requests", val: metrics?.successful_requests || "1,412", color: "#059669", bg: "#ecfdf5", icon: CheckCircle },
            { label: "Failed Requests", val: metrics?.failed_requests || "8", color: "#dc2626", bg: "#fef2f2", icon: AlertTriangle },
            { label: "Average Response Time", val: `${metrics?.avg_response_time_ms || 115} ms`, color: "#7c3aed", bg: "#f5f3ff", icon: Clock },
            { label: "Applications Processed", val: metrics?.total_applications_processed || "840", color: "#ea580c", bg: "#fff7ed", icon: Activity },
          ].map((m, idx) => {
            const IconComp = m.icon;
            return (
              <div key={idx} className="card" style={{ padding: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: 600 }}>{m.label}</span>
                  <div style={{ width: '32px', height: '32px', borderRadius: '6px', backgroundColor: m.bg, color: m.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <IconComp size={16} />
                  </div>
                </div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: m.color }}>{m.val}</div>
              </div>
            );
          })}
        </div>

        {/* Integration Connection Toggle Controls */}
        <div className="card" style={{ marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.75rem' }}>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f2942' }}>
                Connected Platform Status Controls
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#64748b' }}>
                Simulate external government portal outages or maintenance states to test portal error handling resilience.
              </p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
            {integrations.map((ig) => (
              <div
                key={ig.id}
                style={{
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  padding: '1rem',
                  backgroundColor: '#f8fafc',
                  display: 'flex',
                  justify: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#0f172a' }}>{ig.system_name}</div>
                  <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Status: <strong style={{ color: ig.connection_status === 'Connected' ? '#059669' : '#dc2626' }}>{ig.connection_status}</strong></div>
                </div>

                <button
                  className={`btn ${ig.connection_status === 'Connected' ? 'btn-secondary' : 'btn-primary'} btn-sm`}
                  style={{
                    backgroundColor: ig.connection_status === 'Connected' ? '#ffffff' : '#059669',
                    color: ig.connection_status === 'Connected' ? '#dc2626' : '#ffffff',
                    borderColor: ig.connection_status === 'Connected' ? '#fca5a5' : '#059669'
                  }}
                  disabled={togglingId === ig.id}
                  onClick={() => handleToggleStatus(ig.id, ig.connection_status)}
                >
                  <Power size={13} /> {ig.connection_status === 'Connected' ? 'Disconnect' : 'Connect'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Live API Activity Logs Table */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f2942' }}>
                Recent System API Activity Logs
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#64748b' }}>
                Live record of all incoming REST transactions & outgoing external adapter dispatches.
              </p>
            </div>
            <button className="btn btn-secondary btn-sm" onClick={loadAdminData}>
              <RefreshCw size={13} /> Refresh Logs
            </button>
          </div>

          <ApiLogTable logs={logs} />
        </div>
      </div>
    </div>
  );
};
