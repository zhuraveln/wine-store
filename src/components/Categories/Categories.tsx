import React, { memo } from 'react';
import { useDispatch } from 'react-redux';
import { setCategory } from '../../redux/filter/slice';
import { categories } from '../../redux/filter/types';
import { removeAllWine } from '../../redux/wine/slice';

import styles from './Categories.module.scss';

type CategoriesProps = {
  value: string;
};

const Categories: React.FC<CategoriesProps> = memo(({ value }) => {
  const dispatch = useDispatch();

  const category = value;

  const changeCategory = (value: string) => {
    dispatch(removeAllWine());
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
});

export default Categories;
