import React, { ReactNode, MouseEvent, CSSProperties } from 'react';
import { createPortal } from 'react-dom';
import cn from 'clsx';
import s from './Modal.module.scss';

type Transform = 'capitalize' | 'uppercase';

type ModalCSS = CSSProperties & {
  '--modal-title-transform': Transform;
};

type Title = {
  text: string;
  transform?: Transform;
  full?: boolean;
};

type ModalProps = {
  visible: boolean;
  children?: ReactNode;
  title?: Title;
  onClose?: (event: MouseEvent<HTMLButtonElement>) => void;
};

const Modal = ({ children, title, onClose, visible = true }: ModalProps) => {
  const modalStyle: ModalCSS = { '--modal-title-transform': title.transform };

  return visible
    ? createPortal(
        <div className={s.container}>
          <div className={s.modal}>
            <span className={s.close} onClick={onClose}>
              &times;
            </span>
            <div className={s.content}>
              {title && (
                <div className={cn(s.title, { [s['title-short']]: !title.full })} style={modalStyle}>
                  {title.text}
                </div>
              )}
              {children && <div>{children}</div>}
            </div>
          </div>
        </div>,
        document.body
      )
    : null;
};

export default Modal;
