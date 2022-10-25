import { RootState } from '../store';

export const cartSelector = (state: RootState) => state.cart;

export const cartItemSelector =
  (id: string, bottleType: string, bottleSize: number) => (state: RootState) =>
    state.cart.items.find(
      (item) => item.id === id && item.bottleType === bottleType && item.bottleSize === bottleSize,
    );
