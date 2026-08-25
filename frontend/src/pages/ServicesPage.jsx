import React, { useState, useEffect } from 'react';
import { Search, Filter, Layers, CheckCircle } from 'lucide-react';
import { ServiceCard } from '../components/ServiceCard';
import { api } from '../services/api';

export const ServicesPage = ({ setActivePage, setSelectedService, onApplyDirect }) => {
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if hash has category or search query
    const hash = window.location.hash;
    if (hash.startsWith('#category-')) {
      const cat = decodeURIComponent(hash.replace('#category-', ''));
      setSelectedCategory(cat);
    } else if (hash.startsWith('#search-')) {
      const q = decodeURIComponent(hash.replace('#search-', ''));
      setSearchQuery(q);
    }

    loadServicesData();
  }, []);

  const loadServicesData = async () => {
    try {
      const [servsRes, catsRes] = await Promise.all([
        api.getServices(),
        api.getCategories()
      ]);

      setServices(servsRes.services || []);
      setCategories(catsRes.categories || []);
    } catch (e) {
      console.error("Error loading services page data", e);
    } finally {
      setLoading(false);
    }
  };

  const filteredServices = services.filter((s) => {
    const matchesCat = selectedCategory === 'All' || s.category.toLowerCase() === selectedCategory.toLowerCase();
    const q = searchQuery.toLowerCase().trim();
    const matchesQuery = !q || s.title.toLowerCase().includes(q) || s.department.toLowerCase().includes(q) || s.short_desc.toLowerCase().includes(q);
    return matchesCat && matchesQuery;
  });

  return (
    <div>
      <section className="page-header-banner">
        <div className="container">
          <h1 className="page-header-title">Government Services Directory</h1>
          <p className="page-header-subtitle">
            Unified searchable portal directory covering 8+ core government service categories integrated with central & state digital APIs.
          </p>
        </div>
      </section>

      <div className="container" style={{ padding: '2.5rem 1.5rem' }}>
        {/* Search & Filter Bar */}
        <div className="card" style={{ marginBottom: '2rem', padding: '1.25rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem', alignItems: 'center' }}>
            <div style={{ position: 'relative' }}>
              <Search size={20} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
              <input
                type="text"
                className="form-input"
                style={{ paddingLeft: '2.5rem' }}
                placeholder="Search services by keyword, department, or requirement..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Filter size={18} style={{ color: '#1e3a8a' }} />
              <select
                className="form-input"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="All">All Categories ({services.length})</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', overflowX: 'auto', paddingBottom: '0.25rem' }}>
            <button
              onClick={() => setSelectedCategory('All')}
              style={{
                padding: '0.35rem 0.85rem',
                borderRadius: '99px',
                border: '1px solid #cbd5e1',
                backgroundColor: selectedCategory === 'All' ? '#1e3a8a' : '#ffffff',
                color: selectedCategory === 'All' ? '#ffffff' : '#475569',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              All Services ({services.length})
            </button>
            {categories.map((c) => {
              const isActive = selectedCategory.toLowerCase() === c.name.toLowerCase();
              return (
                <button
                  key={c.id}
                  onClick={() => setSelectedCategory(c.name)}
                  style={{
                    padding: '0.35rem 0.85rem',
                    borderRadius: '99px',
                    border: '1px solid #cbd5e1',
                    backgroundColor: isActive ? '#1e3a8a' : '#ffffff',
                    color: isActive ? '#ffffff' : '#475569',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {c.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Grid */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div style={{ fontSize: '0.95rem', color: '#475569', fontWeight: 600 }}>
            Showing <strong>{filteredServices.length}</strong> matching government services
          </div>
          {(searchQuery || selectedCategory !== 'All') && (
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
            >
              Reset Filters
            </button>
          )}
        </div>

        {filteredServices.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: '3.5rem 1.5rem' }}>
            <Layers size={48} style={{ color: '#cbd5e1', margin: '0 auto 1rem auto' }} />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0f2942', marginBottom: '0.5rem' }}>
              No Government Services Match Your Criteria
            </h3>
            <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              Try searching with different keywords or selecting "All Categories".
            </p>
            <button
              className="btn btn-primary"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
            >
              Show All Services
            </button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {filteredServices.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onSelectService={(s) => {
                  setSelectedService(s);
                  setActivePage('service-detail');
                }}
                onApplyDirect={(s) => onApplyDirect(s)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
