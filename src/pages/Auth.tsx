
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";
import { useAuth } from "@/context/AuthContext";

const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const isLoginPage = location.pathname === "/login";

  useEffect(() => {
    // Redirect authenticated users to dashboard
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md mb-8">
        <div className="flex justify-center">
          <div className="h-12 w-12 bg-brand-500 rounded-md flex items-center justify-center">
            <span className="text-white text-lg font-bold">PS</span>
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {isLoginPage ? "Sign in to your account" : "Create a new account"}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {isLoginPage ? "Welcome back! Please sign in to continue." : "Join our platform to submit and manage your projects."}
        </p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {isLoginPage ? <LoginForm /> : <RegisterForm />}
      </div>
    </div>
  );
};

export default Auth;
