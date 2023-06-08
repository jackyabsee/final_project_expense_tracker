export type JWTPayload = {
  id: number;
  iat: number;
};

export type LoginInput = {
  account: string;
  password: string;
};
export type RegisterInput = {
  account: string;
  password: string;
  email: string | null;
  username: string;
};

// export type SelfProfileOutput = {
//   username: string;
//   email: string;
// };

// export type UpdateProfileInput = {
//   username: string;
//   email: string | null;
// };

// export type RecentOnlineUser = {
//   id: number;
//   username: string;
//   last_online_time: string;
// };
