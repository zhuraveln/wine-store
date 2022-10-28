import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import CartItem from './CartItem/CartItem'
import CartEmpty from './CartEmpty/CartEmpty'

import styles from './Cart.module.scss'
import { cartSelector } from '../../redux/cart/selectors'
import Modal from '../../components/Modal/Modal'
import { clearCart } from '../../redux/cart/slice'

const Cart: React.FC = () => {
  const dispatch = useDispatch()

  const [modalVisible, modalSetVisible] = useState(false)

  const { items, totalPrice } = useSelector(cartSelector)

  const totalCount = items.reduce((sum, item) => sum + item.count, 0)

  const clearAll = () => dispatch(clearCart())

  if (!totalCount) return <CartEmpty />

  return (
    <div className={styles.root}>
      <div className={styles.top}>
        <div className={styles.title}>
          <svg
            height='48'
            viewBox='0 0 48 48'
            width='48'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path d='M0 0h48v48H0z' fill='none' />
            <path d='M34.42 18L25.66 4.89c-.38-.58-1.02-.85-1.66-.85-.64 0-1.28.28-1.66.85L13.58 18H4c-1.1 0-2 .9-2 2 0 .19.03.37.07.54l5.07 18.54C7.61 40.76 9.16 42 11 42h26c1.84 0 3.39-1.24 3.85-2.93l5.07-18.54c.05-.16.08-.34.08-.53 0-1.1-.9-2-2-2h-9.58zM18 18l6-8.8 6 8.8H18zm6 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z' />
          </svg>
          <h2>Корзина</h2>
        </div>
        <div className={styles.clear}>
          <svg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'>
            <g data-name='1' id='_1'>
              <path d='M356.65,450H171.47a41,41,0,0,1-40.9-40.9V120.66a15,15,0,0,1,15-15h237a15,15,0,0,1,15,15V409.1A41,41,0,0,1,356.65,450ZM160.57,135.66V409.1a10.91,10.91,0,0,0,10.9,10.9H356.65a10.91,10.91,0,0,0,10.91-10.9V135.66Z' />
              <path d='M327.06,135.66h-126a15,15,0,0,1-15-15V93.4A44.79,44.79,0,0,1,230.8,48.67h66.52A44.79,44.79,0,0,1,342.06,93.4v27.26A15,15,0,0,1,327.06,135.66Zm-111-30h96V93.4a14.75,14.75,0,0,0-14.74-14.73H230.8A14.75,14.75,0,0,0,216.07,93.4Z' />
              <path d='M264.06,392.58a15,15,0,0,1-15-15V178.09a15,15,0,1,1,30,0V377.58A15,15,0,0,1,264.06,392.58Z' />
              <path d='M209.9,392.58a15,15,0,0,1-15-15V178.09a15,15,0,0,1,30,0V377.58A15,15,0,0,1,209.9,392.58Z' />
              <path d='M318.23,392.58a15,15,0,0,1-15-15V178.09a15,15,0,0,1,30,0V377.58A15,15,0,0,1,318.23,392.58Z' />
              <path d='M405.81,135.66H122.32a15,15,0,0,1,0-30H405.81a15,15,0,0,1,0,30Z' />
            </g>
          </svg>
          <p onClick={() => modalSetVisible(true)}>Очистить корзину</p>
        </div>
      </div>

      <div className='cart__items'>
        {items && items.map(item => <CartItem {...item} key={item.id} />)}
      </div>

      <div className={styles.bottom}>
        <div className={styles.details}>
          <p>
            Всего товаров: <b>{totalCount} шт.</b>
          </p>
          <p>
            Сумма заказа: <b>{totalPrice} ₽</b>
          </p>
        </div>
        <div className={styles.buttons}>
          <Link
            to='/'
            onClick={() => window.scrollTo(0, 0)}
            className={styles.buttonBack}
          >
            <svg viewBox='0 0 96 96' xmlns='http://www.w3.org/2000/svg'>
              <path d='M39.3756,48.0022l30.47-25.39a6.0035,6.0035,0,0,0-7.6878-9.223L26.1563,43.3906a6.0092,6.0092,0,0,0,0,9.2231L62.1578,82.615a6.0035,6.0035,0,0,0,7.6878-9.2231Z' />
            </svg>
            <span>Вернуться в магазин</span>
          </Link>
          <Link
            to='/cart/confirm'
            onClick={clearAll}
            className={styles.buttonPay}
          >
            <span>Оплатить сейчас</span>
          </Link>
        </div>
      </div>
      <Modal
        text={'Вы точно хотите очистить корзину?'}
        visible={modalVisible}
        setVisible={modalSetVisible}
      />
    </div>
  )
}

export default Cart
