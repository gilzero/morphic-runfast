/**
 * @fileoverview This file defines the main page component for the RunFast AI application.
 * It sets up the initial AI state and renders the Chat component.
 * @filepath app/page.tsx
 */

import { Chat } from '@/components/chat'
import { generateId } from 'ai'
import { AI } from './actions'

/**
 * The maximum duration for the AI session.
 * @constant {number}
 */
export const maxDuration = 60

/**
 * Page component that initializes the AI state and renders the Chat component.
 * @returns {JSX.Element} The main page of the application.
 */
export default function Page() {
  const id = generateId()
  return (
    <AI initialAIState={{ chatId: id, messages: [] }}>
      <Chat id={id} />
    </AI>
  )
}