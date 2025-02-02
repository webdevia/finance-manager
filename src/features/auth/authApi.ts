import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from 'src/shared/consts';

type SignUpUserRequest = {
    email: string;
    password: string;
    commandId: string;
}

export type SignUpUserResponse = {
    token: string;
    profile: {
        _id: string,
        signUpDate: Date,
        email: string,
        commandId: string,
        password: string,
        __v: number
    }
}

export type ServerError = {
    extensions: {
        code: string;
    };

    name: string;
    fieldName?: string;
    stack: string;
    message: string;
}

export type ServerErrors = {
    errors: ServerError[];
}

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