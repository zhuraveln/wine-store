import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import ShopError from '../../pages/Shop/ShopError/ShopError'
import { userDataSelector } from '../../redux/auth/selectors'
import { uploadCart } from '../../redux/cart/asyncActions'
import { cartItemSelector, cartSelector } from '../../redux/cart/selectors'
import { addItem } from '../../redux/cart/slice'
import { CartItem } from '../../redux/cart/types'

import { useAppDispatch } from '../../redux/store'
import { fetchOneWine } from '../../redux/wine/asyncActions'
import { wineSelector } from '../../redux/wine/selectors'
import { Status } from '../../redux/wine/types'
import SkeletonWineCard from '../WineCard/SkeletonWineCard/SkeletonWineCard'

import styles from './FullWine.module.scss'

const FullWine: React.FC = () => {
  const dispatch = useAppDispatch()

  const { selectWine, selectWineStatus } = useSelector(wineSelector)

  const { imageUrl, title, bottleTypes, bottleSizes, price } = selectWine
  const { id } = useParams() as { id: string }

  const [selectType, setSelectType] = useState('Стеклянная бутылка')
  const [selectSize, setSelectSize] = useState(1)

  const bottlePrice = selectType === 'Стеклянная бутылка' ? 250 : 0

  const cartItem = useSelector(cartItemSelector(id, selectType, selectSize))

  const isMounted = useRef(false)
  const { items, totalPrice } = useSelector(cartSelector)
  const userData = useSelector(userDataSelector)

  useEffect(() => {
    if (isMounted.current) {
      if (userData) {
        dispatch(uploadCart({ cart: userData.cart, items, totalPrice }))
      }
    }

    isMounted.current = true
  }, [totalPrice])

  const onClickAdd = (): void => {
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

  useEffect(() => {
    dispatch(fetchOneWine({ id }))
  }, [])

  return (
    <>
      {selectWineStatus === Status.ERROR ? (
        <ShopError />
      ) : (
        <>
          {selectWineStatus === Status.LOADING ? (
            [...new Array(1)].map((_, index) => (
              <SkeletonWineCard key={index} />
            ))
          ) : (
            <div className={styles.root}>
              <Link to='/' className={styles.buttonBack}>
                <svg viewBox='0 0 96 96' xmlns='http://www.w3.org/2000/svg'>
                  <path d='M39.3756,48.0022l30.47-25.39a6.0035,6.0035,0,0,0-7.6878-9.223L26.1563,43.3906a6.0092,6.0092,0,0,0,0,9.2231L62.1578,82.615a6.0035,6.0035,0,0,0,7.6878-9.2231Z' />
                </svg>
                <span>Вернуться в магазин</span>
              </Link>
              <div className={styles.info}>
                <img className={styles.image} src={imageUrl} alt='Wine logo' />
                <div className={styles.description}>
                  <h2 className={styles.title}>{title}</h2>
                  <p className={styles.text}>
                    Лучшее вино сделанное в лучшем городе из лучшего винограда
                    лучшими людьми в лучшем расположении духа в лучшие года
                    своей жизни.
                  </p>
                </div>
                <div className={styles.options}>
                  <div className={styles.selector}>
                    <ul>
                      {bottleTypes.map((type, index) => (
                        <li
                          className={
                            selectType === type ? `${styles.active}` : ''
                          }
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
                          className={
                            selectSize === size ? `${styles.active}` : ''
                          }
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
                      {Math.round(price * selectSize) + bottlePrice} ₽
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
              </div>
            </div>
          )}
        </>
      )}
    </>
  )
}

export default FullWine
