'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FaBars, FaTimes, FaCalendarAlt, FaEnvelope } from 'react-icons/fa';
import BookingForm from './BookingForm';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isBookingFormOpen, setIsBookingFormOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 border-b-2 border-burnt-sienna w-full">
      <div className="container-custom">
        <div className="flex justify-between items-center py-3 sm:py-4">
          <Link href="/" className="flex flex-col">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold" style={{ color: 'var(--marian-blue)' }}>TravelTrust</h1>
            <p className="text-xs sm:text-sm" style={{ color: 'var(--lapis-lazuli)' }}>Your Journey, Our Priority</p>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex space-x-4 xl:space-x-8 items-center">
            <Link href="/" className="text-sm lg:text-base font-medium transition-colors hover:opacity-80" style={{ color: 'var(--text-dark)' }}>
              Home
            </Link>
            <Link href="/about" className="text-sm lg:text-base font-medium transition-colors hover:opacity-80" style={{ color: 'var(--text-dark)' }}>
              About
            </Link>
            <Link href="/#destinations" className="text-sm lg:text-base font-medium transition-colors hover:opacity-80" style={{ color: 'var(--text-dark)' }}>
              Destinations
            </Link>
            <Link href="/#team" className="text-sm lg:text-base font-medium transition-colors hover:opacity-80" style={{ color: 'var(--text-dark)' }}>
              Our Team
            </Link>
            <Link href="/#testimonials" className="text-sm lg:text-base font-medium transition-colors hover:opacity-80" style={{ color: 'var(--text-dark)' }}>
              Testimonials
            </Link>
            <button
              onClick={() => setIsBookingFormOpen(true)}
              className="!py-2 !px-4 lg:!px-6 text-sm lg:text-base font-semibold rounded-full transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg flex items-center gap-2"
              style={{ backgroundColor: 'var(--marian-blue)', color: 'white' }}
            >
              <FaCalendarAlt />
              Book Now
            </button>
            <Link href="/contact" className="!py-2 !px-4 lg:!px-6 text-sm lg:text-base font-semibold rounded-full transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg flex items-center gap-2" style={{ backgroundColor: 'var(--burnt-sienna)', color: 'white' }}>
              <FaEnvelope />
              Contact
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-xl sm:text-2xl text-gray-700"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden pb-4 space-y-3 border-t pt-4" style={{ borderColor: 'var(--isabelline)' }}>
            <Link href="/" className="block text-base font-medium transition-colors hover:opacity-80 py-2" style={{ color: 'var(--text-dark)' }} onClick={() => setIsOpen(false)}>
              Home
            </Link>
            <Link href="/about" className="block text-base font-medium transition-colors hover:opacity-80 py-2" style={{ color: 'var(--text-dark)' }} onClick={() => setIsOpen(false)}>
              About
            </Link>
            <Link href="/#destinations" className="block text-base font-medium transition-colors hover:opacity-80 py-2" style={{ color: 'var(--text-dark)' }} onClick={() => setIsOpen(false)}>
              Destinations
            </Link>
            <Link href="/#team" className="block text-base font-medium transition-colors hover:opacity-80 py-2" style={{ color: 'var(--text-dark)' }} onClick={() => setIsOpen(false)}>
              Our Team
            </Link>
            <Link href="/#testimonials" className="block text-base font-medium transition-colors hover:opacity-80 py-2" style={{ color: 'var(--text-dark)' }} onClick={() => setIsOpen(false)}>
              Testimonials
            </Link>
            <button
              onClick={() => {
                setIsBookingFormOpen(true);
                setIsOpen(false);
              }}
              className="block w-full !py-3 !px-6 text-center font-semibold rounded-full mt-4 flex items-center justify-center gap-2"
              style={{ backgroundColor: 'var(--marian-blue)', color: 'white' }}
            >
              <FaCalendarAlt />
              Book Now
            </button>
            <Link href="/contact" className="block !py-3 !px-6 text-center font-semibold rounded-full flex items-center justify-center gap-2" style={{ backgroundColor: 'var(--burnt-sienna)', color: 'white' }} onClick={() => setIsOpen(false)}>
              <FaEnvelope />
              Contact
            </Link>
          </div>
        )}
      </div>

      {/* Booking Form Modal */}
      <BookingForm isOpen={isBookingFormOpen} onClose={() => setIsBookingFormOpen(false)} />
    </nav>
  );
}
