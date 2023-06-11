export type AuthState = {
  token: string | null;
  authenticated: boolean | null;
};
export type JWTPayload = {
  id: number;
  iat: number;
};

export type LoginInput = {
  username: string;
  password: string;
};
export type LoginResult = {
  token: string;
  error?: string;
};
export type RegisterInput = {
  username: string;
  password: string;
  email: string | null;
};
