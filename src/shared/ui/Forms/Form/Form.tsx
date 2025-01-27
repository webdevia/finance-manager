import React, { ReactNode, FormEventHandler } from 'react';
import s from './Form.module.scss';

type FormProps = {
  onSubmit: FormEventHandler<HTMLFormElement>;
  fields: ReactNode;
  buttons: ReactNode;
};

const Form = ({ onSubmit, fields, buttons }: FormProps) => {
  return (
    <form className={s.form} onSubmit={onSubmit}>
      <div className={s.fields}>{fields}</div>
      <div>{buttons}</div>
    </form>
  );
};

export default Form