import React, { ReactNode, CSSProperties } from 'react';
import s from './CenterLayout.module.scss';

type LayoutCSS = CSSProperties & {
  '--layout-elements-gap': string;
};

type CenterLayoutProps = {
  center: ReactNode;
  blocksGap?: string;
  elementsGap?: string;
};

const CenterLayout = ({ center, elementsGap }: CenterLayoutProps) => {
  const layoutStyle: LayoutCSS = { '--layout-elements-gap': elementsGap ?? '5px' };

  return (
    <div className={s.center} style={layoutStyle}>
      {center}
    </div>
  );
};

export default CenterLayout;
