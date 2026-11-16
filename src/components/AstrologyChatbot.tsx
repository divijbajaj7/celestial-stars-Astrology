import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  MessageCircle,
  X,
  Send,
  RotateCcw,
  Compass,
  Star,
  ChevronDown,
  Minimize2
} from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
}

const INITIAL_GREETING: ChatMessage = {
  id: 'welcome',
  role: 'model',
  content:
    'Namaste. I am Celestial Stars, your Vedic astrology chatbot. You can ask me about your Kundli, planetary positions, zodiac signs, doshas, compatibility, career, wealth, relationships, or astrological remedies. How may the cosmos guide you today?',
  timestamp: 'Just now'
};

const SUGGESTION_CHIPS = [
  'What is Sade Sati and how to balance it?',
  'How does Rahu Mahadasha influence career?',
  'What factors determine zodiac compatibility?',
  'Which remedies help strengthen Jupiter (Guru)?'
];

export const AstrologyChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_GREETING]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isOpen, messages]);

  // Client-side sanitizer ensuring no *, #, or em-dashes ever render
  const cleanConstraintText = (text: string): string => {
    return text
      .replace(/[—–]/g, ' - ')
      .replace(/[*#]/g, '')
      .trim();
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || input.trim();
    if (!text || loading) return;

    const userMessage: ChatMessage = {
      id: Math.random().toString(36).slice(2, 9),
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      // Send chat history to backend
      const historyPayload = [...messages, userMessage].map((m) => ({
        role: m.role,
        content: m.content
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          messages: historyPayload
        })
      });

      const data = await res.json();
      const rawReply = data.reply || 'The celestial stars are silent at this moment. Please ask another astrological inquiry.';
      const cleanReply = cleanConstraintText(rawReply);

      const botMessage: ChatMessage = {
        id: Math.random().toString(36).slice(2, 9),
        role: 'model',
        content: cleanReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch {
      const fallbackMsg: ChatMessage = {
        id: Math.random().toString(36).slice(2, 9),
        role: 'model',
        content:
          'In Vedic astrology, planetary transits and houses reveal the seasons of life. Please share your Name, Date of Birth, Time of Birth, and Place of Birth to explore your chart.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([INITIAL_GREETING]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 select-none">
      {/* FLOATING TRIGGER BUTTON (When Chat is Closed) */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="liquid-glass rounded-full p-2.5 sm:p-3 flex items-center gap-3 text-white hover:scale-105 active:scale-95 transition-all shadow-2xl group cursor-pointer border border-white/20"
          style={{
            boxShadow: '0 0 35px rgba(255, 255, 255, 0.15), 0 8px 32px rgba(0, 0, 0, 0.8)'
          }}
          aria-label="Open Astrology Chatbot"
        >
          <div className="liquid-glass-circle w-11 h-11 rounded-full flex items-center justify-center text-white relative">
            <Sparkles className="w-5 h-5 text-white animate-pulse" />
            <span className="absolute top-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-black" />
          </div>
          <div className="hidden sm:flex flex-col text-left pr-2">
            <span className="font-serif-instrument text-base leading-tight text-white font-medium">
              Ask Celestial Oracle
            </span>
            <span className="text-[10px] text-white/60 font-sans">
              Vedic Astrology Chatbot
            </span>
          </div>
        </button>
      )}

      {/* POP-UP CHAT WINDOW (When Chat is Open) */}
      {isOpen && (
        <div
          className="liquid-glass w-[92vw] sm:w-[420px] h-[550px] max-h-[85vh] rounded-3xl flex flex-col text-white overflow-hidden shadow-2xl border border-white/15 animate-in fade-in slide-in-from-bottom-5 duration-300"
          style={{
            boxShadow: '0 0 60px rgba(0, 0, 0, 0.95), 0 20px 45px rgba(0, 0, 0, 0.85), inset 0 1px 1px rgba(255, 255, 255, 0.2)'
          }}
        >
          {/* Header */}
          <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between bg-black/40">
            <div className="flex items-center gap-3">
              <div className="liquid-glass-circle w-10 h-10 rounded-full flex items-center justify-center text-white relative">
                <Sparkles className="w-4 h-4 text-white" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-black" />
              </div>
              <div>
                <h3 className="font-serif-instrument text-xl tracking-tight text-white leading-tight">
                  Celestial Stars <em className="italic">Oracle</em>
                </h3>
                <div className="flex items-center gap-1.5 text-[11px] text-white/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Online · Vedic Astrology Guide</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleClearChat}
                className="liquid-glass-circle w-8 h-8 rounded-full flex items-center justify-center text-white/60 hover:text-white transition-colors cursor-pointer"
                title="Restart Chat"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="liquid-glass-circle w-8 h-8 rounded-full flex items-center justify-center text-white/70 hover:text-white transition-colors cursor-pointer"
                title="Minimize Chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs font-sans">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.role === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-white text-black font-medium shadow-md'
                      : 'liquid-glass text-white/95 border border-white/10'
                  }`}
                >
                  <p className="whitespace-pre-line select-text">
                    {msg.content}
                  </p>
                </div>
                <span className="text-[10px] text-white/40 mt-1 px-1">
                  {msg.timestamp}
                </span>
              </div>
            ))}

            {loading && (
              <div className="flex items-start">
                <div className="liquid-glass rounded-2xl px-4 py-3 border border-white/10 flex items-center gap-2 text-white/70 text-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-bounce [animation-delay:0.4s]" />
                  <span className="ml-1 text-[11px] font-serif-instrument italic text-white/80">
                    Consulting planetary transits...
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Quick Prompt Chips (Shown when 1 or few messages) */}
          {messages.length <= 2 && !loading && (
            <div className="px-4 pb-2 flex gap-1.5 overflow-x-auto no-scrollbar">
              {SUGGESTION_CHIPS.map((chip, i) => (
                <button
                  key={i}
                  onClick={() => handleSendMessage(chip)}
                  className="px-3 py-1 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-[11px] text-white/75 hover:text-white transition-all whitespace-nowrap cursor-pointer flex-shrink-0"
                >
                  {chip}
                </button>
              ))}
            </div>
          )}

          {/* Input Box */}
          <div className="p-3 border-t border-white/10 bg-black/60">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="liquid-glass rounded-full pl-4 pr-1.5 py-1.5 flex items-center gap-2 border border-white/15"
            >
              <input
                ref={inputRef}
                type="text"
                placeholder="Ask about your Kundli, signs, or remedies..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={loading}
                className="bg-transparent border-none outline-none flex-1 text-white placeholder:text-white/40 text-xs font-sans focus:outline-none"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                aria-label="Send Message"
                className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 active:scale-95 disabled:opacity-40 disabled:hover:scale-100 transition-all cursor-pointer flex-shrink-0 shadow-sm"
              >
                <Send className="w-3.5 h-3.5 translate-x-0.5" />
              </button>
            </form>
            <div className="text-[10px] text-white/40 text-center mt-1.5">
              Astrological interpretations for lifestyle guidance · Ask freely
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
