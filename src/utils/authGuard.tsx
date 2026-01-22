import { Navigate } from "react-router-dom";
import type { ReactElement } from "react";

interface AuthProps {
  children: ReactElement;
}

export default function AuthGuard({ children }: AuthProps) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
}
