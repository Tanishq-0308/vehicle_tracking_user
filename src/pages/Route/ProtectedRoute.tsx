import { useAuth } from '../contexts/Auth';
import { Redirect } from 'react-router';


interface ProtectedType{
  children:React.ReactNode;
}
// ProtectedRoute component for routing logic
const ProtectedRoute: React.FC<ProtectedType> = ({ children })=> {
  const { isAuthenticated } = useAuth(); // Check if user is authenticated

  // If user is not authenticated, redirect to /signin
  if (!isAuthenticated) {
    return <Redirect to='/signin'/>
  }

  return children; // Render protected component if authenticated
};

interface AuthRedirectType{
  children:React.ReactNode;
}
// Prevent logged-in users from accessing the /signin page
const AuthRedirect: React.FC<AuthRedirectType>  = ({ children })=> {
  const { isAuthenticated } = useAuth();

  // If user is authenticated, redirect to /app (dashboard)
  if (isAuthenticated) {
    return <Redirect to='/app'/>
  }

  return children; // Render login page if not authenticated
};

export { ProtectedRoute, AuthRedirect };
