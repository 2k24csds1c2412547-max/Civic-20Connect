import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  FileText, 
  User, 
  Calendar,
  MapPin,
  Camera,
  MessageSquare,
  Star,
  ThumbsUp,
  ThumbsDown,
  Eye
} from 'lucide-react';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';

interface ProgressStep {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  status: 'completed' | 'current' | 'pending';
  assignedTo?: string;
  notes?: string;
  photos?: string[];
}

interface IssueProgress {
  id: string;
  title: string;
  category: string;
  status: 'submitted' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  submittedDate: string;
  location: string;
  description: string;
  photos: string[];
  estimatedCompletion?: string;
  actualCompletion?: string;
  progressPercentage: number;
  steps: ProgressStep[];
  canRate: boolean;
  rating?: number;
  feedback?: string;
}

// Mock data for demonstration
const mockIssueProgress: IssueProgress = {
  id: 'CR-2024-0156',
  title: 'Broken streetlight on Main Street',
  category: 'lighting',
  status: 'in-progress',
  priority: 'medium',
  submittedDate: '2024-01-15T10:30:00Z',
  location: 'Main Street & 2nd Ave',
  description: 'Street light has been flickering for several days and is now completely out, making the area very dark at night.',
  photos: ['streetlight-1.jpg', 'streetlight-2.jpg'],
  estimatedCompletion: '2024-01-20',
  progressPercentage: 60,
  canRate: false,
  steps: [
    {
      id: '1',
      title: 'Report Submitted',
      description: 'Your report has been successfully submitted and assigned a tracking ID.',
      timestamp: '2024-01-15T10:30:00Z',
      status: 'completed'
    },
    {
      id: '2',
      title: 'Initial Review',
      description: 'Report reviewed and categorized by our triage team.',
      timestamp: '2024-01-15T14:20:00Z',
      status: 'completed',
      assignedTo: 'City Triage Team',
      notes: 'Verified as electrical issue. Priority set to medium.'
    },
    {
      id: '3',
      title: 'Assigned to Department',
      description: 'Issue assigned to the appropriate department for resolution.',
      timestamp: '2024-01-16T09:15:00Z',
      status: 'completed',
      assignedTo: 'Electrical Maintenance Department',
      notes: 'Assigned to Electrical Team Alpha for inspection and repair.'
    },
    {
      id: '4',
      title: 'Field Inspection',
      description: 'On-site inspection to assess the issue and determine repair requirements.',
      timestamp: '2024-01-17T11:45:00Z',
      status: 'current',
      assignedTo: 'Inspector John Martinez',
      notes: 'Inspection in progress. Issue confirmed - faulty wiring detected.',
      photos: ['inspection-photo-1.jpg']
    },
    {
      id: '5',
      title: 'Parts Ordered',
      description: 'Required replacement parts have been ordered.',
      timestamp: '',
      status: 'pending',
      assignedTo: 'Procurement Team'
    },
    {
      id: '6',
      title: 'Repair Work',
      description: 'Replacement and repair work in progress.',
      timestamp: '',
      status: 'pending',
      assignedTo: 'Electrical Repair Team'
    },
    {
      id: '7',
      title: 'Quality Check',
      description: 'Final inspection and testing to ensure proper functionality.',
      timestamp: '',
      status: 'pending',
      assignedTo: 'Quality Assurance Team'
    },
    {
      id: '8',
      title: 'Completed',
      description: 'Issue resolved and closed.',
      timestamp: '',
      status: 'pending'
    }
  ]
};

interface IssueProgressTrackerProps {
  issueId: string;
  onRatingSubmit?: (rating: number, feedback: string) => void;
}

export default function IssueProgressTracker({ issueId, onRatingSubmit }: IssueProgressTrackerProps) {
  const [issueProgress] = useState<IssueProgress>(mockIssueProgress);
  const [showRatingDialog, setShowRatingDialog] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');

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
      case 'low': return 'text-green-600 bg-green-50 dark:bg-green-950';
      case 'medium': return 'text-orange-600 bg-orange-50 dark:bg-orange-950';
      case 'high': return 'text-red-600 bg-red-50 dark:bg-red-950';
      case 'urgent': return 'text-red-800 bg-red-100 dark:bg-red-900 font-bold';
      default: return 'text-gray-600 bg-gray-50 dark:bg-gray-900';
    }
  };

  const getStepIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'current': return <Clock className="w-5 h-5 text-orange-500" />;
      case 'pending': return <Clock className="w-5 h-5 text-gray-400" />;
      default: return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const formatTimestamp = (timestamp: string) => {
    if (!timestamp) return 'Pending';
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleRatingSubmit = () => {
    onRatingSubmit?.(rating, feedback);
    setShowRatingDialog(false);
    setRating(0);
    setFeedback('');
  };

  const completedSteps = issueProgress.steps.filter(step => step.status === 'completed').length;
  const totalSteps = issueProgress.steps.length;

  return (
    <div className="space-y-6">
      {/* Issue Overview */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-xl text-civic-blue-900 dark:text-civic-blue-100">
                {issueProgress.title}
              </CardTitle>
              <CardDescription className="mt-2">
                Report ID: {issueProgress.id} • Submitted {formatTimestamp(issueProgress.submittedDate)}
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Badge className={`${getStatusColor(issueProgress.status)} text-white`}>
                {issueProgress.status}
              </Badge>
              <Badge className={getPriorityColor(issueProgress.priority)}>
                {issueProgress.priority} priority
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Progress Bar */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Overall Progress</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {completedSteps} of {totalSteps} steps completed
              </span>
            </div>
            <Progress value={issueProgress.progressPercentage} className="h-3" />
            <div className="text-xs text-gray-500 mt-1">
              {issueProgress.progressPercentage}% complete
            </div>
          </div>

          {/* Quick Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-4 h-4 text-gray-500" />
                <span>{issueProgress.location}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <FileText className="w-4 h-4 text-gray-500" />
                <span>{issueProgress.description}</span>
              </div>
              {issueProgress.photos.length > 0 && (
                <div className="flex items-center gap-2 text-sm">
                  <Camera className="w-4 h-4 text-gray-500" />
                  <span>{issueProgress.photos.length} photo(s) attached</span>
                </div>
              )}
            </div>
            <div className="space-y-2">
              {issueProgress.estimatedCompletion && (
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-green-500" />
                  <span>Expected completion: {issueProgress.estimatedCompletion}</span>
                </div>
              )}
              {issueProgress.actualCompletion && (
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Completed: {issueProgress.actualCompletion}</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Progress Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Progress Timeline
          </CardTitle>
          <CardDescription>
            Detailed timeline of your issue resolution process
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {issueProgress.steps.map((step, index) => (
              <div key={step.id} className="flex gap-4">
                {/* Timeline Line */}
                <div className="flex flex-col items-center">
                  <div className={`
                    w-10 h-10 rounded-full flex items-center justify-center
                    ${step.status === 'completed' ? 'bg-green-100 dark:bg-green-900' : 
                      step.status === 'current' ? 'bg-orange-100 dark:bg-orange-900' : 
                      'bg-gray-100 dark:bg-gray-800'}
                  `}>
                    {getStepIcon(step.status)}
                  </div>
                  {index < issueProgress.steps.length - 1 && (
                    <div className={`
                      w-0.5 h-16 mt-2
                      ${step.status === 'completed' ? 'bg-green-300' : 'bg-gray-300 dark:bg-gray-600'}
                    `} />
                  )}
                </div>

                {/* Step Content */}
                <div className={`flex-1 pb-8 ${step.status === 'current' ? 'bg-orange-50 dark:bg-orange-950/20 -ml-4 pl-4 pr-4 rounded-r-lg' : ''}`}>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className={`font-semibold ${
                      step.status === 'completed' ? 'text-green-700 dark:text-green-300' :
                      step.status === 'current' ? 'text-orange-700 dark:text-orange-300' :
                      'text-gray-500 dark:text-gray-400'
                    }`}>
                      {step.title}
                    </h3>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {formatTimestamp(step.timestamp)}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                    {step.description}
                  </p>

                  {step.assignedTo && (
                    <div className="flex items-center gap-2 text-xs text-civic-blue-600 dark:text-civic-blue-400 mb-2">
                      <User className="w-3 h-3" />
                      <span>Assigned to: {step.assignedTo}</span>
                    </div>
                  )}

                  {step.notes && (
                    <div className="bg-gray-50 dark:bg-gray-800 rounded-md p-3 text-xs">
                      <div className="flex items-center gap-2 mb-1">
                        <MessageSquare className="w-3 h-3" />
                        <span className="font-medium">Update Notes:</span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300">{step.notes}</p>
                    </div>
                  )}

                  {step.photos && step.photos.length > 0 && (
                    <div className="mt-2">
                      <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                        <Camera className="w-3 h-3" />
                        <span>Progress Photos ({step.photos.length})</span>
                      </div>
                      <div className="flex gap-2">
                        {step.photos.map((photo, photoIndex) => (
                          <div key={photoIndex} className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center">
                            <Camera className="w-6 h-6 text-gray-400" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {step.status === 'current' && (
                    <div className="mt-2">
                      <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
                        Currently Active
                      </Badge>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Rating Section */}
      {issueProgress.canRate && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="w-5 h-5" />
              Rate Our Service
            </CardTitle>
            <CardDescription>
              Help us improve by rating your experience
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                How satisfied are you with the resolution of this issue?
              </p>
              <Dialog open={showRatingDialog} onOpenChange={setShowRatingDialog}>
                <DialogTrigger asChild>
                  <Button>
                    <Star className="w-4 h-4 mr-2" />
                    Rate Service
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Rate Your Experience</DialogTitle>
                    <DialogDescription>
                      Please rate your satisfaction with how this issue was handled
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Rating</label>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            onClick={() => setRating(star)}
                            className={`w-8 h-8 ${
                              rating >= star ? 'text-yellow-500' : 'text-gray-300'
                            }`}
                          >
                            <Star className="w-6 h-6 fill-current" />
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Feedback (Optional)</label>
                      <Textarea
                        placeholder="Tell us about your experience..."
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        rows={3}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={handleRatingSubmit} disabled={rating === 0}>
                        Submit Rating
                      </Button>
                      <Button variant="outline" onClick={() => setShowRatingDialog(false)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm">
              <Eye className="w-4 h-4 mr-2" />
              View Photos
            </Button>
            <Button variant="outline" size="sm">
              <MapPin className="w-4 h-4 mr-2" />
              View Location
            </Button>
            <Button variant="outline" size="sm">
              <MessageSquare className="w-4 h-4 mr-2" />
              Add Comment
            </Button>
            <Button variant="outline" size="sm">
              <ThumbsUp className="w-4 h-4 mr-2" />
              Helpful
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
