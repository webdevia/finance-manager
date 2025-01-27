import React, { CSSProperties, ReactNode } from 'react';
import cn from 'clsx';

import shortStyle from '../styles/Shortener.module.scss';
import s from './Title.module.scss';

type Transform = 'capitalize' | 'uppercase';

type TitleCSS = CSSProperties & {
  '--title-transform': Transform;
};

export type TitleProps = {
  children: ReactNode;
  transform?: Transform;
  full?: boolean;
};

const Title = ({ children, transform, full }: TitleProps) => {
  const titleTransformStyle: TitleCSS = { '--title-transform': transform };

  return (
    <h2 className={cn(s.title, { [shortStyle.short]: !full })} style={titleTransformStyle}>
      {children}
    </h2>
  );
};

export default Title;
