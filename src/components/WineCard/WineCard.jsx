import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { addItem, cartItemSelector } from '../../redux/slices/cartSlice';

import styles from './WineCard.module.scss';

const WineCard = ({ id, imageUrl, title, bottleTypes, bottleSizes, price }) => {
  const dispatch = useDispatch()

  const cartItem = useSelector(cartItemSelector(id))

  const [selectType, setSelectType] = useState(0);
  const [selectSize, setSelectSize] = useState(0);

  const onClickAdd = () => {
    const item = {
      id,
      imageUrl,
      title,
      bottleType: bottleTypes[selectType],
      bottleSize: bottleSizes[selectSize],
      price
    }

    dispatch(addItem(item))
  }

  return (
    <div className={styles.root}>
      <img className={styles.image} src={imageUrl} alt="wine" />
      <h4 className={styles.title}>{title}</h4>
      <div className={styles.selector}>
        <ul>
          {bottleTypes.map((type, index) => (
            <li
              className={selectType === index ? `${styles.active}` : ''}
              onClick={() => setSelectType(index)}
              key={index}
            >
              {type}
            </li>
          ))}
        </ul>
        <ul>
          {bottleSizes.map((size, index) => (
            <li
              className={selectSize === index ? `${styles.active}` : ''}
              onClick={() => setSelectSize(index)}
              key={index}
            >
              {size} л.
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.bottom}>
        <div className={styles.price}>{price} ₽</div>
        <button
          onClick={onClickAdd}
          // className="button button--outline button--add"
          className={styles.buttonAdd}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Добавить</span>
          {cartItem && <i>{cartItem.count}</i>}
        </button>
      </div>
    </div>
  );
};

export default WineCard;
