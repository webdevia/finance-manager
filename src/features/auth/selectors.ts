import { RootState } from 'src/app/store';

export const selectIsAuth = (state: RootState) => !!state.auth.token;
