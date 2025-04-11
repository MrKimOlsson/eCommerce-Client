import { createContext, PropsWithChildren, useRef, useState } from "react"
import { User } from "../../classes/User"
import { clearTokens, refreshToken, signInToken } from "../../services/authService"
import axios from "axios"

// type AuthContextType = {
//   user: User | null,
//   isLoading: boolean,
//   login: () => void,
//   logout: () => void,
//   refreshTokenHandler: () => void
// }

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<{ user: User, token: string }>; // Update this type
  logout: () => void;
  refreshTokenHandler: () => void;
}
const AuthContext = createContext< AuthContextType | undefined>(undefined)


export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const timeoutID = useRef<ReturnType<typeof setTimeout> | null>(null);

  const login = async (username: string, password: string): Promise<{ user: User, token: string }> => {
    setIsLoading(true);
    try {
        const response = await signInToken(username, password);
        console.log("Login Response:", response);
        axios.defaults.headers.common['Authorization'] = "Bearer " + response.token;

        setUser(response.user);
        console.log("user id")
        console.log(response.user.id)
                      // Log the user at login
        console.log("User after login:", response.user);
        // Clear previous user data if needed
        localStorage.removeItem('userData'); // Optional: only if needed
        localStorage.setItem('userData', JSON.stringify(response.user)); // Store current user data
        localStorage.setItem('token', response.token);

        return { user: response.user, token: response.token }; // Return user and token
    } catch (error) {
        console.log(error);
        throw error; // Propagate the error
    } finally {
        setIsLoading(false);
    }
};

  const logout = async () => {
    setIsLoading(true)
    try {
      await clearTokens()
      if (timeoutID.current) {
        clearTimeout(timeoutID.current)
        timeoutID.current = null;
      }
      setUser(null)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  const refreshTokenHandler = async () => {
    setIsLoading(true);
    try {
        const response = await refreshToken();
        console.log("Refresh Token Response:", response); // Log the response
        axios.defaults.headers.common['Authorization'] = "Bearer " + response.token;

        if (timeoutID.current) clearTimeout(timeoutID.current);
        timeoutID.current = setTimeout(() => refreshTokenHandler(), 1000 * response.expires_in);
        
        setUser(response.user);
        console.log("Current User after refresh:", response.user.username); // Log the username
    } catch (error) {
        console.log(error);
    } finally {
        setIsLoading(false);
    }
};




  return (
    <AuthContext.Provider value={{login, logout, refreshTokenHandler, user, isLoading}}>
      {children}
    </AuthContext.Provider>
  )
} 


export default AuthContext