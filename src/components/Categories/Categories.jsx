import React from 'react';
import { useSelector } from 'react-redux';

import styles from './Categories.module.scss';

const Categories = ({ category, changeCategory }) => {
  const { categories } = useSelector((state) => state.filterSearch);

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
