import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

export function ProtectedRoute({ children }) {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
    console.log('test route protégée', isAuthenticated)
    return isAuthenticated ? children : <Navigate to="/login" replace />
}
