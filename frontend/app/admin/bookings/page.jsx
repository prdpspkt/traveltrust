'use client';

import { useEffect, useState } from 'react';
import { getBookings, updateBooking, deleteBooking } from '@/lib/api';
import { FaEye, FaTrash, FaTimes, FaEnvelope, FaPhone, FaUser, FaCalendar, FaPlane } from 'react-icons/fa';

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    fetchBookings();
  }, [statusFilter]);

  const fetchBookings = async () => {
    try {
      const response = await getBookings(statusFilter === 'all' ? undefined : statusFilter);
      if (response.status === 'success') {
        setBookings(response.data);
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setError('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleView = (booking) => {
    setSelectedBooking(booking);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this booking?')) return;

    try {
      const response = await deleteBooking(id);
      if (response.status === 'success') {
        setSuccess('Booking deleted successfully!');
        setTimeout(() => setSuccess(''), 3000);
        setShowModal(false);
        setSelectedBooking(null);
        await fetchBookings();
      } else {
        setError(response.message || 'Failed to delete');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
      console.error('Delete error:', err);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await updateBooking(id, { status: newStatus });
      console.log('Update response:', response);
      if (response.status === 'success') {
        setSuccess('Status updated successfully!');
        setTimeout(() => setSuccess(''), 3000);
        await fetchBookings();
        if (selectedBooking && selectedBooking.id === id) {
          setSelectedBooking({ ...selectedBooking, status: newStatus });
        }
      } else {
        setError(response.message || 'Failed to update status');
        if (response.errors) {
          console.error('Validation errors:', response.errors);
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'An error occurred');
      console.error('Update error:', err);
      console.error('Full error response:', err.response);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Bookings
            <span className="ml-3 text-lg font-normal text-gray-500">
              ({bookings.length} {bookings.length === 1 ? 'booking' : 'bookings'})
            </span>
          </h1>
          <p className="text-gray-600">Manage flight bookings and reservations</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="input-field !py-2"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="contacted">Contacted</option>
            <option value="confirmed">Confirmed</option>
            <option value="cancelled">Cancelled</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {success && (
        <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-lg">
          {success}
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Route
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Departure
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Return
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Passengers
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Booked
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-6 py-8 text-center text-gray-500">
                    No bookings found.
                  </td>
                </tr>
              ) : (
                bookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{booking.name}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-700">{booking.email}</div>
                      <div className="text-sm text-gray-500">{booking.phone}</div>
                    </td>
                    <td className="px-6 py-4 text-gray-700">{booking.from_airport} → {booking.to_airport}</td>
                    <td className="px-6 py-4 text-gray-700">{formatDate(booking.departure_date)}</td>
                    <td className="px-6 py-4 text-gray-700">
                      {booking.return_date ? formatDate(booking.return_date) : 'One-way'}
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {String(booking.adults)} Adult{Number(booking.adults) !== 1 ? 's' : ''}
                      {Number(booking.children) > 0 && `, ${String(booking.children)} Child${Number(booking.children) !== 1 ? 'ren' : ''}`}
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={booking.status || 'pending'}
                        onChange={(e) => {
                          console.log('Selected value:', e.target.value);
                          handleStatusChange(booking.id, e.target.value);
                        }}
                        className={`text-xs rounded-full px-3 py-1 border font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          booking.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800 border-yellow-300'
                            : booking.status === 'contacted'
                            ? 'bg-blue-100 text-blue-800 border-blue-300'
                            : booking.status === 'confirmed'
                            ? 'bg-green-100 text-green-800 border-green-300'
                            : booking.status === 'completed'
                            ? 'bg-gray-100 text-gray-800 border-gray-300'
                            : 'bg-red-100 text-red-800 border-red-300'
                        }`}
                      >
                        <option value="pending">Pending</option>
                        <option value="contacted">Contacted</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {formatDate(booking.created_at)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleView(booking)}
                          className="text-blue-600 hover:text-blue-800 p-2 hover:bg-blue-50 rounded transition-colors"
                          title="View Details"
                        >
                          <FaEye />
                        </button>
                        <button
                          onClick={() => handleDelete(booking.id)}
                          className="text-red-600 hover:text-red-800 p-2 hover:bg-red-50 rounded transition-colors"
                          title="Delete"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details Modal */}
      {showModal && selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Booking Details</h2>
              <button
                onClick={() => {
                  setShowModal(false);
                  setSelectedBooking(null);
                }}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FaTimes size={24} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <div className="text-blue-600"><FaUser /></div>
                    <span className="text-sm font-semibold">Customer Name</span>
                  </div>
                  <p className="text-gray-900 font-medium">{selectedBooking.name}</p>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <div className="text-blue-600"><FaCalendar /></div>
                    <span className="text-sm font-semibold">Booking Date</span>
                  </div>
                  <p className="text-gray-900">{formatDate(selectedBooking.created_at)}</p>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <div className="text-blue-600"><FaEnvelope /></div>
                    <span className="text-sm font-semibold">Email</span>
                  </div>
                  <p className="text-gray-900">{selectedBooking.email}</p>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <div className="text-blue-600"><FaPhone /></div>
                    <span className="text-sm font-semibold">Phone</span>
                  </div>
                  <p className="text-gray-900">{selectedBooking.phone}</p>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <FaPlane className="text-blue-600" />
                  Flight Details
                </h3>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <span className="text-sm text-gray-600">From</span>
                    <p className="text-gray-900 font-medium mt-1">{selectedBooking.from_airport}</p>
                  </div>

                  <div>
                    <span className="text-sm text-gray-600">To</span>
                    <p className="text-gray-900 font-medium mt-1">{selectedBooking.to_airport}</p>
                  </div>

                  <div>
                    <span className="text-sm text-gray-600">Departure Date</span>
                    <p className="text-gray-900 font-medium mt-1">
                      {formatDate(selectedBooking.departure_date)}
                    </p>
                  </div>

                  <div>
                    <span className="text-sm text-gray-600">Return Date</span>
                    <p className="text-gray-900 font-medium mt-1">
                      {selectedBooking.return_date ? formatDate(selectedBooking.return_date) : 'One-way trip'}
                    </p>
                  </div>

                  <div>
                    <span className="text-sm text-gray-600">Adults</span>
                    <p className="text-gray-900 font-medium mt-1">{String(selectedBooking.adults)}</p>
                  </div>

                  <div>
                    <span className="text-sm text-gray-600">Children</span>
                    <p className="text-gray-900 font-medium mt-1">{String(selectedBooking.children)}</p>
                  </div>
                </div>
              </div>

              {selectedBooking.message && (
                <div className="border-t border-gray-200 pt-6">
                  <span className="text-sm text-gray-600">Additional Message</span>
                  <p className="text-gray-900 mt-2 whitespace-pre-wrap bg-gray-50 p-4 rounded-lg">
                    {selectedBooking.message}
                  </p>
                </div>
              )}

              <div className="border-t border-gray-200 pt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Update Status
                </label>
                <select
                  value={selectedBooking.status}
                  onChange={(e) => handleStatusChange(selectedBooking.id, e.target.value)}
                  className="input-field"
                >
                  <option value="pending">Pending</option>
                  <option value="contacted">Contacted</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => {
                    setShowModal(false);
                    setSelectedBooking(null);
                  }}
                  className="btn-primary !py-2 !px-6 flex-1"
                >
                  Close
                </button>
                <button
                  onClick={() => handleDelete(selectedBooking.id)}
                  className="px-6 py-2 border-2 border-red-300 rounded-full text-red-700 hover:bg-red-50 transition-colors"
                >
                  Delete Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
