
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { 
  Upload, 
  FileCheck, 
  UserCheck, 
  Star, 
  ArrowRight,
  Github 
} from "lucide-react";

const Index = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <div className="h-8 w-8 bg-brand-500 rounded flex items-center justify-center mr-2">
                  <span className="text-white font-bold">PS</span>
                </div>
                <span className="text-lg font-bold">ProjectSubmit</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <Button asChild>
                  <Link to="/dashboard">
                    Dashboard
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              ) : (
                <>
                  <Button variant="ghost" asChild>
                    <Link to="/login">Login</Link>
                  </Button>
                  <Button asChild>
                    <Link to="/register">Sign Up</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
              Project Submission & Grading
            </h1>
            <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
              A seamless platform for submitting, reviewing, and grading projects with comprehensive feedback.
            </p>
            <div className="mt-10 flex justify-center">
              {isAuthenticated ? (
                <Button size="lg" asChild>
                  <Link to="/dashboard">
                    Go to Dashboard
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              ) : (
                <>
                  <Button size="lg" asChild>
                    <Link to="/register">Get Started</Link>
                  </Button>
                  <Button size="lg" variant="outline" className="ml-4" asChild>
                    <Link to="/login">Sign In</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Streamlined Project Evaluation
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Our platform makes it easy to submit, review, and grade projects.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-blue-100 rounded-full">
                  <Upload className="h-6 w-6 text-brand-500" />
                </div>
              </div>
              <h3 className="text-xl font-medium text-gray-900">Easy Submission</h3>
              <p className="mt-2 text-gray-500">
                Upload project files, add descriptions, and provide GitHub links.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg shadow-sm text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-blue-100 rounded-full">
                  <FileCheck className="h-6 w-6 text-brand-500" />
                </div>
              </div>
              <h3 className="text-xl font-medium text-gray-900">Detailed Grading</h3>
              <p className="mt-2 text-gray-500">
                Projects are evaluated on code quality, documentation, innovation, and functionality.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg shadow-sm text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-blue-100 rounded-full">
                  <UserCheck className="h-6 w-6 text-brand-500" />
                </div>
              </div>
              <h3 className="text-xl font-medium text-gray-900">Comprehensive Feedback</h3>
              <p className="mt-2 text-gray-500">
                Receive detailed feedback to help improve your skills and projects.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg shadow-sm text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-blue-100 rounded-full">
                  <Star className="h-6 w-6 text-brand-500" />
                </div>
              </div>
              <h3 className="text-xl font-medium text-gray-900">Portfolio Building</h3>
              <p className="mt-2 text-gray-500">
                Showcase your graded projects in a professional portfolio.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-brand-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-brand-500 rounded-lg shadow-lg overflow-hidden">
            <div className="px-6 py-12 sm:px-12 lg:flex lg:items-center lg:py-16">
              <div className="lg:w-0 lg:flex-1">
                <h2 className="text-3xl font-extrabold tracking-tight text-white">
                  Ready to submit your project?
                </h2>
                <p className="mt-4 max-w-3xl text-lg text-blue-100">
                  Register now to start submitting projects and receive expert feedback.
                </p>
              </div>
              <div className="mt-8 lg:mt-0 lg:ml-8">
                <div className="sm:flex">
                  <Button size="lg" variant="secondary" asChild className="hover:bg-blue-50">
                    <Link to="/register">
                      Create Account
                    </Link>
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="mt-3 sm:mt-0 sm:ml-3 bg-transparent text-white border-white hover:bg-white/10" 
                    asChild
                  >
                    <Link to="/login">
                      Sign In
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-brand-500 rounded flex items-center justify-center mr-2">
                <span className="text-white font-bold">PS</span>
              </div>
              <span className="text-lg font-bold">ProjectSubmit</span>
            </div>
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} ProjectSubmit. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
