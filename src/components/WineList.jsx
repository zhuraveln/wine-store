import React from 'react'
import { Link } from 'react-router-dom'
import WineCard from './WineCard/WineCard'

const WineList = ({ wine }) => {

  return (
    <>
      {wine.map(item =>
        <WineCard {...item} key={item.id} />
      )}
    </>
  )
}

export default WineList