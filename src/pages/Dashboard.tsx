
import React, { useState } from "react";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import JoinClassForm from "@/components/dashboard/JoinClassForm";
import EnrolledClasses from "@/components/dashboard/EnrolledClasses";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/context/AuthContext";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const Dashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("classes");

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 ml-[240px] p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
            
            {user?.role === "user" ? (
              <>
                <Tabs defaultValue="classes" className="mb-6" onValueChange={setActiveTab}>
                  <TabsList>
                    <TabsTrigger value="classes">My Classes</TabsTrigger>
                    <TabsTrigger value="join">Join Class</TabsTrigger>
                  </TabsList>
                  <TabsContent value="classes">
                    <EnrolledClasses />
                  </TabsContent>
                  <TabsContent value="join">
                    <JoinClassForm />
                  </TabsContent>
                </Tabs>
                
                {activeTab === "classes" && user.enrolledClasses?.length === 0 && (
                  <Alert className="mt-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>No classes yet</AlertTitle>
                    <AlertDescription>
                      You haven't joined any classes yet. Go to the "Join Class" tab to enter a class key.
                    </AlertDescription>
                  </Alert>
                )}
              </>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <EnrolledClasses />
                </div>
                <div className="lg:col-span-1">
                  <JoinClassForm />
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
