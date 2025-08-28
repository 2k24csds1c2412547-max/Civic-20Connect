import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  ThumbsUp, 
  ThumbsDown, 
  MessageSquare, 
  Share2, 
  Users, 
  TrendingUp,
  Clock,
  MapPin,
  AlertTriangle,
  CheckCircle,
  Star,
  Heart,
  Eye,
  Send
} from "lucide-react";

interface CommunityIssue {
  id: string;
  title: string;
  description: string;
  location: string;
  category: string;
  submittedBy: string;
  submittedDate: string;
  status: 'pending' | 'in_progress' | 'completed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  votes: {
    upvotes: number;
    downvotes: number;
    userVote?: 'up' | 'down' | null;
  };
  comments: Comment[];
  views: number;
  supporters: number;
  trending: boolean;
}

interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  likes: number;
  userLiked?: boolean;
}

export default function CommunityCollaboration() {
  const [selectedIssue, setSelectedIssue] = useState<CommunityIssue | null>(null);
  const [newComment, setNewComment] = useState("");
  const [sortBy, setSortBy] = useState<'trending' | 'votes' | 'recent'>('trending');

  // Mock data for community issues
  const [communityIssues, setCommunityIssues] = useState<CommunityIssue[]>([
    {
      id: "CI-001",
      title: "Broken streetlight creating safety hazard",
      description: "The streetlight at Main St & 2nd Ave has been broken for weeks, creating a dangerous dark spot for pedestrians and drivers.",
      location: "Main St & 2nd Ave",
      category: "lighting",
      submittedBy: "Sarah M.",
      submittedDate: "2024-01-15",
      status: "pending",
      priority: "high",
      votes: { upvotes: 47, downvotes: 2, userVote: null },
      comments: [
        {
          id: "c1",
          author: "Mike K.",
          content: "I walk by here every evening and it's really dangerous. Please prioritize this!",
          timestamp: "2024-01-16 10:30",
          likes: 12,
          userLiked: false
        },
        {
          id: "c2",
          author: "Emma L.",
          content: "My neighbor had a close call here last week. This needs immediate attention.",
          timestamp: "2024-01-16 14:20",
          likes: 8,
          userLiked: false
        }
      ],
      views: 234,
      supporters: 49,
      trending: true
    },
    {
      id: "CI-002",
      title: "Park playground needs equipment repair",
      description: "Several pieces of playground equipment in Central Park are broken or unsafe for children.",
      location: "Central Park",
      category: "parks",
      submittedBy: "Lisa T.",
      submittedDate: "2024-01-12",
      status: "in_progress",
      priority: "medium",
      votes: { upvotes: 32, downvotes: 1, userVote: 'up' },
      comments: [
        {
          id: "c3",
          author: "Tom W.",
          content: "The swing set chains are rusted and the slide has a crack. Thanks for reporting!",
          timestamp: "2024-01-13 09:15",
          likes: 5,
          userLiked: true
        }
      ],
      views: 156,
      supporters: 33,
      trending: false
    },
    {
      id: "CI-003",
      title: "Pothole causing vehicle damage",
      description: "Large pothole on Oak Avenue is causing tire damage to multiple vehicles daily.",
      location: "Oak Avenue near School",
      category: "roads",
      submittedBy: "Alex R.",
      submittedDate: "2024-01-18",
      status: "pending",
      priority: "urgent",
      votes: { upvotes: 63, downvotes: 0, userVote: null },
      comments: [],
      views: 89,
      supporters: 63,
      trending: true
    }
  ]);

  const handleVote = (issueId: string, voteType: 'up' | 'down') => {
    setCommunityIssues(prev => prev.map(issue => {
      if (issue.id === issueId) {
        const currentVote = issue.votes.userVote;
        let newUpvotes = issue.votes.upvotes;
        let newDownvotes = issue.votes.downvotes;
        let newUserVote: 'up' | 'down' | null = voteType;

        // Remove previous vote if exists
        if (currentVote === 'up') newUpvotes--;
        if (currentVote === 'down') newDownvotes--;

        // Add new vote or remove if same vote clicked again
        if (currentVote === voteType) {
          newUserVote = null; // Remove vote if clicking same button
        } else {
          if (voteType === 'up') newUpvotes++;
          if (voteType === 'down') newDownvotes++;
        }

        return {
          ...issue,
          votes: {
            upvotes: newUpvotes,
            downvotes: newDownvotes,
            userVote: newUserVote
          }
        };
      }
      return issue;
    }));
  };

  const handleComment = (issueId: string) => {
    if (!newComment.trim()) return;

    setCommunityIssues(prev => prev.map(issue => {
      if (issue.id === issueId) {
        const newCommentObj: Comment = {
          id: `c${Date.now()}`,
          author: "You",
          content: newComment,
          timestamp: new Date().toLocaleString(),
          likes: 0,
          userLiked: false
        };
        return {
          ...issue,
          comments: [...issue.comments, newCommentObj]
        };
      }
      return issue;
    }));
    setNewComment("");
  };

  const handleCommentLike = (issueId: string, commentId: string) => {
    setCommunityIssues(prev => prev.map(issue => {
      if (issue.id === issueId) {
        return {
          ...issue,
          comments: issue.comments.map(comment => {
            if (comment.id === commentId) {
              return {
                ...comment,
                likes: comment.userLiked ? comment.likes - 1 : comment.likes + 1,
                userLiked: !comment.userLiked
              };
            }
            return comment;
          })
        };
      }
      return issue;
    }));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'in_progress': return <Clock className="w-4 h-4 text-blue-500" />;
      default: return <AlertTriangle className="w-4 h-4 text-orange-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const sortedIssues = [...communityIssues].sort((a, b) => {
    switch (sortBy) {
      case 'trending':
        return (b.trending ? 1 : 0) - (a.trending ? 1 : 0) || b.votes.upvotes - a.votes.upvotes;
      case 'votes':
        return b.votes.upvotes - a.votes.upvotes;
      case 'recent':
        return new Date(b.submittedDate).getTime() - new Date(a.submittedDate).getTime();
      default:
        return 0;
    }
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-civic-blue-900">
            <Users className="w-5 h-5" />
            Community Collaboration
          </CardTitle>
          <CardDescription>
            Vote on community issues, share insights, and collaborate on solutions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Button 
              variant={sortBy === 'trending' ? 'default' : 'outline'} 
              onClick={() => setSortBy('trending')}
              size="sm"
            >
              <TrendingUp className="w-4 h-4 mr-1" />
              Trending
            </Button>
            <Button 
              variant={sortBy === 'votes' ? 'default' : 'outline'} 
              onClick={() => setSortBy('votes')}
              size="sm"
            >
              <ThumbsUp className="w-4 h-4 mr-1" />
              Most Voted
            </Button>
            <Button 
              variant={sortBy === 'recent' ? 'default' : 'outline'} 
              onClick={() => setSortBy('recent')}
              size="sm"
            >
              <Clock className="w-4 h-4 mr-1" />
              Recent
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Issues List */}
      <div className="space-y-4">
        {sortedIssues.map((issue) => (
          <Card key={issue.id} className="hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* Issue Header */}
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-civic-blue-900">{issue.title}</h3>
                      {issue.trending && (
                        <Badge className="bg-orange-500 text-white">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          Trending
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {issue.location}
                      </div>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(issue.status)}
                        <span className="capitalize">{issue.status.replace('_', ' ')}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {issue.views} views
                      </div>
                    </div>
                    
                    <p className="text-gray-700 mb-3">{issue.description}</p>
                    
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="capitalize">{issue.category}</Badge>
                      <Badge className={`${getPriorityColor(issue.priority)} text-white`}>
                        {issue.priority} priority
                      </Badge>
                      <span className="text-sm text-gray-500">by {issue.submittedBy} on {issue.submittedDate}</span>
                    </div>
                  </div>
                </div>

                {/* Voting and Actions */}
                <div className="flex items-center justify-between border-t pt-4">
                  <div className="flex items-center gap-4">
                    {/* Voting */}
                    <div className="flex items-center gap-1">
                      <Button
                        variant={issue.votes.userVote === 'up' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => handleVote(issue.id, 'up')}
                        className={issue.votes.userVote === 'up' ? 'bg-green-500 hover:bg-green-600' : ''}
                      >
                        <ThumbsUp className="w-4 h-4 mr-1" />
                        {issue.votes.upvotes}
                      </Button>
                      <Button
                        variant={issue.votes.userVote === 'down' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => handleVote(issue.id, 'down')}
                        className={issue.votes.userVote === 'down' ? 'bg-red-500 hover:bg-red-600' : ''}
                      >
                        <ThumbsDown className="w-4 h-4 mr-1" />
                        {issue.votes.downvotes}
                      </Button>
                    </div>

                    {/* Comments */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedIssue(selectedIssue?.id === issue.id ? null : issue)}
                    >
                      <MessageSquare className="w-4 h-4 mr-1" />
                      {issue.comments.length} Comments
                    </Button>

                    {/* Share */}
                    <Button variant="outline" size="sm">
                      <Share2 className="w-4 h-4 mr-1" />
                      Share
                    </Button>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="w-4 h-4" />
                    {issue.supporters} supporters
                  </div>
                </div>

                {/* Comments Section */}
                {selectedIssue?.id === issue.id && (
                  <div className="border-t pt-4 space-y-4">
                    {/* Existing Comments */}
                    {issue.comments.length > 0 && (
                      <div className="space-y-3">
                        {issue.comments.map((comment) => (
                          <div key={comment.id} className="flex gap-3 p-3 bg-gray-50 rounded-lg">
                            <Avatar className="w-8 h-8">
                              <AvatarFallback>{comment.author[0]}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-medium text-sm">{comment.author}</span>
                                <span className="text-xs text-gray-500">{comment.timestamp}</span>
                              </div>
                              <p className="text-sm text-gray-700 mb-2">{comment.content}</p>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleCommentLike(issue.id, comment.id)}
                                className={`h-6 px-2 ${comment.userLiked ? 'text-red-500' : 'text-gray-500'}`}
                              >
                                <Heart className={`w-3 h-3 mr-1 ${comment.userLiked ? 'fill-current' : ''}`} />
                                {comment.likes}
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Add Comment */}
                    <div className="flex gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback>You</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-2">
                        <Textarea
                          placeholder="Add your comment or insight..."
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          rows={3}
                        />
                        <Button
                          onClick={() => handleComment(issue.id)}
                          disabled={!newComment.trim()}
                          size="sm"
                        >
                          <Send className="w-4 h-4 mr-2" />
                          Post Comment
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Community Guidelines */}
      <Alert className="border-blue-200 bg-blue-50">
        <Star className="w-4 h-4" />
        <AlertDescription>
          <div className="space-y-2">
            <div className="font-medium">Community Guidelines:</div>
            <ul className="text-sm space-y-1 ml-4">
              <li>• Vote based on issue importance and community impact</li>
              <li>• Provide constructive comments and additional context</li>
              <li>• Be respectful and solution-oriented</li>
              <li>• Avoid duplicate reports - vote on existing issues instead</li>
            </ul>
          </div>
        </AlertDescription>
      </Alert>
    </div>
  );
}
