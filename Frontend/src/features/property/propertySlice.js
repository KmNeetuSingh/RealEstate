import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createProperty, getAllProperties, deletePropertyById } from './propertyAPI';

const initialState = {
  properties: [],
  loading: false,
  error: null,
};

// Thunks
export const fetchProperties = createAsyncThunk('property/fetchAll', async () => {
  return await getAllProperties();
});

export const addProperty = createAsyncThunk(
  'property/add',
  async ({ data, token }) => {
    return await createProperty(data, token);
  }
);

export const deleteProperty = createAsyncThunk(
  'property/delete',
  async ({ id, token }) => {
    await deletePropertyById(id, token);
    return id;
  }
);

const propertySlice = createSlice({
  name: 'property',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProperties.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProperties.fulfilled, (state, action) => {
        state.loading = false;
        state.properties = action.payload;
      })
      .addCase(fetchProperties.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(addProperty.pending, (state) => {
        state.loading = true;
      })
      .addCase(addProperty.fulfilled, (state, action) => {
        state.loading = false;
        state.properties.push(action.payload);
      })
      .addCase(addProperty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(deleteProperty.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProperty.fulfilled, (state, action) => {
        state.loading = false;
        state.properties = state.properties.filter((p) => p._id !== action.payload);
      })
      .addCase(deleteProperty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default propertySlice.reducer;
