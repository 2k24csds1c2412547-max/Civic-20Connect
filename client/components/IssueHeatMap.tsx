import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MapPin,
  Filter,
  Eye,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  Calendar,
  BarChart3,
} from "lucide-react";

interface IssueHotspot {
  id: string;
  location: string;
  coordinates: [number, number];
  issueCount: number;
  priority: "low" | "medium" | "high" | "urgent";
  category: string;
  lastReported: string;
  status: "active" | "resolved" | "in_progress";
  trend: "increasing" | "stable" | "decreasing";
}

export default function IssueHeatMap() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedTimeframe, setSelectedTimeframe] = useState("30d");
  const [selectedMonth, setSelectedMonth] = useState("all");
  const [selectedHotspot, setSelectedHotspot] = useState<IssueHotspot | null>(
    null,
  );

  // Mock data for issue hotspots
  const hotspots: IssueHotspot[] = [
    {
      id: "hs-1",
      location: "Main St & 2nd Ave",
      coordinates: [40.7589, -73.9851],
      issueCount: 15,
      priority: "high",
      category: "lighting",
      lastReported: "2024-01-18",
      status: "active",
      trend: "increasing",
    },
    {
      id: "hs-2",
      location: "Central Park Area",
      coordinates: [40.7829, -73.9654],
      issueCount: 8,
      priority: "medium",
      category: "parks",
      lastReported: "2024-01-17",
      status: "in_progress",
      trend: "stable",
    },
    {
      id: "hs-3",
      location: "Oak Avenue Corridor",
      coordinates: [40.7505, -73.9934],
      issueCount: 23,
      priority: "urgent",
      category: "roads",
      lastReported: "2024-01-19",
      status: "active",
      trend: "increasing",
    },
    {
      id: "hs-4",
      location: "Industrial District",
      coordinates: [40.7282, -73.9942],
      issueCount: 12,
      priority: "medium",
      category: "waste",
      lastReported: "2024-01-16",
      status: "resolved",
      trend: "decreasing",
    },
    {
      id: "hs-5",
      location: "Riverside Park",
      coordinates: [40.7829, -73.9654],
      issueCount: 6,
      priority: "low",
      category: "parks",
      lastReported: "2024-01-15",
      status: "in_progress",
      trend: "stable",
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "bg-red-500";
      case "high":
        return "bg-orange-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-red-600";
      case "in_progress":
        return "text-blue-600";
      case "resolved":
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <AlertTriangle className="w-4 h-4" />;
      case "in_progress":
        return <Clock className="w-4 h-4" />;
      case "resolved":
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <Eye className="w-4 h-4" />;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "increasing":
        return <TrendingUp className="w-4 h-4 text-red-500" />;
      case "decreasing":
        return <TrendingUp className="w-4 h-4 text-green-500 rotate-180" />;
      default:
        return <BarChart3 className="w-4 h-4 text-gray-500" />;
    }
  };

  const filteredHotspots = hotspots.filter((hotspot) => {
    if (selectedCategory !== "all" && hotspot.category !== selectedCategory) {
      return false;
    }
    if (selectedMonth !== "all") {
      const d = new Date(hotspot.lastReported);
      const ym = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      if (ym !== selectedMonth) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-civic-blue-900">
            <MapPin className="w-5 h-5" />
            Issue Heat Map
          </CardTitle>
          <CardDescription>
            Interactive visualization of issue concentration across the city
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row gap-4">
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="lighting">Street Lighting</SelectItem>
                <SelectItem value="roads">Roads</SelectItem>
                <SelectItem value="water">Water & Sewage</SelectItem>
                <SelectItem value="parks">Parks</SelectItem>
                <SelectItem value="waste">Waste Management</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={selectedTimeframe}
              onValueChange={setSelectedTimeframe}
            >
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 3 months</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Month" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Months</SelectItem>
                <SelectItem value="2024-01">Jan 2024</SelectItem>
                <SelectItem value="2023-12">Dec 2023</SelectItem>
                <SelectItem value="2023-11">Nov 2023</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Map Visualization */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-civic-blue-900">City Heat Map</CardTitle>
            <CardDescription>
              Click on hotspots to view detailed information
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Simplified Map Representation */}
            <div className="relative bg-gradient-to-br from-blue-100 to-green-100 rounded-lg h-96 p-4 overflow-hidden">
              {/* Grid lines for city feel */}
              <div className="absolute inset-0 opacity-20">
                <div className="grid grid-cols-8 grid-rows-6 h-full">
                  {Array.from({ length: 48 }).map((_, i) => (
                    <div key={i} className="border border-gray-300"></div>
                  ))}
                </div>
              </div>

              {/* Hotspots */}
              {filteredHotspots.map((hotspot, index) => (
                <div
                  key={hotspot.id}
                  className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 ${getPriorityColor(hotspot.priority)} rounded-full opacity-80 hover:opacity-100 transition-all duration-300 hover:scale-110`}
                  style={{
                    left: `${20 + ((index * 15) % 60)}%`,
                    top: `${20 + ((index * 20) % 60)}%`,
                    width: `${Math.max(20, hotspot.issueCount * 2)}px`,
                    height: `${Math.max(20, hotspot.issueCount * 2)}px`,
                  }}
                  onClick={() => setSelectedHotspot(hotspot)}
                >
                  <div className="w-full h-full flex items-center justify-center text-white font-bold text-xs">
                    {hotspot.issueCount}
                  </div>

                  {/* Pulse animation for active issues */}
                  {hotspot.status === "active" && (
                    <div
                      className={`absolute inset-0 ${getPriorityColor(hotspot.priority)} rounded-full animate-ping opacity-75`}
                    ></div>
                  )}
                </div>
              ))}

              {/* Legend */}
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 space-y-2">
                <div className="text-xs font-semibold text-gray-700">
                  Issue Priority
                </div>
                <div className="flex flex-col gap-1 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span>Urgent</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <span>High</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span>Medium</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span>Low</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Hotspot Details */}
        <Card>
          <CardHeader>
            <CardTitle className="text-civic-blue-900">
              {selectedHotspot ? "Hotspot Details" : "Issue Hotspots"}
            </CardTitle>
            <CardDescription>
              {selectedHotspot
                ? "Detailed information about selected area"
                : "Top issue concentration areas"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedHotspot ? (
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg text-civic-blue-900">
                    {selectedHotspot.location}
                  </h3>
                  <p className="text-sm text-gray-600 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {selectedHotspot.coordinates[0]},{" "}
                    {selectedHotspot.coordinates[1]}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-civic-blue-600">
                      {selectedHotspot.issueCount}
                    </div>
                    <div className="text-xs text-gray-600">Total Issues</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Badge
                      className={`${getPriorityColor(selectedHotspot.priority)} text-white`}
                    >
                      {selectedHotspot.priority}
                    </Badge>
                    <div className="text-xs text-gray-600 mt-1">Priority</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Status:</span>
                    <div
                      className={`flex items-center gap-1 ${getStatusColor(selectedHotspot.status)}`}
                    >
                      {getStatusIcon(selectedHotspot.status)}
                      <span className="capitalize text-sm">
                        {selectedHotspot.status.replace("_", " ")}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Category:</span>
                    <Badge variant="outline" className="capitalize">
                      {selectedHotspot.category}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Trend:</span>
                    <div className="flex items-center gap-1">
                      {getTrendIcon(selectedHotspot.trend)}
                      <span className="capitalize text-sm">
                        {selectedHotspot.trend}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Last Report:</span>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Calendar className="w-3 h-3" />
                      {selectedHotspot.lastReported}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t">
                  <Button className="w-full" size="sm">
                    View All Reports in Area
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredHotspots.slice(0, 5).map((hotspot) => (
                  <div
                    key={hotspot.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => setSelectedHotspot(hotspot)}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 ${getPriorityColor(hotspot.priority)} rounded-full flex items-center justify-center text-white font-bold text-xs`}
                      >
                        {hotspot.issueCount}
                      </div>
                      <div>
                        <div className="font-medium text-sm">
                          {hotspot.location}
                        </div>
                        <div className="text-xs text-gray-600 capitalize">
                          {hotspot.category}
                        </div>
                      </div>
                    </div>
                    <div className={getStatusColor(hotspot.status)}>
                      {getStatusIcon(hotspot.status)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-civic-blue-600 mb-2">
              {filteredHotspots.reduce((acc, h) => acc + h.issueCount, 0)}
            </div>
            <div className="text-sm text-gray-600">Total Issues</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-civic-orange-600 mb-2">
              {filteredHotspots.filter((h) => h.status === "active").length}
            </div>
            <div className="text-sm text-gray-600">Active Hotspots</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-civic-green-600 mb-2">
              {filteredHotspots.filter((h) => h.trend === "decreasing").length}
            </div>
            <div className="text-sm text-gray-600">Improving Areas</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-red-600 mb-2">
              {
                filteredHotspots.filter(
                  (h) => h.priority === "urgent" || h.priority === "high",
                ).length
              }
            </div>
            <div className="text-sm text-gray-600">High Priority Areas</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
