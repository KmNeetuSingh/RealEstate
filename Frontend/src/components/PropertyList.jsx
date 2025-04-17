import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProperties } from '../features/property/propertySlice';

const PropertyList = () => {
  const dispatch = useDispatch();
  const { properties, loading, error } = useSelector((state) => state.property);

  useEffect(() => {
    dispatch(fetchProperties());
  }, [dispatch]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-4">All Properties</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {properties.map((property) => (
          <div key={property._id} className="border p-4 rounded shadow bg-white">
            <h2 className="text-xl font-semibold">{property.title}</h2>
            <p className="text-gray-600">{property.location}</p>
            <p className="text-green-600 font-medium">{property.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyList;
