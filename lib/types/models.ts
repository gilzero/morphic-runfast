export interface Model {
  id: string
  name: string
  provider: string
  providerId: string
}

export const models: Model[] = [
  {
    id: 'gemini-2.0-flash-exp',
    name: 'Dreamer Speedy',
    provider: 'Dreamer AI',
    providerId: 'google'
  },
  // {
  //   id: 'claude-3-5-sonnet-latest',
  //   name: 'Claude 3.5 Sonnet',
  //   provider: 'Anthropic',
  //   providerId: 'anthropic'
  // },
  {
    id: 'claude-3-5-haiku-20241022',
    name: 'Dreamer Lite',
    provider: 'Dreamer AI',
    providerId: 'anthropic'
  },
  // {
  //   id: 'gpt-4o',
  //   name: 'GPT-4o',
  //   provider: 'OpenAI',
  //   providerId: 'openai'
  // },
  {
    id: 'gpt-4o-mini',
    name: 'Dreamer Micro',
    provider: 'Dreamer AI',
    providerId: 'openai'
  },

  // {
  //   id: 'gemini-1.5-pro-002',
  //   name: 'Gemini 1.5 Pro',
  //   provider: 'Google Generative AI',
  //   providerId: 'google'
  // },

  // {
  //   id: 'llama-3.3-70b-versatile',
  //   name: 'LLama 3.3 70b Versatile',
  //   provider: 'Groq',
  //   providerId: 'groq'
  // },
  // {
  //   id: process.env.NEXT_PUBLIC_AZURE_DEPLOYMENT_NAME || 'undefined',
  //   name: process.env.NEXT_PUBLIC_AZURE_DEPLOYMENT_NAME || 'Undefined',
  //   provider: 'Azure',
  //   providerId: 'azure'
  // },
  {
    id: process.env.NEXT_PUBLIC_OPENAI_COMPATIBLE_MODEL || 'undefined',
    name: 'Dreamer Live Mini',
    provider: 'Dreamer Live',
    providerId: 'openai-compatible'
  }
]
