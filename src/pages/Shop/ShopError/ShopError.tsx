import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { setSearch } from '../../../redux/filter/slice'

import styles from './ShopError.module.scss'

const ShopError: React.FC = () => {
  const dispatch = useDispatch()

  const onClickRestart = () => {
    dispatch(setSearch(''))
    window.location.reload()
  }

  return (
    <div className={styles.empty}>
      <h2>Произошла ошибка при загрузке 😕</h2>
      <p>Перезагрузите страницу или позвоните нам</p>
      <img src='/img/empty-cart.png' alt='Empty cart' />
      <Link to='/' onClick={onClickRestart} className={styles.buttonBack}>
        <span>Перезагрузить</span>
      </Link>
    </div>
  )
}

export default ShopError
