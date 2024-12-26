// filepath: components/empty-screen.tsx
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';

// Define an interface for message objects
interface Message {
  heading: string;
  message: string;
}

// Pool of messages with both heading and message
const allMessages: Message[] = [
  { heading: "What if we could time travel?", message: "What would happen if time travel became possible?" },
  { heading: "The Future of Space Exploration?", message: "What are the next big milestones in space exploration?" },
  { heading: "Could AI Become Conscious?", message: "Can artificial intelligence ever achieve true consciousness?" },
  { heading: "Life Beyond Earth?", message: "Do you think there's intelligent life elsewhere in the universe?" },
  { heading: "The End of Privacy?", message: "Will we see the end of privacy with the advancement of technology?" },
  { heading: "Surviving an Apocalypse?", message: "What would be the best strategies for surviving a global catastrophe?" },
  { heading: "The Mind-Reading Future?", message: "Could we one day read each other's thoughts?" },
  { heading: "The Impact of Longevity?", message: "What would happen if human lifespan was dramatically extended?" },
  { heading: "AI in Governance?", message: "Should AI be involved in making decisions for governments?" },
  { heading: "The Ethics of Cloning?", message: "Is cloning humans ethical, and if so, under what conditions?" },
  { heading: "Mind Uploading?", message: "Would you upload your mind to a computer if it were possible?" },
  { heading: "The Future of Work?", message: "How will jobs change with the rise of automation and AI?" },
  { heading: "Virtual Reality Living?", message: "Could we live entirely in virtual reality?" },
  { heading: "Genetic Modification for Enhancement?", message: "Should we genetically modify humans for enhanced abilities?" },
  { heading: "Wtf is The Singularity?", message: "What will happen when AI surpasses human intelligence?" },
  { heading: "The Mystery of Dark Matter?", message: "What is dark matter, and how does it affect the universe?" },
  { heading: "Humanity's Greatest Invention?", message: "What do you think will be humanity's greatest invention?" },
  { heading: "The Concept of Free Will?", message: "Do we truly have free will, or are our actions predetermined?" },
  { heading: "The Impact of Teleportation?", message: "If teleportation were possible, how would it change society?" },
  { heading: "The Future of Food?", message: "How will food production and consumption evolve in the future?" },
];

// Component Props interface
interface EmptyScreenProps {
  submitMessage: (message: string) => void;
  className?: string;
}

/**
 * Renders a list of example questions, selecting 4 randomly each time the component mounts.
 * @param {EmptyScreenProps} props - Component props
 * @param {Function} props.submitMessage - Function to submit the message to be processed
 * @param {string} [props.className] - Optional additional CSS classes
 */
export function EmptyScreen({ submitMessage, className }: EmptyScreenProps) {
  const [exampleMessages, setExampleMessages] = useState<Message[]>([]);

  useEffect(() => {
    // Shuffle and select 4 random messages from allMessages
    const shuffledMessages = [...allMessages].sort(() => Math.random() - 0.5);
    setExampleMessages(shuffledMessages.slice(0, 4));
  }, []);

  return (
    <div className={`mx-auto w-full transition-all ${className || ''}`}>
      <div className="bg-background p-2">
        <div className="mt-4 flex flex-col items-start space-y-2 mb-4">
          {exampleMessages.map((message, index) => (
            <Button
              key={index}
              variant="link"
              className="h-auto p-0 text-base"
              onClick={() => submitMessage(message.message)}
              aria-label={`Ask about ${message.heading}`}
            >
              <ArrowRight size={16} className="mr-2 text-muted-foreground" />
              {message.heading}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
