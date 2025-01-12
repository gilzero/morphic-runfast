/**
 * @fileoverview This module provides a tool for retrieving content from the web using the Tavily API.
 * The tool fetches and processes web content, returning structured search results.
 * @filepath lib/agents/tools/retrieve.tsx
 */

import { tool } from 'ai'
import { retrieveSchema } from '@/lib/schema/retrieve'
import { ToolProps } from '.'
import { DefaultSkeleton } from '@/components/default-skeleton'
import { SearchResults as SearchResultsType } from '@/lib/types'
import RetrieveSection from '@/components/retrieve-section'

const CONTENT_CHARACTER_LIMIT = 10000

/**
 * Fetches and extracts data from a given URL using the Tavily API.
 * @param {string} url - The URL to extract content from.
 * @returns {Promise<SearchResultsType | null>} A promise that resolves to the search results or null if an error occurs.
 */
async function fetchTavilyExtractData(
  url: string
): Promise<SearchResultsType | null> {
  try {
    const apiKey = process.env.TAVILY_API_KEY
    const response = await fetch('https://api.tavily.com/extract', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ api_key: apiKey, urls: [url] })
    })
    const json = await response.json()
    if (!json.results || json.results.length === 0) {
      return null
    }

    const result = json.results[0]
    const content = result.raw_content.slice(0, CONTENT_CHARACTER_LIMIT)

    return {
      results: [
        {
          title: content.slice(0, 100),
          content,
          url: result.url
        }
      ],
      query: '',
      images: []
    }
  } catch (error) {
    console.error('Tavily Extract API error:', error)
    return null
  }
}

/**
 * A tool for retrieving web content and displaying it in the UI.
 * @param {ToolProps} props - The properties for the tool, including UI stream and full response.
 * @returns {Function} A tool function that executes the content retrieval process.
 */
export const retrieveTool = ({ uiStream, fullResponse }: ToolProps) =>
  tool({
    description: 'Retrieve content from the web',
    parameters: retrieveSchema,
    execute: async ({ url }) => {
      // Append the search section
      uiStream.update(<DefaultSkeleton />)

      let results: SearchResultsType | null

      results = await fetchTavilyExtractData(url)

      if (!results) {
        fullResponse = `An error occurred while retrieving "${url}".`
        uiStream.update(null)
        return results
      }

      uiStream.update(<RetrieveSection data={results} />)

      return results
    }
  })
