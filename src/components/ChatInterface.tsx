
import { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Bot } from 'lucide-react';
import { ClaudeService } from '@/services/claude';
import { ClaudeApiKeyInput } from './ClaudeApiKeyInput';

interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

interface ChatInterfaceProps {
  files: Record<string, string>;
  onUpdateFile: (filename: string, content: string) => void;
  onCreateFile: (filename: string, content: string) => void;
  onDeleteFile: (filename: string) => void;
}

export const ChatInterface = ({ files, onUpdateFile, onCreateFile }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'ai',
      content: 'Hello! I\'m Claude, your AI coding assistant. I can help you build React frontends and Python backends. Set your API key above to get started!',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [claudeService, setClaudeService] = useState<ClaudeService | null>(null);
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('claude-api-key') || '');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (apiKey) {
      setClaudeService(new ClaudeService(apiKey));
      localStorage.setItem('claude-api-key', apiKey);
    }
  }, [apiKey]);

  const handleApiKeySet = (newApiKey: string) => {
    setApiKey(newApiKey);
  };

  const getSystemPrompt = () => {
    const filesList = Object.keys(files).join(', ');
    return `You are Claude, a helpful coding assistant. You can help with React, TypeScript, Python, and web development.

Current project files: ${filesList}

You can suggest code changes, explain concepts, and help debug issues. When suggesting code changes, be specific about which files to modify and provide complete code examples.`;
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading || !claudeService) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const contextMessage = `Current files context:\n${Object.entries(files).map(([name, content]) => `\n--- ${name} ---\n${content.slice(0, 500)}${content.length > 500 ? '...' : ''}`).join('\n')}\n\nUser question: ${input}`;

      const claudeMessages = messages.slice(-5).map(msg => ({
        role: msg.type === 'user' ? 'user' as const : 'assistant' as const,
        content: msg.content
      }));
      claudeMessages.push({ role: 'user', content: contextMessage });

      const response = await claudeService.sendMessage(claudeMessages, getSystemPrompt());

      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: response,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Claude API error:', error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: 'Sorry, I encountered an error communicating with Claude. Please check your API key and try again.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="h-full flex flex-col bg-gray-900">
      {/* Header */}
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center space-x-2 mb-3">
          <Bot className="w-5 h-5 text-blue-400" />
          <h2 className="text-lg font-semibold">Claude AI Assistant</h2>
        </div>
        <ClaudeApiKeyInput 
          onApiKeySet={handleApiKeySet}
          hasApiKey={!!claudeService}
        />
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.type === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-100'
              }`}
            >
              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              <p className="text-xs opacity-60 mt-1">
                {message.timestamp.toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-800 rounded-lg p-3">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-800">
        <div className="flex space-x-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={claudeService ? "Ask Claude about your code..." : "Set your Claude API key above to start chatting"}
            disabled={!claudeService}
            className="flex-1 bg-gray-800 border border-gray-700 rounded-lg p-3 text-white placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            rows={3}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading || !claudeService}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
