
import { Bolt, FileCode, Settings, Sparkles } from 'lucide-react';

export const Sidebar = () => {
  return (
    <div className="w-16 bg-gray-950 border-r border-gray-800 flex flex-col items-center py-4">
      {/* Logo */}
      <div className="mb-8">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
          <Bolt className="w-6 h-6 text-white" />
        </div>
      </div>
      
      {/* Navigation */}
      <div className="space-y-4">
        <button className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center hover:bg-blue-500 transition-colors">
          <Sparkles className="w-5 h-5" />
        </button>
        
        <button className="w-10 h-10 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 flex items-center justify-center transition-colors">
          <FileCode className="w-5 h-5" />
        </button>
        
        <button className="w-10 h-10 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 flex items-center justify-center transition-colors">
          <Settings className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
