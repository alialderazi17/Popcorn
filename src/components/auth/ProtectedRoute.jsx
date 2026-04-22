import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ loading, user, children }) => {
  if (loading && !user) return <h1>Loading...</h1>
  if (!user) {
    return <Navigate to="/login" />
  }
  return children
}

export default ProtectedRoute
