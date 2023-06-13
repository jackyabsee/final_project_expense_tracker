import jwtDecode from "jwt-decode";
import { useAuth } from "../context/authContext";
import { JWTPayload } from "../api/types";
import { useEffect, useState } from "react";

export const useGetId = () => {
  const { authState } = useAuth();
  const [userId, setUserId] = useState(-1);

  useEffect(() => {
    try {
      const userId = (jwtDecode(authState.token) as JWTPayload).id;
      setUserId(userId);
    } catch (error) {
      setUserId(-1);
    }
  }, [authState]);

  return userId;
};
