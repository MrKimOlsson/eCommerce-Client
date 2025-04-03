import { useContext } from 'react'
import AuthContext from '../state/context/authContext';

export const useAuth = () => {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error('AuthContext must be used within the AuthProvider')
  }

  return context
}