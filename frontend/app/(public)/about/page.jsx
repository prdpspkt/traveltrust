'use client';

import {useEffect, useState} from 'react';
import {getSettings} from '@/lib/api';
import {FaPlane, FaGlobe, FaAward, FaUsers} from 'react-icons/fa';
import Team from '@/components/Team';
import Newsletter from '@/components/Newsletter';
import Stats from "@/components/Stats";
import Partners from "@/components/Partners";



export default function AboutPage() {
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
        if (datum.length > 0) {
            return datum[0].value;
        }
        return '';
    }

    return (
        <>
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
                <div className="container-custom text-center">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">About TravelTrust</h1>
                    <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                        Your trusted partner for affordable and reliable air travel worldwide
                    </p>
                </div>
            </section>

            {/* Our Story Section */}
            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
                            <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                                <p id="about-content">
                                    {loading ? "loading": get_value('about_content')}
                                </p>
                                <p>
                                    We believe that exploring the world should not be a luxury reserved for the few.
                                    With our extensive network of airline partners and industry expertise, we bring
                                    you the best priced tickets to destinations across the globe.
                                </p>
                                <p>
                                    From Tokyo to New York, London to Sydney, we've helped thousands of travelers
                                    embark on their dream journeys. Our commitment to excellence, transparency,
                                    and customer satisfaction has made us one of the most trusted names in air travel.
                                </p>
                            </div>
                        </div>
                        <div className="relative">
                            <img
                                src="https://images.unsplash.com/photo-1556388158-158ea5ccacbd?w=800&h=600&fit=crop"
                                alt="About Us"
                                className="rounded-xl shadow-2xl"
                            />
                        </div>
                    </div>
                </div>
            </section>
            <Stats/>
            {/* Our Values */}
            <section className="section-padding bg-light">
                <div className="container-custom">
                    <h2 className="section-title">Our Values</h2>
                    <p className="section-subtitle">
                        The principles that guide everything we do
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div
                            className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-2xl transition-all duration-300">
                            <div
                                className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <div className="text-3xl text-primary">
                                    <FaPlane/>
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Best Prices</h3>
                            <p className="text-gray-600">
                                We negotiate with airlines to bring you the most competitive prices in the market
                            </p>
                        </div>

                        <div
                            className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-2xl transition-all duration-300">
                            <div
                                className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <div className="text-3xl text-primary">
                                    <FaGlobe/>
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Global Reach</h3>
                            <p className="text-gray-600">
                                Access to 100+ destinations worldwide with multiple airline options
                            </p>
                        </div>

                        <div
                            className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-2xl transition-all duration-300">
                            <div
                                className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <div className="text-3xl text-primary">
                                    <FaAward/>
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Quality Service</h3>
                            <p className="text-gray-600">
                                Award-winning customer service available 24/7 to assist you
                            </p>
                        </div>

                        <div
                            className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-2xl transition-all duration-300">
                            <div
                                className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <div className="text-3xl text-primary">
                                    <FaUsers/>
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Customer Trust</h3>
                            <p className="text-gray-600">
                                Over 10,000 satisfied customers who trust us with their travel needs
                            </p>
                        </div>
                    </div>
                </div>
            </section>


            {/* Team Section */}
            <Team/>
            <Partners/>
            {/* Newsletter */}
            <Newsletter/>
        </>
    );
}
