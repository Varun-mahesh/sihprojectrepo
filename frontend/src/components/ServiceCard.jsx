import React from 'react';
import { Vote, ShieldCheck, Award, HeartHandshake, GraduationCap, Briefcase, Activity, Car, ArrowRight, Clock } from 'lucide-react';

const iconMap = {
  Vote: Vote,
  ShieldCheck: ShieldCheck,
  Award: Award,
  HeartHandshake: HeartHandshake,
  GraduationCap: GraduationCap,
  Briefcase: Briefcase,
  Activity: Activity,
  Car: Car
};

export const ServiceCard = ({ service, onSelectService, onApplyDirect }) => {
  const IconComponent = iconMap[service.icon_name] || Award;

  return (
    <div className="card card-interactive" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <div
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '10px',
            backgroundColor: '#eff6ff',
            color: '#1d4ed8',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <IconComponent size={24} />
        </div>
        <span
          style={{
            fontSize: '0.75rem',
            fontWeight: 600,
            color: '#0f2942',
            backgroundColor: '#f1f5f9',
            padding: '0.2rem 0.6rem',
            borderRadius: '4px',
            border: '1px solid #e2e8f0'
          }}
        >
          {service.category}
        </span>
      </div>

      <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.35rem', lineHeight: 1.3 }}>
        {service.title}
      </h3>

      <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600, marginBottom: '0.75rem' }}>
        🏛️ {service.department}
      </div>

      <p style={{ fontSize: '0.88rem', color: '#475569', marginBottom: '1.25rem', flex: 1, lineHeight: 1.5 }}>
        {service.short_desc}
      </p>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.75rem', borderTop: '1px solid #f1f5f9', marginTop: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.78rem', color: '#64748b' }}>
          <Clock size={13} />
          <span>{service.processing_time}</span>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => onSelectService(service)}
          >
            Details
          </button>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => onApplyDirect(service)}
          >
            Access Service <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
