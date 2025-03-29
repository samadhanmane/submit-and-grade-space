
import { useState, useEffect } from "react";
import { User, Search, MoreHorizontal, UserPlus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { useToast } from "@/components/ui/use-toast";

// Mock user data
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
  projects: number;
  joinedAt: string;
}

const mockUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "user",
    status: "active",
    projects: 5,
    joinedAt: "2023-01-15T10:30:00.000Z",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "user",
    status: "active",
    projects: 3,
    joinedAt: "2023-02-20T14:45:00.000Z",
  },
  {
    id: "3",
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
    status: "active",
    projects: 0,
    joinedAt: "2023-01-01T09:00:00.000Z",
  },
  {
    id: "4",
    name: "Bob Johnson",
    email: "bob@example.com",
    role: "user",
    status: "inactive",
    projects: 1,
    joinedAt: "2023-03-10T11:15:00.000Z",
  },
  {
    id: "5",
    name: "Alice Williams",
    email: "alice@example.com",
    role: "user",
    status: "active",
    projects: 7,
    joinedAt: "2023-02-05T16:20:00.000Z",
  },
];

const AdminUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        setUsers(mockUsers);
        setFilteredUsers(mockUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
        toast({
          variant: "destructive",
          title: "Failed to load users",
          description: "There was an error loading the user list.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [toast]);

  useEffect(() => {
    if (searchTerm) {
      const lowercasedSearch = searchTerm.toLowerCase();
      const results = users.filter(
        user =>
          user.name.toLowerCase().includes(lowercasedSearch) ||
          user.email.toLowerCase().includes(lowercasedSearch)
      );
      setFilteredUsers(results);
    } else {
      setFilteredUsers(users);
    }
  }, [searchTerm, users]);

  const handleStatusChange = (userId: string, newStatus: "active" | "inactive") => {
    // In a real application, this would make an API call
    const updatedUsers = users.map(user =>
      user.id === userId ? { ...user, status: newStatus } : user
    );
    
    setUsers(updatedUsers);
    setFilteredUsers(
      filteredUsers.map(user =>
        user.id === userId ? { ...user, status: newStatus } : user
      )
    );
    
    toast({
      title: "User status updated",
      description: `User has been ${newStatus === "active" ? "activated" : "deactivated"}.`,
    });
  };

  const handleRoleChange = (userId: string, newRole: string) => {
    // In a real application, this would make an API call
    const updatedUsers = users.map(user =>
      user.id === userId ? { ...user, role: newRole } : user
    );
    
    setUsers(updatedUsers);
    setFilteredUsers(
      filteredUsers.map(user =>
        user.id === userId ? { ...user, role: newRole } : user
      )
    );
    
    toast({
      title: "User role updated",
      description: `User role has been changed to ${newRole}.`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 ml-[240px] p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <h1 className="text-2xl font-bold mb-4 md:mb-0">Manage Users</h1>
              <Button>
                <UserPlus className="mr-2 h-4 w-4" />
                Add New User
              </Button>
            </div>

            <Card className="mb-8">
              <CardHeader className="pb-3">
                <CardTitle>User Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative mb-6">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    type="search"
                    placeholder="Search users by name or email..."
                    className="pl-9"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                {isLoading ? (
                  <div className="space-y-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="flex items-center space-x-4 animate-pulse">
                        <div className="h-10 w-10 rounded-full bg-gray-200"></div>
                        <div className="space-y-2 flex-1">
                          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                        </div>
                        <div className="h-8 bg-gray-200 rounded w-24"></div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>User</TableHead>
                          <TableHead>Role</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Projects</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredUsers.length > 0 ? (
                          filteredUsers.map((user) => (
                            <TableRow key={user.id}>
                              <TableCell>
                                <div className="flex items-center gap-3">
                                  <div className="rounded-full bg-gray-100 p-2">
                                    <User className="h-4 w-4 text-gray-500" />
                                  </div>
                                  <div>
                                    <div className="font-medium">{user.name}</div>
                                    <div className="text-sm text-gray-500">{user.email}</div>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge variant={user.role === "admin" ? "destructive" : "outline"}>
                                  {user.role === "admin" ? "Admin" : "User"}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <Badge
                                  variant={user.status === "active" ? "success" : "secondary"}
                                  className={
                                    user.status === "active"
                                      ? "bg-green-100 text-green-800 hover:bg-green-100"
                                      : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                                  }
                                >
                                  {user.status === "active" ? "Active" : "Inactive"}
                                </Badge>
                              </TableCell>
                              <TableCell>{user.projects}</TableCell>
                              <TableCell className="text-right">
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                      <MoreHorizontal className="h-4 w-4" />
                                      <span className="sr-only">Actions</span>
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={() => console.log("View user", user.id)}>
                                      View Details
                                    </DropdownMenuItem>
                                    <DropdownMenuItem 
                                      onClick={() => handleRoleChange(
                                        user.id, 
                                        user.role === "admin" ? "user" : "admin"
                                      )}
                                    >
                                      {user.role === "admin" ? "Change to User" : "Change to Admin"}
                                    </DropdownMenuItem>
                                    <DropdownMenuItem 
                                      onClick={() => handleStatusChange(
                                        user.id, 
                                        user.status === "active" ? "inactive" : "active"
                                      )}
                                    >
                                      {user.status === "active" ? "Deactivate User" : "Activate User"}
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={5} className="text-center py-6">
                              <div className="flex flex-col items-center justify-center text-gray-500">
                                <Search className="h-6 w-6 mb-2" />
                                <p>No users found. Try a different search term.</p>
                              </div>
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminUsers;
