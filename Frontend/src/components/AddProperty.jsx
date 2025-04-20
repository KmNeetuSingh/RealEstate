import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addProperty } from '../features/property/propertySlice';
import { toast } from 'react-hot-toast';

const AddProperty = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, success, error } = useSelector((state) => state.property);

  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const imagesInput = watch('images');
  const [previewUrls, setPreviewUrls] = useState([]);

  useEffect(() => {
    if (imagesInput) {
      const urls = imagesInput.split(',').map((url) => url.trim());
      setPreviewUrls(urls);
    }
  }, [imagesInput]);

  useEffect(() => {
    if (success) {
      toast.success('Property added successfully!');
      navigate('/dashboard');
    }
    if (error) {
      toast.error(error);
    }
  }, [success, error, navigate]);

  const onSubmit = (data) => {
    const propertyData = {
      ...data,
      price: Number(data.price),
      images: data.images.split(',').map((url) => url.trim()),
    };

    dispatch(addProperty({ data: propertyData, token }));
    reset();
    setPreviewUrls([]);
  };

  if (!token) return <p className="p-6 text-red-600">Please login to access this page.</p>;
  if (user?.role !== 'admin') return <p className="p-6 text-red-600">Only admins can access this page.</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-purple-700">Add New Property</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        <input
          type="text"
          placeholder="Property Title"
          className="w-full border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
          {...register('title', { required: 'Title is required' })}
        />
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}

        <textarea
          placeholder="Description"
          className="w-full border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
          {...register('description')}
        />

        <input
          type="number"
          placeholder="Price"
          className="w-full border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
          {...register('price', { required: 'Price is required' })}
        />
        {errors.price && <p className="text-red-500">{errors.price.message}</p>}

        <input
          type="text"
          placeholder="Location"
          className="w-full border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
          {...register('location', { required: 'Location is required' })}
        />
        {errors.location && <p className="text-red-500">{errors.location.message}</p>}

        <select
          className="w-full border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
          {...register('type', { required: 'Property type is required' })}
        >
          <option value="">Select Property Type</option>
          <option value="Villa">Villa</option>
          <option value="Apartment">Apartment</option>
          <option value="Studio">Studio</option>
          <option value="Bungalow">Bungalow</option>
        </select>
        {errors.type && <p className="text-red-500">{errors.type.message}</p>}

        <input
          type="text"
          placeholder="Image URLs (comma separated)"
          className="w-full border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
          {...register('images')}
        />

        {previewUrls.length > 0 && (
          <div className="grid grid-cols-2 gap-4">
            {previewUrls.map((url, i) => (
              <img
                key={i}
                src={url}
                alt={`Preview ${i + 1}`}
                className="w-full h-32 object-cover rounded-xl border border-purple-300"
              />
            ))}
          </div>
        )}

        <button
          type="submit"
          className="bg-yellow-500 text-white px-5 py-3 rounded-xl hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-purple-300 transition"
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add Property'}
        </button>
      </form>
    </div>
  );
};

export default AddProperty;
