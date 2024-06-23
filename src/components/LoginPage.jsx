import GoogleLogo from "@/assets/google-icon.svg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { getFirebaseErrorMessage } from "@/lib/auth";
import { useAuth } from "@/hooks/useAuth";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function LoginPage() {
  const navigate = useNavigate();
  const auth = useAuth();

  const [authError, setAuthError] = useState("");
  const { register, handleSubmit } = useForm();

  const handleSuccess = () => {
    navigate("/home", { replace: true });
  };

  const handleSubmitEmailAndPasswordLogin = async (data) => {
    try {
      await auth.loginWithEmailAndPassword(
        data.email,
        data.password,
        handleSuccess,
      );
    } catch (error) {
      setAuthError(getFirebaseErrorMessage(error.code));
    }
  };

  const handleGoogleLogin = async () => {
    await auth.loginWithGoogle(handleSuccess);
  };

  useEffect(() => {
    if (auth.user) {
      navigate("/home", { replace: true });
    }
  }, [auth.user, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-blue-100 px-8 py-10 rounded-lg shadow-lg">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          ログイン
        </h2>
        <form
          onSubmit={handleSubmit(handleSubmitEmailAndPasswordLogin)}
          className="mt-8"
        >
          <div className="my-2">
            <Label>メールアドレス</Label>
            <Input
              name="email"
              type="email"
              {...register("email")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>
          <div className="mt-2 mb-5">
            <Label>パスワード</Label>
            <Input
              name="password"
              type="password"
              {...register("password")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>
          <div className="min-h-4">
            <p className="text-red-500 text-center text-xs italic">
              {authError}
            </p>
          </div>
          <div className="mt-8">
            <Button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              ログイン
            </Button>
          </div>
          <div className="mt-5">
            <Button
              onClick={handleGoogleLogin}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2"
            >
              <span className="flex items-center">
                Googleではじめる
                <img
                  src={GoogleLogo}
                  alt="Googleのロゴ"
                  className="ml-2 h-6 w-6"
                />
              </span>
            </Button>
          </div>
          <div className="mt-5 flex justify-center text-xs hover:underline">
            <Link to="/signup">はじめての方はこちら</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
