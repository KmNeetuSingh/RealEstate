import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProperty } from '../features/property/propertySlice';

const AddProperty = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    type: '',
    images: '',
  });

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.property);

  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (token && user?.role === 'admin') {
      // Convert images string to array (comma-separated URLs)
      const propertyData = {
        ...formData,
        price: Number(formData.price),
        images: formData.images.split(',').map((url) => url.trim()),
      };

      dispatch(addProperty({ data: propertyData, token }));
      setFormData({
        title: '',
        description: '',
        price: '',
        location: '',
        type: '',
        images: '',
      });
    }
  };

  if (!token) {
    return <p className="p-6 text-red-600">Please login to access this page.</p>;
  }

  if (user?.role !== 'admin') {
    return <p className="p-6 text-red-600">Only admins can access this page.</p>;
  }

  return (
    <div className="p-6 text-black">
      <h1 className="text-2xl font-semibold mb-4">Add New Property</h1>
      <form onSubmit={handleSubmit} className="max-w-md space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Property Title"
          className="w-full border p-2 rounded"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          className="w-full border p-2 rounded"
          value={formData.description}
          onChange={handleChange}
        />
        <input
          type="text"
          name="price"
          placeholder="Price"
          className="w-full border p-2 rounded"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          className="w-full border p-2 rounded"
          value={formData.location}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="type"
          placeholder="Property Type (e.g., villa, apartment)"
          className="w-full border p-2 rounded"
          value={formData.type}
          onChange={handleChange}
        />
        <input
          type="text"
          name="images"
          placeholder="Image URLs (comma separated)"
          className="w-full border p-2 rounded"
          value={formData.images}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add Property'}
        </button>
      </form>
    </div>
  );
};

export default AddProperty;
