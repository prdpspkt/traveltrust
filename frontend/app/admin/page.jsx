'use client';

import { useEffect, useState } from 'react';
import { getDestinations, getTeamMembers, getTestimonials, getInquiries, getNewsletterSubscribers, getBookings, getOffers, getPartners } from '@/lib/api';
import { FaMapMarkerAlt, FaUsers, FaStar, FaEnvelope, FaNewspaper, FaPlane, FaTags, FaHandshake, FaCog } from 'react-icons/fa';
import Link from 'next/link';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    destinations: 0,
    team: 0,
    testimonials: 0,
    inquiries: 0,
    subscribers: 0,
    bookings: 0,
    offers: 0,
    partners: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [dest, team, test, inq, news, book, off, part] = await Promise.all([
        getDestinations().catch(() => ({ data: [] })),
        getTeamMembers().catch(() => ({ data: [] })),
        getTestimonials().catch(() => ({ data: [] })),
        getInquiries().catch(() => ({ data: [] })),
        getNewsletterSubscribers().catch(() => ({ data: [] })),
        getBookings().catch(() => ({ data: [] })),
        getOffers('all').catch(() => ({ data: [] })),
        getPartners('all').catch(() => ({ data: [] })),
      ]);

      setStats({
        destinations: dest.data?.length || 0,
        team: team.data?.length || 0,
        testimonials: test.data?.length || 0,
        inquiries: inq.data?.length || 0,
        subscribers: news.data?.length || 0,
        bookings: book.data?.length || 0,
        offers: off.data?.length || 0,
        partners: part.data?.length || 0,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Bookings',
      value: stats.bookings,
      icon: FaPlane,
      color: 'bg-blue-500',
      link: '/admin/bookings',
    },
    {
      title: 'Inquiries',
      value: stats.inquiries,
      icon: FaEnvelope,
      color: 'bg-red-500',
      link: '/admin/inquiries',
    },
    {
      title: 'Destinations',
      value: stats.destinations,
      icon: FaMapMarkerAlt,
      color: 'bg-cyan-500',
      link: '/admin/destinations',
    },
    {
      title: 'Offers',
      value: stats.offers,
      icon: FaTags,
      color: 'bg-orange-500',
      link: '/admin/offers',
    },
    {
      title: 'Partners',
      value: stats.partners,
      icon: FaHandshake,
      color: 'bg-indigo-500',
      link: '/admin/partners',
    },
    {
      title: 'Team Members',
      value: stats.team,
      icon: FaUsers,
      color: 'bg-green-500',
      link: '/admin/team',
    },
    {
      title: 'Testimonials',
      value: stats.testimonials,
      icon: FaStar,
      color: 'bg-yellow-500',
      link: '/admin/testimonials',
    },
    {
      title: 'Newsletter Subscribers',
      value: stats.subscribers,
      icon: FaNewspaper,
      color: 'bg-purple-500',
      link: '/admin/newsletter',
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome to your admin dashboard</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.title}
              href={card.link}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${card.color} rounded-lg flex items-center justify-center`}>
                  <div className="text-2xl text-white"><Icon /></div>
                </div>
              </div>
              <h3 className="text-gray-600 text-sm font-medium mb-1">{card.title}</h3>
              <p className="text-3xl font-bold text-gray-900">
                {loading ? '...' : String(card.value)}
              </p>
            </Link>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          <Link
            href="/admin/bookings"
            className="flex flex-col items-center gap-2 px-4 py-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <FaPlane className="text-xl" />
            <span className="text-sm font-medium">View Bookings</span>
          </Link>
          <Link
            href="/admin/inquiries"
            className="flex flex-col items-center gap-2 px-4 py-3 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors"
          >
            <FaEnvelope className="text-xl" />
            <span className="text-sm font-medium">View Inquiries</span>
          </Link>
          <Link
            href="/admin/destinations"
            className="flex flex-col items-center gap-2 px-4 py-3 bg-cyan-50 text-cyan-700 rounded-lg hover:bg-cyan-100 transition-colors"
          >
            <FaMapMarkerAlt className="text-xl" />
            <span className="text-sm font-medium">Add Destination</span>
          </Link>
          <Link
            href="/admin/offers"
            className="flex flex-col items-center gap-2 px-4 py-3 bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 transition-colors"
          >
            <FaTags className="text-xl" />
            <span className="text-sm font-medium">Add Offer</span>
          </Link>
          <Link
            href="/admin/partners"
            className="flex flex-col items-center gap-2 px-4 py-3 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition-colors"
          >
            <FaHandshake className="text-xl" />
            <span className="text-sm font-medium">Add Partner</span>
          </Link>
          <Link
            href="/admin/team"
            className="flex flex-col items-center gap-2 px-4 py-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors"
          >
            <FaUsers className="text-xl" />
            <span className="text-sm font-medium">Add Team Member</span>
          </Link>
          <Link
            href="/admin/testimonials"
            className="flex flex-col items-center gap-2 px-4 py-3 bg-yellow-50 text-yellow-700 rounded-lg hover:bg-yellow-100 transition-colors"
          >
            <FaStar className="text-xl" />
            <span className="text-sm font-medium">Add Testimonial</span>
          </Link>
          <Link
            href="/admin/newsletter"
            className="flex flex-col items-center gap-2 px-4 py-3 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors"
          >
            <FaNewspaper className="text-xl" />
            <span className="text-sm font-medium">View Subscribers</span>
          </Link>
          <Link
            href="/admin/settings"
            className="flex flex-col items-center gap-2 px-4 py-3 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <FaCog className="text-xl" />
            <span className="text-sm font-medium">Update Settings</span>
          </Link>
        </div>
      </div>

      {/* System Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">System Information</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Version:</span>
              <span className="font-medium">1.0.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Last Update:</span>
              <span className="font-medium">2024-10-03</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Status:</span>
              <span className="font-medium text-green-600">Active</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Need Help?</h3>
          <p className="text-gray-600 text-sm mb-4">
            Check the documentation or contact support for assistance.
          </p>
          <Link href="/" className="text-blue-600 hover:underline text-sm">
            View Public Site →
          </Link>
        </div>
      </div>
    </div>
  );
}
