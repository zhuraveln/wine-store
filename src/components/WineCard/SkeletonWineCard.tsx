import React from 'react';
import ContentLoader from 'react-content-loader';

const SkeletonWineCard: React.FC = () => (
  <ContentLoader
    speed={2}
    width={295}
    height={407}
    viewBox="0 0 310 407"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="123" y="358" rx="19" ry="19" width="157" height="49" />
    <rect x="-1" y="373" rx="10" ry="10" width="63" height="25" />
    <rect x="3" y="233" rx="10" ry="10" width="276" height="106" />
    <rect x="80" y="47" rx="15" ry="15" width="44" height="130" />
    <rect x="91" y="-2" rx="9" ry="9" width="18" height="55" />
    <rect x="123" y="55" rx="0" ry="0" width="27" height="46" />
    <rect x="120" y="89" rx="23" ry="23" width="30" height="29" />
    <rect x="133" y="111" rx="0" ry="0" width="6" height="67" />
    <rect x="126" y="170" rx="18" ry="18" width="21" height="9" />
    <rect x="42" y="188" rx="10" ry="10" width="195" height="24" />
  </ContentLoader>
);

export default SkeletonWineCard;
