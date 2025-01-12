/**
 * @fileoverview This module provides a tool for searching the web using the Tavily API.
 * It fetches and processes search results, returning structured data including images and descriptions.
 * @filepath lib/agents/tools/search.tsx
 */

import { tool } from 'ai'
import { createStreamableValue } from 'ai/rsc'
import { searchSchema } from '@/lib/schema/search'
import { SearchSection } from '@/components/search-section'
import { ToolProps } from '.'
import { sanitizeUrl } from '@/lib/utils'
import { SearchResultImage, SearchResults } from '@/lib/types'

/**
 * A tool for searching the web and displaying results in the UI.
 * @param {ToolProps} props - The properties for the tool, including UI stream and full response.
 * @returns {Function} A tool function that executes the search process.
 */
export const searchTool = ({ uiStream, fullResponse }: ToolProps) =>
  tool({
    description: 'Search the web for information',
    parameters: searchSchema,
    execute: async ({
      query,
      max_results,
      search_depth,
      include_domains,
      exclude_domains
    }) => {
      let hasError = false
      // Append the search section
      const streamResults = createStreamableValue<string>()
      uiStream.append(
        <SearchSection
          result={streamResults.value}
          includeDomains={include_domains}
        />
      )

      // Ensure the query meets the minimum character requirement
      const filledQuery =
        query.length < 5 ? query + ' '.repeat(5 - query.length) : query
      let searchResult: SearchResults

      try {
        searchResult = await tavilySearch(
          filledQuery,
          max_results,
          (search_depth === 'advanced' ? 'advanced' : 'basic'),
          include_domains,
          exclude_domains
        )
      } catch (error) {
        console.error('Search API error:', error)
        hasError = true
        searchResult = {
          results: [],
          query: filledQuery,
          images: [],
          number_of_results: 0
        }
      }

      if (hasError) {
        fullResponse = `An error occurred while searching for "${filledQuery}".`
        uiStream.update(null)
        streamResults.done()
        return searchResult
      }

      streamResults.done(JSON.stringify(searchResult))
      return searchResult
    }
  })

/**
 * Performs a search using the Tavily API.
 * @param {string} query - The search query.
 * @param {number} [maxResults=10] - The maximum number of results to return.
 * @param {'basic' | 'advanced'} [searchDepth='basic'] - The depth of the search.
 * @param {string[]} [includeDomains=[]] - Domains to include in the search.
 * @param {string[]} [excludeDomains=[]] - Domains to exclude from the search.
 * @returns {Promise<SearchResults>} A promise that resolves to the search results.
 * @throws Will throw an error if the API key is not set or if the API request fails.
 */
async function tavilySearch(
  query: string,
  maxResults: number = 10,
  searchDepth: 'basic' | 'advanced' = 'basic',
  includeDomains: string[] = [],
  excludeDomains: string[] = []
): Promise<SearchResults> {
  const apiKey = process.env.TAVILY_API_KEY
  if (!apiKey) {
    throw new Error('TAVILY_API_KEY is not set in the environment variables')
  }
  const includeImageDescriptions = true
  const response = await fetch('https://api.tavily.com/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      api_key: apiKey,
      query,
      max_results: Math.max(maxResults, 5),
      search_depth: searchDepth,
      include_images: true,
      include_image_descriptions: includeImageDescriptions,
      include_answers: true,
      include_domains: includeDomains,
      exclude_domains: excludeDomains
    })
  })

  if (!response.ok) {
    throw new Error(
      `Tavily API error: ${response.status} ${response.statusText}`
    )
  }

  const data = await response.json()
  const processedImages = includeImageDescriptions
    ? data.images
        .map(({ url, description }: { url: string; description: string }) => ({
          url: sanitizeUrl(url),
          description
        }))
        .filter(
          (
            image: SearchResultImage
          ): image is { url: string; description: string } =>
            typeof image === 'object' &&
            image.description !== undefined &&
            image.description !== ''
        )
    : data.images.map((url: string) => sanitizeUrl(url))

  return {
    ...data,
    images: processedImages
  }
}
