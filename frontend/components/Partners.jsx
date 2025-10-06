'use client';

import { useEffect, useState } from 'react';
import { getPartners } from '@/lib/api';

export default function Partners() {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    try {
      const response = await getPartners('active');
      if (response.status === 'success') {
        setPartners(response.data);
      }
    } catch (error) {
      console.error('Error fetching partners:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-12 sm:py-16" style={{ backgroundColor: 'var(--isabelline)' }}>
        <div className="container-custom">
          <div className="text-center mb-8">
            <div className="h-8 bg-gray-200 rounded w-48 mx-auto mb-4 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-64 mx-auto animate-pulse"></div>
          </div>
        </div>
      </section>
    );
  }

  if (partners.length === 0) {
    return null;
  }

  return (
    <section className="py-12 sm:py-16">
      <div className="container-custom">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="section-title opacity-0 animate-fade-in-up" style={{ color: 'var(--marian-blue)', animationDelay: '0.1s', animationFillMode: 'forwards' }}>
            Our Trusted Partners
          </h2>
          <p className="text-base sm:text-lg md:text-xl opacity-0 animate-fade-in-up" style={{ color: 'var(--lapis-lazuli)', animationDelay: '0.2s', animationFillMode: 'forwards' }}>
            Working together to bring you the best travel experiences
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 sm:gap-8 bg-transparent">
          {partners.map((partner, index) => (
            <div
              key={partner.id}
              className="flex items-center justify-center bg-transparent shadow-md hover:shadow-lg transition-shadow duration-300 opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${0.1 + index * 0.05}s`, animationFillMode: 'forwards' }}
            >
              {partner.website ? (
                <a
                  href={partner.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full h-full"
                  title={partner.name}
                >
                  <img
                    src={partner.logo_url}
                    alt={partner.name}
                    className="w-full h-45 object-contain grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </a>
              ) : (
                <img
                  src={partner.logo_url}
                  alt={partner.name}
                  className="w-full h-45 object-contain grayscale hover:grayscale-0 transition-all duration-300"
                  title={partner.name}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
