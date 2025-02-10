import React, { ReactNode, CSSProperties } from 'react';
import s from './LeftRightLayout.module.scss';

type VerticalAlign = 'center' | 'flex-start' | 'flex-end' | 'stretch' | 'baseline';

type LayoutCSS = CSSProperties & {
  '--layout-blocks-gap': string;
  '--layout-elements-gap': string;
  '--layout-vertical-align': VerticalAlign;
};

type LeftRightLayoutProps = {
  left?: ReactNode;
  right?: ReactNode;
  blocksGap?: string;
  elementsGap?: string;
  verticalAlign?: VerticalAlign;
};

const LeftRightLayout = ({ left, right, verticalAlign, blocksGap, elementsGap }: LeftRightLayoutProps) => {
  const layoutStyle: LayoutCSS = {
    '--layout-blocks-gap': blocksGap ?? '5px',
    '--layout-elements-gap': elementsGap ?? '5px',
    '--layout-vertical-align': verticalAlign ?? 'center',
  };

  return (
    <div className={s['space-between']} style={layoutStyle}>
      <div>{left}</div>
      <div>{right}</div>
    </div>
  );
};

export default LeftRightLayout;
