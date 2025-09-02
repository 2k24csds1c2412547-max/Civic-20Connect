import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  MapPin, 
  Filter, 
  Eye, 
  Calendar,
  User,
  AlertTriangle,
  CheckCircle,
  Clock,
  Navigation
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface IssueLocation {
  id: string;
  title: string;
  category: string;
  status: 'submitted' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  latitude: number;
  longitude: number;
  address: string;
  reportedBy: string;
  reportedDate: string;
  description: string;
  assignedTo?: string;
  estimatedCompletion?: string;
}

// Mock data for demonstration
const mockIssues: IssueLocation[] = [
  {
    id: 'CR-2024-0156',
    title: 'Broken streetlight on Main Street',
    category: 'lighting',
    status: 'in-progress',
    priority: 'medium',
    latitude: 40.7128,
    longitude: -74.0060,
    address: 'Main Street & 2nd Ave',
    reportedBy: 'John Smith',
    reportedDate: '2024-01-15',
    description: 'Street light has been flickering for several days and is now completely out.',
    assignedTo: 'Electrical Dept.',
    estimatedCompletion: '2024-01-20'
  },
  {
    id: 'CR-2024-0142',
    title: 'Pothole near school entrance',
    category: 'roads',
    status: 'submitted',
    priority: 'high',
    latitude: 40.7589,
    longitude: -73.9851,
    address: 'Oak Avenue, Elementary School',
    reportedBy: 'Sarah Johnson',
    reportedDate: '2024-01-10',
    description: 'Large pothole creating safety hazard for children and vehicles.'
  },
  {
    id: 'CR-2024-0138',
    title: 'Overflowing trash bins in Central Park',
    category: 'waste',
    status: 'resolved',
    priority: 'low',
    latitude: 40.7812,
    longitude: -73.9665,
    address: 'Central Park, Section A',
    reportedBy: 'Mike Chen',
    reportedDate: '2024-01-08',
    description: 'Multiple trash bins are overflowing, attracting animals and creating mess.',
    assignedTo: 'Sanitation Dept.'
  },
  {
    id: 'CR-2024-0155',
    title: 'Water leak on Elm Street',
    category: 'water',
    status: 'in-progress',
    priority: 'urgent',
    latitude: 40.7505,
    longitude: -73.9934,
    address: 'Elm Street near Fire Station',
    reportedBy: 'Lisa Wong',
    reportedDate: '2024-01-14',
    description: 'Major water leak flooding the sidewalk and street.',
    assignedTo: 'Water Dept.',
    estimatedCompletion: '2024-01-16'
  },
  {
    id: 'CR-2024-0151',
    title: 'Playground equipment needs repair',
    category: 'parks',
    status: 'submitted',
    priority: 'medium',
    latitude: 40.7282,
    longitude: -73.9942,
    address: 'Washington Square Park',
    reportedBy: 'David Lee',
    reportedDate: '2024-01-12',
    description: 'Swing set has broken chains and slide has sharp edges.'
  }
];

interface IssueLocationMapProps {
  onIssueSelect?: (issue: IssueLocation) => void;
}

export default function IssueLocationMap({ onIssueSelect }: IssueLocationMapProps) {
  const [selectedIssue, setSelectedIssue] = useState<IssueLocation | null>(null);
  const [filteredIssues, setFilteredIssues] = useState<IssueLocation[]>(mockIssues);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');

  // Filter issues based on selected filters
  useEffect(() => {
    let filtered = mockIssues;

    if (statusFilter !== 'all') {
      filtered = filtered.filter(issue => issue.status === statusFilter);
    }

    if (categoryFilter !== 'all') {
      filtered = filtered.filter(issue => issue.category === categoryFilter);
    }

    if (priorityFilter !== 'all') {
      filtered = filtered.filter(issue => issue.priority === priorityFilter);
    }

    setFilteredIssues(filtered);
  }, [statusFilter, categoryFilter, priorityFilter]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted': return 'bg-blue-500';
      case 'in-progress': return 'bg-orange-500';
      case 'resolved': return 'bg-green-500';
      case 'closed': return 'bg-gray-500';
      default: return 'bg-gray-400';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return 'text-green-600';
      case 'medium': return 'text-orange-600';
      case 'high': return 'text-red-600';
      case 'urgent': return 'text-red-800 font-bold';
      default: return 'text-gray-600';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'roads': return '🚗';
      case 'lighting': return '💡';
      case 'water': return '💧';
      case 'parks': return '🌳';
      case 'waste': return '🗑️';
      case 'safety': return '🚨';
      default: return '📝';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'submitted': return <Clock className="w-4 h-4" />;
      case 'in-progress': return <AlertTriangle className="w-4 h-4" />;
      case 'resolved': return <CheckCircle className="w-4 h-4" />;
      case 'closed': return <CheckCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const openInMaps = (latitude: number, longitude: number) => {
    const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
    window.open(url, '_blank');
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Issue Filters
          </CardTitle>
          <CardDescription>
            Filter issues by status, category, and priority
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Status</label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="submitted">Submitted</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Category</label>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="roads">Roads & Transportation</SelectItem>
                  <SelectItem value="lighting">Street Lighting</SelectItem>
                  <SelectItem value="water">Water & Sewage</SelectItem>
                  <SelectItem value="parks">Parks & Recreation</SelectItem>
                  <SelectItem value="waste">Waste Management</SelectItem>
                  <SelectItem value="safety">Public Safety</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Priority</label>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All priorities" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Map View Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Issue Location Map
          </CardTitle>
          <CardDescription>
            Interactive map showing all reported issues ({filteredIssues.length} issues)
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Simulated Map Area */}
          <div className="relative bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-950 dark:to-green-950 rounded-lg border-2 border-dashed border-civic-blue-300 dark:border-civic-blue-700 h-96 overflow-hidden">
            {/* Grid pattern to simulate map */}
            <div className="absolute inset-0 opacity-10">
              <div className="grid grid-cols-8 grid-rows-6 h-full">
                {Array.from({ length: 48 }).map((_, i) => (
                  <div key={i} className="border border-gray-400"></div>
                ))}
              </div>
            </div>

            {/* Issue Markers */}
            {filteredIssues.map((issue, index) => (
              <div
                key={issue.id}
                className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 hover:scale-110 ${
                  selectedIssue?.id === issue.id ? 'z-20 scale-125' : 'z-10'
                }`}
                style={{
                  left: `${20 + (index * 15) % 60}%`,
                  top: `${25 + (index * 12) % 50}%`,
                }}
                onClick={() => {
                  setSelectedIssue(issue);
                  onIssueSelect?.(issue);
                }}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg ${getStatusColor(issue.status)}`}>
                  {getCategoryIcon(issue.category)}
                </div>
                
                {/* Tooltip */}
                {selectedIssue?.id === issue.id && (
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-xl border p-3 z-30">
                    <div className="text-sm">
                      <div className="font-semibold text-civic-blue-900 dark:text-civic-blue-100 mb-1">
                        {issue.title}
                      </div>
                      <div className="text-gray-600 dark:text-gray-300 mb-2">
                        {issue.address}
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={`text-xs ${getStatusColor(issue.status)} text-white`}>
                          {issue.status}
                        </Badge>
                        <span className={`text-xs ${getPriorityColor(issue.priority)}`}>
                          {issue.priority} priority
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Reported by {issue.reportedBy} on {issue.reportedDate}
                      </div>
                    </div>
                    {/* Arrow */}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white dark:border-t-gray-800"></div>
                  </div>
                )}
              </div>
            ))}

            {/* Map Overlay Info */}
            <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-lg p-3 text-sm">
              <div className="font-semibold text-civic-blue-900 dark:text-civic-blue-100 mb-2">
                Map Legend
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span>Submitted</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                  <span>In Progress</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span>Resolved</span>
                </div>
              </div>
            </div>

            {/* Center Info */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-civic-blue-600 dark:text-civic-blue-400">
                <MapPin className="w-12 h-12 mx-auto mb-2 opacity-20" />
                <p className="text-sm opacity-60">
                  Interactive Map View
                  <br />
                  Click markers to view details
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Issue Details Panel */}
      {selectedIssue && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                Issue Details: {selectedIssue.id}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => openInMaps(selectedIssue.latitude, selectedIssue.longitude)}
              >
                <Navigation className="w-4 h-4 mr-2" />
                Open in Maps
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Title</label>
                  <p className="text-lg font-semibold">{selectedIssue.title}</p>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Description</label>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{selectedIssue.description}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Location</label>
                  <p className="text-sm">{selectedIssue.address}</p>
                  <p className="text-xs text-gray-500">
                    Coordinates: {selectedIssue.latitude}, {selectedIssue.longitude}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Status</label>
                    <div className="flex items-center gap-2 mt-1">
                      {getStatusIcon(selectedIssue.status)}
                      <Badge className={`${getStatusColor(selectedIssue.status)} text-white`}>
                        {selectedIssue.status}
                      </Badge>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Priority</label>
                    <p className={`text-sm font-semibold ${getPriorityColor(selectedIssue.priority)}`}>
                      {selectedIssue.priority.toUpperCase()}
                    </p>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Reported By</label>
                  <div className="flex items-center gap-2 mt-1">
                    <User className="w-4 h-4" />
                    <span className="text-sm">{selectedIssue.reportedBy}</span>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Reported Date</label>
                  <div className="flex items-center gap-2 mt-1">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">{selectedIssue.reportedDate}</span>
                  </div>
                </div>

                {selectedIssue.assignedTo && (
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Assigned To</label>
                    <p className="text-sm font-medium text-civic-blue-600 dark:text-civic-blue-400">
                      {selectedIssue.assignedTo}
                    </p>
                  </div>
                )}

                {selectedIssue.estimatedCompletion && (
                  <div>
                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">Estimated Completion</label>
                    <p className="text-sm text-civic-green-600 dark:text-civic-green-400">
                      {selectedIssue.estimatedCompletion}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
