import { useAuthState } from "@/components/hooks/useAuthState";
import Login from "@/components/LoginPage";

const RequireAuth = ({ children }) => {
  const { isSignedIn, isLoading } = useAuthState();
  if (isLoading) {
    return <></>;
  }
  return isSignedIn ? children : <Login />;
};

export default RequireAuth;
