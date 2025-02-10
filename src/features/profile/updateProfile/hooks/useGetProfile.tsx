import { useLazyQuery } from '@apollo/client';
import { GET_PROFILE } from 'src/features/profile/getProfile/api/getProfile.queries';
import { ProfileQuery, Profile } from 'src/entities/profile/types/profile.types';
import { normalizeDateString } from 'src/shared/utils/datetimeUtils';

export const useGetProfile = () => {
  const [getProfile, { loading, error }] = useLazyQuery<ProfileQuery>(GET_PROFILE);

  const handleGetProfile = async (): Promise<Profile | null> => {
    const { data } = await getProfile();
    return data?.profile ? { ...data.profile, signUpDate: normalizeDateString(data.profile.signUpDate) } : null;
  };

  return { getProfile: handleGetProfile, loading, error };
};
