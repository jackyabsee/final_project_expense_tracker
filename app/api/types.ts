export type AuthState = {
  token: string | null;
  authenticated: boolean | null;
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
