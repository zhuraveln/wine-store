import React, { useEffect, useRef, useState } from 'react';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux';

import Categories from '../../components/Categories/Categories';
import Sort from '../../components/Sort/Sort';
import SkeletonWineCard from '../../components/WineCard/SkeletonWineCard/SkeletonWineCard';
import WineList from '../../components/WineList';
import ShopError from './ShopError/ShopError';

import styles from './Shop.module.scss';
import { useAppDispatch } from '../../redux/store';
import { wineSelector } from '../../redux/wine/selectors';
import { filterSelector } from '../../redux/filter/selectors';
import { filterSliceState, sortTypes } from '../../redux/filter/types';
import { setNextPage, setFetchLimit, setFilters } from '../../redux/filter/slice';
import { fetchAllWine, fetchAllWineCalc } from '../../redux/wine/asyncActions';
import { Status } from '../../redux/wine/types';
import NotFoundWine from './NotFoundWine/NotFoundWine';
import { removeAllWine } from '../../redux/wine/slice';

const Shop: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isUrlSearch = useRef(false);
  const isMounted = useRef(false);

  const { wine, wineStatus, countWineItem } = useSelector(wineSelector);

  const { category, sortBy, search, currentPage, fetchLimit } = useSelector(filterSelector);

  const [fetching, setFetching] = useState(false);

  const limitWineFeching = 8;

  const caltPageFeching = (count: number, limit: number) => {
    return Math.ceil(count / limit);
  };

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
      dispatch(fetchAllWineCalc({ category, sortBy, search, currentPage }));
      dispatch(fetchAllWine({ category, sortBy, search, currentPage, limitWineFeching }));
      dispatch(setNextPage());
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
    console.log(fetchLimit, 'effectScroll');
    dispatch(setFetchLimit(caltPageFeching(countWineItem, limitWineFeching)));

    if (fetching && currentPage <= fetchLimit) {
      dispatch(fetchAllWine({ category, sortBy, search, currentPage, limitWineFeching }));
      dispatch(setNextPage());
    }
  }, [fetching, fetchLimit]);

  const scrollHandler = (e: any) => {
    //TODO
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
      500
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
          {!wine.length ? (
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
