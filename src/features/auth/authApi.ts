import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from 'src/shared/consts';
import { SignUpUserRequest, SignUpUserResponse } from 'src/shared/api/authTypes';

// TODO: review and remove
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    signUpUser: builder.mutation<SignUpUserResponse, SignUpUserRequest>({
      query: (user) => ({
        url: '/signup',
        method: 'POST',
        body: user,
      }),
    }),
  }),
});

export const { useSignUpUserMutation } = api;
