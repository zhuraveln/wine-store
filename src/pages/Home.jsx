import React, { useEffect, useState } from 'react'
import WineService from '../API/WineService'
import Categories from '../components/Categories/Categories'
import Sort from '../components/Sort/Sort'
import SkeletonWineCard from '../components/WineCard/SkeletonWineCard'
import WineList from '../components/WineList'

import { useSelector, useDispatch } from 'react-redux'
import { setCategory, setSort } from '../redux/slices/filterSearchSlice'

const Home = () => {

  const dispatch = useDispatch()

  const [wine, setWine] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const { selectCategory, selectSort, searchValue } = useSelector(state => state.filterSearch)

  const changeCategory = (category) => {
    dispatch(setCategory(category))
  }

  const changeSort = (sortType) => {
    dispatch(setSort(sortType))
  }

  useEffect(() => {
    fetchWine(selectCategory, selectSort, searchValue)
    window.scrollTo(0, 0)
  }, [selectCategory, selectSort, searchValue])

  const fetchWine = async (category, sort, searchValue) => {
    setIsLoading(true)
    const wine = await WineService.getWine(category, sort, searchValue)
    setWine(wine)
    setIsLoading(false)
  }

  const skeletons = [...new Array(8)].map((_, index) => < SkeletonWineCard key={index} />)

  return (
    <>
      <div className="content__top">
        <Categories category={selectCategory} changeCategory={changeCategory} />
        <Sort sort={selectSort} changeSort={changeSort} />
      </div>
      <h2 className="content__title">{selectCategory === 'Все' ? 'Все вина' : selectCategory}</h2>
      <div className="content__items">
        {isLoading
          ? skeletons
          : <WineList wine={wine} />
        }
      </div>
    </>
  )
}

export default Home