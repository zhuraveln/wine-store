import React, { useEffect, useRef, useState } from 'react';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux';

import Categories from '../../components/Categories/Categories';
import Sort from '../../components/Sort/Sort';
import SkeletonWineCard from '../../components/WineCard/SkeletonWineCard';
import WineList from '../../components/WineList';
import ShopError from './ShopError/ShopError';

import styles from './Shop.module.scss';
import { useAppDispatch } from '../../redux/store';
import { wineSelector } from '../../redux/wine/selectors';
import { filterSelector } from '../../redux/filter/selectors';
import { filterSliceState, sortTypes } from '../../redux/filter/types';
import { setCurrentPage, setFilters } from '../../redux/filter/slice';
import { fetchAllWine } from '../../redux/wine/asyncActions';
import { Status } from '../../redux/wine/types';
import NotFoundWine from './NotFoundWine/NotFoundWine';
import { removeAllWine } from '../../redux/wine/slice';

const Shop: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isUrlSearch = useRef(false);
  const isMounted = useRef(false);

  const { wine, wineStatus } = useSelector(wineSelector);

  const { category, sortBy, search, currentPage } = useSelector(filterSelector);

  const [fetching, setFetching] = useState(false);

  // First mount. If search bar have a URL data - save it in Redux (filterSlice).
  // If client haven't URL data - does nothing.
  useEffect(() => {
    const searchValue = window.location.search;

    if (searchValue) {
      const params = qs.parse(searchValue.substring(1)) as unknown as filterSliceState;

      const sort = sortTypes.find((obj) => obj.sortProperty === (params.sortBy as unknown));

      dispatch(removeAllWine());
      dispatch(
        setFilters({
          ...params,
          sortBy: sort || sortTypes[0],
        }),
      );

      isUrlSearch.current = true;
    }
  }, [dispatch]);

  // In first mount don't fetch initialState in Redux (filterSlice) if client have URL data.
  // Next mount fetch initialState in Redux (filterSlice).
  useEffect(() => {
    if (!isUrlSearch.current) {
      dispatch(fetchAllWine({ category, sortBy, search, currentPage }));
      dispatch(setCurrentPage());
    }

    isUrlSearch.current = false;
  }, [category, sortBy, search, dispatch]);

  // In first mount don't set URL params to search bar.
  // Next mount set URL params to search bar.
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        category: category,
        sortBy: sortBy.sortProperty,
        search: search,
      });

      navigate(`?${queryString}`);
    }

    isMounted.current = true;
  }, [category, sortBy, search]);

  useEffect(() => {
    if (fetching && currentPage <= 6) {
      dispatch(fetchAllWine({ category, sortBy, search, currentPage }));
      dispatch(setCurrentPage());
    }
  }, [fetching]);

  const scrollHandler = (e: any) => {
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
      150
    ) {
      setFetching(true);
    } else {
      setFetching(false);
    }
  };

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);

    return () => {
      document.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  return (
    <>
      <div className={styles.top}>
        <Categories value={category} />
        <Sort value={sortBy} />
      </div>

      {wineStatus !== Status.ERROR ? (
        <h2 className={styles.title}>{category === 'Все' ? 'Все вина' : category}</h2>
      ) : (
        ''
      )}

      {wineStatus === Status.ERROR ? (
        <ShopError />
      ) : (
        <div className={styles.items}>
          {wineStatus === Status.LOADING ? (
            [...new Array(8)].map((_, index) => <SkeletonWineCard key={index} />)
          ) : wine.length ? (
            <WineList wine={wine} />
          ) : (
            <NotFoundWine />
          )}
        </div>
      )}
    </>
  );
};

export default Shop;
