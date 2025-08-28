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
import {
  Trophy,
  Star,
  Medal,
  Award,
  Target,
  TrendingUp,
  Users,
  Zap,
  Crown,
  Gift,
  CheckCircle,
  MapPin,
  Calendar,
} from "lucide-react";

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  points: number;
  unlocked: boolean;
  progress?: number;
  maxProgress?: number;
}

interface LeaderboardEntry {
  rank: number;
  name: string;
  points: number;
  reportsSubmitted: number;
  badge: string;
}

export default function GamificationHub() {
  const [currentUser] = useState({
    name: "John D.",
    level: 7,
    points: 1420,
    nextLevelPoints: 1600,
    reportsSubmitted: 23,
    issuesResolved: 18,
    streak: 5,
    rank: 12,
  });

  const achievements: Achievement[] = [
    {
      id: "first_report",
      title: "First Reporter",
      description: "Submit your first civic issue report",
      icon: <Star className="w-6 h-6 text-yellow-500" />,
      points: 50,
      unlocked: true,
    },
    {
      id: "helpful_citizen",
      title: "Helpful Citizen",
      description: "Submit 10 reports",
      icon: <Users className="w-6 h-6 text-blue-500" />,
      points: 200,
      unlocked: true,
      progress: 23,
      maxProgress: 10,
    },
    {
      id: "streak_master",
      title: "Streak Master",
      description: "Report issues for 7 consecutive days",
      icon: <Zap className="w-6 h-6 text-orange-500" />,
      points: 300,
      unlocked: false,
      progress: 5,
      maxProgress: 7,
    },
    {
      id: "neighborhood_guardian",
      title: "Neighborhood Guardian",
      description: "Have 15 reports resolved",
      icon: <Crown className="w-6 h-6 text-purple-500" />,
      points: 500,
      unlocked: true,
      progress: 18,
      maxProgress: 15,
    },
    {
      id: "photo_champion",
      title: "Photo Champion",
      description: "Submit 25 reports with photos",
      icon: <Award className="w-6 h-6 text-green-500" />,
      points: 250,
      unlocked: false,
      progress: 19,
      maxProgress: 25,
    },
    {
      id: "community_leader",
      title: "Community Leader",
      description: "Reach top 10 in city leaderboard",
      icon: <Trophy className="w-6 h-6 text-gold-500" />,
      points: 1000,
      unlocked: false,
      progress: 12,
      maxProgress: 10,
    },
  ];

  const leaderboard: LeaderboardEntry[] = [
    {
      rank: 1,
      name: "Sarah M.",
      points: 3250,
      reportsSubmitted: 67,
      badge: "🏆",
    },
    {
      rank: 2,
      name: "Mike K.",
      points: 2890,
      reportsSubmitted: 54,
      badge: "🥈",
    },
    {
      rank: 3,
      name: "Emma L.",
      points: 2640,
      reportsSubmitted: 48,
      badge: "🥉",
    },
    {
      rank: 4,
      name: "Alex R.",
      points: 2150,
      reportsSubmitted: 41,
      badge: "⭐",
    },
    {
      rank: 5,
      name: "Lisa T.",
      points: 1980,
      reportsSubmitted: 37,
      badge: "⭐",
    },
    {
      rank: 6,
      name: "Tom W.",
      points: 1750,
      reportsSubmitted: 32,
      badge: "⭐",
    },
    {
      rank: 7,
      name: "Rachel P.",
      points: 1620,
      reportsSubmitted: 29,
      badge: "⭐",
    },
    {
      rank: 8,
      name: "David S.",
      points: 1580,
      reportsSubmitted: 28,
      badge: "⭐",
    },
    {
      rank: 9,
      name: "Anna B.",
      points: 1490,
      reportsSubmitted: 26,
      badge: "⭐",
    },
    {
      rank: 10,
      name: "Chris H.",
      points: 1460,
      reportsSubmitted: 25,
      badge: "⭐",
    },
    {
      rank: 11,
      name: "Maria G.",
      points: 1440,
      reportsSubmitted: 24,
      badge: "⭐",
    },
    {
      rank: 12,
      name: "John D.",
      points: 1420,
      reportsSubmitted: 23,
      badge: "⭐",
    },
  ];

  const challenges = [
    {
      id: "weekly_reporter",
      title: "Weekly Reporter",
      description: "Submit 3 reports this week",
      progress: 1,
      maxProgress: 3,
      reward: "100 points + Special Badge",
      timeLeft: "4 days left",
      type: "weekly",
    },
    {
      id: "quality_photos",
      title: "Quality Photos",
      description: "Submit 5 reports with high-quality photos",
      progress: 3,
      maxProgress: 5,
      reward: "150 points",
      timeLeft: "10 days left",
      type: "monthly",
    },
    {
      id: "community_impact",
      title: "Community Impact",
      description: "Get 5 of your reports resolved",
      progress: 2,
      maxProgress: 5,
      reward: "200 points + Impact Badge",
      timeLeft: "2 weeks left",
      type: "special",
    },
  ];

  const getBadgeForLevel = (level: number) => {
    if (level >= 20)
      return { name: "Civic Champion", color: "bg-purple-500", icon: "👑" };
    if (level >= 15)
      return { name: "Community Hero", color: "bg-gold-500", icon: "🏆" };
    if (level >= 10)
      return { name: "Active Citizen", color: "bg-blue-500", icon: "⭐" };
    if (level >= 5)
      return { name: "Helpful Reporter", color: "bg-green-500", icon: "📝" };
    return { name: "New Citizen", color: "bg-gray-500", icon: "👋" };
  };

  const userBadge = getBadgeForLevel(currentUser.level);

  return (
    <div className="space-y-6">
      {/* User Profile Card */}
      <Card className="bg-gradient-to-r from-civic-blue-500 to-civic-green-500 text-white">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-2xl">
                {userBadge.icon}
              </div>
              <div>
                <CardTitle className="text-2xl">{currentUser.name}</CardTitle>
                <CardDescription className="text-blue-100">
                  Level {currentUser.level} • {userBadge.name}
                </CardDescription>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">{currentUser.points}</div>
              <div className="text-blue-100 text-sm">Civic Points</div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>Progress to Level {currentUser.level + 1}</span>
              <span>
                {currentUser.points} / {currentUser.nextLevelPoints}
              </span>
            </div>
            <Progress
              value={(currentUser.points / currentUser.nextLevelPoints) * 100}
              className="bg-white/20"
            />

            <div className="grid grid-cols-4 gap-4 mt-4">
              <div className="text-center">
                <div className="font-bold text-xl">
                  {currentUser.reportsSubmitted}
                </div>
                <div className="text-xs text-blue-100">Reports</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-xl">
                  {currentUser.issuesResolved}
                </div>
                <div className="text-xs text-blue-100">Resolved</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-xl">{currentUser.streak}</div>
                <div className="text-xs text-blue-100">Day Streak</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-xl">#{currentUser.rank}</div>
                <div className="text-xs text-blue-100">City Rank</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Active Challenges */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-civic-blue-900">
            <Target className="w-5 h-5" />
            Active Challenges
          </CardTitle>
          <CardDescription>
            Complete challenges to earn extra points and exclusive badges
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {challenges.map((challenge) => (
              <div
                key={challenge.id}
                className="border rounded-lg p-4 space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-civic-blue-900">
                      {challenge.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {challenge.description}
                    </p>
                  </div>
                  <Badge
                    className={`${
                      challenge.type === "weekly"
                        ? "bg-green-500"
                        : challenge.type === "monthly"
                          ? "bg-blue-500"
                          : "bg-purple-500"
                    } text-white`}
                  >
                    {challenge.type}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>
                      Progress: {challenge.progress}/{challenge.maxProgress}
                    </span>
                    <span className="text-gray-500">{challenge.timeLeft}</span>
                  </div>
                  <Progress
                    value={(challenge.progress / challenge.maxProgress) * 100}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-sm text-civic-green-600">
                    <Gift className="w-4 h-4" />
                    {challenge.reward}
                  </div>
                  {challenge.progress === challenge.maxProgress && (
                    <Button
                      size="sm"
                      className="bg-civic-green-500 hover:bg-civic-green-600"
                    >
                      Claim Reward
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-civic-blue-900">
            <Medal className="w-5 h-5" />
            Achievements
          </CardTitle>
          <CardDescription>
            Unlock achievements by being an active civic contributor
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`border rounded-lg p-4 ${
                  achievement.unlocked
                    ? "bg-gradient-to-br from-green-50 to-blue-50 border-green-200"
                    : "bg-gray-50 border-gray-200"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`${achievement.unlocked ? "" : "opacity-50"}`}
                  >
                    {achievement.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3
                      className={`font-semibold ${achievement.unlocked ? "text-green-800" : "text-gray-600"}`}
                    >
                      {achievement.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {achievement.description}
                    </p>

                    {achievement.progress !== undefined &&
                      achievement.maxProgress && (
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span>Progress</span>
                            <span>
                              {achievement.progress}/{achievement.maxProgress}
                            </span>
                          </div>
                          <Progress
                            value={
                              (achievement.progress / achievement.maxProgress) *
                              100
                            }
                            className="h-2"
                          />
                        </div>
                      )}

                    <div className="flex items-center justify-between mt-2">
                      <Badge
                        className={`${achievement.unlocked ? "bg-green-500" : "bg-gray-400"} text-white`}
                      >
                        {achievement.points} pts
                      </Badge>
                      {achievement.unlocked && (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Leaderboard */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-civic-blue-900">
            <Trophy className="w-5 h-5" />
            City Leaderboard
          </CardTitle>
          <CardDescription>
            See how you rank among other civic-minded citizens
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {leaderboard.map((entry) => (
              <div
                key={entry.rank}
                className={`flex items-center justify-between p-3 rounded-lg ${
                  entry.name === currentUser.name
                    ? "bg-civic-blue-50 border border-civic-blue-200"
                    : "bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-lg w-6">{entry.rank}</span>
                    <span className="text-xl">{entry.badge}</span>
                  </div>
                  <div>
                    <div
                      className={`font-medium ${entry.name === currentUser.name ? "text-civic-blue-900" : ""}`}
                    >
                      {entry.name} {entry.name === currentUser.name && "(You)"}
                    </div>
                    <div className="text-sm text-gray-600">
                      {entry.reportsSubmitted} reports submitted
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-civic-blue-600">
                    {entry.points}
                  </div>
                  <div className="text-xs text-gray-500">points</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
