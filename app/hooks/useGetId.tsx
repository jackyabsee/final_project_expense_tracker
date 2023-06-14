import jwtDecode from "jwt-decode";
import { useAuth } from "../context/authContext";
import { JWTPayload } from "../api/types";
import { useEffect, useMemo, useState } from "react";

export const useGetId = () => {
  const { authState } = useAuth();

  const userId = useMemo(() => {
    if (!authState.token) {
      return null;
    }
    const payload = jwtDecode(authState.token) as JWTPayload;
    return payload.id;
  }, [authState.token]);

  return userId;
};
