import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import productGroupService from './productGroupService';

const initialState = {
  products: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Create new productGroup
export const createProductGroup = createAsyncThunk('productGroups/create', async (productGroupData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await productGroupService.createProductGroup(productGroupData, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Get user productGroup
export const getProductGroups = createAsyncThunk('productGroups/getAll', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await productGroupService.getProductGroups(token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Update  product
export const updateProductGroup = createAsyncThunk('productGroups/update', async (updateProductGroup, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await productGroupService.updateProductGroup(updateProductGroup, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Delete user product
export const deleteProductGroup = createAsyncThunk('productGroups/delete', async (id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await productGroupService.deleteProductGroup(id, token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const productGroupSlice = createSlice({
  name: 'productGroup',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProductGroup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProductGroup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products.push(action.payload);
      })
      .addCase(createProductGroup.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getProductGroups.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductGroups.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products = action.payload;
      })
      .addCase(getProductGroups.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateProductGroup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProductGroup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products = action.payload;
      })
      .addCase(updateProductGroup.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteProductGroup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProductGroup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products = state.products.filter((product) => product._id !== action.payload.id);
      })
      .addCase(deleteProductGroup.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = productGroupSlice.actions;
export default productGroupSlice.reducer;
