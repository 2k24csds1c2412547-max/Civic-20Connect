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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import IssueProgressTracker from "@/components/IssueProgressTracker";
import {
  ArrowLeft,
  Search,
  MapPin,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  FileText,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function TrackReports() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  // Mock data for demonstration
  const reports = [
    {
      id: "CR-2024-0156",
      title: "Broken streetlight on Main St",
      category: "Street Lighting",
      status: "in_progress",
      priority: "medium",
      location: "Main St & 2nd Ave",
      submittedDate: "2024-01-15",
      lastUpdate: "2024-01-18",
      description:
        "Street light is flickering and goes out completely at night",
      updates: [
        {
          date: "2024-01-18",
          status: "Work crew assigned",
          message:
            "Electrical team has been notified and will inspect within 24 hours.",
        },
        {
          date: "2024-01-16",
          status: "Under review",
          message: "Report has been forwarded to the Public Works Department.",
        },
        {
          date: "2024-01-15",
          status: "Received",
          message:
            "Thank you for your report. We have received your submission.",
        },
      ],
    },
    {
      id: "CR-2024-0142",
      title: "Pothole on Oak Avenue",
      category: "Roads & Transportation",
      status: "completed",
      priority: "high",
      location: "Oak Ave near the school",
      submittedDate: "2024-01-10",
      lastUpdate: "2024-01-14",
      description: "Large pothole causing damage to vehicles",
      updates: [
        {
          date: "2024-01-14",
          status: "Completed",
          message: "Pothole has been repaired. Thank you for your patience!",
        },
        {
          date: "2024-01-12",
          status: "In progress",
          message:
            "Road crew is scheduled to repair the pothole tomorrow morning.",
        },
        {
          date: "2024-01-11",
          status: "Assigned",
          message: "Report assigned to Road Maintenance Team.",
        },
        {
          date: "2024-01-10",
          status: "Received",
          message: "Thank you for your report.",
        },
      ],
    },
    {
      id: "CR-2024-0098",
      title: "Overflowing trash bin in Central Park",
      category: "Waste Management",
      status: "pending",
      priority: "low",
      location: "Central Park - East entrance",
      submittedDate: "2024-01-05",
      lastUpdate: "2024-01-05",
      description: "Trash bin is overflowing and attracting animals",
      updates: [
        {
          date: "2024-01-05",
          status: "Received",
          message: "Your report has been received and is pending assignment.",
        },
      ],
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
        return <AlertCircle className="w-4 h-4" />;
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
      default:
        return "gray-500";
    }
  };

  const filteredReports = reports.filter(
    (report) =>
      report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.category.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-civic-blue-50 via-white to-civic-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-civic-blue-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Button variant="ghost" asChild>
            <Link to="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>
          <h1 className="text-lg font-semibold text-civic-blue-900">
            Track My Reports
          </h1>
          <Button asChild>
            <Link to="/report">Report New Issue</Link>
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Search */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-civic-blue-900">
              Your Reports
            </CardTitle>
            <CardDescription>
              Track the progress of your submitted issues and view updates from
              city staff.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search by report ID, title, or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Reports List */}
        <div className="space-y-6">
          {filteredReports.map((report) => (
            <Card
              key={report.id}
              className="hover:shadow-lg transition-shadow duration-300"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <CardTitle className="text-xl text-civic-blue-900">
                        {report.title}
                      </CardTitle>
                      <Badge
                        className={`bg-${getStatusColor(report.status)} text-white`}
                      >
                        {getStatusIcon(report.status)}
                        <span className="ml-1 capitalize">
                          {report.status.replace("_", " ")}
                        </span>
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
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
                        Submitted {report.submittedDate}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge
                      variant="outline"
                      className={`border-${getPriorityColor(report.priority)} text-${getPriorityColor(report.priority)}`}
                    >
                      {report.priority} priority
                    </Badge>
                    <Badge variant="secondary">{report.category}</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">{report.description}</p>
                <div className="mb-4">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedReportId(report.id);
                      setShowDetails(true);
                    }}
                  >
                    View details
                  </Button>
                </div>

                {/* Timeline */}
                <div className="border-t pt-4">
                  <h4 className="font-semibold text-civic-blue-900 mb-3">
                    Progress Updates
                  </h4>
                  <div className="space-y-3">
                    {report.updates.map((update, index) => (
                      <div key={index} className="flex gap-3">
                        <div
                          className={`w-3 h-3 rounded-full bg-${getStatusColor(report.status)} mt-1.5 flex-shrink-0`}
                        ></div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-sm">
                              {update.status}
                            </span>
                            <span className="text-xs text-gray-500">
                              {update.date}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">
                            {update.message}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredReports.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No reports found
              </h3>
              <p className="text-gray-600 mb-4">
                {searchTerm
                  ? "Try adjusting your search terms."
                  : "You haven't submitted any reports yet."}
              </p>
              <Button asChild>
                <Link to="/report">Submit Your First Report</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Issue Progress</DialogTitle>
          </DialogHeader>
          {selectedReportId && (
            <IssueProgressTracker
              issueId={selectedReportId}
              onRatingSubmit={(rating, feedback) => {
                // Handle rating submit (e.g., send to API)
                console.log("Rating submitted", {
                  rating,
                  feedback,
                  issueId: selectedReportId,
                });
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
