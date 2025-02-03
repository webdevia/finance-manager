import React from 'react';
import { useSignUpUserMutation } from '../authApi';
import { COMMAND_ID } from 'src/shared/consts';
import SignUpForm, { OnSubmit } from 'src/shared/ui/Forms/SignUpForm/SignUpForm';
import { handleSignUpErrors } from './handleError';

const SignUpFormRTK: React.FC = () => {
  const [signUpUser, { isLoading }] = useSignUpUserMutation();

  const onSubmit: OnSubmit = async (data) => {
    const { email, password } = data;

    try {
      const result = await signUpUser({ email, password, commandId: COMMAND_ID }).unwrap();
      return `Registration successful. Token: ${result.token}`;
    } catch (err) {
      if (err && 'data' in err) {
        const serverErrors = handleSignUpErrors(err.data);
        throw new Error(`Registration failed`, { cause: { serverErrors } });
      }
    }
  };

  return (
    <SignUpForm
      formTitle="Sign Up RTK"
      onSubmit={onSubmit}
      signUpButtonText={isLoading ? 'Registering...' : 'Submit'}
    />
  );
};

export default SignUpFormRTK;
