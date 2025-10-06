'use client';
import Link from 'next/link';
import {FaFacebook, FaTwitter, FaInstagram, FaLinkedin} from 'react-icons/fa';
import {useEffect, useState} from "react";
import {getSettings} from "@/lib/api";


export default function Footer() {
    const [settings, setSettings2] = useState({});
    const [loading, setLoading2] = useState(true);
    useEffect(() => {
        fetchSettings2();
    }, []);


    const fetchSettings2 = async () => {
        try {
            const response = await getSettings();
            if (response.status === 'success') {
                setSettings2(response.data);
            }
        } catch (error) {
            console.error('Error fetching settings:', error);
        } finally {
            setLoading2(false);
        }
    };

    if (loading) {
        return;
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
        <footer className="text-white w-full" style={{backgroundColor: 'var(--marian-blue)'}}>
            <div className="container-custom py-8 sm:py-10 md:py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                    <div>
                        <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4"
                            style={{color: 'var(--burnt-sienna)'}}>TravelTrust</h3>
                        <p className="text-sm sm:text-base text-gray-300">
                            Your trusted partner for affordable and reliable air ticketing services to destinations
                            worldwide.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4"
                            style={{color: 'var(--burnt-sienna)'}}>Quick Links</h4>
                        <ul className="space-y-2 text-sm sm:text-base">
                            <li>
                                <Link href="/" className="text-gray-300 transition-colors hover:opacity-80"
                                      style={{color: 'var(--isabelline)'}}>
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="text-gray-300 transition-colors hover:opacity-80"
                                      style={{color: 'var(--isabelline)'}}>
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/#destinations" className="text-gray-300 transition-colors hover:opacity-80"
                                      style={{color: 'var(--isabelline)'}}>
                                    Destinations
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-gray-300 transition-colors hover:opacity-80"
                                      style={{color: 'var(--isabelline)'}}>
                                    Send Inquiry
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4"
                            style={{color: 'var(--burnt-sienna)'}}>Contact Us</h4>
                        <ul className="space-y-2 text-sm sm:text-base text-gray-300">
                            <li>Email: {get_value('site_email')}</li>
                            <li>Phone: {get_value('site_phone')}</li>
                            <li>Location: {get_value('site_address')}</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4"
                            style={{color: 'var(--burnt-sienna)'}}>Follow Us</h4>
                        <div className="flex space-x-3 sm:space-x-4">
                            <a href="#"
                               className="text-xl sm:text-2xl text-gray-300 transition-colors hover:opacity-80">
                                <div>
                                    <FaFacebook/>
                                </div>
                            </a>
                            <a href="#"
                               className="text-xl sm:text-2xl text-gray-300 transition-colors hover:opacity-80">
                                <div>
                                    <FaTwitter/>
                                </div>
                            </a>
                            <a href="#"
                               className="text-xl sm:text-2xl text-gray-300 transition-colors hover:opacity-80">
                                <div>
                                    <FaInstagram/>
                                </div>
                            </a>
                            <a href="#"
                               className="text-xl sm:text-2xl text-gray-300 transition-colors hover:opacity-80">
                                <div>
                                    <FaLinkedin/>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-sm sm:text-base text-gray-300"
                     style={{borderTop: '1px solid rgba(255, 255, 255, 0.1)'}}>
                    <p>&copy; {new Date().getFullYear()} TravelTrust.com.np - All rights reserved</p>
                </div>
            </div>
        </footer>
    );
}
