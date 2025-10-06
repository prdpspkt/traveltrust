'use client';

import {FaPlane, FaGlobe, FaAward, FaUsers} from 'react-icons/fa';

export default function Stats() {
  return (
    <section className="py-12 sm:py-16" style={{ backgroundColor: 'var(--isabelline)' }}>
      <div className="container-custom">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12">
          <div className="text-center opacity-0 animate-fade-in-up" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
            <div className="text-4xl sm:text-5xl md:text-6xl mx-auto mb-3 sm:mb-4 flex justify-center" style={{ color: 'var(--burnt-sienna)' }}>
              <FaUsers />
            </div>
            <h3 className="text-3xl sm:text-4xl font-bold mb-2" style={{ color: 'var(--marian-blue)' }}>5000+</h3>
            <p className="text-lg sm:text-xl font-semibold" style={{ color: 'var(--lapis-lazuli)' }}>Happy Customers</p>
          </div>

          <div className="text-center opacity-0 animate-fade-in-up" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
            <div className="text-4xl sm:text-5xl md:text-6xl mx-auto mb-3 sm:mb-4 flex justify-center" style={{ color: 'var(--burnt-sienna)' }}>
              <FaGlobe />
            </div>
            <h3 className="text-3xl sm:text-4xl font-bold mb-2" style={{ color: 'var(--marian-blue)' }}>100+</h3>
            <p className="text-lg sm:text-xl font-semibold" style={{ color: 'var(--lapis-lazuli)' }}>Destinations</p>
          </div>

          <div className="text-center opacity-0 animate-fade-in-up" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
            <div className="text-4xl sm:text-5xl md:text-6xl mx-auto mb-3 sm:mb-4 flex justify-center" style={{ color: 'var(--burnt-sienna)' }}>
              <FaAward />
            </div>
            <h3 className="text-3xl sm:text-4xl font-bold mb-2" style={{ color: 'var(--marian-blue)' }}>Best</h3>
            <p className="text-lg sm:text-xl font-semibold" style={{ color: 'var(--lapis-lazuli)' }}>Prices Guaranteed</p>
          </div>
        </div>
      </div>
    </section>
  );
}
