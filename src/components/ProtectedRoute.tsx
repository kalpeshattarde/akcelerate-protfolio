interface ProtectedRouteProps {
  children: React.ReactNode;
}

// Demo mode: authentication bypassed — all routes are publicly accessible.
export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  return <>{children}</>;
}
