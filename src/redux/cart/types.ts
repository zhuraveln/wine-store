export type CartItem = {
  id: string;
  imageUrl: string;
  title: string;
  bottleType: string;
  bottleSize: number;
  price: number;
  count: number;
};

export interface CartSliceState {
  items: CartItem[];
  totalPrice: number;
}

export const initialState: CartSliceState = {
  items: [],
  totalPrice: 0,
};
