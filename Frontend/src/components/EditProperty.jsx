import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateProperty } from '../features/property/propertySlice';
import toast from 'react-hot-toast';

const EditPropertyModal = ({ isOpen, onClose, property, token }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    title: '',
    location: '',
    type: '',
    price: '',
    description: '',
    images: '',
  });

  useEffect(() => {
    if (property) {
      setFormData({
        title: property.title || '',
        location: property.location || '',
        type: property.type || '',
        price: property.price || '',
        description: property.description || '',
        images: property.images ? property.images.join(', ') : '',
      });
    }
  }, [property]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!formData.title || !formData.location || !formData.type || !formData.description) {
      toast.error('Please fill in all required fields');
      return false;
    }

    if (formData.price <= 0) {
      toast.error('Price must be a positive number');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const payload = {
      ...formData,
      price: Number(formData.price),
      images: formData.images
        ? formData.images.split(',').map((url) => url.trim())
        : [],
    };

    try {
      await dispatch(updateProperty({ id: property._id, data: payload, token })).unwrap();
      toast.success('Property updated successfully');
      onClose();
    } catch (err) {
      toast.error(err || 'Failed to update property');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">Edit Property</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="type"
            placeholder="Type"
            value={formData.type}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
            rows={3}
          />
          <textarea
            name="images"
            placeholder="Image URLs (comma separated)"
            value={formData.images}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            rows={2}
          />
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPropertyModal;
