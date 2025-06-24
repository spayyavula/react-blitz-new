
import { Loader2 } from "lucide-react";

export const LoadingSpinner = () => {
  return (
    <div className="h-screen bg-gray-900 flex items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
        <p className="text-gray-400 text-sm">Loading...</p>
      </div>
    </div>
  );
};
