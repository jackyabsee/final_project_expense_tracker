export type AuthState = {
  token: string | null;
  authenticated: boolean;
};
export type JWTPayload = {
  id: number;
  iat: number;
};

export type LoginInput = {
  account: string;
  password: string;
};
export type LoginResult = {
  token: string;
  error?: string;
};
export type RegisterInput = {
  account: string;
  username: string | null;
  password: string;
  email: string | null;
};

export type HomeData = {
  type: string;
  price: number;
};

export type ExtraData = {
  id: number;
  title: string;
  url: string;
};

export type HistoryData = {
  id: number;
  type: string;
  price: number;
  date: Date;
};
