import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  createProperty,
  getAllProperties,
  deletePropertyAPI,
  updatePropertyAPI, // ✅ Import update API
} from './propertyAPI';

// ✅ Initial state
const initialState = {
  properties: [],
  loading: false,
  error: null,
};

// ✅ Thunks
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
  async ({ id, token }, thunkAPI) => {
    try {
      await deletePropertyAPI(id, token);
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to delete property');
    }
  }
);

// ✅ New: Update property thunk
export const updateProperty = createAsyncThunk(
  'property/update',
  async ({ id, data, token }, thunkAPI) => {
    try {
      const updated = await updatePropertyAPI(id, data, token);
      return updated;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to update property');
    }
  }
);

// ✅ Slice
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

      .addCase(deleteProperty.fulfilled, (state, action) => {
        state.properties = state.properties.filter(p => p._id !== action.payload);
      })
      .addCase(deleteProperty.rejected, (state, action) => {
        state.error = action.payload;
      })

      // ✅ Update case handling
      .addCase(updateProperty.fulfilled, (state, action) => {
        state.properties = state.properties.map((property) =>
          property._id === action.payload._id ? action.payload : property
        );
      })
      .addCase(updateProperty.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default propertySlice.reducer;
