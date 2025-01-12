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
  { heading: "🎨 How Does Art Influence Society?", message: "How does art shape cultural values and societal norms?" },
  { heading: "🔬 What Are the Next Medical Breakthroughs?", message: "What innovations in medicine could transform healthcare?" },
  { heading: "🌌 What Are the Unsolved Mysteries of the Universe?", message: "What are the most intriguing questions about the cosmos?" },
  { heading: "🎭 How Does Theatre Reflect Culture?", message: "In what ways does theatre mirror and influence cultural narratives?" },
  { heading: "🧬 What Are the Ethics of Genetic Editing?", message: "What moral dilemmas arise with advancements in genetic technology?" },
  { heading: "🖌️ How Is Design Evolving in the Digital Age?", message: "What are the latest trends and challenges in digital design?" },
  { heading: "🧠 What Are the Philosophical Questions About Consciousness?", message: "What are the key debates in the philosophy of mind?" },
  { heading: "🌱 How Can We Achieve a Sustainable Future?", message: "What strategies are essential for designing a sustainable planet?" },
  { heading: "📚 How Does Literature Shape Our Worldview?", message: "In what ways does literature influence our understanding of the world?" },
  { heading: "🎶 How Does Music Affect Cultural Identity?", message: "What role does music play in shaping emotions and cultural identity?" },
  { heading: "🖥️ What Are the Implications of the Digital Revolution?", message: "How is the digital revolution transforming society?" },
  { heading: "🏛️ How Does Architecture Impact Our Lives?", message: "In what ways does architecture influence human interaction and lifestyle?" },
  { heading: "🧘‍♀️ What Are the Scientific Insights into Well-being?", message: "How can science enhance our well-being and happiness?" },
  { heading: "🌍 How Will Globalization Evolve?", message: "What are the future trends and challenges of globalization?" },
  { heading: "🖼️ What Role Do Visual Arts Play in Culture?", message: "How do visual arts contribute to cultural expression and identity?" },
  { heading: "🚀 What Are the Challenges in Space Exploration?", message: "What are the next big opportunities and obstacles in space travel?" },
  { heading: "🧩 What Drives Human Behavior?", message: "What are the psychological and social factors influencing human actions?" },
  { heading: "💡 How Do Innovations Shape Our Future?", message: "What impact do new ideas and technologies have on society?" },
  { heading: "🌿 How Is Technology Transforming Healthcare?", message: "What are the intersections of health and technology in modern medicine?" },
  { heading: "🗣️ What Is the Role of Communication in Relationships?", message: "How does effective communication influence human connections?" },
  { heading: "🔍 How Do We Pursue Knowledge in the Information Age?", message: "What strategies are effective for acquiring knowledge today?" },
  { heading: "🎨 How Is Technology Changing Art Creation?", message: "What are the effects of technology on the creation and perception of art?" },
  { heading: "🌌 What Are the Implications of Discovering Extraterrestrial Life?", message: "How would finding life beyond Earth impact humanity?" },
  { heading: "🧠 How Might Human Cognition Evolve?", message: "What are the potential changes in human cognition with technological advancements?" },
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
