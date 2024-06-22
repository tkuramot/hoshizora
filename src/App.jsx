// https://github.com/remix-run/react-router/blob/dev/examples/auth/src/App.tsx
import { useState } from "react";
import { Navigate, Routes, Route, useLocation } from "react-router-dom";
import HomePage from "@/components/HomePage";
import LoginPage from "@/components/LoginPage";
import SignUpPage from "@/components/SignUpPage";
import { auth } from "@/firebase";
import { useAuth, AuthContext } from "@/hooks/useAuth";
import { signInWithEmailAndPassword } from "firebase/auth";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignUpPage />} />
        <Route path="/" element={
          <RequireAuth>
            <HomePage />
          </RequireAuth>
        } />
      </Routes>
    </AuthProvider>
  );
}

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const signin = (email, password, callback) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user);
        callback();
      })
      .catch((error) => {
        // TODO notify user of error
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)
      });
  }

  const signout = () => {
    auth.signOut().then(() => {
      setUser(null);
    }).catch((error) => {
      // TODO notify user of error
      console.log(error)
    });
  }

  const value = { user, signin, signout };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

function RequireAuth({ children }) {
  const auth = useAuth();
  const location = useLocation();

  if (!auth.user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default App;
