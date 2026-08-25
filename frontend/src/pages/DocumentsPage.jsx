import React, { useState } from 'react';
import { FolderCheck, FileText, Download, Eye, CheckCircle, ShieldCheck, Search, Filter } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const DocumentsPage = () => {
  const { user } = useAuth();
  const [selectedDoc, setSelectedDoc] = useState(null);

  // Mock Citizen Documents
  const documents = [
    {
      id: "DOC-2026-001",
      title: "Electoral Photo Identity Card (Voter ID)",
      category: "Election Services",
      issuer: "Election Commission of India",
      ref_number: "EPIC-NEW-882910",
      issued_date: "2026-08-24",
      status: "Issued & Digitally Signed",
      file_type: "PDF Document"
    },
    {
      id: "DOC-2026-002",
      title: "Annual Family Income Certificate",
      category: "Certificates",
      issuer: "Department of Revenue & e-District",
      ref_number: "CERT-INC-2026-90412",
      issued_date: "2026-07-15",
      status: "Issued & Digitally Signed",
      file_type: "PDF Document"
    },
    {
      id: "DOC-2026-003",
      title: "Permanent Resident / Domicile Certificate",
      category: "Certificates",
      issuer: "Sub-Divisional Magistrate (SDM Office)",
      ref_number: "DOM-DEL-2025-44120",
      issued_date: "2025-11-10",
      status: "Issued & Digitally Signed",
      file_type: "PDF Document"
    },
    {
      id: "DOC-2026-004",
      title: "National Health Card (ABHA ID)",
      category: "Health & Medical",
      issuer: "National Health Authority",
      ref_number: "ABHA-9921-4019-12",
      issued_date: "2026-01-05",
      status: "Active Digital Card",
      file_type: "e-Card"
    }
  ];

  return (
    <div>
      <section className="page-header-banner">
        <div className="container">
          <h1 className="page-header-title">My Digital Documents Vault</h1>
          <p className="page-header-subtitle">
            Access, view, and download officially issued government certificates and identity cards stored securely in your citizen account.
          </p>
        </div>
      </section>

      <div className="container" style={{ padding: '2.5rem 1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div style={{ fontSize: '1rem', fontWeight: 700, color: '#0f2942' }}>
            Stored Official Certificates ({documents.length})
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#059669', backgroundColor: '#ecfdf5', padding: '0.4rem 0.8rem', borderRadius: '6px', border: '1px solid rgba(5,150,105,0.2)' }}>
            <ShieldCheck size={16} /> DigiLocker Verified Repository
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
          {documents.map((doc) => (
            <div key={doc.id} className="card card-interactive" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '8px', backgroundColor: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FolderCheck size={22} />
                </div>
                <span className="status-badge status-badge-approved" style={{ fontSize: '0.75rem' }}>
                  <CheckCircle size={12} /> {doc.status}
                </span>
              </div>

              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.35rem' }}>
                {doc.title}
              </h3>
              <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600, marginBottom: '0.75rem' }}>
                🏛️ {doc.issuer}
              </span>

              <div style={{ backgroundColor: '#f8fafc', borderRadius: '6px', padding: '0.75rem', fontSize: '0.82rem', marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '0.35rem', border: '1px solid #f1f5f9' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748b' }}>Certificate Ref:</span>
                  <span style={{ fontWeight: 700, color: '#1e3a8a', fontFamily: 'monospace' }}>{doc.ref_number}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748b' }}>Issue Date:</span>
                  <span style={{ fontWeight: 600, color: '#0f172a' }}>{doc.issued_date}</span>
                </div>
              </div>

              <div style={{ marginTop: 'auto', paddingTop: '0.75rem', borderTop: '1px solid #f1f5f9', display: 'flex', gap: '0.5rem' }}>
                <button
                  className="btn btn-secondary btn-sm"
                  style={{ flex: 1 }}
                  onClick={() => setSelectedDoc(doc)}
                >
                  <Eye size={14} /> View Details
                </button>
                <button
                  className="btn btn-primary btn-sm"
                  style={{ flex: 1 }}
                  onClick={() => alert(`Downloading official PDF copy of ${doc.title} (Ref: ${doc.ref_number})`)}
                >
                  <Download size={14} /> Download PDF
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Selected Document Details Modal */}
        {selectedDoc && (
          <div className="modal-backdrop">
            <div className="modal-content" style={{ maxWidth: '500px' }}>
              <div className="modal-header">
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f2942' }}>
                  Document Details
                </h3>
                <button onClick={() => setSelectedDoc(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}>✕</button>
              </div>

              <div className="modal-body">
                <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                  <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: '#ecfdf5', color: '#059669', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.5rem' }}>
                    <ShieldCheck size={32} />
                  </div>
                  <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>{selectedDoc.title}</h4>
                  <span style={{ fontSize: '0.85rem', color: '#64748b' }}>{selectedDoc.issuer}</span>
                </div>

                <div style={{ backgroundColor: '#f8fafc', borderRadius: '8px', padding: '1rem', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.88rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#64748b' }}>Document Reference No:</span>
                    <span style={{ fontWeight: 700, color: '#1e3a8a', fontFamily: 'monospace' }}>{selectedDoc.ref_number}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#64748b' }}>Category:</span>
                    <span style={{ fontWeight: 600, color: '#0f172a' }}>{selectedDoc.category}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#64748b' }}>Issue Date:</span>
                    <span style={{ fontWeight: 600, color: '#0f172a' }}>{selectedDoc.issued_date}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#64748b' }}>Verification Status:</span>
                    <span style={{ fontWeight: 700, color: '#059669' }}>{selectedDoc.status}</span>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setSelectedDoc(null)}>Close</button>
                <button className="btn btn-primary" onClick={() => alert(`Downloading PDF copy of ${selectedDoc.title}`)}>
                  <Download size={15} /> Download PDF
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
