/**
 * @fileoverview This module provides the functionality for conducting web-based research.
 * It leverages search results to provide comprehensive responses to user queries, including relevant images.
 */

import { createStreamableUI, createStreamableValue } from 'ai/rsc'
import { CoreMessage, generateText, streamText } from 'ai'
import { getTools } from './tools'
import { getModel } from '../utils/registry'
import { AnswerSection } from '@/components/answer-section'
import { RESEARCHER_SYSTEM_PROMPT } from '../prompts/prompts'

/**
 * Conducts a research process to provide detailed responses to user queries.
 * @param {ReturnType<typeof createStreamableUI>} uiStream - The UI stream to update with research data.
 * @param {CoreMessage[]} messages - The messages containing user input and context.
 * @param {string} model - The model identifier used to process the research.
 * @returns {Promise<{text: string, toolResults: any[]}>} A promise that resolves to the final response text and tool results.
 */
export async function researcher(
  uiStream: ReturnType<typeof createStreamableUI>,
  messages: CoreMessage[],
  model: string
) {
  try {
    let fullResponse = ''
    const streamableText = createStreamableValue<string>()
    let toolResults: any[] = []

    const currentDate = new Date().toLocaleString()
    const result = await streamText({
      model: getModel(model),
      system: `${RESEARCHER_SYSTEM_PROMPT} Current date and time: ${currentDate}`,
      messages: messages,
      tools: getTools({
        uiStream,
        fullResponse
      }),
      maxSteps: 5,
      onStepFinish: async event => {
        if (event.stepType === 'initial') {
          if (event.toolCalls && event.toolCalls.length > 0) {
            uiStream.append(<AnswerSection result={streamableText.value} />)
            toolResults = event.toolResults
          } else {
            uiStream.update(<AnswerSection result={streamableText.value} />)
          }
        }
      }
    })

    for await (const delta of result.fullStream) {
      if (delta.type === 'text-delta' && delta.textDelta) {
        fullResponse += delta.textDelta
        streamableText.update(fullResponse)
      }
    }

    streamableText.done(fullResponse)

    return { text: fullResponse, toolResults }
  } catch (error) {
    console.error('Error in researcher:', error)
    return {
      text: 'An error has occurred. Please try again.',
      toolResults: []
    }
  }
}
