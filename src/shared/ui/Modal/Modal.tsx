import React, { ReactNode, MouseEvent } from 'react';
import { createPortal } from 'react-dom';
import s from './Modal.module.scss';

type ModalProps = {
  visible: boolean;
  children?: ReactNode;
  title?: string;
  onClose?: (event: MouseEvent<HTMLButtonElement>) => void;
};

const Modal = ({ children, title, onClose, visible = true }: ModalProps) =>
  visible
    ? createPortal(
        <div className={s.container}>
          <div className={s.modal}>
            <span className={s.close} onClick={onClose}>
              &times;
            </span>
            <div className={s.content}>
              {title && <div className={s.title}>{title}</div>}
              {children && <div>{children}</div>}
            </div>
          </div>
        </div>,
        document.body
      )
    : null;

export default Modal;
