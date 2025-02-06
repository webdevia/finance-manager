import React, { ReactNode, CSSProperties } from 'react';
import s from './LeftRightLayout.module.scss';

type LayoutCSS = CSSProperties & {
  '--layout-blocks-gap': string;
  '--layout-elements-gap': string;
};

type LeftRightLayoutProps = {
  left?: ReactNode;
  right?: ReactNode;
  blocksGap?: string;
  elementsGap?: string;
};

const LeftRightLayout = ({ left, right, blocksGap, elementsGap }: LeftRightLayoutProps) => {
  const layoutStyle: LayoutCSS = {
    '--layout-blocks-gap': blocksGap ?? '5px',
    '--layout-elements-gap': elementsGap ?? '5px',
  };

  return (
    <div className={s['space-between']} style={layoutStyle}>
      <div>{left}</div>
      <div>{right}</div>
    </div>
  );
};

export default LeftRightLayout;
