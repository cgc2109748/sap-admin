import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import productLogsService from './productLogsService';

const initialState = {
  productLogs: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Create new productLogs
export const createProductLogs = createAsyncThunk('productLogs/create', async (productLogsData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await productLogsService.createProductLog(productLogsData, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Get user productLogs
export const getProductLogs = createAsyncThunk('productLogs/getAll', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await productLogsService.getProductLogs(token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Delete user productLogs
export const deleteProductLogs = createAsyncThunk('productLogs/delete', async (id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await productLogsService.deleteProductLogs(id, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const productLogsSlice = createSlice({
  name: 'productLogs',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProductLogs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProductLogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.productLogs.push(action.payload);
      })
      .addCase(createProductLogs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getProductLogs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductLogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.productLogs = action.payload;
      })
      .addCase(getProductLogs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteProductLogs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProductLogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.productLogs = state.productLogs.filter((productLogs) => productLogs._id !== action.payload.id);
      })
      .addCase(deleteProductLogs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = productLogsSlice.actions;
export default productLogsSlice.reducer;
