import { useState } from 'react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { useAuth } from '../../hooks/useAuth';

interface LoginFormProps {
  isAdmin?: boolean;
}

export function LoginForm({ isAdmin = false }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, loginAsAdmin } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (isAdmin) {
        await loginAsAdmin(email, password);
      } else {
        await login(email, password);
      }
    } catch (err: any) {
      setError(err.message === 'Invalid login credentials' 
        ? 'Invalid email or password. Please try again.' 
        : 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        placeholder="Enter your email"
        error={error}
      />

      <Input
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        placeholder="Enter your password"
      />

      <Button type="submit" isLoading={isLoading}>
        {isLoading ? 'Signing in...' : 'Sign in'}
      </Button>

      {!isAdmin && (
        <p className="text-sm text-center text-gray-600">
          Demo credentials: demo@example.com / demo123
        </p>
      )}
    </form>
  );
}