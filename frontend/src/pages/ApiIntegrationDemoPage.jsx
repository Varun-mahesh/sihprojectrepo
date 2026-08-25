import React, { useState, useEffect } from 'react';
import { Share2, RefreshCw, CheckCircle, AlertTriangle, Play, FileCode, Server, Database, Lock, ShieldCheck } from 'lucide-react';
import { StatusBadge } from '../components/StatusBadge';
import { api } from '../services/api';

export const ApiIntegrationDemoPage = () => {
  const [integrations, setIntegrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [testingAdapter, setTestingAdapter] = useState(null);
  const [testResult, setTestResult] = useState(null);

  useEffect(() => {
    loadIntegrations();
  }, []);

  const loadIntegrations = async () => {
    try {
      const res = await api.getIntegrations();
      setIntegrations(res.integrations || []);
    } catch (e) {
      console.error("Error fetching integrations", e);
    } finally {
      setLoading(false);
    }
  };

  const handleRunTest = async (adapterType, systemName) => {
    setTestingAdapter(adapterType);
    setTestResult(null);

    try {
      const res = await api.testIntegration(adapterType);
      setTestResult({
        systemName,
        adapterType,
        timestamp: new Date().toLocaleTimeString(),
        data: res.payload
      });
    } catch (err) {
      setTestResult({
        systemName,
        adapterType,
        error: true,
        data: { message: "Error executing API test call." }
      });
    } finally {
      setTestingAdapter(null);
    }
  };

  return (
    <div>
      <section className="page-header-banner">
        <div className="container">
          <div className="hero-badge" style={{ margin: '0 0 0.5rem 0' }}>
            <Share2 size={14} /> Concept Showcase
          </div>
          <h1 className="page-header-title">Government Platform Integration</h1>
          <p className="page-header-subtitle">
            Demonstrates how multiple independent government digital platforms (Election, Identity, Revenue, Welfare, Transport) connect to ONE unified citizen interface via modular backend API adapters.
          </p>
        </div>
      </section>

      <div className="container" style={{ padding: '2.5rem 1.5rem' }}>
        {/* Architecture Infographic Box */}
        <div className="card" style={{ backgroundColor: '#0f2942', color: '#ffffff', marginBottom: '2.5rem', padding: '2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#f59e0b', marginBottom: '0.25rem' }}>
              Interoperability Data Flow Standard
            </h3>
            <p style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>
              Standardized JSON REST contracts insulate the citizen interface from backend government schema changes.
            </p>
          </div>

          {/* Flow Steps Visual */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: '12px', padding: '1.25rem' }}>
            {[
              { label: "Citizen Interface", icon: "👤", desc: "React Single Portal" },
              { label: "Flask Gateway", icon: "⚡", desc: "Central REST Routes" },
              { label: "Integration Layer", icon: "⚙️", desc: "Adapter Service" },
              { label: "Department APIs", icon: "🏛️", desc: "Election, Revenue, RTO" }
            ].map((step, idx) => (
              <React.Fragment key={idx}>
                <div style={{ textStyle: 'center', flex: 1, minWidth: '130px', textAlign: 'center' }}>
                  <div style={{ fontSize: '1.75rem', marginBottom: '0.2rem' }}>{step.icon}</div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#ffffff' }}>{step.label}</div>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{step.desc}</div>
                </div>
                {idx < 3 && (
                  <div style={{ color: '#f59e0b', fontWeight: 900, fontSize: '1.2rem' }}>➜</div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Connected Government Systems Cards Grid */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f2942' }}>
              Connected Government Platforms ({integrations.length})
            </h2>
            <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
              Real-time synchronization and status monitoring across connected government endpoints.
            </p>
          </div>
          <button className="btn btn-secondary btn-sm" onClick={loadIntegrations}>
            <RefreshCw size={14} /> Refresh Platform Status
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
          {integrations.map((item) => (
            <div key={item.id} className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#1e3a8a', fontFamily: 'monospace' }}>
                    {item.integration_code}
                  </span>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f172a', marginTop: '0.1rem' }}>
                    {item.system_name}
                  </h3>
                  <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                    🏛️ {item.department}
                  </span>
                </div>
                <StatusBadge status={item.connection_status} />
              </div>

              <div style={{ backgroundColor: '#f8fafc', borderRadius: '8px', padding: '0.85rem', margin: '0.75rem 0', fontSize: '0.82rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', border: '1px solid #f1f5f9' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748b' }}>API Response:</span>
                  <span style={{ fontWeight: 700, color: '#059669' }}>{item.api_status}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748b' }}>Average Latency:</span>
                  <span style={{ fontWeight: 600, color: '#0f172a', fontFamily: 'monospace' }}>{item.avg_latency_ms} ms</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748b' }}>Data Source:</span>
                  <span style={{ fontWeight: 600, color: '#0f172a' }}>{item.data_source}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748b' }}>Endpoint URL:</span>
                  <span style={{ fontWeight: 500, color: '#2563eb', fontSize: '0.75rem', fontFamily: 'monospace' }}>{item.endpoint_url}</span>
                </div>
              </div>

              <div style={{ marginTop: 'auto', paddingTop: '0.75rem', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                  Last Sync: {item.last_sync ? new Date(item.last_sync).toLocaleTimeString() : 'Active'}
                </span>

                <button
                  className="btn btn-primary btn-sm"
                  disabled={testingAdapter === item.adapter_type}
                  onClick={() => handleRunTest(item.adapter_type, item.system_name)}
                >
                  {testingAdapter === item.adapter_type ? (
                    <RefreshCw size={13} className="animate-spin" />
                  ) : (
                    <Play size={13} />
                  )} Test API Call
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Live Test Results JSON Inspector */}
        {testResult && (
          <div className="card" style={{ backgroundColor: '#0f172a', color: '#38bdf8', border: '1px solid #1e293b' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid #334155', paddingBottom: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FileCode size={20} style={{ color: '#f59e0b' }} />
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff' }}>
                  Live API Test Payload Inspector ({testResult.systemName})
                </h3>
              </div>
              <span style={{ fontSize: '0.78rem', color: '#94a3b8', fontFamily: 'monospace' }}>
                Executed at {testResult.timestamp}
              </span>
            </div>

            <pre style={{ backgroundColor: '#020617', padding: '1.25rem', borderRadius: '8px', overflowX: 'auto', fontSize: '0.85rem', color: '#e2e8f0', fontFamily: 'monospace', lineHeight: 1.5 }}>
              {JSON.stringify(testResult.data, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};
