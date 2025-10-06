'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { FaHome, FaCog, FaMapMarkerAlt, FaUsers, FaStar, FaEnvelope, FaNewspaper, FaPlane, FaSignOutAlt, FaBars, FaTimes, FaKey, FaTags, FaHandshake } from 'react-icons/fa';

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    // Check authentication
    if (pathname !== '/admin/login') {
      const user = localStorage.getItem('admin_user');
      if (!user) {
        router.push('/admin/login');
      } else {
        setIsAuthenticated(true);
      }
    }
    setLoading(false);
  }, [pathname, router]);

  const handleLogout = () => {
    localStorage.removeItem('admin_user');
    router.push('/admin/login');
  };

  // Don't show layout for login page
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const menuItems = [
    { href: '/admin', icon: FaHome, label: 'Dashboard' },
    { href: '/admin/settings', icon: FaCog, label: 'Settings' },
    { href: '/admin/offers', icon: FaTags, label: 'Offers' },
    { href: '/admin/destinations', icon: FaMapMarkerAlt, label: 'Destinations' },
    { href: '/admin/team', icon: FaUsers, label: 'Team' },
    { href: '/admin/testimonials', icon: FaStar, label: 'Testimonials' },
    { href: '/admin/partners', icon: FaHandshake, label: 'Partners' },
    { href: '/admin/bookings', icon: FaPlane, label: 'Bookings' },
    { href: '/admin/inquiries', icon: FaEnvelope, label: 'Inquiries' },
    { href: '/admin/newsletter', icon: FaNewspaper, label: 'Newsletter' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 bg-gray-900 text-white`}
      >
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="p-6 border-b border-gray-700">
            <h1 className="text-2xl font-bold">TravelTrust</h1>
            <p className="text-sm text-gray-400">Admin Panel</p>
          </div>

          {/* Menu */}
          <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon />
                  <span className="uppercase text-sm font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* User Actions */}
          <div className="p-2 border-t border-gray-700 space-y-1">
            <Link
              href="/admin/change-password"
              className="flex items-center gap-2 px-3 py-2 rounded-lg w-full text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
              onClick={() => setSidebarOpen(false)}
            >
              <FaKey />
              <span className="uppercase text-sm font-medium">Change Password</span>
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-2 rounded-lg w-full text-gray-300 hover:bg-red-600 hover:text-white transition-colors"
            >
              <FaSignOutAlt />
              <span className="uppercase text-sm font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <div className="md:ml-64">
        {/* Top Bar */}
        <header className="bg-white shadow-sm sticky top-0 z-20">
          <div className="px-4 py-4 flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden text-2xl text-gray-700"
            >
              {sidebarOpen ? <FaTimes /> : <FaBars />}
            </button>
            <h2 className="text-xl font-semibold text-gray-800">
              {menuItems.find((item) => item.href === pathname)?.label || 'Admin Panel'}
            </h2>
            <div className="flex items-center gap-4">
              <Link href="/" className="text-sm text-blue-600 hover:underline">
                View Site
              </Link>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
