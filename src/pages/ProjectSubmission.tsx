
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import ProjectSubmissionForm from "@/components/dashboard/ProjectSubmissionForm";

const ProjectSubmission = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 ml-[240px] p-6">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Submit a New Project</h1>
            <ProjectSubmissionForm />
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProjectSubmission;
