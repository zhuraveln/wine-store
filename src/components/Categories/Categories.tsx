import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterSelector, setCategory } from '../../redux/slices/filterSlice';
import { categories } from '../../redux/slices/filterSlice';

import styles from './Categories.module.scss';

const Categories: React.FC = () => {
  const dispatch = useDispatch();

  const { category } = useSelector(filterSelector);

  const changeCategory = (value: string) => {
    dispatch(setCategory(value));
  };

  return (
    <div className={styles.root}>
      <ul>
        {categories.map((value, index) => (
          <li
            className={category === value ? `${styles.active}` : ''}
            onClick={() => changeCategory(value)}
            key={index}
          >
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
