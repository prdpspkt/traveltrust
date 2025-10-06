'use client';

import { useEffect, useState } from 'react';
import { getNewsletterSubscribers } from '@/lib/api';
import { FaEnvelope, FaCalendar, FaDownload } from 'react-icons/fa';

export default function AdminNewsletterPage() {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    try {
      const response = await getNewsletterSubscribers();
      if (response.status === 'success') {
        setSubscribers(response.data);
      }
    } catch (error) {
      console.error('Error fetching subscribers:', error);
      setError('Failed to load subscribers');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredSubscribers = subscribers.filter(
    (subscriber) =>
      subscriber.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subscriber.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExport = () => {
    const csvContent = [
      ['Name', 'Email', 'Subscribed At', 'Status'],
      ...filteredSubscribers.map((sub) => [
        sub.name || '',
        sub.email,
        formatDate(sub.subscribed_at),
        sub.status
      ])
    ]
      .map((row) => row.map((cell) => `"${cell}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `newsletter_subscribers_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Newsletter Subscribers</h1>
          <p className="text-gray-600">Manage email newsletter subscriptions</p>
        </div>
        <button
          onClick={handleExport}
          className="btn-primary !py-2 !px-4 text-sm flex items-center gap-2"
          disabled={subscribers.length === 0}
        >
          <FaDownload /> Export CSV
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Subscribers</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{String(subscribers.length)}</p>
            </div>
            <div className="bg-blue-100 p-4 rounded-full">
              <div className="text-blue-600 text-2xl"><FaEnvelope /></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Active Subscribers</p>
              <p className="text-3xl font-bold text-green-600 mt-2">
                {String(subscribers.filter((s) => s.status === 'active').length)}
              </p>
            </div>
            <div className="bg-green-100 p-4 rounded-full">
              <div className="text-green-600 text-2xl"><FaEnvelope /></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">This Month</p>
              <p className="text-3xl font-bold text-purple-600 mt-2">
                {String(
                  subscribers.filter((s) => {
                    const subDate = new Date(s.subscribed_at);
                    const now = new Date();
                    return (
                      subDate.getMonth() === now.getMonth() &&
                      subDate.getFullYear() === now.getFullYear()
                    );
                  }).length
                )}
              </p>
            </div>
            <div className="bg-purple-100 p-4 rounded-full">
              <div className="text-purple-600 text-2xl"><FaCalendar /></div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input-field"
        />
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  #
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Subscribed Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredSubscribers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                    {searchTerm ? 'No subscribers found matching your search.' : 'No subscribers yet.'}
                  </td>
                </tr>
              ) : (
                filteredSubscribers.map((subscriber, index) => (
                  <tr key={subscriber.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-gray-700">{String(index + 1)}</td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">
                        {subscriber.name || 'N/A'}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-gray-700">
                        <div className="text-gray-400 text-sm"><FaEnvelope /></div>
                        {subscriber.email}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {formatDate(subscriber.subscribed_at)}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 text-xs rounded-full font-medium ${
                          subscriber.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {subscriber.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {filteredSubscribers.length > 0 && (
        <div className="mt-6 text-center text-sm text-gray-600">
          Showing {String(filteredSubscribers.length)} of {String(subscribers.length)} subscribers
        </div>
      )}
    </div>
  );
}
