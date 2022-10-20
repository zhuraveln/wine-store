import React, { useEffect, useState, useRef } from 'react';
import qs from 'qs';
import { useLocation, useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';

import { setCategory, setSort, setFilters, filterSearchSelector } from '../../../redux/slices/filterSearchSlice';
import { fetchAllWine, wineSelector } from '../../../redux/slices/wineSlice';

import Categories from '../../../components/Categories/Categories';
import Sort from '../../../components/Sort/Sort';
import SkeletonWineCard from '../../../components/WineCard/SkeletonWineCard';
import WineList from '../../../components/WineList';
import ShopError from '../ShopError/ShopError';

import styles from './Shop.module.scss';


const Shop = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isUrlSearch = useRef(false);
  const isMounted = useRef(false);

  const { wine, wineStatus } = useSelector(wineSelector);

  const {
    selectCategory,
    selectSort,
    searchValue,
    sortTypes
  } = useSelector(filterSearchSelector);

  const changeCategory = (category) => {
    dispatch(setCategory(category));
  };

  const changeSort = (sortType) => {
    dispatch(setSort(sortType));
  };

  const fetchWine = (category, sort, searchValue) => {
    dispatch(fetchAllWine({ category, sort, searchValue }));
  };

  // First mount. If search bar have a URL data - save it in Redux (filterSearchSlice).
  // If client haven't URL data - does nothing.
  useEffect(() => {
    const searchValue = window.location.search;

    if (searchValue) {
      const params = qs.parse(searchValue.substring(1));

      const sortBy = sortTypes.find((obj) => obj.sortProperty === params.sortBy);

      dispatch(setFilters({ ...params, sortBy }));

      isUrlSearch.current = true;
    }
  }, []);

  // In first mount don't fetch initialState in Redux (filterSearchSlice) if client have URL data.
  // Next mount fetch initialState in Redux (filterSearchSlice).
  useEffect(() => {
    window.scrollTo(0, 0);

    if (!isUrlSearch.current) {
      fetchWine(selectCategory, selectSort, searchValue);
    }

    isUrlSearch.current = false;
  }, [selectCategory, selectSort, searchValue]);

  // In first mount don't set URL params to search bar. 
  // Next mount set URL params to search bar.
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        category: selectCategory,
        sortBy: selectSort.sortProperty,
        search: searchValue,
      });

      navigate(`?${queryString}`);
    }

    isMounted.current = true;
  }, [selectCategory, selectSort, searchValue]);

  return (
    <>
      <div className={styles.top}>
        <Categories category={selectCategory} changeCategory={changeCategory} />
        <Sort sort={selectSort} changeSort={changeSort} />
      </div>

      <h2 className={styles.title}>
        {selectCategory === 'Все' ? 'Все вина' : selectCategory}
      </h2>

      {wineStatus === 'error'
        ? <ShopError />
        : <div className={styles.items}>
          {wineStatus === 'loading'
            ? [...new Array(8)].map((_, index) => <SkeletonWineCard key={index} />)
            : <WineList wine={wine} />}
        </div>}
    </>
  );
};

export default Shop;
