export type SignUpUserRequest = {
  email: string;
  password: string;
  commandId: string;
};

export type SignUpUserResponse = {
  token: string;
  profile: {
    _id: string;
    signUpDate: Date;
    email: string;
    commandId: string;
    password: string;
    __v: number;
  };
};

export type ServerError = {
  extensions: {
    code: string;
  };

  name: string;
  fieldName?: string;
  stack: string;
  message: string;
};

export type ServerErrors = {
  errors: ServerError[];
};
