import { RootState } from 'src/app/store';

// TODO: remove
export const selectIsAuth = (state: RootState) => !!state.auth.token;
