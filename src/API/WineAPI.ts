import axios from 'axios';
import { SortType } from '../redux/slices/filterSlice';
import { WineItem } from '../redux/slices/wineSlice';

export default class WineAPI {
  // Get All Wine from server
  static async getAllWine(category: string, sortBy: SortType, search: string) {
    const categoryType = category !== 'Все' ? `category=${category}` : '';

    const sortType = sortBy.sortProperty.replace('-', '');
    const orderType = sortBy.sortProperty.includes('-') ? 'asc' : 'desc';

    const response = await axios.get<WineItem[]>(
      // process.env.REACT_APP_API_URL
      // // ||
      // `http://localhost:${process.env.REACT_APP_PORT}/`
      // ||
      `${process.env.REACT_APP_MOCK_API}?${categoryType}&sortBy=${sortType}&order=${orderType}&search=${search}`,
    );

    return response.data;
  }

  // Get One Wine from server
  static async getOneWine(id: string) {
    const response = await axios.get<WineItem>(`${process.env.REACT_APP_MOCK_API}/${id}`);
    return response.data;
  }
}
