import { useLazyQuery } from '@apollo/client';
import { GET_PROFILE } from 'src/entities/profile/profile.queries';
import { ProfileDto } from 'src/entities/profile/profile.types';
import { transformToProfile } from 'src/entities/profile/profile.lib';
import { normalizeDateString } from 'src/shared/datetime-utils';

export const useGetProfile = () => {
  const [getProfile, { loading, error }] = useLazyQuery<{ profile: ProfileDto }>(GET_PROFILE);

  const handleGetProfile = async () => {
    const { data } = await getProfile();
    return data?.profile
      ? transformToProfile({ ...data.profile, signUpDate: normalizeDateString(data.profile.signUpDate) })
      : null;
  };

  return { getProfile: handleGetProfile, loading, error };
};
