import React from 'react';
import { Link } from 'react-router-dom';

import styles from './ConfirmPurchase.module.scss';

const ConfirmPurchase: React.FC = () => {
  return (
    <div className={styles.empty}>
      <h2>Спасибо за заказ!</h2>
      <p>Ваше вино уже скоро будет у вас!</p>
      <img src="/img/empty-cart.png" alt="Empty cart" />
      <Link to="/" className={styles.buttonBack}>
        <svg viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg">
          <path d="M39.3756,48.0022l30.47-25.39a6.0035,6.0035,0,0,0-7.6878-9.223L26.1563,43.3906a6.0092,6.0092,0,0,0,0,9.2231L62.1578,82.615a6.0035,6.0035,0,0,0,7.6878-9.2231Z" />
        </svg>
        <span>Вернуться в магазин</span>
      </Link>
    </div>
  );
};

export default ConfirmPurchase;
