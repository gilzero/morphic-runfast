export interface Model {
  id: string
  name: string
  provider: string
  providerId: string
}

export const models: Model[] = [
  {
    id: 'gemini-2.0-flash-exp',
    name: 'DreamerAI Speedy',
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
    name: 'DreamerAI Lite',
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
    name: 'DreamerAI Micro',
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
  {
    id: 'sonar-pro',
    name: 'DreamerAI Pro',
    provider: 'Dreamer Live',
    providerId: 'openai-compatible'
  },
  {
    id: 'sonar-reasoning-pro',
    name: 'DreamerAI Reasoning Pro',
    provider: 'Dreamer Live',
    providerId: 'openai-compatible'
  }
]
