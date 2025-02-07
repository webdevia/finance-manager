import type { Profile } from 'src/shared/api/types/generated.dto.types';
export { UpdateProfileInput } from 'src/shared/api/types/generated.dto.types';
export type { Profile };
export type ProfileQuery = { __typename?: 'Query'; profile?: Profile | null };
