import React, { useState } from 'react';
import { API_URL, COMMAND_ID } from 'src/shared/consts';
import { ServerErrors, SignUpUserResponse } from 'src/shared/api/authTypes';
import SignUpForm, { OnSubmit } from 'src/shared/ui/Forms/SignUpForm/SignUpForm';
import { handleSignUpErrors } from './handleError';

const SignUpFormFetch: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: OnSubmit = async (data) => {
    const { email, password } = data;
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, commandId: COMMAND_ID }),
      });

      if (!response.ok) {
        const errorData: ServerErrors = await response.json();
        const serverErrors = handleSignUpErrors(errorData);
        throw new Error(`Registration failed`, { cause: { serverErrors } });
      }

      const data: SignUpUserResponse = await response.json();

      return `Registration successful. Token: ${data.token}`;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SignUpForm
      formTitle="Sign Up Fetch"
      onSubmit={onSubmit}
      signUpButtonText={isLoading ? 'Registering...' : 'Submit'}
    />
  );
};

export default SignUpFormFetch;
