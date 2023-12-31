import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000';

const createAsyncAction = (type, request) => {
  return createAsyncThunk(type, async (arg, thunkAPI) => {
    try {
      const response = await request(arg);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue({
        message: e.response.data.message,
        status: e.response.status,
      });
    }
  });
};
const createAsyncCommonThunk = (type, url, method) => {
  return createAsyncThunk(type, async (data, thunkAPI) => {
    try {
      const response = await axios[method](`api/${url}`, data);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue({
        message: e.response.data.message,
        status: e.response.status,
      });
    }
  });
};
const createAsyncParamsThunk = (type, url, method) => {
  return createAsyncThunk(type, async (params, thunkAPI) => {
    try {
      const response = await axios[method](`api/${url}`, { params });
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue({
        message: e.response.data.message,
        status: e.response.status,
      });
    }
  });
};
export const addImages = createAsyncThunk(
  'add/images',
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(
        `api/products/images/${formData.get('id')}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue({
        message: e.response.data.message,
        status: e.response.status,
      });
    }
  }
);
export const publishProduct = createAsyncThunk(
  'publich/product',
  async (id, thunkAPI) => {
    try {
      const response = await axios.patch(`api/products/publish/${id}`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue({
        message: e.response.data.message,
        status: e.response.status,
      });
    }
  }
);
export const getProductById = createAsyncThunk(
  'get/product',
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`api/products/id/${id}`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue({
        message: e.response.data.message,
        status: e.response.status,
      });
    }
  }
);
export const removeImages = createAsyncThunk(
  'remove/product.image',
  async ({ id, images }, thunkAPI) => {
    try {
      const response = await axios.delete(`api/products/images/${id}`, {
        data: images,
      });
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue({
        message: e.response.data.message,
        status: e.response.status,
      });
    }
  }
);
export const addHookah = createAsyncCommonThunk(
  'create/hookahs',
  'products/hookahs',
  'post'
);
export const addTobacco = createAsyncCommonThunk(
  'create/tobacco',
  'products/tobacco',
  'post'
);
export const addCoal = createAsyncCommonThunk(
  'create/coals',
  'products/coals',
  'post'
);
export const addAccessory = createAsyncCommonThunk(
  'create/accessory',
  'products/accessories',
  'post'
);
export const getAllProducts = createAsyncParamsThunk(
  'get/all',
  'products',
  'get'
);
export const getHookahs = createAsyncParamsThunk(
  'get/hookahs',
  'products/hookahs',
  'get'
);
export const getTobacco = createAsyncParamsThunk(
  'get/tobacco',
  'products/tobacco',
  'get'
);
export const getCoals = createAsyncParamsThunk(
  'get/coals',
  'products/coals',
  'get'
);
export const getAccessories = createAsyncParamsThunk(
  'get/accessories',
  'products/accessories',
  'get'
);
export const updateHookah = createAsyncAction('update/hookahs', async data => {
  return await axios.patch(`api/products/hookahs/${data.id}`, { ...data });
});
export const updateTobacco = createAsyncAction('update/tobacco', async data => {
  return await axios.patch(`api/products/tobacco/${data.id}`, { ...data });
});
export const updateCoal = createAsyncAction('update/coals', async data => {
  return await axios.patch(`api/products/coals/${data.id}`, { ...data });
});
export const updateAccessory = createAsyncAction(
  'update/accessory',
  async data => {
    return await axios.patch(`api/products/accessories/${data.id}`, {
      ...data,
    });
  }
);
export const deleteProduct = createAsyncThunk(
  'delete/product',
  async (id, thunkAPI) => {
    try {
      await axios.delete(`api/products/${id}`);
      return id;
    } catch (e) {
      return thunkAPI.rejectWithValue({
        message: e.response.data.message,
        status: e.response.status,
      });
    }
  }
);
