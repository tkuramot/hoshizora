// https://github.com/remix-run/react-router/blob/dev/examples/auth/src/App.tsx
import AuthProvider from "@/components/AuthProvider";
import IndexPage from "@/components/IndexPage";
import HomePage from "@/components/HomePage";
import LoginPage from "@/components/LoginPage";
import LogoutPage from "@/components/LogoutPage";
import FavoriteBookPage from "@/components/FavoriteBookPage";
import RequireAuth from "@/components/RequireAuth";
import SignUpPage from "@/components/SignUpPage";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="logout" element={<LogoutPage />} />
        <Route path="signup" element={<SignUpPage />} />
        <Route path="favorites" element={<FavoriteBookPage />} />
        <Route
          path="/home"
          element={
            <RequireAuth>
              <HomePage />
            </RequireAuth>
          }
        />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
