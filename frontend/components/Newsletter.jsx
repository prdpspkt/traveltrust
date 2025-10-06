'use client';

import { useState } from 'react';
import { subscribeNewsletter } from '@/lib/api';
import { FaEnvelope } from 'react-icons/fa';

export default function Newsletter() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const response = await subscribeNewsletter(email, name);
      if (response.status === 'success') {
        setSuccess(true);
        setName('');
        setEmail('');
        setTimeout(() => setSuccess(false), 5000);
      } else {
        setError(response.message || 'Failed to subscribe');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section-padding bg-gradient-to-r from-blue-600 to-blue-800 text-white">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 opacity-0 animate-fade-in-up" style={{ animationDelay: '0s', animationFillMode: 'forwards' }}>
            Subscribe to Our Newsletter
          </h2>
          <p className="text-xl text-blue-100 mb-8 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.05s', animationFillMode: 'forwards' }}>
            Get the latest flight deals, travel tips, and exclusive offers delivered to your inbox
          </p>

          {success && (
            <div className="mb-6 p-4 bg-green-500 text-white rounded-lg">
              Thank you for subscribing! Check your email for confirmation.
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-500 text-white rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-2xl mx-auto opacity-0 animate-fade-in-up" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name (optional)"
                  className="w-full px-4 py-4 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                />
              </div>
              <div className="flex-1 relative">
                <div className="absolute left-4 top-4 text-gray-400">
                  <FaEnvelope />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="w-full px-4 py-4 pl-12 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn-secondary md:self-center"
            >
              {loading ? 'Subscribing...' : 'Subscribe Now'}
            </button>
          </form>

          <p className="text-sm text-blue-200 mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
}
