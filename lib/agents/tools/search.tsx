import { tool } from 'ai'
import { createStreamableValue } from 'ai/rsc'
import Exa from 'exa-js'
import { searchSchema } from '@/lib/schema/search'
import { SearchSection } from '@/components/search-section'
import { ToolProps } from '.'
import { sanitizeUrl } from '@/lib/utils'
import { SearchResultImage, SearchResults, SearchResultItem } from '@/lib/types'

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

        // API requires a minimum of 5 characters in the query
        const filledQuery =
            query.length < 5 ? query + ' '.repeat(5 - query.length) : query
        let searchResult: SearchResults
        const searchAPI = (process.env.SEARCH_API as 'tavily' | 'exa') || 'tavily'

        console.log(`Using search API: ${searchAPI}`)
        try {
          searchResult = await (searchAPI === 'tavily'
              ? tavilySearch
              : exaSearch)(
              filledQuery,
              max_results,
              (search_depth === 'advanced' ? 'advanced' : 'basic'), // Corrected type here
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

async function exaSearch(
    query: string,
    maxResults: number = 10,
    _searchDepth: string,
    includeDomains: string[] = [],
    excludeDomains: string[] = []
): Promise<SearchResults> {
  const apiKey = process.env.EXA_API_KEY
  if (!apiKey) {
    throw new Error('EXA_API_KEY is not set in the environment variables')
  }

  const exa = new Exa(apiKey)
  const exaResults = await exa.searchAndContents(query, {
    highlights: true,
    numResults: maxResults,
    includeDomains,
    excludeDomains
  })

  return {
    results: exaResults.results.map((result: any) => ({
      title: result.title,
      url: result.url,
      content: result.highlight || result.text
    })),
    query,
    images: [],
    number_of_results: exaResults.results.length
  }
}
