export {
  Profile as ProfileDto,
  UpdateProfileInput as UpdateProfileInputDto,
  UpdateMutation as UpdateMutationDto,
  ProfileMutationsUpdateArgs as ProfileMutationsUpdateArgsDto,
} from 'src/shared/api/types/generated.dto.types';

export type Profile = {
  email: string;
  id: string;
  name: string;
  signUpDate: string;
};

export type UpdateProfileInput = {
  name: string;
};
