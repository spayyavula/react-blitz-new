
import { useState } from 'react';
import { Key, Eye, EyeOff, AlertCircle } from 'lucide-react';

interface ClaudeApiKeyInputProps {
  onApiKeySet: (apiKey: string) => void;
  hasApiKey: boolean;
}

export const ClaudeApiKeyInput = ({ onApiKeySet, hasApiKey }: ClaudeApiKeyInputProps) => {
  const [apiKey, setApiKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [isExpanded, setIsExpanded] = useState(!hasApiKey);
  const [error, setError] = useState('');

  const validateApiKey = (key: string) => {
    if (!key.trim()) {
      return 'API key is required';
    }
    if (!key.startsWith('sk-ant-api')) {
      return 'Claude API key must start with "sk-ant-api"';
    }
    if (key.length < 20) {
      return 'API key appears to be too short';
    }
    return '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const trimmedKey = apiKey.trim();
    const validationError = validateApiKey(trimmedKey);
    
    if (validationError) {
      setError(validationError);
      return;
    }

    onApiKeySet(trimmedKey);
    setIsExpanded(false);
    setError('');
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
            onChange={(e) => {
              setApiKey(e.target.value);
              setError('');
            }}
            placeholder="sk-ant-api03_..."
            className={`w-full bg-gray-900 border rounded px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 pr-10 ${
              error ? 'border-red-500 focus:ring-red-500' : 'border-gray-600 focus:ring-blue-500'
            }`}
          />
          <button
            type="button"
            onClick={() => setShowKey(!showKey)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
          >
            {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>

        {error && (
          <div className="flex items-center space-x-2 text-red-400 text-xs">
            <AlertCircle className="w-3 h-3" />
            <span>{error}</span>
          </div>
        )}

        <div className="text-xs text-gray-400 space-y-1">
          <p>• API key should start with "sk-ant-api"</p>
          <p>• Get your key from the Anthropic Console</p>
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
