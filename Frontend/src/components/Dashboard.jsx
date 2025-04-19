import React from 'react';
import PropertyList from './PropertyList';
import HomePage from '../components/Home'; // or rename to Home

const Dashboard = () => {
  return (
    <div className="p-6">
      <HomePage />

      {/* Title: Properties */}
      <h2 className="text-3xl font-bold text-center text-purple-800 my-8">
        Properties
      </h2>

      {/* Property Listings */}
      <PropertyList showEditDeleteButtons={false} />
    </div>
  );
};

export default Dashboard;
