
import { useState, useEffect } from 'react';
import { Code, Copy, Save } from 'lucide-react';

interface CodeEditorProps {
  file: string | null;
  content: string;
  onContentChange: (content: string) => void;
}

export const CodeEditor = ({ file, content, onContentChange }: CodeEditorProps) => {
  const [localContent, setLocalContent] = useState(content);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  useEffect(() => {
    setLocalContent(content);
    setHasUnsavedChanges(false);
  }, [content, file]);

  const handleContentChange = (newContent: string) => {
    setLocalContent(newContent);
    setHasUnsavedChanges(newContent !== content);
  };

  const handleSave = () => {
    onContentChange(localContent);
    setHasUnsavedChanges(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.ctrlKey && e.key === 's') {
      e.preventDefault();
      handleSave();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(localContent);
  };

  const getLanguageFromFile = (filename: string) => {
    const ext = filename.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'tsx':
      case 'jsx':
        return 'javascript';
      case 'py':
        return 'python';
      case 'js':
        return 'javascript';
      case 'ts':
        return 'typescript';
      default:
        return 'text';
    }
  };

  if (!file) {
    return (
      <div className="h-full bg-gray-900 flex items-center justify-center">
        <div className="text-center text-gray-500">
          <Code className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>Select a file to start editing</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-gray-900 flex flex-col">
      {/* Header */}
      <div className="p-3 border-b border-gray-800 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Code className="w-4 h-4 text-blue-400" />
          <span className="text-sm font-medium">{file}</span>
          {hasUnsavedChanges && (
            <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
          )}
        </div>
        <div className="flex space-x-2">
          <button
            onClick={copyToClipboard}
            className="text-gray-400 hover:text-white p-1 rounded hover:bg-gray-800"
            title="Copy to clipboard"
          >
            <Copy className="w-4 h-4" />
          </button>
          <button
            onClick={handleSave}
            disabled={!hasUnsavedChanges}
            className="text-gray-400 hover:text-white p-1 rounded hover:bg-gray-800 disabled:opacity-50"
            title="Save (Ctrl+S)"
          >
            <Save className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 relative">
        <textarea
          value={localContent}
          onChange={(e) => handleContentChange(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full h-full bg-gray-900 text-gray-100 p-4 font-mono text-sm resize-none focus:outline-none"
          placeholder="Start writing your code..."
          spellCheck={false}
          style={{
            tabSize: 2,
            fontFamily: 'JetBrains Mono, Consolas, Monaco, "Courier New", monospace'
          }}
        />
        
        {/* Line numbers simulation */}
        <div className="absolute left-0 top-0 p-4 text-gray-600 pointer-events-none font-mono text-sm">
          {localContent.split('\n').map((_, index) => (
            <div key={index} className="leading-6">
              {index + 1}
            </div>
          ))}
        </div>
        
        {/* Syntax highlighting overlay would go here in a real implementation */}
      </div>

      {/* Status bar */}
      <div className="px-4 py-2 bg-gray-950 border-t border-gray-800 flex items-center justify-between text-xs text-gray-400">
        <div className="flex space-x-4">
          <span>Language: {getLanguageFromFile(file)}</span>
          <span>Lines: {localContent.split('\n').length}</span>
          <span>Characters: {localContent.length}</span>
        </div>
        {hasUnsavedChanges && (
          <span className="text-orange-400">Unsaved changes</span>
        )}
      </div>
    </div>
  );
};
