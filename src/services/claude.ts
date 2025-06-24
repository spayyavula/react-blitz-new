
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
      console.log('API Key (first 20 chars):', this.apiKey.substring(0, 20) + '...');
      console.log('Messages count:', messages.length);
      console.log('System prompt length:', systemPrompt?.length || 0);
      
      const requestBody = {
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 4000,
        system: systemPrompt || 'You are a helpful coding assistant. Help users with React, TypeScript, Python, and web development tasks.',
        messages: messages.map(msg => ({
          role: msg.role,
          content: msg.content
        }))
      };

      console.log('Request body:', JSON.stringify(requestBody, null, 2));
      
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': this.apiKey,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify(requestBody)
      });

      console.log('Claude API response status:', response.status);
      console.log('Claude API response headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Claude API error response:', errorText);
        
        let errorMessage = `Claude API error: ${response.status}`;
        
        try {
          const errorData = JSON.parse(errorText);
          if (errorData.error?.message) {
            errorMessage = errorData.error.message;
          }
        } catch (e) {
          // If error response is not JSON, use the raw text
          errorMessage = errorText || errorMessage;
        }
        
        if (response.status === 401) {
          throw new Error('Invalid API key. Please check your Claude API key in the Anthropic Console and ensure it\'s active.');
        } else if (response.status === 429) {
          throw new Error('Rate limit exceeded. Please try again in a moment.');
        } else if (response.status === 400) {
          throw new Error(`Bad request: ${errorMessage}`);
        } else if (response.status === 403) {
          throw new Error('Access forbidden. Please check your API key permissions and billing status.');
        } else {
          throw new Error(`${errorMessage}`);
        }
      }

      const data: ClaudeResponse = await response.json();
      console.log('Claude API response received successfully');
      console.log('Response data:', data);
      
      if (!data.content || !data.content[0] || !data.content[0].text) {
        throw new Error('Invalid response format from Claude API');
      }
      
      return data.content[0].text;
    } catch (error) {
      console.error('Claude API error:', error);
      
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        throw new Error('Network error: Unable to connect to Claude API. Please check your internet connection and try again.');
      }
      
      throw error;
    }
  }
}
