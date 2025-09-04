import { WifiOff } from "lucide-react";

export default function OfflineNotice() {
  if (typeof navigator === "undefined") return null;
  const online = navigator.onLine;
  if (online) return null;
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      <div className="bg-orange-600 text-white rounded-full px-4 py-2 shadow-lg flex items-center gap-2">
        <WifiOff className="w-4 h-4" />
        You are offline. Changes will be saved locally.
      </div>
    </div>
  );
}
