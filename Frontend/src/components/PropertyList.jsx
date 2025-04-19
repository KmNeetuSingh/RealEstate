import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProperties, deleteProperty } from '../features/property/propertySlice';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import toast from 'react-hot-toast';
import EditPropertyModal from './EditProperty'; // ✅ Import the modal

const PropertyList = () => {
  const dispatch = useDispatch();
  const { properties, loading, error } = useSelector((state) => state.property);

  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

  const [editModalOpen, setEditModalOpen] = useState(false);         // ✅ Modal state
  const [selectedProperty, setSelectedProperty] = useState(null);    // ✅ Selected property

  useEffect(() => {
    dispatch(fetchProperties());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleDelete = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this property?');
    if (!confirm) return;

    try {
      await dispatch(deleteProperty({ id, token })).unwrap();
      toast.success('Property deleted successfully');
    } catch (err) {
      toast.error(err || 'Failed to delete property');
    }
  };

  const openEditModal = (property) => {
    setSelectedProperty(property);
    setEditModalOpen(true);
  };

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <div
            key={property._id}
            className="border rounded-lg shadow-md overflow-hidden bg-white transition transform hover:-translate-y-1 hover:shadow-lg"
          >
            {property.images && property.images.length > 0 ? (
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
            ) : (
              <img
                src="https://via.placeholder.com/600x300?text=No+Image"
                alt="No Image"
                className="w-full h-60 object-cover"
              />
            )}

            <div className="p-4">
              <h2 className="text-xl font-bold">{property.title}</h2>
              <p className="text-gray-600 mb-1">{property.location}</p>
              <p className="text-sm text-gray-500 mb-2 capitalize">{property.type}</p>
              <p className="text-green-700 font-semibold mb-2">
                ₹ {property.price?.toLocaleString()}
              </p>
              <p className="text-sm text-gray-700">{property.description}</p>

              {user?.role === 'admin' && (
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => handleDelete(property._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => openEditModal(property)}  // ✅ Open modal on click
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Edit Property Modal */}
      <EditPropertyModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        property={selectedProperty}
        token={token}
      />
    </div>
  );
};

export default PropertyList;
