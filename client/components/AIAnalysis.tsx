import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { 
  Brain, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Zap, 
  Target,
  TrendingUp,
  MapPin,
  Users
} from "lucide-react";

interface AIAnalysisProps {
  title: string;
  description: string;
  location: string;
  photos?: File[];
  onSuggestedCategory?: (category: string) => void;
  onDuplicatesFound?: (duplicates: any[]) => void;
}

export default function AIAnalysis({ 
  title, 
  description, 
  location, 
  photos = [],
  onSuggestedCategory,
  onDuplicatesFound 
}: AIAnalysisProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);
  const [duplicates, setDuplicates] = useState<any[]>([]);

  // Simulate AI analysis
  useEffect(() => {
    if (title && description) {
      setIsAnalyzing(true);
      
      // Simulate AI processing delay
      setTimeout(() => {
        const mockAnalysis = performAIAnalysis(title, description, location);
        const mockDuplicates = findPotentialDuplicates(title, description, location);
        
        setAnalysis(mockAnalysis);
        setDuplicates(mockDuplicates);
        setIsAnalyzing(false);
        
        if (onSuggestedCategory) {
          onSuggestedCategory(mockAnalysis.suggestedCategory);
        }
        if (onDuplicatesFound) {
          onDuplicatesFound(mockDuplicates);
        }
      }, 2000);
    }
  }, [title, description, location]);

  const performAIAnalysis = (title: string, description: string, location: string) => {
    // Mock AI categorization logic
    const keywords = (title + " " + description).toLowerCase();
    let suggestedCategory = "other";
    let confidence = 0;

    if (keywords.includes("light") || keywords.includes("lamp") || keywords.includes("dark")) {
      suggestedCategory = "lighting";
      confidence = 0.92;
    } else if (keywords.includes("road") || keywords.includes("pothole") || keywords.includes("traffic")) {
      suggestedCategory = "roads";
      confidence = 0.88;
    } else if (keywords.includes("water") || keywords.includes("leak") || keywords.includes("pipe")) {
      suggestedCategory = "water";
      confidence = 0.95;
    } else if (keywords.includes("park") || keywords.includes("tree") || keywords.includes("playground")) {
      suggestedCategory = "parks";
      confidence = 0.84;
    } else if (keywords.includes("trash") || keywords.includes("garbage") || keywords.includes("waste")) {
      suggestedCategory = "waste";
      confidence = 0.91;
    }

    // Mock priority assessment
    let suggestedPriority = "medium";
    if (keywords.includes("emergency") || keywords.includes("dangerous") || keywords.includes("urgent")) {
      suggestedPriority = "urgent";
    } else if (keywords.includes("leak") || keywords.includes("broken") || keywords.includes("safety")) {
      suggestedPriority = "high";
    } else if (keywords.includes("minor") || keywords.includes("cosmetic")) {
      suggestedPriority = "low";
    }

    return {
      suggestedCategory,
      categoryConfidence: confidence,
      suggestedPriority,
      estimatedResolutionTime: getEstimatedTime(suggestedCategory),
      riskLevel: assessRiskLevel(keywords),
      insights: generateInsights(keywords, location)
    };
  };

  const findPotentialDuplicates = (title: string, description: string, location: string) => {
    // Mock duplicate detection
    const mockReports = [
      {
        id: "CR-2024-0145",
        title: "Street light not working on Main St",
        location: "Main St & 2nd Ave",
        similarity: 0.87,
        status: "in_progress"
      },
      {
        id: "CR-2024-0132",
        title: "Broken lamp post near intersection",
        location: "Main St & 1st Ave",
        similarity: 0.73,
        status: "pending"
      }
    ];

    if (title.toLowerCase().includes("light") && location.toLowerCase().includes("main")) {
      return mockReports;
    }
    
    return [];
  };

  const getEstimatedTime = (category: string) => {
    const timeEstimates: Record<string, string> = {
      lighting: "2-3 days",
      roads: "1-2 weeks",
      water: "24-48 hours",
      parks: "3-5 days",
      waste: "1-2 days",
      other: "3-7 days"
    };
    return timeEstimates[category] || "3-7 days";
  };

  const assessRiskLevel = (keywords: string) => {
    if (keywords.includes("dangerous") || keywords.includes("emergency") || keywords.includes("safety")) {
      return "high";
    } else if (keywords.includes("urgent") || keywords.includes("broken") || keywords.includes("leak")) {
      return "medium";
    }
    return "low";
  };

  const generateInsights = (keywords: string, location: string) => {
    const insights = [];
    
    if (keywords.includes("water") && keywords.includes("leak")) {
      insights.push("Water leaks can cause significant infrastructure damage if not addressed quickly.");
    }
    
    if (keywords.includes("light") && keywords.includes("safety")) {
      insights.push("Poor lighting can impact public safety, especially during evening hours.");
    }
    
    if (location.toLowerCase().includes("school") || location.toLowerCase().includes("park")) {
      insights.push("Issues near schools and parks receive priority due to public safety concerns.");
    }
    
    return insights;
  };

  if (!title && !description) {
    return null;
  }

  return (
    <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-purple-900">
          <Brain className="w-5 h-5" />
          AI Analysis
          {isAnalyzing && <div className="animate-spin w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full"></div>}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {isAnalyzing ? (
          <div className="text-center py-6">
            <div className="animate-pulse space-y-3">
              <div className="h-4 bg-purple-200 rounded w-3/4 mx-auto"></div>
              <div className="h-4 bg-purple-200 rounded w-1/2 mx-auto"></div>
              <div className="h-4 bg-purple-200 rounded w-2/3 mx-auto"></div>
            </div>
            <p className="text-purple-600 mt-4">AI is analyzing your report...</p>
          </div>
        ) : analysis ? (
          <div className="space-y-4">
            {/* Category Suggestion */}
            <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-purple-500" />
                <span className="font-medium">Suggested Category:</span>
                <Badge className="bg-purple-500 text-white">
                  {analysis.suggestedCategory}
                </Badge>
              </div>
              <Badge variant="outline" className="text-green-600 border-green-600">
                {Math.round(analysis.categoryConfidence * 100)}% confident
              </Badge>
            </div>

            {/* Priority Assessment */}
            <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
              <div className="flex items-center gap-2">
                <AlertTriangle className={`w-4 h-4 ${
                  analysis.suggestedPriority === 'urgent' ? 'text-red-500' :
                  analysis.suggestedPriority === 'high' ? 'text-orange-500' :
                  analysis.suggestedPriority === 'medium' ? 'text-yellow-500' : 'text-green-500'
                }`} />
                <span className="font-medium">AI Priority Assessment:</span>
                <Badge className={`${
                  analysis.suggestedPriority === 'urgent' ? 'bg-red-500' :
                  analysis.suggestedPriority === 'high' ? 'bg-orange-500' :
                  analysis.suggestedPriority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                } text-white`}>
                  {analysis.suggestedPriority}
                </Badge>
              </div>
            </div>

            {/* Time Estimate */}
            <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-500" />
                <span className="font-medium">Estimated Resolution:</span>
                <span className="text-blue-600 font-semibold">{analysis.estimatedResolutionTime}</span>
              </div>
            </div>

            {/* Risk Level */}
            <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-orange-500" />
                <span className="font-medium">Risk Level:</span>
                <Badge className={`${
                  analysis.riskLevel === 'high' ? 'bg-red-500' :
                  analysis.riskLevel === 'medium' ? 'bg-orange-500' : 'bg-green-500'
                } text-white`}>
                  {analysis.riskLevel}
                </Badge>
              </div>
            </div>

            {/* AI Insights */}
            {analysis.insights.length > 0 && (
              <Alert className="border-blue-200 bg-blue-50">
                <TrendingUp className="w-4 h-4" />
                <AlertDescription>
                  <div className="font-medium mb-2">AI Insights:</div>
                  <ul className="space-y-1 text-sm">
                    {analysis.insights.map((insight: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-blue-500 mt-1">•</span>
                        {insight}
                      </li>
                    ))}
                  </ul>
                </AlertDescription>
              </Alert>
            )}

            {/* Duplicate Detection */}
            {duplicates.length > 0 && (
              <Alert className="border-amber-200 bg-amber-50">
                <Users className="w-4 h-4" />
                <AlertDescription>
                  <div className="font-medium mb-2">⚠️ Potential Duplicates Found:</div>
                  <div className="space-y-2">
                    {duplicates.map((duplicate) => (
                      <div key={duplicate.id} className="flex items-center justify-between p-2 bg-white rounded border">
                        <div>
                          <div className="font-medium text-sm">{duplicate.title}</div>
                          <div className="text-xs text-gray-600 flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {duplicate.location}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">
                            {Math.round(duplicate.similarity * 100)}% similar
                          </Badge>
                          <Button size="sm" variant="outline">View</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm mt-2 text-amber-700">
                    Consider checking these reports before submitting to avoid duplicates.
                  </p>
                </AlertDescription>
              </Alert>
            )}
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}
