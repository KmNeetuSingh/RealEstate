import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProperties } from '../features/property/propertySlice';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const PropertyList = () => {
  const dispatch = useDispatch();
  const { properties, loading, error } = useSelector((state) => state.property);

  useEffect(() => {
    dispatch(fetchProperties());
  }, [dispatch]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6">All Properties</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <div
            key={property._id}
            className="border rounded-lg shadow-md overflow-hidden bg-white"
          >
            {property.images && property.images.length > 0 && (
              <Slider {...settings}>
                {property.images.map((img, idx) => (
                  <div key={idx}>
                    <img
                      src={img}
                      alt={property.title}
                      className="w-full h-60 object-cover"
                    />
                  </div>
                ))}
              </Slider>
            )}

            <div className="p-4">
              <h2 className="text-xl font-bold">{property.title}</h2>
              <p className="text-gray-600 mb-1">{property.location}</p>
              <p className="text-sm text-gray-500 mb-2 capitalize">{property.type}</p>
              <p className="text-green-700 font-semibold mb-2">
                ₹ {property.price?.toLocaleString()}
              </p>
              <p className="text-sm text-gray-700">{property.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyList;
