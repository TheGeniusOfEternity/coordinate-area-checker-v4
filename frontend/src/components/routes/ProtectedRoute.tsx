import type { ReactNode } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { Navigate } from "react-router";

export const ProtectedRoute = ({
  children,
}: {
  children: ReactNode
}) => {
  const isAuth = useSelector((state: RootState) => state.auth.accessToken !== null);
  if (!isAuth) {
    return <Navigate to="/auth" replace />;
  }
  return children;
};