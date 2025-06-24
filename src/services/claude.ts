
interface ClaudeMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface ClaudeResponse {
  content: Array<{
    type: string;
    text: string;
  }>;
}

export class ClaudeService {
  private apiKey: string;
  private baseUrl = 'https://api.anthropic.com/v1/messages';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async sendMessage(messages: ClaudeMessage[], systemPrompt?: string): Promise<string> {
    try {
      // Validate API key format
      if (!this.apiKey || !this.apiKey.startsWith('sk-ant-api')) {
        throw new Error('Invalid Claude API key format. Please ensure your API key starts with "sk-ant-api"');
      }

      console.log('Sending request to Claude API...');
      
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': this.apiKey,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-3-5-sonnet-20241022', // Using the latest available model
          max_tokens: 4000,
          system: systemPrompt || 'You are a helpful coding assistant. Help users with React, TypeScript, Python, and web development tasks.',
          messages: messages.map(msg => ({
            role: msg.role,
            content: msg.content
          }))
        })
      });

      console.log('Claude API response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Claude API error response:', errorText);
        
        if (response.status === 401) {
          throw new Error('Invalid API key. Please check your Claude API key.');
        } else if (response.status === 429) {
          throw new Error('Rate limit exceeded. Please try again in a moment.');
        } else if (response.status === 400) {
          throw new Error('Bad request. Please check your message format.');
        } else {
          throw new Error(`Claude API error: ${response.status} - ${errorText}`);
        }
      }

      const data: ClaudeResponse = await response.json();
      console.log('Claude API response received successfully');
      
      return data.content[0]?.text || 'No response from Claude';
    } catch (error) {
      console.error('Claude API error:', error);
      
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        throw new Error('Network error: Unable to connect to Claude API. Please check your internet connection.');
      }
      
      throw error;
    }
  }
}
