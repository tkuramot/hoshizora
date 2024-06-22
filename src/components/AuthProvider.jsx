import { useState } from "react";
import { auth } from "@/lib/firebase";
import { AuthContext } from "@/hooks/useAuth";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const loginWithEmailAndPassword = async (email, password, onSuccess) => {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const user = userCredential.user;
    setUser(user);
    onSuccess();
  };

  const loginWithGoogle = async (onSuccess) => {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    const user = userCredential.user;
    setUser(user);
    onSuccess();
  };

  const logout = () => {
    auth.signOut().then(() => {
      setUser(null);
    }).catch(() => {
      // Do nothing if signout fails
    });
  };

  const signupWithEmailAndPassword = async (email, password, onSuccess) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const user = userCredential.user;
    setUser(user);
    onSuccess();
  };

  const value = {
    user,
    loginWithEmailAndPassword,
    loginWithGoogle,
    logout,
    signupWithEmailAndPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
