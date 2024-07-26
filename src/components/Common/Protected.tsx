import { FunctionComponent } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedProps {
  isSignedIn: boolean;
  children: React.ReactNode;
}

const Protected: FunctionComponent<ProtectedProps> = ({
  isSignedIn,
  children,
}) => {
  if (!isSignedIn) return <Navigate to="/" replace />;
  return <>{children}</>;
};

export default Protected;
