import { Navigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

export function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}