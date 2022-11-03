import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { cartItemSelector, cartSelector } from '../../redux/cart/selectors'
import { addItem } from '../../redux/cart/slice'
import { CartItem } from '../../redux/cart/types'
import { Status, WineItem } from '../../redux/wine/types'

import styles from './WineCard.module.scss'

const WineCard: React.FC<WineItem> = ({
  id,
  imageUrl,
  title,
  bottleTypes,
  bottleSizes,
  price
}) => {
  const dispatch = useDispatch()

  const [selectType, setSelectType] = useState(bottleTypes[0])
  const [selectSize, setSelectSize] = useState(bottleSizes[0])

  const cartItem = useSelector(cartItemSelector(id, selectType, selectSize))
  const { uploadStatus } = useSelector(cartSelector)

  const bottlePrice = selectType === 'Стеклянная бутылка' ? 250 : 0

  // const userData = useSelector(userDataSelector)
  // const { items, totalPrice } = useSelector(cartSelector)

  const onClickAdd = (): void => {
    if (uploadStatus === Status.SUCCESS) {
      const item: CartItem = {
        id,
        imageUrl,
        title,
        bottleType: selectType,
        bottleSize: selectSize,
        price: Math.round(price * selectSize) + bottlePrice,
        count: 1
      }
      dispatch(addItem(item))
    }

    // userData
    //   ? dispatch(uploadCartItem({ cart: userData.cart, item }))
    //   : dispatch(addItem(item))
  }

  return (
    <div className={styles.root}>
      <Link to={`/wine/${id}`}>
        <img className={styles.image} src={imageUrl} alt='wine' />
        <h4 className={styles.title}>{title}</h4>
      </Link>
      <div className={styles.selector}>
        <ul>
          {bottleTypes.map((type, index) => (
            <li
              className={selectType === type ? `${styles.active}` : ''}
              onClick={() => setSelectType(type)}
              key={index}
            >
              {type}
            </li>
          ))}
        </ul>
        <ul>
          {bottleSizes.map((size, index) => (
            <li
              className={selectSize === size ? `${styles.active}` : ''}
              onClick={() => setSelectSize(size)}
              key={index}
            >
              {size} л.
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.bottom}>
        <div className={styles.price}>
          {Math.round(price * selectSize) + bottlePrice}₽
        </div>
        <button onClick={onClickAdd} className={styles.buttonAdd}>
          <svg
            width='12'
            height='12'
            viewBox='0 0 12 12'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z'
              fill='white'
            />
          </svg>
          <span>Добавить</span>
          {cartItem && <i>{cartItem.count}</i>}
        </button>
      </div>
    </div>
  )
}

export default WineCard
