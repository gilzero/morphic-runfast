/**
 * @fileoverview This module provides functionality to manage tasks by deciding whether further inquiry is needed
 * based on the user's input. It analyzes the input and determines the optimal course of action to provide
 * the most relevant and comprehensive response.
 */

import { CoreMessage, generateObject } from 'ai'
import { nextActionSchema } from '../schema/next-action'
import { getModel } from '../utils/registry'
import { TASK_MANAGER_PROMPT } from '../prompts/prompts'

/**
 * Analyzes user input to decide whether to proceed with research or inquire for more information.
 * 
 * @param {CoreMessage[]} messages - The messages containing user input and context.
 * @param {string} model - The model identifier used to process the task management.
 * @returns {Promise<any>} A promise that resolves to the decision result, or null if an error occurs.
 */
export async function taskManager(messages: CoreMessage[], model: string) {
  try {
    const result = await generateObject({
      model: getModel(model),
      system: TASK_MANAGER_PROMPT,
      messages,
      schema: nextActionSchema
    })

    return result
  } catch (error) {
    console.error(error)
    return null
  }
}
