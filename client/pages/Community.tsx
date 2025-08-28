import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import CommunityCollaboration from "@/components/CommunityCollaboration";

export default function Community() {
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
          <div>
            <h1 className="text-lg font-semibold text-civic-blue-900">
              Community
            </h1>
            <p className="text-sm text-civic-blue-600">
              Collaborate on civic issues
            </p>
          </div>
          <Button asChild>
            <Link to="/report">Report Issue</Link>
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <CommunityCollaboration />
      </div>
    </div>
  );
}
