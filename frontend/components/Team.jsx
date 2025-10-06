'use client';

import { useEffect, useState } from 'react';
import { getTeamMembers } from '@/lib/api';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

export default function Team() {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeam();
  }, []);

  const fetchTeam = async () => {
    try {
      const response = await getTeamMembers('active');
      if (response.status === 'success') {
        setTeam(response.data.slice(0, 4)); // Show top 4 team members
      }
    } catch (error) {
      console.error('Error fetching team:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section id="team" className="section-padding bg-white">
        <div className="container-custom">
          <h2 className="section-title">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="card animate-pulse">
                <div className="h-64 bg-gray-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="team" className="section-padding w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white">
      <div className="container-custom">
        <h2 className="section-title opacity-0 animate-fade-in-up text-white" style={{ animationDelay: '0s', animationFillMode: 'forwards' }}>Meet Our Team</h2>
        <p className="section-subtitle opacity-0 animate-fade-in-up text-white" style={{ animationDelay: '0.05s', animationFillMode: 'forwards' }}>
          Experienced professionals dedicated to making your travel dreams come true
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {team.map((member, index) => (
            <div
              key={member.id}
              className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 opacity-0 animate-slide-up-scale transform hover:scale-105"
              style={{ animationDelay: `${0.1 + index * 0.1}s`, animationFillMode: 'forwards' }}
            >
              <div className="relative h-64 sm:h-72 md:h-80 overflow-hidden">
                <img
                  src={member.photo_url || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=500&fit=crop'}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4">
                    <p className="text-white text-xs sm:text-sm line-clamp-3">{member.bio}</p>
                  </div>
                </div>
              </div>

              <div className="p-4 sm:p-6 text-center">
                <h3 className="text-lg sm:text-xl font-bold mb-1" style={{ color: 'var(--text-dark)' }}>
                  {member.name}
                </h3>
                <p className="text-sm sm:text-base font-medium mb-3 sm:mb-4" style={{ color: 'var(--burnt-sienna)' }}>{member.position}</p>

                <div className="flex justify-center gap-2 sm:gap-3">
                  {member.facebook && (
                    <a
                      href={member.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors hover:opacity-70"
                      style={{ color: 'var(--lapis-lazuli)' }}
                    >
                      <div className="text-lg sm:text-xl">
                        <FaFacebook />
                      </div>
                    </a>
                  )}
                  {member.twitter && (
                    <a
                      href={member.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors hover:opacity-70"
                      style={{ color: 'var(--lapis-lazuli)' }}
                    >
                      <div className="text-lg sm:text-xl">
                        <FaTwitter />
                      </div>
                    </a>
                  )}
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors hover:opacity-70"
                      style={{ color: 'var(--lapis-lazuli)' }}
                    >
                      <div className="text-lg sm:text-xl">
                        <FaLinkedin />
                      </div>
                    </a>
                  )}
                  {member.instagram && (
                    <a
                      href={member.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors hover:opacity-70"
                      style={{ color: 'var(--burnt-sienna)' }}
                    >
                      <div className="text-lg sm:text-xl">
                        <FaInstagram />
                      </div>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {team.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No team members available.</p>
          </div>
        )}
      </div>
    </section>
  );
}
