import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { LoginForm } from '../components/auth/LoginForm';
import { Logo } from '../components/ui/Logo';

export function Login() {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen flex">
      <div className="w-full lg:w-[480px] flex flex-col justify-center px-8 lg:px-12 py-12 bg-white">
        <div className="w-full max-w-md mx-auto">
          <Logo />
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">Welcome back</h1>
          <p className="text-gray-600 mb-8">Please enter your details to sign in</p>
          <LoginForm />
        </div>
      </div>

      <div className="hidden lg:block flex-1 bg-gradient-to-br from-blue-50 to-indigo-50 p-12">
        <div className="h-full flex items-center justify-center">
          <div className="max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Professional Audio Annotation Platform
            </h2>
            <p className="text-lg text-gray-600">
              Streamline your audio annotation workflow with powerful tools and collaboration features
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}