import React, { useCallback, useState } from 'react';
import debounce from 'lodash.debounce';

import styles from './SearchBar.module.scss';

import { useDispatch } from 'react-redux';
import { setSearch } from '../../redux/filter/slice';

const SearchBar: React.FC = () => {
  const dispatch = useDispatch();

  const [viewValue, setViewValue] = useState('');

  const updateSearchValue = useCallback(
    debounce((value) => {
      dispatch(setSearch(value));
    }, 500),
    [],
  );

  const changeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setViewValue(value);
    updateSearchValue(value);
  };

  return (
    <>
      <input
        className={styles.root}
        placeholder="Поиск вина"
        value={viewValue}
        onChange={changeValue}
      />
    </>
  );
};

export default SearchBar;
