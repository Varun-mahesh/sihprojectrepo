import React, { useState } from 'react';
import { HelpCircle, Phone, Mail, FileText, CheckCircle, ChevronDown, Send, ShieldCheck } from 'lucide-react';

export const HelpPage = () => {
  const [openFaq, setOpenFaq] = useState(0);
  const [ticketForm, setTicketForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const faqs = [
    {
      q: "What is the Unified Government Citizen Service Portal?",
      a: "The Unified Portal is a single-window website that allows Indian citizens to discover, apply for, and track multiple government services across Election, Identity, Revenue, Welfare, and Transport departments using a single login."
    },
    {
      q: "Do I need separate logins for different government departments?",
      a: "No. Once you sign in with your verified citizen profile, you can apply for services from any participating central or state government department without creating separate accounts."
    },
    {
      q: "How do I track my submitted service application?",
      a: "You can track your application by entering your unique Application Reference ID (e.g., APP-2026-00125) on the 'Applications' page or directly from your Citizen Dashboard."
    },
    {
      q: "Where can I download my approved digital certificates?",
      a: "All approved certificates and official digital identity cards (such as EPIC Voter Cards, Income Certificates, Domicile Certificates) are stored in your 'Documents' vault."
    },
    {
      q: "Is there any fee for using this portal?",
      a: "Access to the portal and tracking applications is completely free. Official statutory government service fees (if applicable) are clearly stated on each service detail page."
    }
  ];

  const handleTicketSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div>
      <section className="page-header-banner">
        <div className="container">
          <h1 className="page-header-title">Help & Support Desk</h1>
          <p className="page-header-subtitle">
            Find answers to frequently asked questions, learn how to apply and track applications, or contact our citizen helpline.
          </p>
        </div>
      </section>

      <div className="container" style={{ padding: '2.5rem 1.5rem' }}>
        {/* Support Channels Banner */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
          <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '10px', backgroundColor: '#eff6ff', color: '#1e3a8a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Phone size={24} />
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>Toll-Free Citizen Helpline</div>
              <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f2942' }}>1800-11-2026</div>
              <div style={{ fontSize: '0.75rem', color: '#059669' }}>Mon - Sat (09:00 AM - 06:00 PM)</div>
            </div>
          </div>

          <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '10px', backgroundColor: '#fff7ed', color: '#ea580c', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Mail size={24} />
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>Email Support</div>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: '#0f2942' }}>helpdesk@citizen.gov.in</div>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Response within 24 hours</div>
            </div>
          </div>

          <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '10px', backgroundColor: '#ecfdf5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShieldCheck size={24} />
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>Citizen Guidance</div>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: '#0f2942' }}>Step-by-Step Guides</div>
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>Check service eligibility</div>
            </div>
          </div>
        </div>

        {/* FAQs & Contact Form Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
          {/* FAQ Accordion */}
          <div>
            <div className="card">
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f2942', marginBottom: '1.25rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.75rem' }}>
                Frequently Asked Questions
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {faqs.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div
                      key={idx}
                      style={{ border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden' }}
                    >
                      <button
                        onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                        style={{
                          width: '100%',
                          padding: '1rem 1.25rem',
                          textAlign: 'left',
                          backgroundColor: isOpen ? '#eff6ff' : '#ffffff',
                          border: 'none',
                          cursor: 'pointer',
                          fontWeight: 700,
                          fontSize: '0.95rem',
                          color: '#0f172a',
                          display: 'flex',
                          justify: 'space-between',
                          alignItems: 'center'
                        }}
                      >
                        <span>{faq.q}</span>
                        <ChevronDown size={18} style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease' }} />
                      </button>

                      {isOpen && (
                        <div style={{ padding: '1rem 1.25rem', backgroundColor: '#ffffff', fontSize: '0.9rem', color: '#475569', lineHeight: 1.6, borderTop: '1px solid #e2e8f0' }}>
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Submit Support Query Form */}
          <div>
            <div className="card">
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f2942', marginBottom: '1rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.5rem' }}>
                Submit Support Query
              </h3>

              {submitted ? (
                <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
                  <CheckCircle size={40} style={{ color: '#059669', margin: '0 auto 0.75rem auto' }} />
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>Query Submitted</h4>
                  <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.25rem' }}>
                    Reference Ticket ID: <strong>TICK-2026-901</strong>. Our support team will contact you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleTicketSubmit}>
                  <div className="form-group">
                    <label className="form-label">Your Name</label>
                    <input
                      type="text"
                      className="form-input"
                      required
                      placeholder="Full Name"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Email Address</label>
                    <input
                      type="email"
                      className="form-input"
                      required
                      placeholder="name@domain.com"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Subject</label>
                    <input
                      type="text"
                      className="form-input"
                      required
                      placeholder="Application status enquiry"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Message Details</label>
                    <textarea
                      className="form-input"
                      rows={3}
                      required
                      placeholder="Describe your issue or question..."
                    />
                  </div>

                  <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                    Send Support Message <Send size={15} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
