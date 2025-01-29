import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import cn from 'clsx';
import style from './ProfileCompletedForm.module.scss'
import { ErrorLabel } from 'src/shared/ErrorLabel/ErrorLabel';

interface ProfileFormInputs {
    nickname: string;
    about: string;
}

export const ProfileCompletedForm: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<ProfileFormInputs>();
    const onSubmitProfile: SubmitHandler<ProfileFormInputs> = (data) => {
        console.log('Profile Data:', data);
    };

    return (
        <>
            <div className={style.title}>Change profile</div>
            <form onSubmit={handleSubmit(onSubmitProfile)}>
                <div className={style.formGroup}>
                    <label>Nickname</label>
                    <input
                        {...register('nickname', {
                            required: 'Required field'
                        })}
                        className={cn({ [style.inputError]: errors.nickname })}
                    />
                    {errors.nickname && <ErrorLabel message={errors.nickname.message} />}
                </div>
                <div className={style.formGroup}>
                    <label>About</label>
                    <textarea
                        {...register('about', {
                            required: 'Required field'
                        })}
                        className={cn({ [style.inputError]: errors.about })}
                    />
                    {errors.about && <ErrorLabel message={errors.about.message} />}
                </div>
                <button type="submit" className={style.btn}>Save</button>
            </form>
        </>
    );
}
