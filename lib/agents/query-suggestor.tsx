/**
 * @fileoverview This module provides functionality to suggest related queries based on user input.
 * It utilizes a streamable UI to dynamically update the query suggestion process and generate additional queries
 * that explore the subject matter more deeply.
 */

import { createStreamableUI, createStreamableValue } from 'ai/rsc'
import { CoreMessage, streamObject } from 'ai'
import { PartialRelated, relatedSchema } from '@/lib/schema/related'
import SearchRelated from '@/components/search-related'
import { getModel } from '../utils/registry'
import { QUERY_SUGGESTOR_PROMPT } from '../prompts/prompts'

/**
 * Suggests related queries to further explore the subject matter based on user input.
 * @param {ReturnType<typeof createStreamableUI>} uiStream - The UI stream to update with related query data.
 * @param {CoreMessage[]} messages - The messages containing user input and context.
 * @param {string} model - The model identifier used to process the query suggestion.
 * @returns {Promise<PartialRelated>} A promise that resolves to the final set of related queries.
 */
export async function querySuggestor(
  uiStream: ReturnType<typeof createStreamableUI>,
  messages: CoreMessage[],
  model: string
): Promise<PartialRelated> {
  const objectStream = createStreamableValue<PartialRelated>()
  uiStream.append(<SearchRelated relatedQueries={objectStream.value} />)

  const lastMessages = messages.slice(-1).map(message => {
    return {
      ...message,
      role: 'user'
    }
  }) as CoreMessage[]

  let finalRelatedQueries: PartialRelated = {}
  const result = await streamObject({
    model: getModel(model),
    system: QUERY_SUGGESTOR_PROMPT,
    messages: lastMessages,
    schema: relatedSchema
  })

  for await (const obj of result.partialObjectStream) {
    if (obj.items) {
      objectStream.update(obj)
      finalRelatedQueries = obj
    }
  }

  return finalRelatedQueries
}
