export type JWTPayload = {
  id: number;
  iat: number;
};

export type LoginInput = {
  username: string;
  password: string;
};
export type RegisterInput = {
  username: string;
  password: string;
  email: string | null;
};

export type SelfProfileOutput = {
  username: string;
  email: string;
};

export type UpdateProfileInput = {
  username: string;
  email: string | null;
};

export type RecentOnlineUser = {
  id: number;
  username: string;
  last_online_time: string;
};
