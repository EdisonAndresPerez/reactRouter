import { Navigate } from "react-router";
import { useAuthQuery } from "../../hooks/useAuthQuery";

export const PrivateRouter = ({ children }) => {
  const { data, isLoading, isError } = useAuthQuery();

  if (isLoading) return <div>Verificando sesión...</div>;
  if (isError) return <Navigate to="/auth" />;

  return <>{children}</>;
};