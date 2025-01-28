import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import cn from 'clsx';
import style from './ChangePasswordCompletedForm.module.scss';
import { ErrorLabel } from 'src/shared/ErrorLabel/ErrorLabel';

interface PasswordFormInputs {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

export const ChangePasswordCompletedForm: React.FC = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<PasswordFormInputs>();
    const onSubmitPassword: SubmitHandler<PasswordFormInputs> = (data) => {
        console.log('Password Data:', data);
    };

    const watchNewPassword = watch('newPassword');

    return (
        <>
            <div className={style.title}>Change password</div>
            <form onSubmit={handleSubmit(onSubmitPassword)}>
                <div className={style.formGroup}>
                    <label>Password</label>
                    <input
                        type="password"
                        {...register('currentPassword', {
                            required: 'Required field'
                        })}
                        className={cn({ [style.inputError]: errors.currentPassword })}
                    />
                    {errors.currentPassword && <ErrorLabel message={errors.currentPassword.message} />}
                </div>
                <div className={style.formGroup}>
                    <label>New password</label>
                    <input
                        type="password"
                        {...register('newPassword', {
                            required: 'Required field'
                        })}
                        className={cn({ [style.inputError]: errors.newPassword })}
                    />
                    {errors.newPassword && <ErrorLabel message={errors.newPassword.message} />}
                </div>
                <div className={style.formGroup}>
                    <label>Repeat password</label>
                    <input
                        type="password"
                        {...register('confirmPassword', {
                            required: 'Required field',
                            validate: (confirmPassword) => confirmPassword === watchNewPassword || "Passwords don't match"
                        })}
                        className={cn({ [style.inputError]: errors.confirmPassword })}
                    />
                    {errors.confirmPassword && <ErrorLabel message={errors.confirmPassword.message} />}
                </div>
                <button type="submit" className={style.btn}>Change</button>
            </form>
        </>
    );
}