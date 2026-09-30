import { useState, useRef, useEffect } from 'react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

// Mock company knowledge base
const knowledgeBase: Record<string, string> = {
  'services': 'We offer six core services: Transmission & Distribution Planning, Power System Studies, Renewable Energy Integration, Grid Code Compliance, Smart Grid Technologies, and Industrial Power Systems consulting.',
  'service': 'We offer six core services: Transmission & Distribution Planning, Power System Studies, Renewable Energy Integration, Grid Code Compliance, Smart Grid Technologies, and Industrial Power Systems consulting.',
  'what do you do': 'AuraGrid Solutions specializes in innovative engineering and consulting services for modern power systems. We guide utilities, renewable energy developers, and industries through the evolving energy landscape.',
  'renewable': 'Our Renewable Energy Integration service provides comprehensive strategies for integrating renewable energy sources, including inverter-based technologies, into existing power systems. We help ensure seamless transition to clean energy.',
  'solar': 'We help integrate solar energy systems into existing grids, handling everything from interconnection studies to grid code compliance. Our team ensures optimal performance and reliability.',
  'wind': 'We provide wind energy integration services including grid impact studies, power quality analysis, and compliance with grid codes for wind farm connections.',
  'grid': 'Our grid services include Transmission & Distribution Planning, Power System Studies, Smart Grid Technologies, and Grid Code Compliance. We help optimize efficiency, reliability, and resilience.',
  'location': 'We are headquartered at Building A1, Dubai Digital Park, Dubai Silicon Oasis, Dubai 342001, United Arab Emirates.',
  'address': 'Our office is located at Building A1, Dubai Digital Park, Dubai Silicon Oasis, Dubai 342001, United Arab Emirates.',
  'contact': 'You can reach us at:\n• Email: info@auragridsolutions.com\n• Phone: +971 (0) 567835629\n• Address: Building A1, Dubai Digital Park, Dubai Silicon Oasis, Dubai 342001, UAE',
  'email': 'You can email us at info@auragridsolutions.com. We typically respond within 24 hours.',
  'phone': 'You can call us at +971 (0) 567835629. Our team is available during business hours (Sunday-Thursday, 9 AM - 6 PM GST).',
  'team': 'AuraGrid Solutions is co-founded by Dr. Nand Singh and Dr. Nagaraju Pogaku, both bringing 20+ years of proven experience in the power and energy industry.',
  'founder': 'Our co-founders are Dr. Nand Singh and Dr. Nagaraju Pogaku. Both are senior leaders with 20+ years of proven record in the power and energy industry.',
  'experience': 'Our leadership team has over 20 years of experience each in the power and energy industry, with expertise spanning grid planning, renewable integration, and power system analysis.',
  'pricing': 'Our pricing varies based on project scope and complexity. Please contact us at info@auragridsolutions.com or call +971 (0) 567835629 for a personalized quote.',
  'quote': 'For a project quote, please reach out to us at info@auragridsolutions.com or call +971 (0) 567835629. We\'d be happy to discuss your specific requirements.',
  'hours': 'Our business hours are Sunday through Thursday, 9:00 AM to 6:00 PM (GST - Gulf Standard Time, UTC+4).',
  'smart grid': 'Our Smart Grid Technologies service advises on the latest advancements including IoT sensors, advanced metering infrastructure, distribution automation, and AI-driven grid optimization.',
  'compliance': 'We help navigate the complexities of grid code requirements for utilities and energy providers across different regions and jurisdictions.',
  'industrial': 'Our Industrial Power Systems service provides specialized consulting on design and engineering of industrial power systems for manufacturing, processing, and heavy industry facilities.',
  'planning': 'Our Transmission & Distribution Planning service provides expert planning and analysis to optimize the efficiency and reliability of your utility\'s grid infrastructure.',
  'studies': 'Our Power System Studies include load flow analysis, short circuit studies, stability analysis, protection coordination, and harmonic analysis to ensure your grid meets all operational and regulatory standards.',
  'hello': 'Hello! 👋 Welcome to AuraGrid Solutions. I\'m here to help you learn about our power systems engineering and consulting services. What would you like to know?',
  'hi': 'Hi there! 👋 I\'m the AuraGrid assistant. How can I help you today? You can ask about our services, team, contact information, or anything else!',
  'hey': 'Hey! 👋 Welcome to AuraGrid Solutions. Feel free to ask me about our services, team, or how we can help with your power system needs.',
  'thanks': 'You\'re welcome! Is there anything else I can help you with?',
  'thank you': 'You\'re welcome! Don\'t hesitate to reach out if you need anything else. Have a great day!',
  'bye': 'Goodbye! Feel free to come back anytime you have questions. You can also contact us directly at info@auragridsolutions.com.',
  'help': 'I can help you with:\n• Our services and capabilities\n• Team information\n• Contact details\n• Business hours\n• Project inquiries\n\nJust ask me anything!',
};

function getResponse(input: string): string {
  const lower = input.toLowerCase().trim();
  
  // Check for exact or partial matches
  for (const [key, value] of Object.entries(knowledgeBase)) {
    if (lower.includes(key) || key.includes(lower)) {
      return value;
    }
  }
  
  // Default response
  return "Thanks for your question! While I can help with general information about our services, team, and contact details, for specific technical inquiries I'd recommend reaching out to our team directly at info@auragridsolutions.com or calling +971 (0) 567835629. They'll be happy to assist you!";
}

export default function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! 👋 I'm the AuraGrid assistant. How can I help you today? You can ask about our services, team, contact info, or anything else!",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const response = getResponse(input);
      const botMessage: Message = {
        id: Date.now() + 1,
        text: response,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 800 + Math.random() * 700);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickQuestions = [
    'What services do you offer?',
    'How can I contact you?',
    'Tell me about your team',
  ];

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-energy to-emerald-400 text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center chat-pulse ${isOpen ? 'scale-0' : 'scale-100'}`}
        aria-label="Open chat"
      >
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
          </svg>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-3rem)] chat-window">
          <div className="bg-white rounded-2xl shadow-2xl border border-nordic-100 overflow-hidden flex flex-col" style={{ height: '520px' }}>
            {/* Header */}
            <div className="bg-gradient-to-r from-nordic-900 to-nordic-800 px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-energy to-emerald-400 flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-medium text-sm">AuraGrid Assistant</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-energy rounded-full electric-dot"></span>
                    <span className="text-xs text-nordic-400">Online</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-nordic-400 hover:text-white transition-colors p-1"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-nordic-50/50">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-nordic-900 text-white rounded-br-md'
                        : 'bg-white text-nordic-700 border border-nordic-100 rounded-bl-md shadow-sm'
                    }`}
                  >
                    <p className="whitespace-pre-line">{msg.text}</p>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-md border border-nordic-100 shadow-sm">
                    <div className="flex gap-1.5">
                      <span className="w-2 h-2 bg-nordic-300 rounded-full typing-dot"></span>
                      <span className="w-2 h-2 bg-nordic-300 rounded-full typing-dot"></span>
                      <span className="w-2 h-2 bg-nordic-300 rounded-full typing-dot"></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions */}
            {messages.length <= 1 && (
              <div className="px-4 pb-2 flex flex-wrap gap-2">
                {quickQuestions.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => { setInput(q); }}
                    className="text-xs px-3 py-1.5 bg-white border border-nordic-200 rounded-full text-nordic-600 hover:border-energy hover:text-energy transition-all duration-200"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="px-4 py-3 border-t border-nordic-100 bg-white">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Ask me anything..."
                  className="flex-1 px-4 py-2.5 bg-nordic-50 rounded-full text-sm text-nordic-700 placeholder:text-nordic-400 focus:outline-none focus:ring-2 focus:ring-energy/30 border border-nordic-100 focus:border-energy/50 transition-all"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-energy to-emerald-400 text-white flex items-center justify-center hover:shadow-lg transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
