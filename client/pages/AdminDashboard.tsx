import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  Search,
  Filter,
  MapPin,
  Calendar,
  Users,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  FileText,
  BarChart3,
  UserCheck,
} from "lucide-react";
import { Link } from "react-router-dom";
import PredictiveInsights from "@/components/PredictiveInsights";
import IssueLocationMap from "@/components/IssueLocationMap";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function AdminDashboard() {
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data for demonstration
  const stats = {
    totalReports: 1247,
    pendingReports: 89,
    inProgress: 156,
    completedThisMonth: 342,
    averageResolutionTime: "4.2 days",
  };

  const reports = [
    {
      id: "CR-2024-0156",
      title: "Broken streetlight on Main St",
      category: "lighting",
      status: "in_progress",
      priority: "medium",
      location: "Main St & 2nd Ave",
      submittedDate: "2024-01-15",
      assignedTo: "Electrical Team",
      citizen: "John D.",
      description:
        "Street light is flickering and goes out completely at night",
    },
    {
      id: "CR-2024-0157",
      title: "Water main leak on Elm Street",
      category: "water",
      status: "pending",
      priority: "high",
      location: "Elm Street, block 200",
      submittedDate: "2024-01-18",
      assignedTo: "Unassigned",
      citizen: "Sarah M.",
      description: "Large water leak causing flooding on sidewalk",
    },
    {
      id: "CR-2024-0158",
      title: "Graffiti in Central Park",
      category: "parks",
      status: "pending",
      priority: "low",
      location: "Central Park - East wall",
      submittedDate: "2024-01-17",
      assignedTo: "Unassigned",
      citizen: "Anonymous",
      description: "Graffiti on park wall near playground",
    },
  ];

  const departments = [
    {
      id: "electrical",
      name: "Electrical Team",
      activeReports: 23,
      avgTime: "3.1 days",
    },
    {
      id: "roads",
      name: "Road Maintenance",
      activeReports: 45,
      avgTime: "5.2 days",
    },
    {
      id: "water",
      name: "Water & Sewage",
      activeReports: 12,
      avgTime: "2.8 days",
    },
    {
      id: "parks",
      name: "Parks & Recreation",
      activeReports: 8,
      avgTime: "4.7 days",
    },
    {
      id: "waste",
      name: "Waste Management",
      activeReports: 15,
      avgTime: "1.9 days",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "civic-green-500";
      case "in_progress":
        return "civic-blue-500";
      case "pending":
        return "civic-orange-500";
      default:
        return "gray-500";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      case "in_progress":
        return <Clock className="w-4 h-4" />;
      case "pending":
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "civic-orange-600";
      case "medium":
        return "civic-orange-500";
      case "low":
        return "civic-green-500";
      case "urgent":
        return "red-500";
      default:
        return "gray-500";
    }
  };

  const getCategoryLabel = (category: string) => {
    const categories: Record<string, string> = {
      lighting: "Street Lighting",
      roads: "Roads & Transportation",
      water: "Water & Sewage",
      parks: "Parks & Recreation",
      waste: "Waste Management",
      safety: "Public Safety",
    };
    return categories[category] || category;
  };

  const filteredReports = reports.filter((report) => {
    const matchesSearch =
      report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || report.status === filterStatus;
    const matchesCategory =
      filterCategory === "all" || report.category === filterCategory;
    const matchesPriority =
      filterPriority === "all" || report.priority === filterPriority;

    return matchesSearch && matchesStatus && matchesCategory && matchesPriority;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-civic-blue-50 via-white to-civic-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-civic-blue-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link to="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </Button>
            <div>
              <h1 className="text-lg font-semibold text-civic-blue-900">
                Municipal Dashboard
              </h1>
              <p className="text-sm text-civic-blue-600">
                Issue Management Portal
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">Admin Access</Badge>
            <Button variant="outline" size="sm">
              Settings
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 lg:w-auto lg:grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="map">Map</TabsTrigger>
            <TabsTrigger value="departments">Departments</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="predictions">AI Insights</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    Total Reports
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-civic-blue-900">
                    {stats.totalReports}
                  </div>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="w-4 h-4 text-civic-green-500 mr-1" />
                    <span className="text-xs text-civic-green-600">
                      +12% this month
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    Pending
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-civic-orange-600">
                    {stats.pendingReports}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Needs assignment
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    In Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-civic-blue-600">
                    {stats.inProgress}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Being worked on
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    Completed
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-civic-green-600">
                    {stats.completedThisMonth}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">This month</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600">
                    Avg Resolution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-civic-blue-900">
                    {stats.averageResolutionTime}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">Average time</div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Reports */}
            <Card>
              <CardHeader>
                <CardTitle className="text-civic-blue-900">
                  Recent Reports
                </CardTitle>
                <CardDescription>
                  Latest issues requiring attention
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reports.slice(0, 3).map((report) => (
                    <div
                      key={report.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-3 h-3 rounded-full bg-${getStatusColor(report.status)}`}
                        ></div>
                        <div>
                          <div className="font-medium text-civic-blue-900">
                            {report.title}
                          </div>
                          <div className="text-sm text-gray-600">
                            {report.location} • {report.citizen}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          className={`bg-${getPriorityColor(report.priority)} text-white`}
                        >
                          {report.priority}
                        </Badge>
                        <Button size="sm" variant="outline">
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            {/* Filters */}
            <Card>
              <CardHeader>
                <CardTitle className="text-civic-blue-900">
                  Issue Reports
                </CardTitle>
                <CardDescription>
                  Manage and track all citizen reports
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="Search reports..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-full lg:w-40">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="in_progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select
                    value={filterCategory}
                    onValueChange={setFilterCategory}
                  >
                    <SelectTrigger className="w-full lg:w-40">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="lighting">Street Lighting</SelectItem>
                      <SelectItem value="roads">Roads</SelectItem>
                      <SelectItem value="water">Water & Sewage</SelectItem>
                      <SelectItem value="parks">Parks</SelectItem>
                      <SelectItem value="waste">Waste</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select
                    value={filterPriority}
                    onValueChange={setFilterPriority}
                  >
                    <SelectTrigger className="w-full lg:w-40">
                      <SelectValue placeholder="Priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Priorities</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Reports Table */}
            <div className="space-y-4">
              {filteredReports.map((report) => (
                <Card
                  key={report.id}
                  className="hover:shadow-lg transition-shadow duration-300"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-civic-blue-900">
                            {report.title}
                          </h3>
                          <Badge
                            className={`bg-${getStatusColor(report.status)} text-white`}
                          >
                            {getStatusIcon(report.status)}
                            <span className="ml-1 capitalize">
                              {report.status.replace("_", " ")}
                            </span>
                          </Badge>
                          <Badge
                            className={`bg-${getPriorityColor(report.priority)} text-white`}
                          >
                            {report.priority}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-3">
                          <div className="flex items-center gap-1">
                            <FileText className="w-4 h-4" />
                            {report.id}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {report.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {report.submittedDate}
                          </div>
                          <div className="flex items-center gap-1">
                            <UserCheck className="w-4 h-4" />
                            {report.assignedTo}
                          </div>
                        </div>
                        <p className="text-gray-700 mb-3">
                          {report.description}
                        </p>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">
                            {getCategoryLabel(report.category)}
                          </Badge>
                          <span className="text-sm text-gray-500">
                            Reported by: {report.citizen}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 ml-4">
                        <Button size="sm">Assign</Button>
                        <Button size="sm" variant="outline">
                          Update
                        </Button>
                        <Button size="sm" variant="outline">
                          Contact
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Departments Tab */}
          <TabsContent value="departments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-civic-blue-900">
                  Department Performance
                </CardTitle>
                <CardDescription>
                  Monitor workload and performance across departments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {departments.map((dept) => (
                    <Card
                      key={dept.id}
                      className="border-l-4 border-l-civic-blue-500"
                    >
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg text-civic-blue-900">
                          {dept.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">
                              Active Reports:
                            </span>
                            <span className="font-semibold">
                              {dept.activeReports}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-600">
                              Avg Resolution:
                            </span>
                            <span className="font-semibold">
                              {dept.avgTime}
                            </span>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            className="w-full mt-3"
                          >
                            View Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Map Tab */}
          <TabsContent value="map" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-civic-blue-900">Issue Map</CardTitle>
                <CardDescription>Track exact locations of reported issues</CardDescription>
              </CardHeader>
              <CardContent>
                <IssueLocationMap />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-civic-blue-900">
                  Analytics & Insights
                </CardTitle>
                <CardDescription>
                  Performance metrics and trends
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center py-12">
                <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Analytics Dashboard
                </h3>
                <p className="text-gray-600 mb-4">
                  Detailed analytics and reporting features would be implemented
                  here.
                </p>
                <Button variant="outline" asChild>
                  <Link to="/analytics">View Full Analytics</Link>
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* AI Insights Tab */}
          <TabsContent value="predictions" className="space-y-6">
            <PredictiveInsights />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
