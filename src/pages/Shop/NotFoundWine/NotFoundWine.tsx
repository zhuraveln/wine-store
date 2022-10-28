import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { setSearch } from '../../../redux/filter/slice'

import styles from './NotFoundWine.module.scss'

const NotFoundWine: React.FC = () => {
  const dispatch = useDispatch()

  const clickBack = () => {
    dispatch(setSearch(''))
  }

  return (
    <div className={styles.empty}>
      <h2>К сожалению, у нас нет такого вина 😕</h2>
      <p>Но вы можете попробовать чачу!</p>
      <img src='/img/empty-cart.png' alt='Empty cart' />
      <Link to='/' onClick={clickBack} className={styles.buttonBack}>
        <span>Вернуться в магазин</span>
      </Link>
    </div>
  )
}

export default NotFoundWine
