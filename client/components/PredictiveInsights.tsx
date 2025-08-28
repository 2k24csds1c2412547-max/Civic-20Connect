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
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Brain,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Target,
  Calendar,
  MapPin,
  Zap,
  BarChart3,
  LineChart,
  PieChart,
  Activity,
  Lightbulb,
  Clock,
  DollarSign,
} from "lucide-react";

interface Prediction {
  id: string;
  type: "hotspot" | "maintenance" | "resource" | "seasonal";
  title: string;
  description: string;
  confidence: number;
  timeframe: string;
  impact: "low" | "medium" | "high";
  category: string;
  location?: string;
  recommendations: string[];
}

interface Insight {
  id: string;
  type: "trend" | "pattern" | "anomaly" | "efficiency";
  title: string;
  description: string;
  metric: string;
  value: number;
  change: number;
  icon: React.ReactNode;
  actionable: boolean;
}

export default function PredictiveInsights() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("30d");

  // Mock predictive data
  const predictions: Prediction[] = [
    {
      id: "p1",
      type: "hotspot",
      title: "Emerging Issue Hotspot Detected",
      description:
        "AI models predict Oak Avenue will become a high-priority area for road maintenance issues based on traffic patterns and weather data.",
      confidence: 87,
      timeframe: "Next 2-3 weeks",
      impact: "high",
      category: "roads",
      location: "Oak Avenue Corridor",
      recommendations: [
        "Schedule preventive maintenance inspection",
        "Increase patrol frequency in the area",
        "Prepare emergency repair resources",
      ],
    },
    {
      id: "p2",
      type: "maintenance",
      title: "Street Light Failure Prediction",
      description:
        "Based on usage patterns and maintenance history, 12 street lights in the downtown area are likely to fail within the next month.",
      confidence: 92,
      timeframe: "Next 30 days",
      impact: "medium",
      category: "lighting",
      location: "Downtown District",
      recommendations: [
        "Schedule proactive replacement",
        "Order replacement bulbs and fixtures",
        "Plan maintenance routes efficiently",
      ],
    },
    {
      id: "p3",
      type: "seasonal",
      title: "Winter Weather Impact Forecast",
      description:
        "Historical data suggests a 340% increase in road maintenance requests during upcoming winter months.",
      confidence: 95,
      timeframe: "Next 3 months",
      impact: "high",
      category: "roads",
      recommendations: [
        "Increase road maintenance budget allocation",
        "Pre-position salt and snow equipment",
        "Expand winter maintenance crew",
      ],
    },
    {
      id: "p4",
      type: "resource",
      title: "Resource Optimization Opportunity",
      description:
        "AI analysis shows Park & Recreation department could improve response times by 23% with route optimization.",
      confidence: 78,
      timeframe: "Immediate",
      impact: "medium",
      category: "parks",
      recommendations: [
        "Implement suggested route changes",
        "Redistrict maintenance zones",
        "Cross-train maintenance staff",
      ],
    },
  ];

  const insights: Insight[] = [
    {
      id: "i1",
      type: "trend",
      title: "Issue Resolution Efficiency",
      description: "Average resolution time has improved significantly",
      metric: "Avg Resolution Time",
      value: 4.2,
      change: -18,
      icon: <Clock className="w-5 h-5 text-green-500" />,
      actionable: false,
    },
    {
      id: "i2",
      type: "pattern",
      title: "Peak Reporting Hours",
      description: "Most issues are reported between 7-9 AM and 5-7 PM",
      metric: "Peak Hours",
      value: 67,
      change: 12,
      icon: <Activity className="w-5 h-5 text-blue-500" />,
      actionable: true,
    },
    {
      id: "i3",
      type: "anomaly",
      title: "Unusual Waste Complaints",
      description: "Waste management complaints up 45% in North District",
      metric: "Waste Issues",
      value: 145,
      change: 45,
      icon: <TrendingUp className="w-5 h-5 text-orange-500" />,
      actionable: true,
    },
    {
      id: "i4",
      type: "efficiency",
      title: "Cost Savings Achieved",
      description:
        "Predictive maintenance saved estimated $24,000 this quarter",
      metric: "Cost Savings",
      value: 24000,
      change: 32,
      icon: <DollarSign className="w-5 h-5 text-green-500" />,
      actionable: false,
    },
  ];

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "bg-red-500";
      case "medium":
        return "bg-orange-500";
      case "low":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "hotspot":
        return <MapPin className="w-5 h-5 text-red-500" />;
      case "maintenance":
        return <Target className="w-5 h-5 text-blue-500" />;
      case "seasonal":
        return <Calendar className="w-5 h-5 text-orange-500" />;
      case "resource":
        return <Zap className="w-5 h-5 text-purple-500" />;
      default:
        return <Brain className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Brain className="w-6 h-6" />
            Predictive Analytics & AI Insights
          </CardTitle>
          <CardDescription className="text-purple-100">
            Advanced AI-powered predictions and actionable insights to improve
            civic services
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold">87%</div>
              <div className="text-sm text-purple-100">Prediction Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">24</div>
              <div className="text-sm text-purple-100">Active Predictions</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">$24k</div>
              <div className="text-sm text-purple-100">Cost Savings</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">18%</div>
              <div className="text-sm text-purple-100">Efficiency Gain</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Predictions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-civic-blue-900">
            <Target className="w-5 h-5" />
            AI Predictions & Forecasts
          </CardTitle>
          <CardDescription>
            Proactive insights to prevent issues before they occur
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {predictions.map((prediction) => (
              <Card
                key={prediction.id}
                className="border-l-4 border-l-purple-500"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {getTypeIcon(prediction.type)}
                      <div>
                        <h3 className="font-semibold text-civic-blue-900">
                          {prediction.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {prediction.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        className={`${getImpactColor(prediction.impact)} text-white`}
                      >
                        {prediction.impact} impact
                      </Badge>
                      <Badge variant="outline">
                        {prediction.confidence}% confident
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span className="font-medium">Timeframe:</span>
                      <span>{prediction.timeframe}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Target className="w-4 h-4 text-gray-500" />
                      <span className="font-medium">Category:</span>
                      <span className="capitalize">{prediction.category}</span>
                    </div>
                    {prediction.location && (
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <span className="font-medium">Location:</span>
                        <span>{prediction.location}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">Confidence Level</span>
                      <span>{prediction.confidence}%</span>
                    </div>
                    <Progress value={prediction.confidence} className="h-2" />
                  </div>

                  <Alert className="border-blue-200 bg-blue-50">
                    <Lightbulb className="w-4 h-4" />
                    <AlertDescription>
                      <div className="font-medium mb-2">
                        Recommended Actions:
                      </div>
                      <ul className="space-y-1 text-sm">
                        {prediction.recommendations.map((rec, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-blue-500 mt-1">•</span>
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Smart Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-civic-blue-900">
            <BarChart3 className="w-5 h-5" />
            Smart Insights & Trends
          </CardTitle>
          <CardDescription>
            Data-driven insights from citizen reports and municipal operations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {insights.map((insight) => (
              <Card
                key={insight.id}
                className="hover:shadow-md transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      {insight.icon}
                      <div>
                        <h3 className="font-semibold text-civic-blue-900">
                          {insight.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {insight.description}
                        </p>
                      </div>
                    </div>
                    {insight.actionable && (
                      <Badge className="bg-orange-500 text-white">
                        Action Needed
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-civic-blue-600">
                        {insight.metric === "Cost Savings"
                          ? `$${insight.value.toLocaleString()}`
                          : insight.metric === "Avg Resolution Time"
                            ? `${insight.value} days`
                            : insight.value}
                      </div>
                      <div className="text-sm text-gray-600">
                        {insight.metric}
                      </div>
                    </div>
                    <div
                      className={`flex items-center gap-1 ${
                        insight.change > 0
                          ? insight.type === "anomaly"
                            ? "text-orange-600"
                            : "text-green-600"
                          : "text-green-600"
                      }`}
                    >
                      {insight.change > 0 ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : (
                        <TrendingDown className="w-4 h-4" />
                      )}
                      <span className="font-semibold">
                        {Math.abs(insight.change)}%
                      </span>
                    </div>
                  </div>

                  {insight.actionable && (
                    <Button size="sm" className="w-full mt-4">
                      View Action Plan
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Advanced Analytics Tools */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="text-center hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <LineChart className="w-12 h-12 text-civic-blue-500 mx-auto mb-4" />
            <h3 className="font-semibold text-civic-blue-900 mb-2">
              Trend Analysis
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Analyze long-term trends and patterns in civic issues
            </p>
            <Button variant="outline" size="sm">
              Explore Trends
            </Button>
          </CardContent>
        </Card>

        <Card className="text-center hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <PieChart className="w-12 h-12 text-civic-green-500 mx-auto mb-4" />
            <h3 className="font-semibold text-civic-green-900 mb-2">
              Resource Allocation
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Optimize department resources based on demand patterns
            </p>
            <Button variant="outline" size="sm">
              View Allocation
            </Button>
          </CardContent>
        </Card>

        <Card className="text-center hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <Brain className="w-12 h-12 text-purple-500 mx-auto mb-4" />
            <h3 className="font-semibold text-purple-900 mb-2">ML Models</h3>
            <p className="text-sm text-gray-600 mb-4">
              Configure and monitor machine learning prediction models
            </p>
            <Button variant="outline" size="sm">
              Manage Models
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
