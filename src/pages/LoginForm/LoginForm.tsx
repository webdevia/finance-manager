import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import cn from 'clsx';
import style from './LoginForm.module.scss';
import { ErrorLabel } from 'src/shared/ErrorLabel/ErrorLabel';

interface LoginFormInputs {
  email: string;
  password: string;
}

export const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    console.log('Login Data:', data);
    reset();
  };

  return (
    <div className={style.loginForm}>
      <div className={style.title}>Sign in</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={style.formGroup}>
          <label>Email</label>
          <input
            type="email"
            {...register('email', {
              required: 'Required field',
              pattern: {
                value: /[a-zA-Z0-9_.±]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/,
                message: 'Invalid email address',
              },
            })}
            className={cn({ [style.inputError]: errors.email })}
          />
          {errors.email && <ErrorLabel message={errors.email.message} />}
        </div>
        <div className={style.formGroup}>
          <label>Password</label>
          <input
            type="password"
            {...register('password', {
              required: 'Required field',
            })}
            className={cn({ [style.inputError]: errors.password })}
          />
          {errors.password && <ErrorLabel message={errors.password.message} />}
        </div>
        <button type="submit" className={style.btn}>
          Sign in
        </button>
      </form>
    </div>
  );
};
