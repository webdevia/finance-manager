import React from 'react';
import styles from './ErrorLabel.module.scss';

interface ErrorLabelProps {
    message: string;
}

export const ErrorLabel: React.FC<ErrorLabelProps> = ({ message }) => {
    return (
        <span className={styles.error}>{message}</span>
    );
}