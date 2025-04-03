
import React, { createContext, useState, useContext, useEffect } from "react";
import { AuthContextType, UserProfile, UserRole } from "@/types";
import { useToast } from "@/components/ui/use-toast";
import { getMockUsers } from "@/utils/mockData";

// Create a context with a default value
const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  loading: true,
  error: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  updateProfile: async () => {},
});

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

// Auth provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // On component mount, check if the user is already logged in
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          setIsAuthenticated(true);
        }
      } catch (err) {
        console.error("Error checking auth status:", err);
        setError("Error checking authentication status");
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      // In a real app, we would send a request to an API
      // For now, we'll simulate authentication with mock data
      const mockUsers = getMockUsers();
      
      const user = mockUsers.find((u) => u.email === email);
      
      if (!user) {
        throw new Error("Invalid email or password");
      }
      
      // In a real app, we would compare hashed passwords
      // For now, we'll just simulate a successful login
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      setUser(user);
      setIsAuthenticated(true);
      localStorage.setItem("user", JSON.stringify(user));
      
      toast({
        title: `Welcome back, ${user.name}`,
        description: `You are logged in as a ${user.role === 'admin' ? 'teacher' : 'student'}.`,
      });
    } catch (err) {
      console.error("Login error:", err);
      setError(err instanceof Error ? err.message : "Login failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (name: string, email: string, password: string, role: UserRole = "user") => {
    setLoading(true);
    setError(null);

    try {
      // In a real app, we would send a request to an API
      // For now, we'll simulate registration
      const mockUsers = getMockUsers();
      
      const existingUser = mockUsers.find((u) => u.email === email);
      if (existingUser) {
        throw new Error("Email already in use");
      }
      
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Create a new user
      const newUser: UserProfile = {
        id: `user-${Date.now()}`,
        name,
        email,
        role,
        enrolledClasses: [],
      };
      
      setUser(newUser);
      setIsAuthenticated(true);
      localStorage.setItem("user", JSON.stringify(newUser));
      
      toast({
        title: "Account created",
        description: `You have successfully registered as a ${role === 'admin' ? 'teacher' : 'student'}.`,
      });
    } catch (err) {
      console.error("Registration error:", err);
      setError(err instanceof Error ? err.message : "Registration failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
  };

  // Update profile function
  const updateProfile = async (profile: Partial<UserProfile>) => {
    setLoading(true);
    setError(null);

    try {
      if (!user) {
        throw new Error("Not authenticated");
      }
      
      // In a real app, we would send a request to an API
      // For now, we'll simulate updating the profile
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      const updatedUser = { ...user, ...profile };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
    } catch (err) {
      console.error("Profile update error:", err);
      setError(err instanceof Error ? err.message : "Profile update failed");
      toast({
        variant: "destructive",
        title: "Update failed",
        description: "There was an error updating your profile.",
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    isAuthenticated,
    user,
    loading,
    error,
    login,
    register,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
