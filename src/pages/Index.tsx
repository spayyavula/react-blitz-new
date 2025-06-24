import { useState, lazy, Suspense } from 'react';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { AuthGuard } from '@/components/AuthGuard';
import { UserMenu } from '@/components/UserMenu';

// Lazy load heavy components
const Sidebar = lazy(() => import('@/components/Sidebar').then(module => ({ default: module.Sidebar })));
const ChatInterface = lazy(() => import('@/components/ChatInterface').then(module => ({ default: module.ChatInterface })));
const CodeEditor = lazy(() => import('@/components/CodeEditor').then(module => ({ default: module.CodeEditor })));
const PreviewPane = lazy(() => import('@/components/PreviewPane').then(module => ({ default: module.PreviewPane })));
const FileExplorer = lazy(() => import('@/components/FileExplorer').then(module => ({ default: module.FileExplorer })));

const Index = () => {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [files, setFiles] = useState<Record<string, string>>({
    'App.tsx': `import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to React App
        </h1>
        <p className="text-lg text-gray-600">
          Start building something amazing!
        </p>
      </div>
    </div>
  );
}

export default App;`,
    'main.py': `from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/api/health")
async def health_check():
    return {"status": "healthy"}
`
  });

  const updateFile = (filename: string, content: string) => {
    setFiles(prev => ({ ...prev, [filename]: content }));
  };

  const createFile = (filename: string, content: string = '') => {
    setFiles(prev => ({ ...prev, [filename]: content }));
  };

  const deleteFile = (filename: string) => {
    setFiles(prev => {
      const newFiles = { ...prev };
      delete newFiles[filename];
      return newFiles;
    });
    if (selectedFile === filename) {
      setSelectedFile(null);
    }
  };

  return (
    <AuthGuard>
      <div className="h-screen bg-gray-900 text-white flex">
        {/* Sidebar */}
        <Suspense fallback={<div className="w-16 bg-gray-950 border-r border-gray-800" />}>
          <Sidebar />
        </Suspense>
        
        {/* Main Content */}
        <div className="flex-1 flex">
          {/* Left Panel - Chat */}
          <div className="w-1/3 border-r border-gray-800">
            {/* User Menu */}
            <div className="p-4 border-b border-gray-800 flex justify-end">
              <UserMenu />
            </div>
            <Suspense fallback={<LoadingSpinner />}>
              <ChatInterface 
                files={files}
                onUpdateFile={updateFile}
                onCreateFile={createFile}
                onDeleteFile={deleteFile}
              />
            </Suspense>
          </div>
          
          {/* Right Panel - Code & Preview */}
          <div className="flex-1 flex flex-col">
            {/* File Explorer */}
            <div className="h-48 border-b border-gray-800">
              <Suspense fallback={<div className="h-full bg-gray-800" />}>
                <FileExplorer
                  files={files}
                  selectedFile={selectedFile}
                  onSelectFile={setSelectedFile}
                  onCreateFile={createFile}
                  onDeleteFile={deleteFile}
                />
              </Suspense>
            </div>
            
            {/* Editor and Preview */}
            <div className="flex-1 flex">
              {/* Code Editor */}
              <div className="w-1/2 border-r border-gray-800">
                <Suspense fallback={<div className="h-full bg-gray-800" />}>
                  <CodeEditor
                    file={selectedFile}
                    content={selectedFile ? files[selectedFile] : ''}
                    onContentChange={(content) => selectedFile && updateFile(selectedFile, content)}
                  />
                </Suspense>
              </div>
              
              {/* Preview */}
              <div className="w-1/2">
                <Suspense fallback={<div className="h-full bg-gray-800" />}>
                  <PreviewPane files={files} />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
};

export default Index;
