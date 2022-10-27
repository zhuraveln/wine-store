import axios from 'axios';
import { SortType } from '../redux/filter/types';
import { WineItem } from '../redux/wine/types';

export default class WineAPI {
  // Get All Wine from server
  static async getAllWine(
    category: string,
    sortBy: SortType,
    search: string,
    currentPage: number,
    limitWineFeching?: number,
  ) {
    const categoryType = category !== 'Все' ? `category=${category}` : '';

    const sortType = sortBy.sortProperty.replace('-', '');
    const orderType = sortBy.sortProperty.includes('-') ? 'asc' : 'desc';

    const response = await axios.get<WineItem[]>(
      // `${process.env.REACT_APP_API_URL}?${categoryType}&sortBy=${sortType}&order=${orderType}&search=${search}` ||
      // `http://localhost:${process.env.REACT_APP_PORT}/`
      // ||
      `${
        process.env.REACT_APP_MOCK_API
      }?${categoryType}&sortBy=${sortType}&order=${orderType}&search=${search}&page=${currentPage}&limit=${
        limitWineFeching ? limitWineFeching : ''
      }`,
    );

    return response.data;
  }

  // Get One Wine from server
  static async getOneWine(id: string) {
    const response = await axios.get<WineItem>(`${process.env.REACT_APP_MOCK_API}/${id}`);

    return response.data;

    // await axios
    //   .get<WineItem>(`${process.env.REACT_APP_MOCK_API}/${id}`)
    //   .then((response) => response.data);
    // .catch((error) => console.log(error.response));

    // return response;
  }
}
