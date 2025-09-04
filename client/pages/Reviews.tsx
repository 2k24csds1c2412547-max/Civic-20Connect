import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Star, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { addReview, getReviews, ReviewEntry, getReports } from "@/lib/storage";

export default function Reviews() {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [issueId, setIssueId] = useState("");
  const [reviews, setReviews] = useState<ReviewEntry[]>([]);
  const [resolvedIds, setResolvedIds] = useState<string[]>([]);

  useEffect(() => {
    setReviews(getReviews());
    const ids = getReports().filter(r => r.status === "completed").map(r => r.id);
    setResolvedIds(ids);
  }, []);

  const submit = () => {
    if (!issueId || rating === 0) return;
    const entry: ReviewEntry = { id: issueId, rating, feedback, date: new Date().toISOString() };
    addReview(entry);
    setReviews(prev => [entry, ...prev]);
    setRating(0);
    setFeedback("");
    setIssueId("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-civic-blue-50 via-white to-civic-green-50">
      <header className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Button variant="ghost" asChild>
            <Link to="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>
          <div>
            <h1 className="text-lg font-semibold text-civic-blue-900">Reviews</h1>
            <p className="text-sm text-civic-blue-600">Share your experience after resolution</p>
          </div>
          <Button asChild>
            <Link to="/track">Track Reports</Link>
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-5xl grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-civic-blue-900">Add a Review</CardTitle>
            <CardDescription>Select your resolved report and rate the service</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Report ID</label>
              <Input placeholder="e.g., CR-2024-0156" value={issueId} onChange={(e) => setIssueId(e.target.value)} list="resolved-ids" />
              <datalist id="resolved-ids">
                {resolvedIds.map(id => (<option key={id} value={id} />))}
              </datalist>
            </div>
            <div>
              <label className="text-sm font-medium">Rating</label>
              <div className="flex gap-2 mt-1">
                {[1,2,3,4,5].map(s => (
                  <button key={s} onClick={() => setRating(s)} className={`w-9 h-9 ${rating >= s ? 'text-yellow-500' : 'text-gray-300'}`}>
                    <Star className="w-7 h-7 fill-current" />
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Feedback (Optional)</label>
              <Textarea placeholder="Tell us about the resolution quality..." value={feedback} onChange={(e) => setFeedback(e.target.value)} rows={4} />
            </div>
            <Button onClick={submit} disabled={!issueId || rating === 0}>Submit Review</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-civic-blue-900">Recent Reviews</CardTitle>
            <CardDescription>Feedback from citizens</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {reviews.length === 0 && <div className="text-sm text-gray-600">No reviews yet.</div>}
              {reviews.map((r, idx) => (
                <div key={idx} className="p-3 rounded-lg border bg-white">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{r.id}</div>
                    <div className="flex gap-1">
                      {Array.from({length: r.rating}).map((_,i) => <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />)}
                    </div>
                  </div>
                  {r.feedback && <div className="text-sm text-gray-700 mt-1">{r.feedback}</div>}
                  <div className="text-xs text-gray-500 mt-1">{new Date(r.date).toLocaleString()}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
