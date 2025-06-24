
import { useState } from 'react';
import { ChevronDown, ChevronRight, File, Plus, Trash2, Folder } from 'lucide-react';

interface FileExplorerProps {
  files: Record<string, string>;
  selectedFile: string | null;
  onSelectFile: (filename: string) => void;
  onCreateFile: (filename: string, content: string) => void;
  onDeleteFile: (filename: string) => void;
}

export const FileExplorer = ({ files, selectedFile, onSelectFile, onCreateFile, onDeleteFile }: FileExplorerProps) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [showNewFileInput, setShowNewFileInput] = useState(false);
  const [newFileName, setNewFileName] = useState('');

  const getFileIcon = (filename: string) => {
    const ext = filename.split('.').pop()?.toLowerCase();
    return <File className="w-4 h-4" />;
  };

  const getFileLanguage = (filename: string) => {
    const ext = filename.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'tsx':
      case 'jsx':
        return 'React';
      case 'py':
        return 'Python';
      case 'js':
        return 'JavaScript';
      case 'ts':
        return 'TypeScript';
      default:
        return 'Text';
    }
  };

  const handleCreateFile = () => {
    if (newFileName.trim()) {
      onCreateFile(newFileName.trim(), '');
      setNewFileName('');
      setShowNewFileInput(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCreateFile();
    } else if (e.key === 'Escape') {
      setShowNewFileInput(false);
      setNewFileName('');
    }
  };

  return (
    <div className="h-full bg-gray-900 border-b border-gray-800">
      {/* Header */}
      <div className="p-3 border-b border-gray-800 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-gray-400 hover:text-white"
          >
            {isExpanded ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </button>
          <Folder className="w-4 h-4 text-blue-400" />
          <span className="text-sm font-medium">Project Files</span>
        </div>
        <button
          onClick={() => setShowNewFileInput(true)}
          className="text-gray-400 hover:text-white p-1 rounded hover:bg-gray-800"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* File List */}
      {isExpanded && (
        <div className="p-2 space-y-1 max-h-40 overflow-y-auto">
          {showNewFileInput && (
            <div className="flex items-center space-x-2 px-2 py-1">
              <File className="w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={newFileName}
                onChange={(e) => setNewFileName(e.target.value)}
                onKeyPress={handleKeyPress}
                onBlur={handleCreateFile}
                placeholder="filename.ext"
                className="flex-1 bg-gray-800 text-white text-sm px-2 py-1 rounded border border-gray-700 focus:outline-none focus:border-blue-500"
                autoFocus
              />
            </div>
          )}
          
          {Object.keys(files).map((filename) => (
            <div
              key={filename}
              className={`flex items-center justify-between px-2 py-1 rounded cursor-pointer group ${
                selectedFile === filename
                  ? 'bg-blue-600 text-white'
                  : 'hover:bg-gray-800 text-gray-300'
              }`}
              onClick={() => onSelectFile(filename)}
            >
              <div className="flex items-center space-x-2 flex-1">
                {getFileIcon(filename)}
                <span className="text-sm truncate">{filename}</span>
                <span className="text-xs opacity-60">{getFileLanguage(filename)}</span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteFile(filename);
                }}
                className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-400 p-1"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
