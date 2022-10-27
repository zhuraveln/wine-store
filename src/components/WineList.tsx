import React from 'react';
import { WineItem } from '../redux/wine/types';
import SkeletonWineCard from './WineCard/SkeletonWineCard/SkeletonWineCard';

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
