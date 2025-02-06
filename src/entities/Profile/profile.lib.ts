import { ProfileDto, Profile, ProfileMutationsUpdateArgsDto, UpdateProfileInput } from './profile.types';

export const transformToProfile = (profileDto: ProfileDto): Profile => ({
  id: profileDto.id,
  email: profileDto.email,
  signUpDate: profileDto.signUpDate,
  name: profileDto.name || '',
});

export const transformToProfileMutationsUpdateArgsDto = (
  updateProfileInput: UpdateProfileInput
): ProfileMutationsUpdateArgsDto => ({
  input: updateProfileInput,
});
