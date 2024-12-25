import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Layout } from './components/Layout'
import { Dashboard } from './pages/Dashboard'
import { ProjectView } from './pages/ProjectView'
import { Login } from './pages/Login'
import { AdminLogin } from './pages/AdminLogin'
import { AdminDashboard } from './pages/admin/AdminDashboard'
import { UserManagement } from './pages/admin/UserManagement'
import { ProjectManagement } from './pages/admin/ProjectManagement'
import { PrivateRoute } from './components/auth/PrivateRoute'
import { AdminRoute } from './components/auth/AdminRoute'

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          
          {/* Protected routes */}
          <Route element={<PrivateRoute><Layout /></PrivateRoute>}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/projects/:id" element={<ProjectView />} />
          </Route>

          {/* Admin routes */}
          <Route element={<AdminRoute><Layout /></AdminRoute>}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<UserManagement />} />
            <Route path="/admin/projects" element={<ProjectManagement />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}