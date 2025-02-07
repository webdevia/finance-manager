import { ProfilePasswordMutationsChangeArgsDto, UpdatePasswordInput } from './password.types';

export const transformToProfilePasswordMutationsChangeArgsDto = (
  updateProfileInput: UpdatePasswordInput
): ProfilePasswordMutationsChangeArgsDto => ({
  input: updateProfileInput,
});
