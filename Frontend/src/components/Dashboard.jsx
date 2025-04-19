import React from 'react';
import PropertyList from './PropertyList';
import HomePage from '../components/Home'; // or rename to Home

const Dashboard = () => {
  return (
    <div className="p-6">
      <HomePage />
      <h1 className="text-3xl font-semibold mt-6 mb-2">Dashboard</h1>
      <p className="text-gray-600 mb-6">Welcome to your real estate dashboard.</p>

      {/* Property Listings */}
      <PropertyList showEditDeleteButtons={false} />
    </div>
  );
};

export default Dashboard;
