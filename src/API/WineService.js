import axios from 'axios';

export default class WineService {

  static async getWine(category, sort, searchValue) {

    const categoryType = category !== 'Все' ? `category=${category}` : ''
    const sortType = sort.sortProperty.replace('-', '')
    const orderType = sort.sortProperty.includes('-') ? 'desc' : 'asc'

    const response = await axios.get(
      // process.env.REACT_APP_API_URL
      // // || 
      // `http://localhost:${process.env.REACT_APP_PORT}/`
      // ||
      `${process.env.REACT_APP_MOCK_API}?${categoryType}&sortBy=${sortType}&order=${orderType}&search=${searchValue}`
    )

    return response.data
  }


}

