import { Link } from 'react-router-dom';

import styles from './NotFound.module.scss';

const NotFound: React.FC = () => {
  return (
    <div className={styles.empty}>
      <h2>Вы ошиблись, у нас нет такой страницы... 😕</h2>
      <p>Но вы можете перейти в наш магазин вина!</p>
      <img src="/img/empty-cart.png" alt="Empty cart" />
      <Link to="/" className={styles.buttonBack}>
        <span>Перейти в магазин</span>
      </Link>
    </div>
  );
};

export default NotFound;
