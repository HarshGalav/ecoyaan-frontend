import React, { ReactNode, useEffect } from "react";
import type { RootState } from "../stores/stores";

import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getToken } from "../providers/authentication/authProvider";
import { ROUTES } from "../utils/Routes";

interface IProtectedRouteProps {
  Component: ReactNode;
}

function ProtectedRoute({ Component }: IProtectedRouteProps) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getToken());
  }, []);

  const token = useSelector((state: RootState) => state.authProvider.token);

  return <>{token != null ? Component : <Navigate to={ROUTES.LOGIN} />}</>;
}

export default ProtectedRoute;
