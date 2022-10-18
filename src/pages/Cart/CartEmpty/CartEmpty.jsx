import React from 'react'
import { Link } from 'react-router-dom';

import styles from './CartEmpty.module.scss';

const CartEmpty = () => {
  return (
    <div className={styles.empty}>
      <h2>Корзина пустая <i>😕</i></h2>
      <p>
        Вы не добавили ещё вино в корзину.<br />
      </p>
      <img src="/img/empty-cart.png" alt="Empty cart" />
      <Link to="/" className="button button--black">
        <span>Вернуться в магазин</span>
      </Link>
    </div>
  )
}

export default CartEmpty