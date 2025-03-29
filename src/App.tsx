
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import ProjectSubmission from "./pages/ProjectSubmission";
import ProjectDetails from "./pages/ProjectDetails";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ProjectReview from "./pages/admin/ProjectReview";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children, allowedRoles = ["user", "admin"] }: { 
  children: React.ReactNode, 
  allowedRoles?: string[] 
}) => {
  const { isAuthenticated, user, loading } = useAuth();
  
  // Show loading or redirect if not authenticated
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }
  
  // Check if user has required role
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Auth />} />
            <Route path="/register" element={<Auth />} />
            
            {/* User routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/submit" element={
              <ProtectedRoute>
                <ProjectSubmission />
              </ProtectedRoute>
            } />
            <Route path="/project/:id" element={
              <ProtectedRoute>
                <ProjectDetails />
              </ProtectedRoute>
            } />
            
            {/* Admin routes */}
            <Route path="/admin/dashboard" element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin/project/:id" element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <ProjectReview />
              </ProtectedRoute>
            } />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
