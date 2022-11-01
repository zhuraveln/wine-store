import React from 'react'

import { useDispatch } from 'react-redux'

import styles from './CartItem.module.scss'
import { Link } from 'react-router-dom'
import { CartItem } from '../../../redux/cart/types'
import {
  addItem,
  removeAllSelectItems,
  removeOneItem
} from '../../../redux/cart/slice'

type CartItemProps = {
  id: string
  imageUrl: string
  title: string
  bottleType: string
  bottleSize: number
  price: number
  count: number
}

const CartItemWine: React.FC<CartItemProps> = ({
  id,
  imageUrl,
  title,
  bottleType,
  bottleSize,
  price,
  count
}) => {
  const dispatch = useDispatch()

  const onBtnPlus = () =>
    dispatch(addItem({ id, bottleType, bottleSize, price } as CartItem))

  const onBtnMinus = () =>
    dispatch(removeOneItem({ id, bottleType, bottleSize } as CartItem))

  const onBtnRemove = () =>
    dispatch(
      removeAllSelectItems({
        id,
        bottleType,
        bottleSize,
        price,
        count
      } as CartItem)
    )

  return (
    <div className={styles.item}>
      <Link to={`/wine/${id}`} className={styles.imgInfo}>
        <img className={styles.imgWine} src={imageUrl} alt='wine' />

        <div className={styles.info}>
          <h3>{title}</h3>
          <p>
            {bottleType} {bottleSize} л.
          </p>
          <b>{price} ₽</b>
        </div>
      </Link>

      <div className={styles.countPriceRemove}>
        <div className={styles.count}>
          <button
            onClick={onBtnMinus}
            className={styles.buttonCount}
            disabled={count === 1}
          >
            <svg
              width='10'
              height='10'
              viewBox='0 0 10 10'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z'
                fill='#EB5A1E'
              ></path>
            </svg>
          </button>

          <b>{count}</b>

          <button onClick={onBtnPlus} className={styles.buttonCount}>
            <svg
              width='10'
              height='10'
              viewBox='0 0 10 10'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z'
                fill='#EB5A1E'
              ></path>
              <path
                d='M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z'
                fill='#EB5A1E'
              ></path>
            </svg>
          </button>
        </div>

        <div className={styles.price}>
          <b>{price * count} ₽</b>
        </div>

        <div className={styles.remove}>
          <div onClick={onBtnRemove} className={styles.buttonRemove}>
            <svg
              width='10'
              height='10'
              viewBox='0 0 10 10'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z'
                fill='#EB5A1E'
              ></path>
              <path
                d='M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z'
                fill='#EB5A1E'
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartItemWine
