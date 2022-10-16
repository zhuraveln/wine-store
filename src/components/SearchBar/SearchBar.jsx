import React, { useCallback, useState } from 'react'
import debounce from 'lodash.debounce'

import styles from './SearchBar.module.scss'

import { useDispatch } from 'react-redux'
import { setSearchValue } from '../../redux/slices/filterSearchSlice'

const SearchBar = () => {

  const dispatch = useDispatch()

  const [viewValue, setViewValue] = useState('')

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateSearchValue = useCallback(
    debounce(value => {
      dispatch(setSearchValue(value))
    }, 500),
    [])

  const changeValue = event => {
    const value = event.target.value

    setViewValue(value)
    updateSearchValue(value)
  }

  return (
    <>
      <input
        className={styles.root} placeholder='Поиск вина'
        value={viewValue}
        onChange={changeValue}
      />
    </>
  )
}

export default SearchBar