// https://qiita.com/murasuke/items/8d405d39dd86be0aa44b#%E5%AE%9F%E8%A3%85%E6%96%B9%E6%B3%95
import { useEffect, useState } from "react";
import { auth } from "@/firebase";
import { useAuthState as useAuthStateOriginal } from "react-firebase-hooks/auth";

const INITIAL_AUTH_STATE = {
  isSignedIn: false,
  isLoading: true,
  userId: undefined,
  userName: undefined,
  email: undefined,
};

export const useAuthState = () => {
  const [authState, setAuthState] = useState(INITIAL_AUTH_STATE);
  const [user, loading, error] = useAuthStateOriginal(auth);

  useEffect(() => {
    if (user) {
      setAuthState({
        isSignedIn: true,
        isLoading: loading,
        userId: user.uid,
        userName: user.displayName || undefined,
        email: user.email || undefined,
        error,
      });
    } else {
      setAuthState({ ...INITIAL_AUTH_STATE, isLoading: loading });
    }
  }, [user, loading, error]);

  return authState;
};
