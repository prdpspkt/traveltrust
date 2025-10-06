'use client';

import { useEffect, useState } from 'react';
import { getDestinations } from '@/lib/api';
import { FaMapMarkerAlt, FaStar, FaSearch } from 'react-icons/fa';
import Link from 'next/link';

export default function DestinationsPage() {
  const [destinations, setDestinations] = useState([]);
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  useEffect(() => {
    fetchDestinations();
  }, []);

  useEffect(() => {
    filterDestinations();
  }, [searchQuery, selectedFilter, destinations]);

  const fetchDestinations = async () => {
    try {
      const response = await getDestinations('active');
      if (response.status === 'success') {
        setDestinations(response.data);
        setFilteredDestinations(response.data);
      }
    } catch (error) {
      console.error('Error fetching destinations:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterDestinations = () => {
    let filtered = [...destinations];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (dest) =>
          dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          dest.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (dest.description && dest.description.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Featured filter
    if (selectedFilter === 'featured') {
      filtered = filtered.filter((dest) => dest.is_featured === 1);
    }

    setFilteredDestinations(filtered);
  };

  const uniqueCountries = Array.from(new Set(destinations.map((d) => d.country))).sort();

  if (loading) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: 'var(--isabelline)' }}>
        <div className="container-custom py-12">
          <div className="animate-pulse space-y-8">
            <div className="h-12 bg-gray-300 rounded w-1/3"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="h-64 bg-gray-300"></div>
                  <div className="p-6 space-y-3">
                    <div className="h-6 bg-gray-300 rounded"></div>
                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--isabelline)' }}>
      {/* Header */}
      <div className="py-12 sm:py-16" style={{ background: 'linear-gradient(135deg, var(--marian-blue) 0%, var(--lapis-lazuli) 100%)' }}>
        <div className="container-custom">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Explore All Destinations
          </h1>
          <p className="text-lg sm:text-xl text-blue-100 max-w-3xl">
            Discover amazing destinations worldwide with the best flight deals
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="container-custom py-8">
        <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search destinations or countries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Filter */}
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setSelectedFilter('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedFilter === 'all'
                    ? 'text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                style={selectedFilter === 'all' ? { backgroundColor: 'var(--lapis-lazuli)' } : {}}
              >
                All
              </button>
              <button
                onClick={() => setSelectedFilter('featured')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedFilter === 'featured'
                    ? 'text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                style={selectedFilter === 'featured' ? { backgroundColor: 'var(--burnt-sienna)' } : {}}
              >
                <FaStar className="inline mr-1" /> Featured
              </button>
            </div>
          </div>

          {/* Results count */}
          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredDestinations.length} of {destinations.length} destinations
          </div>
        </div>

        {/* Destinations Grid */}
        {filteredDestinations.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDestinations.map((destination, index) => (
              <div
                key={destination.id}
                className="bg-white rounded-xl shadow-md overflow-hidden group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="relative h-48 sm:h-56 overflow-hidden">
                  <img
                    src={destination.image_url || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&h=400&fit=crop'}
                    alt={destination.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {destination.is_featured === 1 && (
                    <div className="absolute top-3 right-3 px-3 py-1 rounded-full flex items-center gap-1 text-xs font-semibold text-white" style={{ backgroundColor: 'var(--burnt-sienna)' }}>
                      <FaStar /> Featured
                    </div>
                  )}
                </div>

                <div className="p-4 sm:p-5">
                  <h3 className="text-lg sm:text-xl font-bold mb-2 flex items-center gap-2" style={{ color: 'var(--text-dark)' }}>
                    <span className="small text-gray-600">{destination.icon}</span>
                    {destination.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-3">
                    <FaMapMarkerAlt className="inline mr-1" style={{ color: 'var(--lapis-lazuli)' }} />
                    {destination.country}
                  </p>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                    {destination.description || 'Discover amazing experiences in this destination'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold mb-2" style={{ color: 'var(--marian-blue)' }}>
              No destinations found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="py-16" style={{ background: 'linear-gradient(135deg, var(--marian-blue) 0%, var(--lapis-lazuli) 100%)' }}>
        <div className="container-custom text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Can't find your destination?
          </h2>
          <p className="text-lg sm:text-xl text-blue-100 mb-8">
            Contact us and we'll help you find the best flight deals
          </p>
          <Link
            href="/#contact"
            className="inline-block font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg text-white"
            style={{ backgroundColor: 'var(--burnt-sienna)' }}
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
