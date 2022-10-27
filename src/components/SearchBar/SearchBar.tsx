import React, { useCallback, useEffect, useRef, useState } from 'react';
import debounce from 'lodash.debounce';

import styles from './SearchBar.module.scss';

import { useDispatch, useSelector } from 'react-redux';
import { setSearch } from '../../redux/filter/slice';
import { filterSelector } from '../../redux/filter/selectors';
import { removeAllWine } from '../../redux/wine/slice';

const SearchBar: React.FC = () => {
  const dispatch = useDispatch();
  const { search } = useSelector(filterSelector);

  const inputRef = useRef<HTMLInputElement>(null);

  const [viewValue, setViewValue] = useState('');

  const onClickClear = () => {
    dispatch(removeAllWine());
    dispatch(setSearch(''));
    setViewValue('');
    inputRef.current?.focus();
  };

  const updateSearchValue = useCallback(
    debounce((value) => {
      dispatch(removeAllWine());
      dispatch(setSearch(value));
    }, 500),
    [],
  );

  const changeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setViewValue(value);
    updateSearchValue(value);
  };

  useEffect(() => {
    setViewValue(search);
  }, [search]);

  return (
    <div className={styles.root}>
      <div className={styles.inputBar}>
        <svg className={styles.searchIcon} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <title />
          <path d="M29.71,28.29l-6.5-6.5-.07,0a12,12,0,1,0-1.39,1.39s0,.05,0,.07l6.5,6.5a1,1,0,0,0,1.42,0A1,1,0,0,0,29.71,28.29ZM14,24A10,10,0,1,1,24,14,10,10,0,0,1,14,24Z" />
        </svg>

        <input ref={inputRef} placeholder="Поиск вина" value={viewValue} onChange={changeValue} />

        <svg
          onClick={onClickClear}
          className={styles.deleteIcon}
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M5.92001 3.84V5.76V8.64C5.92001 9.17016 5.49017 9.6 4.96001 9.6C4.42985 9.6 4.00001 9.17016 4.00001 8.64L4 5.76L4.00001 3.84V0.96C4.00001 0.42984 4.42985 0 4.96001 0C5.49017 0 5.92001 0.42984 5.92001 0.96V3.84Z"></path>
          <path d="M5.75998 5.92001L3.83998 5.92001L0.959977 5.92001C0.429817 5.92001 -2.29533e-05 5.49017 -2.29301e-05 4.96001C-2.2907e-05 4.42985 0.429817 4.00001 0.959977 4.00001L3.83998 4L5.75998 4.00001L8.63998 4.00001C9.17014 4.00001 9.59998 4.42985 9.59998 4.96001C9.59998 5.49017 9.17014 5.92001 8.63998 5.92001L5.75998 5.92001Z"></path>
        </svg>
      </div>
    </div>
  );
};

export default SearchBar;
