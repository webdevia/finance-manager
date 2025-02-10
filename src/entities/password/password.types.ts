export {
  ProfilePasswordMutationsChangeArgs as ProfilePasswordMutationsChangeArgsDto,
  ChangePasswordInput as ChangePasswordInputDto,
} from 'src/shared/api/types/generated.dto.types';

export type Password = {
  password: string;
  newPassword: string;
  newPasswordConfirm: string;
};

export type UpdatePasswordInput = {
  password: string;
  newPassword: string;
};
