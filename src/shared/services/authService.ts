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

// const findTokenCondition = (token: string) => (user: ProfileResponse) => user.token === token;
// const findUserDataCondition = (username: string, password: string) => (user: ProfileResponse) =>
//   users.find((user) => user.username === username && user.password === password);

// const getUser = (findCondition: Function) =>  new Promise((resolve, reject) => {
//     const
//     setTimeout(() => {
//       const user = findCondition() users.find((user) => user.token === token);
//       user ? resolve(user) : reject(new Error("User not found", {cause: {code: 404}}));
//     }, 1000);

export const fakeProfile = async (token: string): Promise<ProfileResponse | null> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = users.find((user) => user.token === token);
      user
        ? resolve(user)
        : reject(new Error('Invalid username or password', { cause: { code: 401, message: 'Unauthorized' } }));
    }, 1000);
  });
};

export const fakeAuth = async (username: string, password: string): Promise<ProfileResponse | null> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = users.find((user) => user.username === username && user.password === password);
      user
        ? resolve(user)
        : reject(new Error('Invalid username or password', { cause: { code: 401, message: 'Unauthorized' } }));
    }, 1000);
  });
};
