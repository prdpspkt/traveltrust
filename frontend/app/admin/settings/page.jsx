'use client';

import { useEffect, useState } from 'react';
import { getSettings, updateSetting } from '@/lib/api';
import { FaSave, FaSpinner } from 'react-icons/fa';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [savingKeys, setSavingKeys] = useState({});
  const [successKeys, setSuccessKeys] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await getSettings();
      if (response.status === 'success' && response.data) {
        // Convert array of {key, value} objects to a flat object
        const settingsObj = {};
        response.data.forEach((setting) => {
          settingsObj[setting.key] = setting.value;
        });
        setSettings(settingsObj);
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
      setError('Failed to load settings. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (key, value) => {
    setSettings({ ...settings, [key]: value });
    // Clear success message when user starts editing
    if (successKeys[key]) {
      const newSuccessKeys = { ...successKeys };
      delete newSuccessKeys[key];
      setSuccessKeys(newSuccessKeys);
    }
  };

  const handleSave = async (key) => {
    setSavingKeys({ ...savingKeys, [key]: true });
    setError('');

    try {
      const response = await updateSetting(key, settings[key] || '');
      if (response.status === 'success') {
        setSuccessKeys({ ...successKeys, [key]: true });
        // Clear success message after 3 seconds
        setTimeout(() => {
          setSuccessKeys((prev) => {
            const newKeys = { ...prev };
            delete newKeys[key];
            return newKeys;
          });
        }, 3000);
      } else {
        setError(response.message || 'Failed to update setting');
      }
    } catch (err) {
      console.error('Error updating setting:', err);
      setError(err.response?.data?.message || err.message || 'An error occurred while saving');
    } finally {
      setSavingKeys((prev) => {
        const newKeys = { ...prev };
        delete newKeys[key];
        return newKeys;
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex items-center gap-3 text-gray-600">
          <FaSpinner className="animate-spin text-2xl" />
          <span className="text-lg">Loading settings...</span>
        </div>
      </div>
    );
  }

  const settingsFields = [
    { key: 'site_name', label: 'Site Name', type: 'text' },
    { key: 'site_tagline', label: 'Site Tagline', type: 'text' },
    { key: 'site_logo', label: 'Logo URL', type: 'text' },
    { key: 'site_email', label: 'Email', type: 'email' },
    { key: 'site_phone', label: 'Phone', type: 'text' },
    { key: 'site_address', label: 'Address', type: 'text' },
    { key: 'hero_title', label: 'Hero Title', type: 'text' },
    { key: 'hero_subtitle', label: 'Hero Subtitle', type: 'text' },
    { key: 'hero_description', label: 'Hero Description', type: 'textarea' },
    { key: 'about_content', label: 'About Content', type: 'textarea' },
  ];


  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">Manage your website settings</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg flex items-start gap-2">
          <span className="font-semibold">Error:</span>
          <span>{error}</span>
        </div>
      )}

      <div className="space-y-6">
        {settingsFields.map((field) => (
          <div key={field.key} className="bg-white rounded-xl shadow-md p-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {field.label}
            </label>
            {field.type === 'textarea' ? (
              <textarea
                value={settings[field.key] || ''}
                onChange={(e) => handleChange(field.key, e.target.value)}
                rows={4}

                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-3"
                placeholder={`Enter ${field.label.toLowerCase()}`}
              />
            ) : (
              <input
                type={field.type}
                value={settings[field.key] || ''}
                onChange={(e) => handleChange(field.key, e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-3"
                placeholder={`Enter ${field.label.toLowerCase()}`}
              />
            )}
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleSave(field.key)}
                disabled={savingKeys[field.key]}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {savingKeys[field.key] ? (
                  <>
                    <FaSpinner className="animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <FaSave />
                    Save {field.label}
                  </>
                )}
              </button>
              {successKeys[field.key] && (
                <span className="text-green-600 font-medium">
                  ✓ Saved successfully
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
