import { createAsyncThunk } from '@reduxjs/toolkit'
import CartAPI from '../../API/CartAPI'
import { CartItem, UploadCartItemParams, UploadCartParams } from './types'

// Get Cart
export const getCart = createAsyncThunk(
  'cart/getCartStatus',
  async (cart: string) => {
    const data = await CartAPI.fetchGetCart(cart)

    return data
  }
)

// Upload Cart
export const uploadCart = createAsyncThunk(
  'cart/uploadCartStatus',
  async (params: UploadCartParams) => {
    const { cart, items, totalPrice } = params

    const data = await CartAPI.fetchUploadCart(cart, items, totalPrice)

    return data
  }
)

// Upload Cart Item
export const uploadCartItem = createAsyncThunk(
  'cart/uploadCartItemStatus',
  async (params: UploadCartItemParams) => {
    const { cart, item } = params

    const data = await CartAPI.fetchUploadCartItem(cart, item)

    return data
  }
)
