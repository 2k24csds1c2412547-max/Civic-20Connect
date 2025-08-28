import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Mic, 
  MicOff, 
  Square, 
  Play, 
  Pause, 
  RotateCcw,
  Volume2,
  Waveform,
  CheckCircle,
  AlertCircle
} from "lucide-react";

interface VoiceReportingProps {
  onTranscriptionComplete?: (transcription: string) => void;
  onDescriptionUpdate?: (description: string) => void;
  existingDescription?: string;
}

export default function VoiceReporting({ 
  onTranscriptionComplete, 
  onDescriptionUpdate,
  existingDescription = ""
}: VoiceReportingProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcription, setTranscription] = useState("");
  const [audioLevel, setAudioLevel] = useState(0);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasRecorded, setHasRecorded] = useState(false);
  const [error, setError] = useState("");

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioStreamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const recordingTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      // Cleanup on unmount
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
      }
      if (audioStreamRef.current) {
        audioStreamRef.current.getTracks().forEach(track => track.stop());
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const startRecording = async () => {
    try {
      setError("");
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44100
        } 
      });
      
      audioStreamRef.current = stream;
      
      // Setup audio analysis for visualization
      audioContextRef.current = new AudioContext();
      analyserRef.current = audioContextRef.current.createAnalyser();
      const source = audioContextRef.current.createMediaStreamSource(stream);
      source.connect(analyserRef.current);
      
      // Start audio level monitoring
      startAudioLevelMonitoring();
      
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      
      mediaRecorder.onstop = () => {
        processRecording();
      };
      
      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);
      
      // Start timer
      recordingTimerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
      
    } catch (err) {
      setError("Unable to access microphone. Please check permissions.");
      console.error("Error starting recording:", err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setHasRecorded(true);
      
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
      }
      
      if (audioStreamRef.current) {
        audioStreamRef.current.getTracks().forEach(track => track.stop());
      }
      
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    }
  };

  const startAudioLevelMonitoring = () => {
    if (!analyserRef.current) return;
    
    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
    
    const updateAudioLevel = () => {
      if (!analyserRef.current || !isRecording) return;
      
      analyserRef.current.getByteFrequencyData(dataArray);
      const average = dataArray.reduce((sum, value) => sum + value, 0) / dataArray.length;
      setAudioLevel(Math.min(100, (average / 255) * 100));
      
      if (isRecording) {
        requestAnimationFrame(updateAudioLevel);
      }
    };
    
    updateAudioLevel();
  };

  const processRecording = async () => {
    setIsProcessing(true);
    
    // Simulate AI transcription processing
    setTimeout(() => {
      const mockTranscriptions = [
        "There's a broken streetlight on Main Street near the intersection with Second Avenue. It's been flickering for several days and now it's completely out, making the area very dark at night.",
        "I noticed a large pothole on Oak Avenue right in front of the elementary school. It's quite deep and could damage vehicles or pose a safety risk to children walking nearby.",
        "The trash bins in Central Park are overflowing again. There's garbage scattered around the area and it's attracting animals. This needs immediate attention.",
        "There's a water leak on Elm Street that's been getting worse. The water is flooding the sidewalk and creating a hazardous icy condition in cold weather."
      ];
      
      const randomTranscription = mockTranscriptions[Math.floor(Math.random() * mockTranscriptions.length)];
      setTranscription(randomTranscription);
      setIsProcessing(false);
      
      if (onTranscriptionComplete) {
        onTranscriptionComplete(randomTranscription);
      }
    }, 2000);
  };

  const resetRecording = () => {
    setTranscription("");
    setHasRecorded(false);
    setRecordingTime(0);
    setAudioLevel(0);
    setError("");
    audioChunksRef.current = [];
  };

  const useTranscription = () => {
    if (onDescriptionUpdate) {
      const combinedDescription = existingDescription 
        ? `${existingDescription}\n\n${transcription}` 
        : transcription;
      onDescriptionUpdate(combinedDescription);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-purple-900">
          <Mic className="w-5 h-5" />
          Voice Reporting
        </CardTitle>
        <CardDescription>
          Speak your issue description and we'll convert it to text using AI
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <Alert className="border-red-200 bg-red-50">
            <AlertCircle className="w-4 h-4" />
            <AlertDescription className="text-red-700">{error}</AlertDescription>
          </Alert>
        )}
        
        {/* Recording Controls */}
        <div className="text-center space-y-4">
          {!isRecording && !hasRecorded && (
            <Button 
              onClick={startRecording}
              size="lg"
              className="bg-purple-500 hover:bg-purple-600 text-white rounded-full w-20 h-20"
            >
              <Mic className="w-8 h-8" />
            </Button>
          )}
          
          {isRecording && (
            <div className="space-y-4">
              <Button 
                onClick={stopRecording}
                size="lg"
                className="bg-red-500 hover:bg-red-600 text-white rounded-full w-20 h-20 animate-pulse"
              >
                <Square className="w-8 h-8" />
              </Button>
              
              {/* Audio Visualization */}
              <div className="flex justify-center">
                <div className="flex items-end gap-1 h-8">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div 
                      key={i}
                      className="bg-purple-500 w-2 rounded-t"
                      style={{ 
                        height: `${Math.max(4, (audioLevel + Math.random() * 20) * 0.3)}px`,
                        opacity: audioLevel > 10 ? 1 : 0.3
                      }}
                    />
                  ))}
                </div>
              </div>
              
              <div className="text-lg font-mono text-purple-700">
                Recording: {formatTime(recordingTime)}
              </div>
            </div>
          )}
          
          {hasRecorded && !isProcessing && (
            <div className="space-y-3">
              <Badge className="bg-green-500 text-white">
                <CheckCircle className="w-4 h-4 mr-1" />
                Recording Complete ({formatTime(recordingTime)})
              </Badge>
              
              <div className="flex justify-center gap-2">
                <Button variant="outline" onClick={resetRecording}>
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Record Again
                </Button>
              </div>
            </div>
          )}
          
          {isProcessing && (
            <div className="space-y-3">
              <div className="flex items-center justify-center gap-2 text-purple-600">
                <Waveform className="w-5 h-5 animate-pulse" />
                <span>AI is transcribing your recording...</span>
              </div>
              <div className="w-full bg-purple-200 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full animate-pulse" style={{ width: "60%" }}></div>
              </div>
            </div>
          )}
        </div>
        
        {/* Transcription Result */}
        {transcription && (
          <div className="space-y-3">
            <div className="bg-white border rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Volume2 className="w-4 h-4 text-green-500" />
                <span className="font-medium text-green-700">Transcription:</span>
              </div>
              <p className="text-gray-700 leading-relaxed">{transcription}</p>
            </div>
            
            <div className="flex gap-2">
              <Button onClick={useTranscription} className="flex-1">
                <CheckCircle className="w-4 h-4 mr-2" />
                Use This Description
              </Button>
              <Button variant="outline" onClick={resetRecording}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
            </div>
          </div>
        )}
        
        {/* Instructions */}
        {!isRecording && !hasRecorded && !transcription && (
          <Alert className="border-blue-200 bg-blue-50">
            <Mic className="w-4 h-4" />
            <AlertDescription>
              <div className="space-y-2">
                <div className="font-medium">Tips for better transcription:</div>
                <ul className="text-sm space-y-1 ml-4">
                  <li>• Speak clearly and at a normal pace</li>
                  <li>• Describe the location, issue type, and details</li>
                  <li>• Mention any safety concerns or urgency</li>
                  <li>• Record in a quiet environment</li>
                </ul>
              </div>
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}
