import React, { useEffect, useState, useRef } from 'react';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { setCategory, setSort, setFilters } from '../redux/slices/filterSearchSlice';

import WineService from '../API/WineService';
import Categories from '../components/Categories/Categories';
import Sort from '../components/Sort/Sort';
import SkeletonWineCard from '../components/WineCard/SkeletonWineCard';
import WineList from '../components/WineList';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isUrlSearch = useRef(false);
  const isMounted = useRef(false);

  const [wine, setWine] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const {
    selectCategory,
    selectSort,
    searchValue,
    sortTypes
  } = useSelector(state => state.filterSearch);

  const changeCategory = (category) => {
    dispatch(setCategory(category));
  };

  const changeSort = (sortType) => {
    dispatch(setSort(sortType));
  };

  const fetchWine = async (category, sort, searchValue) => {
    setIsLoading(true);
    const wine = await WineService.getWine(category, sort, searchValue);
    setWine(wine);
    setIsLoading(false);
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

  const skeletons = [...new Array(8)].map((_, index) => <SkeletonWineCard key={index} />);

  return (
    <>
      <div className="content__top">
        <Categories category={selectCategory} changeCategory={changeCategory} />
        <Sort sort={selectSort} changeSort={changeSort} />
      </div>
      <h2 className="content__title">{selectCategory === 'Все' ? 'Все вина' : selectCategory}</h2>
      <div className="content__items">{isLoading ? skeletons : <WineList wine={wine} />}</div>
    </>
  );
};

export default Home;
