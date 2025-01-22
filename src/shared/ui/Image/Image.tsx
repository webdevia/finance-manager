import React from 'react';
import s from './Image.module.scss';

type ImageProps = {
  url: string;
  title: string;
};

const Image = ({ url, title }: ImageProps) => <img src={url} alt={title} className={s.image} />;

export default Image;
