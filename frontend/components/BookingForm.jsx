'use client';

import { useState, useEffect } from 'react';
import { FaTimes, FaPlane, FaCalendar, FaUser, FaPhone, FaEnvelope } from 'react-icons/fa';
import { createBooking } from '@/lib/api';

export default function BookingForm({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    fromAirport: '',
    toAirport: '',
    departureDate: '',
    arrivalDate: '',
    adults: 1,
    children: 0,
    message: '',
  });

  const [airports, setAirports] = useState([]);
  const [fromAirportSearch, setFromAirportSearch] = useState('');
  const [toAirportSearch, setToAirportSearch] = useState('');
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [searchLoading, setSearchLoading] = useState(false);

  useEffect(() => {
    // Load comprehensive airports list
    const comprehensiveAirports = [
      // Nepal
      { name: 'Tribhuvan International Airport', city: 'Kathmandu', country: 'Nepal', iata: 'KTM' },
      { name: 'Pokhara Airport', city: 'Pokhara', country: 'Nepal', iata: 'PKR' },
      { name: 'Gautam Buddha Airport', city: 'Bhairahawa', country: 'Nepal', iata: 'BWA' },
      // Japan
      { name: 'Narita International Airport', city: 'Tokyo', country: 'Japan', iata: 'NRT' },
      { name: 'Haneda Airport', city: 'Tokyo', country: 'Japan', iata: 'HND' },
      { name: 'Kansai International Airport', city: 'Osaka', country: 'Japan', iata: 'KIX' },
      { name: 'Chubu Centrair International Airport', city: 'Nagoya', country: 'Japan', iata: 'NGO' },
      { name: 'New Chitose Airport', city: 'Sapporo', country: 'Japan', iata: 'CTS' },
      { name: 'Fukuoka Airport', city: 'Fukuoka', country: 'Japan', iata: 'FUK' },
      // USA
      { name: 'John F. Kennedy International Airport', city: 'New York', country: 'USA', iata: 'JFK' },
      { name: 'Los Angeles International Airport', city: 'Los Angeles', country: 'USA', iata: 'LAX' },
      { name: 'O\'Hare International Airport', city: 'Chicago', country: 'USA', iata: 'ORD' },
      { name: 'Dallas/Fort Worth International Airport', city: 'Dallas', country: 'USA', iata: 'DFW' },
      { name: 'Denver International Airport', city: 'Denver', country: 'USA', iata: 'DEN' },
      { name: 'San Francisco International Airport', city: 'San Francisco', country: 'USA', iata: 'SFO' },
      { name: 'Seattle-Tacoma International Airport', city: 'Seattle', country: 'USA', iata: 'SEA' },
      { name: 'Miami International Airport', city: 'Miami', country: 'USA', iata: 'MIA' },
      { name: 'Newark Liberty International Airport', city: 'Newark', country: 'USA', iata: 'EWR' },
      { name: 'Boston Logan International Airport', city: 'Boston', country: 'USA', iata: 'BOS' },
      // UK
      { name: 'Heathrow Airport', city: 'London', country: 'UK', iata: 'LHR' },
      { name: 'Gatwick Airport', city: 'London', country: 'UK', iata: 'LGW' },
      { name: 'Manchester Airport', city: 'Manchester', country: 'UK', iata: 'MAN' },
      { name: 'Edinburgh Airport', city: 'Edinburgh', country: 'UK', iata: 'EDI' },
      // Australia
      { name: 'Sydney Airport', city: 'Sydney', country: 'Australia', iata: 'SYD' },
      { name: 'Melbourne Airport', city: 'Melbourne', country: 'Australia', iata: 'MEL' },
      { name: 'Brisbane Airport', city: 'Brisbane', country: 'Australia', iata: 'BNE' },
      { name: 'Perth Airport', city: 'Perth', country: 'Australia', iata: 'PER' },
      // UAE
      { name: 'Dubai International Airport', city: 'Dubai', country: 'UAE', iata: 'DXB' },
      { name: 'Abu Dhabi International Airport', city: 'Abu Dhabi', country: 'UAE', iata: 'AUH' },
      // Singapore
      { name: 'Singapore Changi Airport', city: 'Singapore', country: 'Singapore', iata: 'SIN' },
      // Hong Kong
      { name: 'Hong Kong International Airport', city: 'Hong Kong', country: 'Hong Kong', iata: 'HKG' },
      // South Korea
      { name: 'Incheon International Airport', city: 'Seoul', country: 'South Korea', iata: 'ICN' },
      { name: 'Gimpo International Airport', city: 'Seoul', country: 'South Korea', iata: 'GMP' },
      // Thailand
      { name: 'Bangkok Suvarnabhumi Airport', city: 'Bangkok', country: 'Thailand', iata: 'BKK' },
      { name: 'Don Mueang International Airport', city: 'Bangkok', country: 'Thailand', iata: 'DMK' },
      { name: 'Phuket International Airport', city: 'Phuket', country: 'Thailand', iata: 'HKT' },
      { name: 'Chiang Mai International Airport', city: 'Chiang Mai', country: 'Thailand', iata: 'CNX' },
      // Malaysia
      { name: 'Kuala Lumpur International Airport', city: 'Kuala Lumpur', country: 'Malaysia', iata: 'KUL' },
      { name: 'Penang International Airport', city: 'Penang', country: 'Malaysia', iata: 'PEN' },
      // India
      { name: 'Indira Gandhi International Airport', city: 'New Delhi', country: 'India', iata: 'DEL' },
      { name: 'Chhatrapati Shivaji International Airport', city: 'Mumbai', country: 'India', iata: 'BOM' },
      { name: 'Kempegowda International Airport', city: 'Bangalore', country: 'India', iata: 'BLR' },
      { name: 'Chennai International Airport', city: 'Chennai', country: 'India', iata: 'MAA' },
      // China
      { name: 'Beijing Capital International Airport', city: 'Beijing', country: 'China', iata: 'PEK' },
      { name: 'Shanghai Pudong International Airport', city: 'Shanghai', country: 'China', iata: 'PVG' },
      { name: 'Guangzhou Baiyun International Airport', city: 'Guangzhou', country: 'China', iata: 'CAN' },
      // Europe
      { name: 'Charles de Gaulle Airport', city: 'Paris', country: 'France', iata: 'CDG' },
      { name: 'Frankfurt Airport', city: 'Frankfurt', country: 'Germany', iata: 'FRA' },
      { name: 'Amsterdam Airport Schiphol', city: 'Amsterdam', country: 'Netherlands', iata: 'AMS' },
      { name: 'Madrid-Barajas Airport', city: 'Madrid', country: 'Spain', iata: 'MAD' },
      { name: 'Barcelona-El Prat Airport', city: 'Barcelona', country: 'Spain', iata: 'BCN' },
      { name: 'Leonardo da Vinci Airport', city: 'Rome', country: 'Italy', iata: 'FCO' },
      { name: 'Zurich Airport', city: 'Zurich', country: 'Switzerland', iata: 'ZRH' },
      { name: 'Vienna International Airport', city: 'Vienna', country: 'Austria', iata: 'VIE' },
      // Canada
      { name: 'Toronto Pearson International Airport', city: 'Toronto', country: 'Canada', iata: 'YYZ' },
      { name: 'Vancouver International Airport', city: 'Vancouver', country: 'Canada', iata: 'YVR' },
      { name: 'Montreal-Pierre Elliott Trudeau International Airport', city: 'Montreal', country: 'Canada', iata: 'YUL' },
    ];
    setAirports(comprehensiveAirports);
  }, []);

  const filterAirports = (search) => {
    if (!search) return airports;
    const searchLower = search.toLowerCase();
    return airports.filter(
      (airport) =>
        airport.name.toLowerCase().includes(searchLower) ||
        airport.city.toLowerCase().includes(searchLower) ||
        airport.iata.toLowerCase().includes(searchLower) ||
        airport.country.toLowerCase().includes(searchLower)
    );
  };

  const handleFromAirportSelect = (airport) => {
    setFromAirportSearch(`${airport.city} (${airport.iata}) - ${airport.name}`);
    setFormData({ ...formData, fromAirport: `${airport.city} (${airport.iata})` });
    setShowFromDropdown(false);
  };

  const handleToAirportSelect = (airport) => {
    setToAirportSearch(`${airport.city} (${airport.iata}) - ${airport.name}`);
    setFormData({ ...formData, toAirport: `${airport.city} (${airport.iata})` });
    setShowToDropdown(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const bookingData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        from_airport: formData.fromAirport,
        to_airport: formData.toAirport,
        departure_date: formData.departureDate,
        return_date: formData.arrivalDate || null,
        adults: formData.adults,
        children: formData.children,
        message: formData.message || null,
      };

      const response = await createBooking(bookingData);

      if (response.status === 'success') {
        setMessage({ type: 'success', text: 'Booking request submitted successfully! We will contact you soon.' });
        setTimeout(() => {
          onClose();
          setFormData({
            name: '',
            email: '',
            phone: '',
            fromAirport: '',
            toAirport: '',
            departureDate: '',
            arrivalDate: '',
            adults: 1,
            children: 0,
            message: '',
          });
          setFromAirportSearch('');
          setToAirportSearch('');
          setMessage({ type: '', text: '' });
        }, 2000);
      } else {
        setMessage({ type: 'error', text: response.message || 'Failed to submit booking request' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-2 sm:p-3">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[95vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center px-3 py-2 sm:px-4 sm:py-3 border-b" style={{ borderColor: 'var(--isabelline)' }}>
          <h2 className="text-base sm:text-lg font-bold" style={{ color: 'var(--marian-blue)' }}>Book Your Flight</h2>
          <button
            onClick={onClose}
            className="text-base sm:text-lg transition-colors hover:opacity-70"
            style={{ color: 'var(--marian-blue)' }}
          >
            <FaTimes />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-3 py-2 sm:px-4 sm:py-3 space-y-2 sm:space-y-3">
          {/* Message */}
          {message.text && (
            <div
              className={`p-4 rounded ${
                message.type === 'success'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
              }`}
            >
              {message.text}
            </div>
          )}

          {/* Personal Information */}
          <div>
            <h3 className="text-xs sm:text-sm font-semibold mb-1 sm:mb-2" style={{ color: 'var(--marian-blue)' }}>Personal Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1.5 sm:gap-2">
              <div>
                <label className="block text-xs font-medium mb-0.5" style={{ color: 'var(--lapis-lazuli)' }}>
                  <FaUser className="inline mr-1 text-xs" />
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-2 py-1 text-xs sm:text-sm border rounded focus:ring-1 focus:border-transparent text-black"
                  style={{ borderColor: '#d1d5db' }}
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-0.5" style={{ color: 'var(--lapis-lazuli)' }}>
                  <FaEnvelope className="inline mr-1 text-xs" />
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-2 py-1 text-xs sm:text-sm border rounded focus:ring-1 focus:border-transparent text-black"
                  style={{ borderColor: '#d1d5db' }}
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-0.5" style={{ color: 'var(--lapis-lazuli)' }}>
                  <FaPhone className="inline mr-1 text-xs" />
                  Phone *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-2 py-1 text-xs sm:text-sm border rounded focus:ring-1 focus:border-transparent text-black"
                  style={{ borderColor: '#d1d5db' }}
                  placeholder="+977 9800000000"
                />
              </div>
            </div>
          </div>

          {/* Flight Details */}
          <div>
            <h3 className="text-xs sm:text-sm font-semibold mb-1 sm:mb-2" style={{ color: 'var(--marian-blue)' }}>Flight Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5 sm:gap-2">
              {/* From Airport */}
              <div className="relative">
                <label className="block text-xs font-medium mb-0.5" style={{ color: 'var(--lapis-lazuli)' }}>
                  <FaPlane className="inline mr-1 text-xs" />
                  From Airport *
                </label>
                <input
                  type="text"
                  required
                  value={fromAirportSearch}
                  onChange={(e) => {
                    setFromAirportSearch(e.target.value);
                    setShowFromDropdown(true);
                  }}
                  onFocus={() => setShowFromDropdown(true)}
                  className="w-full px-2 py-1 text-xs sm:text-sm border rounded focus:ring-1 focus:border-transparent text-black"
                  style={{ borderColor: '#d1d5db' }}
                  placeholder="Search airport..."
                />
                {showFromDropdown && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg max-h-60 overflow-y-auto">
                    {filterAirports(fromAirportSearch).map((airport, index) => (
                      <div
                        key={index}
                        onClick={() => handleFromAirportSelect(airport)}
                        className="px-3 py-1.5 hover:bg-blue-50 cursor-pointer"
                      >
                        <div className="font-medium text-xs sm:text-sm">{airport.city} ({airport.iata})</div>
                        <div className="text-xs text-gray-600">{airport.name}, {airport.country}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* To Airport */}
              <div className="relative">
                <label className="block text-xs font-medium mb-0.5" style={{ color: 'var(--lapis-lazuli)' }}>
                  <FaPlane className="inline mr-1 text-xs transform rotate-90" />
                  To Airport *
                </label>
                <input
                  type="text"
                  required
                  value={toAirportSearch}
                  onChange={(e) => {
                    setToAirportSearch(e.target.value);
                    setShowToDropdown(true);
                  }}
                  onFocus={() => setShowToDropdown(true)}
                  className="w-full px-2 py-1 text-xs sm:text-sm border rounded focus:ring-1 focus:border-transparent text-black"
                  style={{ borderColor: '#d1d5db' }}
                  placeholder="Search airport..."
                />
                {showToDropdown && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg max-h-60 overflow-y-auto">
                    {filterAirports(toAirportSearch).map((airport, index) => (
                      <div
                        key={index}
                        onClick={() => handleToAirportSelect(airport)}
                        className="px-3 py-1.5 hover:bg-blue-50 cursor-pointer"
                      >
                        <div className="font-medium text-xs sm:text-sm">{airport.city} ({airport.iata})</div>
                        <div className="text-xs text-gray-600">{airport.name}, {airport.country}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Departure Date */}
              <div>
                <label className="block text-xs font-medium mb-0.5" style={{ color: 'var(--lapis-lazuli)' }}>
                  <FaCalendar className="inline mr-1 text-xs" />
                  Departure Date *
                </label>
                <input
                  type="date"
                  required
                  value={formData.departureDate}
                  onChange={(e) => setFormData({ ...formData, departureDate: e.target.value })}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-2 py-1 text-xs sm:text-sm border rounded focus:ring-1 focus:border-transparent text-black"
                  style={{ borderColor: '#d1d5db' }}
                />
              </div>

              {/* Return Date */}
              <div>
                <label className="block text-xs font-medium mb-0.5" style={{ color: 'var(--lapis-lazuli)' }}>
                  <FaCalendar className="inline mr-1 text-xs" />
                  Return Date (Optional)
                </label>
                <input
                  type="date"
                  value={formData.arrivalDate}
                  onChange={(e) => setFormData({ ...formData, arrivalDate: e.target.value })}
                  min={formData.departureDate || new Date().toISOString().split('T')[0]}
                  className="w-full px-2 py-1 text-xs sm:text-sm border rounded focus:ring-1 focus:border-transparent text-black"
                  style={{ borderColor: '#d1d5db' }}
                />
              </div>
            </div>
          </div>

          {/* Passengers */}
          <div>
            <h3 className="text-xs sm:text-sm font-semibold mb-1 sm:mb-2" style={{ color: 'var(--marian-blue)' }}>Passengers</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2">
              <div>
                <label className="block text-xs font-medium mb-0.5" style={{ color: 'var(--lapis-lazuli)' }}>
                  Adults (12+ years) *
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  max="9"
                  value={formData.adults}
                  onChange={(e) => setFormData({ ...formData, adults: parseInt(e.target.value) })}
                  className="w-full px-2 py-1 text-xs sm:text-sm border rounded focus:ring-1 focus:border-transparent text-black"
                  style={{ borderColor: '#d1d5db' }}
                />
              </div>
              <div>
                <label className="block text-xs font-medium mb-0.5" style={{ color: 'var(--lapis-lazuli)' }}>
                  Children (2-11 years)
                </label>
                <input
                  type="number"
                  min="0"
                  max="9"
                  value={formData.children}
                  onChange={(e) => setFormData({ ...formData, children: parseInt(e.target.value) })}
                  className="w-full px-2 py-1 text-xs sm:text-sm border rounded focus:ring-1 focus:border-transparent text-black"
                  style={{ borderColor: '#d1d5db' }}
                />
              </div>
            </div>
          </div>

          {/* Additional Message */}
          <div>
            <label className="block text-xs font-medium mb-0.5" style={{ color: 'var(--lapis-lazuli)' }}>
              Additional Requirements (Optional)
            </label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={2}
              className="w-full px-2 py-1 text-xs sm:text-sm border rounded focus:ring-1 focus:border-transparent text-black"
              style={{ borderColor: '#d1d5db' }}
              placeholder="Any special requests, preferences, or questions..."
            />
          </div>

          {/* Submit Button */}
          <div className="flex flex-col sm:flex-row gap-1.5 sm:gap-2">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 font-semibold py-1.5 px-3 sm:px-4 text-xs sm:text-sm rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-white"
              style={{ backgroundColor: 'var(--lapis-lazuli)' }}
            >
              {loading ? 'Submitting...' : 'Submit Booking Request'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 text-xs sm:text-sm border rounded-full hover:bg-gray-50 transition-colors"
              style={{ borderColor: 'var(--marian-blue)', color: 'var(--marian-blue)' }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
