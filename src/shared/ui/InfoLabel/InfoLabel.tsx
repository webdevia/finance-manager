import React from 'react';
import styles from './InfoLabel.module.scss';

interface InfoLabelProps {
  message: string;
}

export const InfoLabel: React.FC<InfoLabelProps> = ({ message }) => {
  return <span className={styles.info}>{message}</span>;
};
