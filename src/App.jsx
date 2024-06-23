// https://github.com/remix-run/react-router/blob/dev/examples/auth/src/App.tsx
import AuthProvider from "@/components/AuthProvider";
import IndexPage from "@/components/IndexPage";
import HomePage from "@/components/HomePage";
import LoginPage from "@/components/LoginPage";
import RequireAuth from "@/components/RequireAuth";
import SignUpPage from "@/components/SignUpPage";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignUpPage />} />
        <Route
          path="/home"
          element={
            <RequireAuth>
              <HomePage />
            </RequireAuth>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
