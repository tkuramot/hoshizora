import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { getFirebaseErrorMessage } from "@/lib/auth";
import { useAuth } from "@/hooks/useAuth";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function SignUpPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();

  const [authError, setAuthError] = useState("");
  const { register, handleSubmit } = useForm();

  const handleSuccess = () => {
    const from = location.state?.from || "/";
    navigate(from, { replace: true });
  };

  const handleSignupWithEmailAndPassword = async (data) => {
    try {
      await auth.signupWithEmailAndPassword(
        data.email,
        data.password,
        handleSuccess,
      );
    } catch (error) {
      setAuthError(getFirebaseErrorMessage(error.code));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-blue-100 px-8 py-10 rounded-lg shadow-lg">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          登録
        </h2>
        <form
          onSubmit={handleSubmit(handleSignupWithEmailAndPassword)}
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
          <div className="my-2">
            <Label>パスワード</Label>
            <Input
              name="password"
              type="password"
              {...register("password")}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>
          <div className="mt-2 mb-5">
            <Label>パスワードの確認</Label>
            <Input
              name="password_confirmation"
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
              登録
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
