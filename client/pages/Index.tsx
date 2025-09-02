import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Camera,
  MapPin,
  Users,
  Bell,
  CheckCircle,
  Clock,
  AlertTriangle,
  Shield,
  Smartphone,
  Monitor,
  Star,
  TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-civic-blue-50 via-white to-civic-green-50 dark:from-civic-blue-950 dark:via-gray-900 dark:to-civic-green-950">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-civic-blue-100 dark:border-civic-blue-800 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-civic-blue-500 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-civic-blue-900 dark:text-civic-blue-100">
                CivicConnect
              </h1>
              <p className="text-xs text-civic-blue-600 dark:text-civic-blue-300">
                Community Issue Reporting
              </p>
            </div>
          </div>
          <nav className="hidden lg:flex items-center gap-4">
            <Link
              to="/community"
              className="text-civic-blue-700 hover:text-civic-blue-900 font-medium dark:text-civic-blue-300 dark:hover:text-civic-blue-100"
            >
              Community
            </Link>
            <Link
              to="/analytics"
              className="text-civic-blue-700 hover:text-civic-blue-900 font-medium dark:text-civic-blue-300 dark:hover:text-civic-blue-100"
            >
              Analytics
            </Link>
            <Link
              to="/rewards"
              className="text-civic-blue-700 hover:text-civic-blue-900 font-medium dark:text-civic-blue-300 dark:hover:text-civic-blue-100"
            >
              Rewards
            </Link>
            <ThemeToggle />
            <Button variant="outline" size="sm" asChild>
              <Link to="/admin">Admin Portal</Link>
            </Button>
            <Button size="sm" asChild>
              <Link to="/report">Report Issue</Link>
            </Button>
          </nav>
          <div className="flex lg:hidden items-center gap-2">
            <ThemeToggle />
            <Button className="md:hidden" variant="outline" size="sm">
              Menu
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <Badge className="mb-6 bg-civic-blue-100 text-civic-blue-800 hover:bg-civic-blue-200 dark:bg-civic-blue-900 dark:text-civic-blue-100 dark:hover:bg-civic-blue-800">
            ����️ Empowering Communities
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold text-civic-blue-900 dark:text-civic-blue-100 mb-6 leading-tight">
            Report. Track.
            <br />
            <span className="text-civic-green-600 dark:text-civic-green-400">Resolve.</span>
          </h1>
          <p className="text-xl text-civic-blue-700 dark:text-civic-blue-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Connect your community with local government through our
            comprehensive civic issue reporting platform. Report problems, track
            progress, and see real change happen in your neighborhood.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              size="lg"
              className="text-lg px-8 py-6 bg-civic-blue-500 hover:bg-civic-blue-600"
              asChild
            >
              <Link to="/report">
                <Camera className="w-5 h-5 mr-2" />
                Report an Issue
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 border-civic-blue-300 text-civic-blue-700 hover:bg-civic-blue-50"
              asChild
            >
              <Link to="/admin">
                <Monitor className="w-5 h-5 mr-2" />
                Admin Dashboard
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <Card className="border-civic-blue-200 bg-white/50 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-civic-blue-600 mb-2">
                  2,847
                </div>
                <div className="text-sm text-civic-blue-700">
                  Issues Resolved
                </div>
              </CardContent>
            </Card>
            <Card className="border-civic-green-200 bg-white/50 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-civic-green-600 mb-2">
                  15,432
                </div>
                <div className="text-sm text-civic-green-700">
                  Active Citizens
                </div>
              </CardContent>
            </Card>
            <Card className="border-civic-orange-200 bg-white/50 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-civic-orange-600 mb-2">
                  12
                </div>
                <div className="text-sm text-civic-orange-700">
                  Partner Cities
                </div>
              </CardContent>
            </Card>
            <Card className="border-civic-blue-200 bg-white/50 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-civic-blue-600 mb-2">
                  94%
                </div>
                <div className="text-sm text-civic-blue-700">
                  Satisfaction Rate
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="py-20 px-4 bg-white/70 backdrop-blur-sm"
      >
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-civic-blue-900 mb-4">
              Powerful Features for Everyone
            </h2>
            <p className="text-xl text-civic-blue-700 max-w-2xl mx-auto">
              Designed for citizens and municipal staff to work together
              effectively
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            {/* Citizens Features */}
            <div>
              <div className="flex items-center mb-6">
                <Smartphone className="w-8 h-8 text-civic-blue-500 mr-3" />
                <h3 className="text-2xl font-bold text-civic-blue-900">
                  For Citizens
                </h3>
              </div>
              <div className="grid gap-6">
                <Card className="border-civic-blue-200 hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Camera className="w-6 h-6 text-civic-blue-500" />
                      <CardTitle className="text-civic-blue-900">
                        Easy Issue Reporting
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Capture photos, add descriptions, and pinpoint exact
                      locations with our intuitive mobile interface.
                    </CardDescription>
                  </CardContent>
                </Card>

                <Card className="border-civic-green-200 hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Bell className="w-6 h-6 text-civic-green-500" />
                      <CardTitle className="text-civic-green-900">
                        Real-time Notifications
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Get instant updates when your report is received,
                      assigned, and resolved.
                    </CardDescription>
                  </CardContent>
                </Card>

                <Card className="border-civic-orange-200 hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-6 h-6 text-civic-orange-500" />
                      <CardTitle className="text-civic-orange-900">
                        Progress Tracking
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Monitor the status of your reports and see exactly what's
                      being done to address them.
                    </CardDescription>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Admin Features */}
            <div>
              <div className="flex items-center mb-6">
                <Monitor className="w-8 h-8 text-civic-green-500 mr-3" />
                <h3 className="text-2xl font-bold text-civic-green-900">
                  For Municipal Staff
                </h3>
              </div>
              <div className="grid gap-6">
                <Card className="border-civic-green-200 hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Users className="w-6 h-6 text-civic-green-500" />
                      <CardTitle className="text-civic-green-900">
                        Smart Assignment
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Automated routing assigns issues to the right departments
                      based on category and location.
                    </CardDescription>
                  </CardContent>
                </Card>

                <Card className="border-civic-blue-200 hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="w-6 h-6 text-civic-blue-500" />
                      <CardTitle className="text-civic-blue-900">
                        Priority Management
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Filter and prioritize issues by urgency, location, and
                      available resources.
                    </CardDescription>
                  </CardContent>
                </Card>

                <Card className="border-civic-orange-200 hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-6 h-6 text-civic-orange-500" />
                      <CardTitle className="text-civic-orange-900">
                        Status Updates
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Keep citizens informed with real-time status updates and
                      completion photos.
                    </CardDescription>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-civic-blue-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-civic-blue-700 max-w-2xl mx-auto">
              Simple, effective, and transparent civic engagement in three steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 bg-civic-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Camera className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-civic-blue-900 mb-4">
                1. Report
              </h3>
              <p className="text-civic-blue-700">
                Snap a photo of the issue, add a description, and share your
                location. Our mobile app makes reporting quick and easy.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-civic-green-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Clock className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-civic-green-900 mb-4">
                2. Track
              </h3>
              <p className="text-civic-green-700">
                Watch as your report moves through the system. Get notifications
                when it's assigned, in progress, and completed.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-civic-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-civic-orange-900 mb-4">
                3. Resolve
              </h3>
              <p className="text-civic-orange-700">
                See the issue resolved and receive before/after photos. Rate
                your experience and help improve city services.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Innovative Features Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-purple-600 via-blue-600 to-civic-green-600">
        <div className="container mx-auto max-w-6xl text-center">
          <Badge className="mb-6 bg-white/20 text-white hover:bg-white/30">
            🚀 Powered by AI & Innovation
          </Badge>
          <h2 className="text-4xl font-bold text-white mb-6">
            Next-Generation Civic Engagement
          </h2>
          <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto">
            Experience the future of civic reporting with AI-powered insights,
            gamification, and community collaboration
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/15 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-3">AI-Powered Reporting</h3>
                <p className="text-blue-100 mb-4">
                  Smart categorization, duplicate detection, and voice-to-text
                  reporting with advanced AI
                </p>
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-civic-blue-600"
                  asChild
                >
                  <Link to="/report">Try AI Features</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/15 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-3">
                  Community Collaboration
                </h3>
                <p className="text-blue-100 mb-4">
                  Vote on issues, earn rewards, and collaborate with neighbors
                  on solutions
                </p>
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-civic-blue-600"
                  asChild
                >
                  <Link to="/community">Join Community</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/15 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-3">Predictive Analytics</h3>
                <p className="text-blue-100 mb-4">
                  Interactive heat maps and AI predictions to prevent issues
                  before they occur
                </p>
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-civic-blue-600"
                  asChild
                >
                  <Link to="/analytics">View Analytics</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-civic-blue-600 to-civic-green-600">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of citizens already making their communities better,
            one report at a time.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="text-lg px-8 py-6 bg-white text-civic-blue-600 hover:bg-gray-100"
              asChild
            >
              <Link to="/report">
                <Smartphone className="w-5 h-5 mr-2" />
                Get Started Now
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 border-white text-white hover:bg-white/10"
              asChild
            >
              <Link to="/rewards">
                <Star className="w-5 h-5 mr-2" />
                Earn Rewards
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-civic-blue-900 text-white py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-civic-blue-500 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold">CivicConnect</h3>
              </div>
              <p className="text-blue-200 text-sm">
                Empowering communities through transparent and efficient civic
                engagement.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-blue-200">
                <li>
                  <a href="#" className="hover:text-white">
                    Report Issue
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Track Reports
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Mobile App
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Government</h4>
              <ul className="space-y-2 text-sm text-blue-200">
                <li>
                  <a href="#" className="hover:text-white">
                    Admin Dashboard
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    API Access
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Integration
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-blue-200">
                <li>
                  <a href="#" className="hover:text-white">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-civic-blue-800 mt-8 pt-8 text-center text-sm text-blue-200">
            © 2024 CivicConnect. All rights reserved. Built for transparent
            governance.
          </div>
        </div>
      </footer>
    </div>
  );
}
