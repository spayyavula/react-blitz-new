
import { useState } from 'react';
import { Key, Eye, EyeOff } from 'lucide-react';

interface ClaudeApiKeyInputProps {
  onApiKeySet: (apiKey: string) => void;
  hasApiKey: boolean;
}

export const ClaudeApiKeyInput = ({ onApiKeySet, hasApiKey }: ClaudeApiKeyInputProps) => {
  const [apiKey, setApiKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [isExpanded, setIsExpanded] = useState(!hasApiKey);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      onApiKeySet(apiKey.trim());
      setIsExpanded(false);
    }
  };

  if (hasApiKey && !isExpanded) {
    return (
      <div className="p-3 bg-green-900/20 border border-green-700 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Key className="w-4 h-4 text-green-400" />
            <span className="text-sm text-green-300">Claude API connected</span>
          </div>
          <button
            onClick={() => setIsExpanded(true)}
            className="text-xs text-gray-400 hover:text-white"
          >
            Change
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-3 bg-gray-800 border border-gray-700 rounded-lg">
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex items-center space-x-2">
          <Key className="w-4 h-4 text-blue-400" />
          <span className="text-sm font-medium">Claude API Key</span>
        </div>
        
        <div className="relative">
          <input
            type={showKey ? 'text' : 'password'}
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="sk-ant-api..."
            className="w-full bg-gray-900 border border-gray-600 rounded px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
          />
          <button
            type="button"
            onClick={() => setShowKey(!showKey)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
          >
            {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>

        <div className="flex justify-between items-center">
          <a
            href="https://console.anthropic.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-blue-400 hover:text-blue-300"
          >
            Get API key from Anthropic
          </a>
          <button
            type="submit"
            disabled={!apiKey.trim()}
            className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-500 disabled:opacity-50"
          >
            Set Key
          </button>
        </div>
      </form>
    </div>
  );
};
