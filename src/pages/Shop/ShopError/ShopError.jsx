import React from 'react'
import { Link } from 'react-router-dom';

import styles from './ShopError.module.scss';

const ShopError = () => {
  return (
    <div className={styles.empty}>
      <h2>Произошла ошибка при загрузке 😕</h2>
      <p>Перезагрузите страницу или позвоните нам</p>
      <img src="/img/empty-cart.png" alt="Empty cart" />
      <Link to="/" className={styles.buttonBack}>
        <span>Позвонить</span>
      </Link>
    </div>
  )
}

export default ShopError