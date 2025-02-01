interface ProfileResponse {
  token: string;
  username: string;
  password: string;
  name: string;
  isAdmin: boolean;
  description?: string;
}

const userProfile = {
  token: 'user-token',
  username: 'user@example.com',
  password: 'user123456',
  name: 'Fake User',
  isAdmin: false,
  description: 'This is user account',
};

const adminProfile = {
  token: 'admin-token',
  username: 'admin@example.com',
  password: 'admin123456',
  name: 'Fake Admin',
  isAdmin: true,
  description: 'This is admin account',
};

const users = [userProfile, adminProfile];

const findTokenCondition = (token: string) => (user: ProfileResponse) => user.token === token;
const findNamePasswordCondition = (username: string, password: string) => (user: ProfileResponse) =>
  user.username === username && user.password === password;

const error401 = (message: string) => () => new Error(message, { cause: { code: 401 } });
const invalidTokenError = error401('Invalid token');
const invalidUser = error401('Invalid username or password');

const getFakeUser = (
  findCondition: (user: ProfileResponse) => boolean,
  rejectError: () => Error
): Promise<ProfileResponse | null> =>
  new Promise((resolve, reject) =>
    setTimeout(() => {
      const user = users.find(findCondition);
      user ? resolve(user) : reject(rejectError());
    }, 1000)
  );

export const fakeProfile = (token: string) => getFakeUser(findTokenCondition(token), invalidTokenError);
export const fakeAuth = (username: string, password: string) =>
  getFakeUser(findNamePasswordCondition(username, password), invalidUser);
