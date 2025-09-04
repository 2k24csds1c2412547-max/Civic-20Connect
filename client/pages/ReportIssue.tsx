import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  Camera,
  MapPin,
  Upload,
  CheckCircle,
  AlertTriangle,
  Navigation,
} from "lucide-react";
import { Link } from "react-router-dom";
import AIAnalysis from "@/components/AIAnalysis";
import VoiceReporting from "@/components/VoiceReporting";
import { ThemeToggle } from "@/components/ThemeToggle";
import { addPoints, addReport, generateReportId } from "@/lib/storage";

export default function ReportIssue() {
  const [step, setStep] = useState(1);
  const [newId, setNewId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    category: "",
    title: "",
    description: "",
    location: "",
    urgency: "",
    photos: [] as File[],
  });

  const categories = [
    { value: "roads", label: "Roads & Transportation", icon: "🚗" },
    { value: "lighting", label: "Street Lighting", icon: "💡" },
    { value: "water", label: "Water & Sewage", icon: "💧" },
    { value: "parks", label: "Parks & Recreation", icon: "🌳" },
    { value: "waste", label: "Waste Management", icon: "🗑️" },
    { value: "safety", label: "Public Safety", icon: "🚨" },
    { value: "other", label: "Other Issues", icon: "📝" },
  ];

  const urgencyLevels = [
    {
      value: "low",
      label: "Low Priority",
      color: "civic-green-500",
      description: "Can wait a few weeks",
    },
    {
      value: "medium",
      label: "Medium Priority",
      color: "civic-orange-500",
      description: "Should be addressed soon",
    },
    {
      value: "high",
      label: "High Priority",
      color: "civic-orange-600",
      description: "Needs immediate attention",
    },
    {
      value: "urgent",
      label: "Urgent",
      color: "red-500",
      description: "Emergency situation",
    },
  ];

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData((prev) => ({ ...prev, photos: [...prev.photos, ...files] }));
  };

  const handleSubmit = () => {
    const id = generateReportId();
    const now = new Date();
    const report = {
      id,
      title: formData.title,
      category: formData.category,
      status: "pending" as const,
      priority: (formData.urgency || "medium") as any,
      location: formData.location,
      submittedDate: now.toISOString().slice(0,10),
      description: formData.description,
      updates: [
        { date: now.toISOString().slice(0,10), status: "Received", message: "Thank you for your report. We have received your submission." },
      ],
    };
    addReport(report);
    addPoints(50);
    setNewId(id);
    setStep(4);
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setFormData((prev) => ({
            ...prev,
            location: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`,
          }));
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Unable to get your location. Please enter it manually.");
        },
      );
    }
  };

  if (step === 4) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-civic-green-50 via-white to-civic-blue-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <div className="w-16 h-16 bg-civic-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl text-civic-green-900">
              Report Submitted!
            </CardTitle>
            <CardDescription>
              Your report has been received and assigned ID #{newId}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-civic-green-50 p-4 rounded-lg">
              <p className="text-sm text-civic-green-700">
                You'll receive notifications about the progress of your report.
                Estimated response time: 2-3 business days.
              </p>
            </div>
            <div className="flex gap-2">
              <Button asChild className="flex-1">
                <Link to="/track">Track My Reports</Link>
              </Button>
              <Button variant="outline" asChild className="flex-1">
                <Link to="/">Back Home</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-civic-blue-50 via-white to-civic-green-50 dark:from-civic-blue-950 dark:via-gray-900 dark:to-civic-green-950">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-civic-blue-100 dark:border-civic-blue-800 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Button variant="ghost" asChild>
            <Link to="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Badge variant="secondary">Step {step} of 3</Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <Progress value={(step / 3) * 100} className="mb-2" />
          <div className="flex justify-between text-sm text-civic-blue-600">
            <span className={step >= 1 ? "font-semibold" : ""}>
              Category & Details
            </span>
            <span className={step >= 2 ? "font-semibold" : ""}>
              Location & Photos
            </span>
            <span className={step >= 3 ? "font-semibold" : ""}>
              Review & Submit
            </span>
          </div>
        </div>

        {/* Step 1: Category and Details */}
        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-civic-blue-900">
                What kind of issue are you reporting?
              </CardTitle>
              <CardDescription>
                Select the category that best describes your issue and provide
                details.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label
                  htmlFor="category"
                  className="text-base font-semibold mb-3 block"
                >
                  Issue Category
                </Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {categories.map((category) => (
                    <Card
                      key={category.value}
                      className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                        formData.category === category.value
                          ? "ring-2 ring-civic-blue-500 bg-civic-blue-50"
                          : "hover:bg-gray-50"
                      }`}
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          category: category.value,
                        }))
                      }
                    >
                      <CardContent className="p-4 text-center">
                        <div className="text-2xl mb-2">{category.icon}</div>
                        <div className="text-sm font-medium">
                          {category.label}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="title">Issue Title</Label>
                <Input
                  id="title"
                  placeholder="Brief description of the issue"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, title: e.target.value }))
                  }
                />
              </div>

              <div>
                <Label htmlFor="description">Detailed Description</Label>
                <Textarea
                  id="description"
                  placeholder="Provide more details about the issue..."
                  rows={4}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                />
              </div>

              {/* Voice Reporting */}
              <VoiceReporting
                existingDescription={formData.description}
                onDescriptionUpdate={(description) => {
                  setFormData((prev) => ({ ...prev, description }));
                }}
              />

              <div>
                <Label
                  htmlFor="urgency"
                  className="text-base font-semibold mb-3 block"
                >
                  Urgency Level
                </Label>
                <div className="grid grid-cols-2 gap-3">
                  {urgencyLevels.map((level) => (
                    <Card
                      key={level.value}
                      className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                        formData.urgency === level.value
                          ? `ring-2 ring-${level.color} bg-${level.color}/10`
                          : "hover:bg-gray-50"
                      }`}
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          urgency: level.value,
                        }))
                      }
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-1">
                          <div
                            className={`w-3 h-3 rounded-full bg-${level.color}`}
                          ></div>
                          <div className="font-medium">{level.label}</div>
                        </div>
                        <div className="text-sm text-gray-600">
                          {level.description}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* AI Analysis */}
              {(formData.title || formData.description) && (
                <AIAnalysis
                  title={formData.title}
                  description={formData.description}
                  location={formData.location}
                  photos={formData.photos}
                  onSuggestedCategory={(category) => {
                    if (!formData.category) {
                      setFormData((prev) => ({ ...prev, category }));
                    }
                  }}
                />
              )}

              <Button
                onClick={() => setStep(2)}
                className="w-full"
                disabled={
                  !formData.category ||
                  !formData.title ||
                  !formData.description ||
                  !formData.urgency
                }
              >
                Next: Add Location & Photos
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Location and Photos */}
        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-civic-blue-900">
                Where is this issue located?
              </CardTitle>
              <CardDescription>
                Help us pinpoint the exact location and add photos if available.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="location">Location</Label>
                <div className="flex gap-2">
                  <Input
                    id="location"
                    placeholder="Enter address or coordinates"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        location: e.target.value,
                      }))
                    }
                    className="flex-1"
                  />
                  <Button variant="outline" onClick={getLocation}>
                    <Navigation className="w-4 h-4 mr-2" />
                    Use GPS
                  </Button>
                </div>
              </div>

              <div>
                <Label className="text-base font-semibold mb-3 block">
                  Photos (Optional)
                </Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                    id="photo-upload"
                  />
                  <label htmlFor="photo-upload" className="cursor-pointer">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-sm text-gray-600 mb-2">
                      Click to upload photos or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">
                      PNG, JPG up to 10MB each
                    </p>
                  </label>
                </div>
                {formData.photos.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm font-medium mb-2">
                      {formData.photos.length} photo(s) selected:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {formData.photos.map((file, index) => (
                        <Badge key={index} variant="secondary">
                          {file.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="flex-1"
                >
                  Back
                </Button>
                <Button
                  onClick={() => setStep(3)}
                  className="flex-1"
                  disabled={!formData.location}
                >
                  Next: Review
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Review and Submit */}
        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-civic-blue-900">
                Review Your Report
              </CardTitle>
              <CardDescription>
                Please review all information before submitting your report.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">Category:</span>
                  <span>
                    {
                      categories.find((c) => c.value === formData.category)
                        ?.label
                    }
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">Title:</span>
                  <span>{formData.title}</span>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium block mb-1">Description:</span>
                  <span className="text-gray-700">{formData.description}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">Location:</span>
                  <span className="text-right">{formData.location}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium">Urgency:</span>
                  <Badge
                    className={`bg-${urgencyLevels.find((u) => u.value === formData.urgency)?.color}`}
                  >
                    {
                      urgencyLevels.find((u) => u.value === formData.urgency)
                        ?.label
                    }
                  </Badge>
                </div>
                {formData.photos.length > 0 && (
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium block mb-1">Photos:</span>
                    <span>{formData.photos.length} photo(s) attached</span>
                  </div>
                )}
              </div>

              <div className="bg-civic-blue-50 p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-civic-blue-600 mt-0.5" />
                  <div className="text-sm text-civic-blue-700">
                    <p className="font-medium mb-1">What happens next?</p>
                    <ul className="list-disc list-inside space-y-1 text-xs">
                      <li>
                        Your report will be automatically assigned to the
                        appropriate department
                      </li>
                      <li>
                        You'll receive a confirmation notification with a
                        tracking ID
                      </li>
                      <li>
                        Updates will be sent as the issue progresses through
                        resolution
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setStep(2)}
                  className="flex-1"
                >
                  Back
                </Button>
                <Button onClick={handleSubmit} className="flex-1">
                  Submit Report
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
