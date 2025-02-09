import { ServerErrors } from 'src/shared/api/authTypes';

export type SignUpField = 'email' | 'password';

export type SignUpUserError = {
  message: string;
  fieldName?: SignUpField;
};

const fieldValidator = (source: string) => (fieldName: string) => source.includes(fieldName);

export const handleSignUpErrors = (serverErrors: ServerErrors): SignUpUserError[] => {
  return serverErrors.errors.map((error) => {
    const validateField = fieldValidator(error.message);
    const fieldName =
      error.extensions.code === 'ERR_VALIDATION_ERROR'
        ? ['email', 'password'].find((field) => validateField(field))
        : error.extensions.code === 'ERR_ACCOUNT_ALREADY_EXIST'
        ? 'email'
        : '';
    const message = error.message || 'Unknown error';

    return fieldName ? { message, fieldName: fieldName as SignUpField } : { message };
  });
};
