'use client';

import { useEffect, useState } from 'react';
import { getTestimonials } from '@/lib/api';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await getTestimonials('active', true);
      if (response.status === 'success') {
        setTestimonials(response.data.slice(0, 6));
      }
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <div
        key={index}
        style={{ color: index < rating ? 'var(--burnt-sienna)' : '#d1d5db' }}
      >
        <FaStar />
      </div>
    ));
  };

  if (loading) {
    return (
      <section id="testimonials" className="section-padding bg-white">
        <div className="container-custom">
          <h2 className="section-title">What Our Clients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="card animate-pulse">
                <div className="h-40 bg-gray-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="testimonials" className="section-padding w-full" style={{ background: 'linear-gradient(135deg, var(--isabelline) 0%, #e8e6e0 100%)' }}>
      <div className="container-custom">
        <h2 className="section-title opacity-0 animate-fade-in-up" style={{ color: 'var(--marian-blue)', animationDelay: '0s', animationFillMode: 'forwards' }}>What Our Clients Say</h2>
        <p className="section-subtitle opacity-0 animate-fade-in-up" style={{ color: 'var(--text-dark)', animationDelay: '0.05s', animationFillMode: 'forwards' }}>
          Real experiences from travelers who trusted us with their journey
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-xl shadow-lg p-4 sm:p-6 md:p-8 relative hover:shadow-2xl transition-all duration-300 opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${0.1 + index * 0.05}s`, animationFillMode: 'forwards' }}
            >
              <div className="text-2xl sm:text-3xl md:text-4xl absolute top-4 sm:top-6 right-4 sm:right-6 opacity-20" style={{ color: 'var(--lapis-lazuli)' }}>
                <FaQuoteLeft />
              </div>

              <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
                <img
                  src={testimonial.client_photo || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop'}
                  alt={testimonial.client_name}
                  className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover border-4"
                  style={{ borderColor: 'var(--isabelline)' }}
                />
                <div>
                  <h4 className="font-bold text-base sm:text-lg" style={{ color: 'var(--text-dark)' }}>
                    {testimonial.client_name}
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-500">{testimonial.client_position || testimonial.destination}</p>
                </div>
              </div>

              <div className="flex gap-1 mb-3 sm:mb-4">
                {renderStars(Number(testimonial.rating) || 5)}
              </div>

              <p className="text-sm sm:text-base text-gray-700 leading-relaxed italic">
                "{testimonial.testimonial_text}"
              </p>
            </div>
          ))}
        </div>

        {testimonials.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No testimonials available yet.</p>
          </div>
        )}
      </div>
    </section>
  );
}
