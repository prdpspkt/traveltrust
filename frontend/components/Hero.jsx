'use client';

import {useEffect, useState} from 'react';
import {getSettings, getOffers} from '@/lib/api';
import {FaCalendarAlt, FaArrowUp} from 'react-icons/fa';
import Link from 'next/link';
import BookingForm from './BookingForm';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Autoplay, Pagination, Navigation} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function Hero() {
    const [settings, setSettings] = useState({});
    const [loading, setLoading] = useState(true);
    const [isBookingFormOpen, setIsBookingFormOpen] = useState(false);
    const [showScrollTop, setShowScrollTop] = useState(false);
    const [offers, setOffers] = useState([]);

    useEffect(() => {
        fetchSettings();
        fetchOffers();
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setShowScrollTop(true);
            } else {
                setShowScrollTop(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const fetchSettings = async () => {
        try {
            const response = await getSettings();
            if (response.status === 'success') {
                setSettings(response.data);
            }
        } catch (error) {
            console.error('Error fetching settings:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchOffers = async () => {
        try {
            const response = await getOffers('active');
            if (response.status === 'success') {
                setOffers(response.data);
            }
        } catch (error) {
            console.error('Error fetching offers:', error);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    };

    if (loading) {
        return (
            <section
                className="relative text-white min-h-[85vh] sm:min-h-[90vh] flex items-center w-full overflow-hidden"
                style={{background: 'linear-gradient(135deg, var(--marian-blue) 0%, var(--lapis-lazuli) 100%)'}}>
                <div className="container-custom relative z-10 w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
                        <div className="space-y-4 sm:space-y-6 text-center lg:text-left">
                            <div className="h-16 bg-white bg-opacity-20 rounded-lg animate-pulse"></div>
                            <div className="h-8 bg-white bg-opacity-20 rounded-lg animate-pulse w-3/4"></div>
                            <div className="h-6 bg-white bg-opacity-20 rounded-lg animate-pulse w-full"></div>
                            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
                                <div
                                    className="h-12 bg-white bg-opacity-20 rounded-full animate-pulse w-full sm:w-32"></div>
                                <div
                                    className="h-12 bg-white bg-opacity-20 rounded-full animate-pulse w-full sm:w-48"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
    const get_value = function (key) {
        let datum = settings.filter(pair => pair.key === key)
        if (datum.length > 0)
        {
            return datum[0].value;
        }
        return '';
    }
    return (
        <section className="relative text-white min-h-[85vh] sm:min-h-[90vh] flex items-center w-full overflow-hidden"
                 style={{background: 'linear-gradient(135deg, var(--marian-blue) 0%, var(--lapis-lazuli) 100%)'}}>
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div
                    className="absolute transform rotate-45 -left-10 sm:-left-20 top-10 sm:top-20 w-48 sm:w-64 md:w-96 h-48 sm:h-64 md:h-96 rounded-full"
                    style={{backgroundColor: 'var(--burnt-sienna)'}}></div>
                <div
                    className="absolute transform -rotate-45 -right-10 sm:right-0 bottom-0 w-48 sm:w-64 md:w-96 h-48 sm:h-64 md:h-96 rounded-full"
                    style={{backgroundColor: 'var(--isabelline)'}}></div>
            </div>

            <div className="container-custom relative z-10 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
                    {/* Left Content */}
                    <div className="space-y-4 sm:space-y-6 text-center lg:text-left opacity-0 animate-fade-in-up"
                         style={{animationDelay: '0.1s', animationFillMode: 'forwards'}}>
                        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                            {loading ? 'Your Journey Starts Here' : get_value('hero_title')}
                        </h1>
                        <p className="text-lg sm:text-xl md:text-2xl text-blue-100">
                            {loading ? 'Best priced air tickets to destinations worldwide' : get_value('hero_subtitle')}
                        </p>
                        <p className="text-base sm:text-lg text-blue-50">
                            {loading ? ' ' : get_value('hero_description') }
                        </p>

                        <div
                            className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 pt-4 justify-center lg:justify-start">
                            <button
                                onClick={() => setIsBookingFormOpen(true)}
                                className="font-semibold py-3 px-6 sm:px-8 text-sm sm:text-base rounded-full transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg w-full sm:w-auto flex items-center justify-center gap-2"
                                style={{backgroundColor: 'var(--burnt-sienna)', color: 'white'}}
                            >
                                <FaCalendarAlt/>
                                Book Now
                            </button>
                            <Link href="/#destinations"
                                  className="font-semibold py-3 px-6 sm:px-8 text-sm sm:text-base rounded-full transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg border-2 border-white hover:bg-white w-full sm:w-auto text-center"
                                  style={{color: 'white'}}
                                  onMouseEnter={(e) => e.currentTarget.style.color = 'var(--marian-blue)'}
                                  onMouseLeave={(e) => e.currentTarget.style.color = 'white'}>
                                Explore Destinations
                            </Link>
                        </div>
                    </div>

                    {/* Right Content - Offers Slider */}
                    <div className="relative hidden lg:block opacity-0 animate-fade-in-up"
                         style={{animationDelay: '0.2s', animationFillMode: 'forwards'}}>
                        <div className="relative z-10">
                            <Swiper
                                modules={[Autoplay, Pagination, Navigation]}
                                spaceBetween={30}
                                slidesPerView={1}
                                autoplay={{delay: 3000, disableOnInteraction: false}}
                                pagination={{clickable: true}}
                                navigation
                                className="rounded-2xl shadow-2xl"
                            >
                                {offers.length > 0 ? (
                                    offers.map((offer) => (
                                        <SwiperSlide key={offer.id}>
                                            <div
                                                className="relative w-full h-[400px] bg-white rounded-2xl overflow-hidden">
                                                <img
                                                    src={offer.image_url || 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&h=600&fit=crop'}
                                                    alt={offer.title}
                                                    className="w-full h-full object-cover"
                                                />
                                                <div
                                                    className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                                                    <h3 className="text-white text-2xl font-bold mb-2">{offer.title}</h3>
                                                    <p className="text-white/90 text-sm">{offer.description}</p>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    ))
                                ) : (
                                    <SwiperSlide>
                                        <div className="relative w-full h-[400px] bg-white rounded-2xl overflow-hidden">
                                            <img
                                                src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&h=600&fit=crop"
                                                alt="Special Offer"
                                                className="w-full h-full object-cover"
                                            />
                                            <div
                                                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                                                <h3 className="text-white text-2xl font-bold mb-2">Special Offers</h3>
                                                <p className="text-white/90 text-sm">Explore our amazing travel
                                                    deals</p>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                )}
                            </Swiper>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator - Show when at top */}
            {!showScrollTop && (
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                    <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
                        <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
                    </div>
                </div>
            )}

            {/* Scroll to Top Button - Show when scrolled */}
            {showScrollTop && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-8 right-8 z-50 p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 hover:shadow-xl"
                    style={{backgroundColor: 'var(--burnt-sienna)', color: 'white'}}
                    aria-label="Scroll to top"
                >
                    <FaArrowUp size={20}/>
                </button>
            )}

            {/* Booking Form Modal */}
            <BookingForm isOpen={isBookingFormOpen} onClose={() => setIsBookingFormOpen(false)}/>
        </section>
    );
}
