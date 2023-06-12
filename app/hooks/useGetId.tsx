import jwtDecode from "jwt-decode";
import { useAuth } from "../context/authContext";
import { JWTPayload } from "../api/types";

export const UseGetId = () => {
  const { authState } = useAuth();
  const userId = (jwtDecode(authState.token) as JWTPayload).id;
  return userId;
};
