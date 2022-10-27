import React, { memo, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSort } from '../../redux/filter/slice';
import { SortType, sortTypes } from '../../redux/filter/types';
import { removeAllWine } from '../../redux/wine/slice';

import styles from './Sort.module.scss';

type SortProps = {
  value: SortType;
};

const Sort: React.FC<SortProps> = memo(({ value }) => {
  const dispatch = useDispatch();

  const sortBy = value;
  const sortRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);

  const changeSort = (sortType: SortType) => {
    dispatch(removeAllWine());
    dispatch(setSort(sortType));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const path = event.composedPath();
      if (sortRef.current && !path.includes(sortRef.current)) {
        setOpen(false);
      }
    };

    document.body.addEventListener('click', handleClickOutside);

    return () => document.body.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div ref={sortRef} className={styles.root}>
      <div className={styles.label}>
        <svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
          <rect fill="none" height="256" width="256" />
          <polyline
            fill="none"
            points="144 168 184 208 224 168"
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="24"
          />
          <line
            fill="none"
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="24"
            x1="184"
            x2="184"
            y1="112"
            y2="208"
          />
          <line
            fill="none"
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="24"
            x1="48"
            x2="120"
            y1="128"
            y2="128"
          />
          <line
            fill="none"
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="24"
            x1="48"
            x2="184"
            y1="64"
            y2="64"
          />
          <line
            fill="none"
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="24"
            x1="48"
            x2="104"
            y1="192"
            y2="192"
          />
        </svg>
        <b>Сортировка: </b>
        <span onClick={() => setOpen(!open)}>{sortBy.name}</span>
      </div>
      {open && (
        <div className={styles.popup}>
          <ul>
            {sortTypes.map((obj, index) => (
              <li
                className={sortBy.sortProperty === obj.sortProperty ? `${styles.active}` : ''}
                onClick={() => {
                  changeSort(obj);
                  setOpen(false);
                }}
                key={index}
              >
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
});

export default Sort;
