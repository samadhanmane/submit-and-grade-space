
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import ProjectSubmission from "./pages/ProjectSubmission";
import ProjectDetails from "./pages/ProjectDetails";
import Settings from "./pages/Settings";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ProjectReview from "./pages/admin/ProjectReview";
import AdminProjects from "./pages/admin/AdminProjects";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminClasses from "./pages/admin/AdminClasses";
import SuperAdminUsers from "./pages/admin/SuperAdminUsers";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Protected route component with enhanced role checks
const ProtectedRoute = ({ children, allowedRoles = ["user", "admin", "superadmin"] }: { 
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
  // Super admin can access all pages
  if (user.role !== "superadmin" && allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    // Redirect based on role
    if (user.role === "admin") {
      return <Navigate to="/admin/dashboard" replace />;
    } else {
      return <Navigate to="/dashboard" replace />;
    }
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
              <ProtectedRoute allowedRoles={["user"]}>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/projects" element={
              <ProtectedRoute allowedRoles={["user"]}>
                <Projects />
              </ProtectedRoute>
            } />
            <Route path="/submit" element={
              <ProtectedRoute allowedRoles={["user"]}>
                <ProjectSubmission />
              </ProtectedRoute>
            } />
            <Route path="/project/:id" element={
              <ProtectedRoute>
                <ProjectDetails />
              </ProtectedRoute>
            } />
            <Route path="/settings" element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            } />
            {/* Add redirect from /profile to /settings */}
            <Route path="/profile" element={
              <ProtectedRoute>
                <Navigate to="/settings" replace />
              </ProtectedRoute>
            } />
            
            {/* Admin routes */}
            <Route path="/admin/dashboard" element={
              <ProtectedRoute allowedRoles={["admin", "superadmin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin/projects" element={
              <ProtectedRoute allowedRoles={["admin", "superadmin"]}>
                <AdminProjects />
              </ProtectedRoute>
            } />
            <Route path="/admin/users" element={
              <ProtectedRoute allowedRoles={["admin", "superadmin"]}>
                <AdminUsers />
              </ProtectedRoute>
            } />
            <Route path="/admin/classes" element={
              <ProtectedRoute allowedRoles={["admin", "superadmin"]}>
                <AdminClasses />
              </ProtectedRoute>
            } />
            <Route path="/admin/project/:id" element={
              <ProtectedRoute allowedRoles={["admin", "superadmin"]}>
                <ProjectReview />
              </ProtectedRoute>
            } />
            
            {/* Super Admin routes */}
            <Route path="/admin/manage-users" element={
              <ProtectedRoute allowedRoles={["superadmin"]}>
                <SuperAdminUsers />
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
