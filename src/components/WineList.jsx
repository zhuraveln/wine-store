import React from 'react'
import WineCard from './WineCard/WineCard'

const WineList = ({ wine }) => {

  return (
    <>
      {wine.map(item =>
        <WineCard {...item} key={item._id} />
      )}
    </>
  )
}

export default WineList