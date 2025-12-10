import type { ReactNode } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { Navigate } from "react-router";

const ProtectedRoute = ({
  children,
}: {
  children: ReactNode
}) => {
  const isAuth = useSelector((state: RootState) => state.auth.accessToken !== null);
  if (!isAuth) {
    return <Navigate to="/static/auth" replace />;
  }
  return children;
};

export default ProtectedRoute;