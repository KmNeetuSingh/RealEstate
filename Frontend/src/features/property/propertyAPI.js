import axios from 'axios';

const API_URL = 'http://localhost:3000/api/properties';

export const createProperty = async (propertyData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, propertyData, config);
  return response.data;
};

export const getAllProperties = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};
