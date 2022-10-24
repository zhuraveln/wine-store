import { createAsyncThunk } from '@reduxjs/toolkit';
import WineAPI from '../../API/WineAPI';
import { fetchAllWineParams } from './types';

export const fetchAllWine = createAsyncThunk(
  'wine/fetchAllWineStatus',
  async (params: fetchAllWineParams) => {
    const { category, sortBy, search } = params;

    const data = await WineAPI.getAllWine(category, sortBy, search);
    return data;
  },
);

export const fetchOneWine = createAsyncThunk(
  'wine/fetchOneWineStatus',
  async (params: Record<string, string>) => {
    const { id } = params;
    const data = await WineAPI.getOneWine(id);

    return data;
  },
);
