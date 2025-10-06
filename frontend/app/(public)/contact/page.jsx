'use client';

import {useEffect, useState} from 'react';
import {getSettings} from '@/lib/api';
import ContactForm from '@/components/ContactForm';
import {FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock} from 'react-icons/fa';

export default function ContactPage() {
    const [settings, setSettings] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSettings();
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

    const get_value = function (key) {
        let datum = settings.filter(pair => pair.key === key)
        if (datum.length > 0)
        {
            return datum[0].value;
        }
        return '';
    }

    return (
        <>
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
                <div className="container-custom text-center">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">Get In Touch</h1>
                    <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                        Have questions? We're here to help you plan your perfect journey
                    </p>
                </div>
            </section>

            {/* Contact Section */}
            <section className="section-padding bg-light">
                <div className="container-custom">
                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Contact Information */}
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-4xl font-bold text-gray-900 mb-6">Contact Information</h2>
                                <p className="text-gray-600 text-lg mb-8">
                                    Fill out the form and our team will get back to you within 24 hours
                                </p>
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div
                                        className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <div className="text-primary text-xl">
                                            <FaPhone/>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 mb-1">Phone</h3>
                                        <p className="text-gray-600">
                                            {loading ? 'Loading...' : get_value('site_phone')}
                                        </p>
                                        <p className="text-sm text-gray-500">Sun-Sat 9am-6pm</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div
                                        className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <div className="text-primary text-xl">
                                            <FaEnvelope/>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 mb-1">Email</h3>
                                        <p className="text-gray-600">
                                            {loading ? 'Loading...' : get_value("site_email")}
                                        </p>
                                        <p className="text-sm text-gray-500">24/7 support</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div
                                        className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <div className="text-primary text-xl">
                                            <FaMapMarkerAlt/>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 mb-1">Address</h3>
                                        <p className="text-gray-600">
                                            {loading ? 'Loading...' : get_value('site_address')}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div
                                        className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <div className="text-primary text-xl">
                                            <FaClock/>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900 mb-1">Business Hours</h3>
                                        <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
                                        <p className="text-gray-600">Saturday: 10:00 AM - 4:00 PM</p>
                                        <p className="text-gray-600">Sunday: Closed</p>
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* Contact Form */}
                        <ContactForm/>
                    </div>
                </div>
            </section>

            <section className="bg-gray-600">
                <div className="container-full">
                    <div className="bg-gray-200 rounded-xl h-350 flex items-center justify-center">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3357.68287530232!2d85.31974857525366!3d27.702880276185105!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1900741e1645%3A0x67349a45f3610965!2sTravel%20Trust%20Pvt%20Ltd!5e1!3m2!1sen!2snp!4v1759757358412!5m2!1sen!2snp"
                            style={{border: 0, height: "350px"}} className="w-full" allowFullScreen="" loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section-padding bg-white">
                <div className="container-custom text-center">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Ready to Book Your Flight?</h2>
                    <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                        Browse our destinations and find the perfect flight for your next adventure
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <a href="/#destinations" className="btn-primary">
                            View Destinations
                        </a>
                        <a href="/about" className="btn-secondary">
                            Learn More About Us
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
}
