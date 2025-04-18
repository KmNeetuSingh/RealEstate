import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProperty } from '../features/property/propertySlice';

const AddProperty = () => {
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    price: '',
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
      dispatch(addProperty({ data: formData, token }));
      setFormData({ title: '', location: '', price: '' });
    }
  };

  // ✅ If no token, prompt to login
  if (!token) {
    return <p className="p-6 text-red-600">Please login to access this page.</p>;
  }

  // ✅ If the user is not admin, show a message
  if (user?.role !== 'admin') {
    return <p className="p-6 text-red-600">Only admins can access this page.</p>;
  }

  // ✅ Render form only for admins
  return (
    <div className="p-6 text-black">
      <h1 className="text-2xl font-semibold mb-4">Add New Property</h1>
      <form onSubmit={handleSubmit} className="max-w-md space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Property Title"
          className="w-full border p-2 rounded text-black"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          className="w-full border p-2 rounded text-black"
          value={formData.location}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="price"
          placeholder="Price"
          className="w-full border p-2 rounded text-black"
          value={formData.price}
          onChange={handleChange}
          required
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
