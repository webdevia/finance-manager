import React, { useState } from 'react';
import { API_URL, COMMAND_ID } from 'src/shared/consts';
import { ServerErrors, SignUpUserResponse } from '../authApi';
import SignUpForm, { OnSubmit } from 'src/shared/ui/Forms/SignUpForm/SignUpForm';

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
        const message = errorData.errors.reduce((message, error) => `${message} ${error.message}`, '');
        throw new Error(`Registration failed. Error message: ${message}`);
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
