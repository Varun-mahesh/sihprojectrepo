import React, { useState, useEffect } from 'react';
import { Bell, CheckCircle, Info, AlertTriangle, Check, RefreshCw } from 'lucide-react';
import { api } from '../services/api';

export const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      const res = await api.getNotifications();
      setNotifications(res.notifications || []);
    } catch (e) {
      console.error("Error fetching notifications", e);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkRead = async (id) => {
    try {
      await api.markNotificationRead(id);
      loadNotifications();
    } catch (e) {
      console.error("Failed to mark notification read", e);
    }
  };

  return (
    <div>
      <section className="page-header-banner">
        <div className="container">
          <h1 className="page-header-title">Service Alerts & Notifications</h1>
          <p className="page-header-subtitle">
            Stay updated with real-time status notifications for your submitted service applications and new public schemes.
          </p>
        </div>
      </section>

      <div className="container" style={{ padding: '2.5rem 1.5rem' }}>
        <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.75rem' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f2942', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Bell size={18} style={{ color: '#ea580c' }} />
              Citizen Alert Inbox ({notifications.length})
            </h3>
            <button className="btn btn-secondary btn-sm" onClick={loadNotifications}>
              <RefreshCw size={13} /> Refresh Alerts
            </button>
          </div>

          {notifications.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem 0', color: '#64748b' }}>
              <Bell size={36} style={{ color: '#cbd5e1', margin: '0 auto 0.75rem auto' }} />
              <p>You have no unread notifications.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {notifications.map((n) => (
                <div
                  key={n.id}
                  style={{
                    border: '1px solid #e2e8f0',
                    borderLeft: `4px solid ${n.notification_type === 'success' ? '#059669' : '#2563eb'}`,
                    borderRadius: '8px',
                    padding: '1rem 1.25rem',
                    backgroundColor: n.is_read ? '#f8fafc' : '#ffffff',
                    display: 'flex',
                    justify: 'space-between',
                    alignItems: 'flex-start',
                    gap: '1rem'
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                      <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a' }}>
                        {n.title}
                      </h4>
                      {!n.is_read && (
                        <span style={{ backgroundColor: '#eff6ff', color: '#2563eb', fontSize: '0.72rem', padding: '0.15rem 0.45rem', borderRadius: '99px', fontWeight: 700 }}>
                          NEW
                        </span>
                      )}
                    </div>
                    <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: 1.5, marginBottom: '0.5rem' }}>
                      {n.message}
                    </p>
                    <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                      {n.created_at ? new Date(n.created_at).toLocaleString() : 'Recent'}
                    </span>
                  </div>

                  {!n.is_read && (
                    <button
                      className="btn btn-secondary btn-sm"
                      style={{ fontSize: '0.78rem' }}
                      onClick={() => handleMarkRead(n.id)}
                    >
                      <Check size={13} /> Mark Read
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
