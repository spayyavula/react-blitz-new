
import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { ChatInterface } from '@/components/ChatInterface';
import { CodeEditor } from '@/components/CodeEditor';
import { PreviewPane } from '@/components/PreviewPane';
import { FileExplorer } from '@/components/FileExplorer';

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
    <div className="h-screen bg-gray-900 text-white flex">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Left Panel - Chat */}
        <div className="w-1/3 border-r border-gray-800">
          <ChatInterface 
            files={files}
            onUpdateFile={updateFile}
            onCreateFile={createFile}
            onDeleteFile={deleteFile}
          />
        </div>
        
        {/* Right Panel - Code & Preview */}
        <div className="flex-1 flex flex-col">
          {/* File Explorer */}
          <div className="h-48 border-b border-gray-800">
            <FileExplorer
              files={files}
              selectedFile={selectedFile}
              onSelectFile={setSelectedFile}
              onCreateFile={createFile}
              onDeleteFile={deleteFile}
            />
          </div>
          
          {/* Editor and Preview */}
          <div className="flex-1 flex">
            {/* Code Editor */}
            <div className="w-1/2 border-r border-gray-800">
              <CodeEditor
                file={selectedFile}
                content={selectedFile ? files[selectedFile] : ''}
                onContentChange={(content) => selectedFile && updateFile(selectedFile, content)}
              />
            </div>
            
            {/* Preview */}
            <div className="w-1/2">
              <PreviewPane files={files} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
