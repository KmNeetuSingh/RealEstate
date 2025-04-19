import axios from 'axios';

const API_URL = 'http://localhost:3000/api/properties';

// Create a new property
export const createProperty = async (propertyData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, propertyData, config);
  return response.data;
};

// Fetch all properties
export const getAllProperties = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// ✅ Delete a property
export const deletePropertyAPI = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(`${API_URL}/${id}`, config);
  return response.data;
};

export const updatePropertyAPI = async (id, data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(`${API_URL}/${id}`, data, config);
  return response.data;
};