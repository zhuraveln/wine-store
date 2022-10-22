import React from 'react';
import { WineItem } from '../redux/slices/wineSlice';
import WineCard from './WineCard/WineCard';

type WineProps = { wine: WineItem[] };

const WineList: React.FC<WineProps> = ({ wine }) => {
  return (
    <>
      {wine.map((item) => (
        <WineCard {...item} key={item.id} />
      ))}
    </>
  );
};

export default WineList;
