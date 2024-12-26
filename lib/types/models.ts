export interface Model {
  id: string
  name: string
  provider: string
  providerId: string
}

export const models: Model[] = [
  // {
  //   id: 'gpt-4o',
  //   name: 'GPT-4o',
  //   provider: 'OpenAI',
  //   providerId: 'openai'
  // },
  {
    id: 'gpt-4o-mini',
    name: 'GPT-4o mini',
    provider: 'OpenAI',
    providerId: 'openai'
  },
  // {
  //   id: 'claude-3-5-sonnet-latest',
  //   name: 'Claude 3.5 Sonnet',
  //   provider: 'Anthropic',
  //   providerId: 'anthropic'
  // },
  {
    id: 'claude-3-5-haiku-20241022',
    name: 'Claude 3.5 Haiku',
    provider: 'Anthropic',
    providerId: 'anthropic'
  },
  // {
  //   id: 'gemini-1.5-pro-002',
  //   name: 'Gemini 1.5 Pro',
  //   provider: 'Google Generative AI',
  //   providerId: 'google'
  // },
  {
    id: 'gemini-2.0-flash-exp',
    name: 'Gemini 2.0 Flash',
    provider: 'Google Generative AI',
    providerId: 'google'
  },
  // {
  //   id: 'llama-3.3-70b-versatile',
  //   name: 'LLama 3.3 70b Versatile',
  //   provider: 'Groq',
  //   providerId: 'groq'
  // },
  // {
  //   id: 'mixtral-8x7b-32768',
  //   name: 'Mixtral 8x7b',
  //   provider: 'Groq',
  //   providerId: 'groq'
  // },
  // {
  //   id: 'qwen2.5',
  //   name: 'Qwen 2.5',
  //   provider: 'Ollama',
  //   providerId: 'ollama'
  // },
  // {
  //   id: process.env.NEXT_PUBLIC_AZURE_DEPLOYMENT_NAME || 'undefined',
  //   name: process.env.NEXT_PUBLIC_AZURE_DEPLOYMENT_NAME || 'Undefined',
  //   provider: 'Azure',
  //   providerId: 'azure'
  // },
  // {
  //   id: process.env.NEXT_PUBLIC_OPENAI_COMPATIBLE_MODEL || 'undefined',
  //   name: process.env.NEXT_PUBLIC_OPENAI_COMPATIBLE_MODEL || 'Undefined',
  //   provider: 'OpenAI Compatible',
  //   providerId: 'openai-compatible'
  // }
]
