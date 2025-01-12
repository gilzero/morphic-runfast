/**
 * @fileoverview This module provides the functionality to perform inquiries based on user input.
 * It utilizes a streamable UI to dynamically update the inquiry process and gather additional information
 * when necessary to provide comprehensive responses.
 */

import { Copilot } from '@/components/copilot'
import { createStreamableUI, createStreamableValue } from 'ai/rsc'
import { CoreMessage, streamObject } from 'ai'
import { PartialInquiry, inquirySchema } from '@/lib/schema/inquiry'
import { getModel } from '../utils/registry'
import { INQUIRE_PROMPT } from '../prompts/prompts'

/**
 * Conducts an inquiry to gather additional information based on user input.
 * @param {ReturnType<typeof createStreamableUI>} uiStream - The UI stream to update with inquiry data.
 * @param {CoreMessage[]} messages - The messages containing user input and context.
 * @param {string} model - The model identifier used to process the inquiry.
 * @returns {Promise<PartialInquiry>} A promise that resolves to the final inquiry object.
 */
export async function inquire(
  uiStream: ReturnType<typeof createStreamableUI>,
  messages: CoreMessage[],
  model: string
): Promise<PartialInquiry> {
  const objectStream = createStreamableValue<PartialInquiry>()
  uiStream.update(<Copilot inquiry={objectStream.value} />)

  let finalInquiry: PartialInquiry = {}

  const result = await streamObject({
    model: getModel(model),
    system: INQUIRE_PROMPT,
    messages,
    schema: inquirySchema
  })

  try {
    for await (const obj of result.partialObjectStream) {
      if (obj) {
        objectStream.update(obj)
        finalInquiry = obj
      }
    }
  } finally {
    objectStream.done()
  }

  return finalInquiry
}
