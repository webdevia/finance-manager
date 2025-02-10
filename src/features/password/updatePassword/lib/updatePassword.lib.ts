import { ProfilePasswordMutationsChangeArgsDto, UpdatePasswordInput } from '../types/password.types';

export const transformToProfilePasswordMutationsChangeArgsDto = (
  updateProfileInput: UpdatePasswordInput
): ProfilePasswordMutationsChangeArgsDto => ({
  input: updateProfileInput,
});
