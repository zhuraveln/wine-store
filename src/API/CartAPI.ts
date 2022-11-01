import axios from 'axios'
import { CartItem } from '../redux/cart/types'

export default class CartAPI {
  // Get Cart
  static async fetchGetCart(cart: string) {
    const response = await axios.post(
      // TODO args
      `${process.env.REACT_APP_SERVER_AUTH}/cart/get`,
      {
        cart
      }
    )

    return response.data
  }

  // Upload Cart
  static async fetchUploadCart(
    cart: string,
    items: CartItem[],
    totalPrice: number
  ) {
    const response = await axios.post(
      // TODO args
      `${process.env.REACT_APP_SERVER_AUTH}/cart/upload`,
      {
        cart,
        items,
        totalPrice
      }
    )

    return response.data
  }

  // Upload Cart Item
  static async fetchUploadCartItem(cart: string, item: CartItem) {
    const response = await axios.post(
      `${process.env.REACT_APP_SERVER_AUTH}/cart/upload-item`,
      {
        cart,
        item
      }
    )

    return response.data
  }
}
