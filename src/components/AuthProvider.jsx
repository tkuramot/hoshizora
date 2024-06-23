import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { AuthContext } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loginWithEmailAndPassword = async (email, password, onSuccess) => {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const authedUser = userCredential.user;
    setUser(authedUser);
    onSuccess();
  };

  const loginWithGoogle = async (onSuccess) => {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    const authedUser = userCredential.user;
    setUser(authedUser);
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

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
  }, [user]);

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
