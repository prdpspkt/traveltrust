'use client';

import { useEffect, useState } from 'react';
import { getDestinations } from '@/lib/api';
import { FaMapMarkerAlt, FaStar } from 'react-icons/fa';
import Link from 'next/link';

export default function Destinations() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = async () => {
    try {
      const response = await getDestinations('active', true);
      if (response.status === 'success') {
        setDestinations(response.data.slice(0, 6)); // Show top 6 destinations
      }
    } catch (error) {
      console.error('Error fetching destinations:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section id="destinations" className="section-padding bg-light">
        <div className="container-custom">
          <h2 className="section-title">Popular Destinations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="card animate-pulse">
                <div className="h-48 bg-gray-300"></div>
                <div className="p-6 space-y-3">
                  <div className="h-6 bg-gray-300 rounded"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="destinations" className="section-padding w-full" style={{ backgroundColor: '#ffffff' }}>
      <div className="container-custom">
        <h2 className="section-title opacity-0 animate-fade-in-up" style={{ color: 'var(--marian-blue)', animationDelay: '0s', animationFillMode: 'forwards' }}>Popular Destinations</h2>
        <p className="section-subtitle opacity-0 animate-fade-in-up" style={{ color: 'var(--text-dark)', animationDelay: '0.05s', animationFillMode: 'forwards' }}>
          Explore our handpicked destinations with the best flight deals
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {destinations.map((destination, index) => (
            <div
              key={destination.id}
              className="card group opacity-0 animate-slide-up-scale"
              style={{ animationDelay: `${0.1 + index * 0.1}s`, animationFillMode: 'forwards' }}
            >
              <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                <img
                  src={destination.image_url || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&h=400&fit=crop'}
                  alt={destination.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {destination.is_featured === 1 && (
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4 px-2 sm:px-3 py-1 rounded-full flex items-center gap-1 text-xs sm:text-sm font-semibold text-white" style={{ backgroundColor: 'var(--burnt-sienna)' }}>
                    <FaStar /> <span className="hidden sm:inline">Featured</span>
                  </div>
                )}
              </div>

              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 flex items-center gap-2" style={{ color: 'var(--text-dark)' }}>
                  <span className="text-2xl"><small className="text-gray-400">{destination.icon}</small></span>
                  {destination.name}
                </h3>
                <p className="text-sm text-blue-900 mb-2">
                  <FaMapMarkerAlt className="inline mr-1" style={{ color: 'var(--lapis-lazuli)' }} />
                  {destination.country}
                </p>
                <p className="text-sm sm:text-base text-gray-600 mb-4 line-clamp-2">
                  {destination.description || 'Discover amazing experiences in this destination'}
                </p>
              </div>
            </div>
          ))}
        </div>

        {destinations.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No destinations available at the moment.</p>
          </div>
        )}

        {destinations.length > 0 && (
          <div className="text-center mt-8 sm:mt-12">
            <Link
              href="/destinations"
              className="inline-block font-semibold py-3 px-8 text-sm sm:text-base rounded-full transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg text-white"
              style={{ backgroundColor: 'var(--burnt-sienna)' }}
            >
              View All Destinations
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
