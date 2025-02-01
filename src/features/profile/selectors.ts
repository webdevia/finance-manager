import { RootState } from 'src/app/store';

export const selectIsAdmin = (state: RootState) => state.profile.profile.isAdmin;
export const selectProfile = (state: RootState) => state.profile;
