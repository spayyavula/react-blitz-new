
import { useState } from 'react';
import { Play, Square, RefreshCw, ExternalLink, Monitor, Smartphone } from 'lucide-react';

interface PreviewPaneProps {
  files: Record<string, string>;
}

export const PreviewPane = ({ files }: PreviewPaneProps) => {
  const [isRunning, setIsRunning] = useState(false);
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [activeTab, setActiveTab] = useState<'frontend' | 'backend'>('frontend');

  const hasReactFiles = Object.keys(files).some(f => f.endsWith('.tsx') || f.endsWith('.jsx'));
  const hasPythonFiles = Object.keys(files).some(f => f.endsWith('.py'));

  const handleRun = () => {
    setIsRunning(!isRunning);
  };

  const handleRefresh = () => {
    // Simulate refresh
    console.log('Refreshing preview...');
  };

  return (
    <div className="h-full bg-gray-900 flex flex-col">
      {/* Header */}
      <div className="p-3 border-b border-gray-800">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className="flex bg-gray-800 rounded-lg p-1">
              <button
                onClick={() => setActiveTab('frontend')}
                className={`px-3 py-1 text-sm rounded ${
                  activeTab === 'frontend'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Frontend
              </button>
              <button
                onClick={() => setActiveTab('backend')}
                className={`px-3 py-1 text-sm rounded ${
                  activeTab === 'backend'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Backend
              </button>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {activeTab === 'frontend' && (
              <>
                <button
                  onClick={() => setViewMode('desktop')}
                  className={`p-2 rounded ${
                    viewMode === 'desktop'
                      ? 'bg-gray-700 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Monitor className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('mobile')}
                  className={`p-2 rounded ${
                    viewMode === 'mobile'
                      ? 'bg-gray-700 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Smartphone className="w-4 h-4" />
                </button>
              </>
            )}
            
            <button
              onClick={handleRefresh}
              className="text-gray-400 hover:text-white p-2 rounded hover:bg-gray-800"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            
            <button
              onClick={handleRun}
              className={`flex items-center space-x-2 px-3 py-2 rounded ${
                isRunning
                  ? 'bg-red-600 hover:bg-red-500 text-white'
                  : 'bg-green-600 hover:bg-green-500 text-white'
              }`}
            >
              {isRunning ? (
                <>
                  <Square className="w-4 h-4" />
                  <span className="text-sm">Stop</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  <span className="text-sm">Run</span>
                </>
              )}
            </button>
            
            <button className="text-gray-400 hover:text-white p-2 rounded hover:bg-gray-800">
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Preview Content */}
      <div className="flex-1 bg-gray-800">
        {activeTab === 'frontend' ? (
          <div className="h-full flex items-center justify-center">
            <div className={`bg-white rounded-lg shadow-lg transition-all duration-300 ${
              viewMode === 'desktop' 
                ? 'w-full h-full' 
                : 'w-80 h-[600px]'
            }`}>
              {isRunning && hasReactFiles ? (
                <div className="w-full h-full flex items-center justify-center bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Play className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                      React App Running
                    </h1>
                    <p className="text-gray-600">
                      Your React application is live!
                    </p>
                  </div>
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <Monitor className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p className="mb-2">Frontend Preview</p>
                    <p className="text-sm">
                      {hasReactFiles 
                        ? 'Click Run to start your React app' 
                        : 'Create React components to see preview'
                      }
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="h-full p-4">
            <div className="bg-gray-950 rounded-lg p-4 h-full font-mono text-sm">
              <div className="text-green-400 mb-2">$ Backend Server Status</div>
              {isRunning && hasPythonFiles ? (
                <div className="space-y-2">
                  <div className="text-green-400">✓ FastAPI server running on http://localhost:8000</div>
                  <div className="text-gray-400">✓ CORS enabled</div>
                  <div className="text-gray-400">✓ Auto-reload enabled</div>
                  <div className="text-blue-400 mt-4">Available endpoints:</div>
                  <div className="text-gray-300 ml-4">
                    <div>GET / - Root endpoint</div>
                    <div>GET /api/health - Health check</div>
                  </div>
                </div>
              ) : (
                <div className="text-gray-500">
                  {hasPythonFiles 
                    ? 'Click Run to start your Python backend'
                    : 'Create Python files to see backend info'
                  }
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Status Bar */}
      <div className="px-4 py-2 bg-gray-950 border-t border-gray-800 flex items-center justify-between text-xs text-gray-400">
        <div className="flex space-x-4">
          <span className={`flex items-center space-x-1 ${isRunning ? 'text-green-400' : ''}`}>
            <div className={`w-2 h-2 rounded-full ${isRunning ? 'bg-green-400' : 'bg-gray-600'}`}></div>
            <span>{isRunning ? 'Running' : 'Stopped'}</span>
          </span>
          {activeTab === 'frontend' && (
            <span>View: {viewMode}</span>
          )}
        </div>
        <div className="flex space-x-4">
          {hasReactFiles && <span>React: Ready</span>}
          {hasPythonFiles && <span>Python: Ready</span>}
        </div>
      </div>
    </div>
  );
};
