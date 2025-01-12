/**
 * @fileoverview This module provides a collection of tools for searching and retrieving content from the web using the Tavily API.
 * It exports a function to get the tools with the necessary properties.
 * @filepath lib/agents/tools/index.tsx
 */

import { createStreamableUI } from 'ai/rsc'
import { retrieveTool } from './retrieve'
import { searchTool } from './search'

export interface ToolProps {
  uiStream: ReturnType<typeof createStreamableUI>
  fullResponse: string
}

/**
 * Returns an object containing the search and retrieve tools.
 * @param {ToolProps} props - The properties for the tools, including UI stream and full response.
 * @returns {Object} An object with the search and retrieve tools.
 */
export const getTools = ({ uiStream, fullResponse }: ToolProps) => {
  const tools: any = {
    search: searchTool({
      uiStream,
      fullResponse
    }),
    retrieve: retrieveTool({
      uiStream,
      fullResponse
    })
  }

  return tools
}
