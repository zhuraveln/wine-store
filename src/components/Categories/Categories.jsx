import React from 'react';
import { useSelector } from 'react-redux';
import { filterSearchSelector } from '../../redux/slices/filterSearchSlice';

import styles from './Categories.module.scss';

const Categories = ({ category, changeCategory }) => {
  const { categories } = useSelector(filterSearchSelector);

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
