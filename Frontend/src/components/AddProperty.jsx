import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addProperty } from '../features/property/propertySlice';
import { toast } from 'react-hot-toast';
import Slider from 'react-slick';

// Import react-slick styles
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

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
      toast.success('Property added successfully! 🎉');
      navigate('/properties');
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

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-yellow-100 to-pink-100 p-6 flex items-center justify-center">
      <div className="w-full max-w-2xl backdrop-blur-lg bg-white/30 border border-white/40 shadow-2xl p-8 rounded-3xl">
        <h1 className="text-2xl font-bold mb-6 text-purple-700">Add New Property</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          <input
            type="text"
            placeholder="Property Title"
            className="w-full border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white/60 backdrop-blur-sm"
            {...register('title', { required: 'Title is required' })}
          />
          {errors.title && <p className="text-red-500">{errors.title.message}</p>}

          <textarea
            placeholder="Description"
            className="w-full border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white/60 backdrop-blur-sm"
            {...register('description')}
          />

          <input
            type="number"
            placeholder="Price"
            className="w-full border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white/60 backdrop-blur-sm"
            {...register('price', { required: 'Price is required' })}
          />
          {errors.price && <p className="text-red-500">{errors.price.message}</p>}

          <input
            type="text"
            placeholder="Location"
            className="w-full border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white/60 backdrop-blur-sm"
            {...register('location', { required: 'Location is required' })}
          />
          {errors.location && <p className="text-red-500">{errors.location.message}</p>}

          <select
            className="w-full border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white/60 backdrop-blur-sm"
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
            className="w-full border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white/60 backdrop-blur-sm"
            {...register('images')}
          />

          {previewUrls.length > 0 && (
            <div className="mt-4 rounded-xl overflow-hidden">
              <Slider {...sliderSettings}>
                {previewUrls.map((url, i) => (
                  <div key={i} className="px-2">
                    <img
                      src={url}
                      alt={`Preview ${i + 1}`}
                      className="w-full h-64 object-cover rounded-xl border border-purple-300"
                    />
                  </div>
                ))}
              </Slider>
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
    </div>
  );
};

export default AddProperty;
