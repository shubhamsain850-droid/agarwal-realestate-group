import React, { useState, useEffect, useRef } from 'react';
import { Phone, PhoneCall, PhoneOff, Mic, MicOff, X, Send, Bot, Sparkles, CheckCircle2 } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  time: string;
}

const KNOWLEDGE_BASE: Record<string, string> = {
  'plot_rate': 'Our featured Weekend Farms project in Hirapura (Near Mahindra SEZ, Ajmer Road) is priced at ₹11,950 per Gaj. Flexible farmhouse plot sizes range from 300 Gaj (₹35.85 Lakh) up to 3,000 Gaj with 100 ft wide approach road access.',
  'loan': 'Yes! Even though Weekend Farms (Hirapura) is an Agriculture Registry scheme, we arrange up to 70% bank loan assistance for eligible buyers along with complete documentation support.',
  'registry': 'The Weekend Farms project at Revenue Village Hirapura (Tehsil Madhorajpura) offers clean Tehsil Registry on Agriculture status with clear plot demarcation, gated boundary walls, and road infrastructure.',
  'site_visit': 'We would be pleased to schedule your site visit at Weekend Farms, Hirapura (Near Mahindra SEZ). Please share your preferred date and contact number on the booking form or via WhatsApp.',
  'farmhouse': 'Weekend Farms in Hirapura features gated farmhouse blocks (F-1 to F-24) on 60 ft & 40 ft interlocking paver roads, a 100 ft main approach road, electricity poles, parks, and close proximity to Mahindra SEZ, Oswal, Flipkart & Amazon warehouses.',
  'location': 'Weekend Farms is located at Ajay Rajpura – Hirapura near Mahindra World City SEZ: 4 km from Diggi/Renwal Road, 9 km from Muhana Ring Road, 17 km from Ring Road, and 24 km from 200 ft Ajmer Road.'
};

export const AiAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<'chat' | 'call'>('call');
  const [isCalling, setIsCalling] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [aiSpeaking, setAiSpeaking] = useState(false);
  const [callTranscript, setCallTranscript] = useState<string>('Connecting to AI Assistant...');

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'ai',
      text: 'Hello! I am Pooja from Ajarwal Real Estate Group. Ask me about our Weekend Farms project in Hirapura (Near Mahindra SEZ) — rates, plot sizes, 70% loan assistance, or scheduling your site visit.',
      time: 'Just now'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Call timer
  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (isCalling) {
      timer = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    } else {
      setCallDuration(0);
    }
    return () => clearInterval(timer);
  }, [isCalling]);

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 1.0;
      utterance.pitch = 1.05;
      setAiSpeaking(true);
      utterance.onend = () => setAiSpeaking(false);
      utterance.onerror = () => setAiSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleStartCall = () => {
    setMode('call');
    setIsCalling(true);
    const welcomeMsg = 'Hello! I am Pooja from Ajarwal Real Estate Group. Would you like details on our Weekend Farms plots at Hirapura near Mahindra SEZ?';
    setCallTranscript(welcomeMsg);
    speakText(welcomeMsg);
  };

  const handleEndCall = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsCalling(false);
    setAiSpeaking(false);
    setCallTranscript('Call ended. Thank you for connecting with Ajarwal Real Estate Group!');
  };

  const handleUserResponseInCall = (type: string, userText: string) => {
    const aiReply = KNOWLEDGE_BASE[type] || 'Thank you! You can explore our Weekend Farms layout map, real site photos, and book your site visit directly on the project page.';
    setCallTranscript(`You asked: "${userText}"\n\nPooja: "${aiReply}"`);
    speakText(aiReply);
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');

    // Generate AI response
    setTimeout(() => {
      let reply = 'Thank you for your message! I would be glad to share details for Weekend Farms in Hirapura (Near Mahindra SEZ). Would you like to connect on WhatsApp or book a site visit?';
      const lower = text.toLowerCase();

      if (lower.includes('rate') || lower.includes('plot') || lower.includes('price') || lower.includes('gaj')) {
        reply = KNOWLEDGE_BASE['plot_rate'];
      } else if (lower.includes('loan') || lower.includes('bank') || lower.includes('70%')) {
        reply = KNOWLEDGE_BASE['loan'];
      } else if (lower.includes('registry') || lower.includes('agri') || lower.includes('title')) {
        reply = KNOWLEDGE_BASE['registry'];
      } else if (lower.includes('location') || lower.includes('sez') || lower.includes('hirapura') || lower.includes('km')) {
        reply = KNOWLEDGE_BASE['location'];
      } else if (lower.includes('farmhouse') || lower.includes('size')) {
        reply = KNOWLEDGE_BASE['farmhouse'];
      } else if (lower.includes('visit') || lower.includes('tour') || lower.includes('call') || lower.includes('contact')) {
        reply = KNOWLEDGE_BASE['site_visit'];
      }

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: reply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, aiMsg]);
    }, 500);
  };

  const formatTimer = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <>
      {/* Floating Trigger Button (Hidden on small mobile since MobileBottomBar handles it, visible on md+) */}
      <div className="hidden sm:flex fixed bottom-6 right-6 z-40 items-center">
        <button
          onClick={() => {
            setIsOpen(true);
            setMode('call');
            if (!isCalling) handleStartCall();
          }}
          className="group relative flex items-center gap-3 bg-gradient-to-r from-amber-500 via-[#df9b58] to-[#c86446] text-slate-950 px-5 py-3 rounded-full shadow-[0_12px_35px_rgba(223,155,88,0.4)] hover:scale-105 transition-all duration-300 border border-amber-300/50 cursor-pointer"
        >
          <div className="relative">
            <PhoneCall className="w-5 h-5 text-slate-950 animate-bounce" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-white rounded-full animate-ping" />
          </div>
          <div className="text-left">
            <div className="text-[10px] font-extrabold text-slate-900/80 uppercase tracking-widest flex items-center gap-1">
              <span>LIVE AI ADVISOR</span>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-950 animate-pulse" />
            </div>
            <div className="text-xs font-black tracking-wide text-slate-950">Speak to Pooja (AI)</div>
          </div>
        </button>
      </div>

      {/* Main AI Modal / Bottom Sheet */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-slate-900 text-slate-100 rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-700 overflow-hidden flex flex-col max-h-[90vh] sm:max-h-[85vh]">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-950 p-3.5 sm:p-4 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <img
                    src="/logo-emblem-sandstone.jpg"
                    alt="Ajarwal Real Estate Emblem"
                    className="w-10 h-10 rounded-full object-cover border border-amber-400 shadow-sm"
                  />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-slate-900 rounded-full" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-bold text-white text-sm sm:text-base">Pooja (AI Property Advisor)</h3>
                    <span className="bg-emerald-500/20 text-emerald-400 text-[9px] font-semibold px-2 py-0.5 rounded-full border border-emerald-500/30">
                      Live
                    </span>
                  </div>
                  <p className="text-[10px] sm:text-xs text-slate-400 truncate max-w-[180px] sm:max-w-none">
                    Ajarwal Group • Jaipur Real Estate
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setMode(mode === 'call' ? 'chat' : 'call')}
                  className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition cursor-pointer"
                >
                  {mode === 'call' ? 'Chat' : 'Voice Call'}
                </button>
                <button
                  onClick={() => {
                    handleEndCall();
                    setIsOpen(false);
                  }}
                  className="p-1.5 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* CALL MODE INTERFACE */}
            {mode === 'call' && (
              <div className="flex-1 p-4 sm:p-6 flex flex-col items-center justify-between bg-gradient-to-b from-slate-900 to-slate-950 min-h-[350px]">
                <div className="flex flex-col items-center text-center mt-2">
                  <div className={`relative w-24 h-24 sm:w-28 sm:h-28 rounded-full flex items-center justify-center border-4 ${aiSpeaking ? 'border-amber-400 shadow-[0_0_35px_rgba(245,158,11,0.5)]' : 'border-slate-700'}`}>
                    <img
                      src="/logo-emblem-sandstone.jpg"
                      alt="Ajarwal"
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover shadow-inner"
                    />
                    {aiSpeaking && (
                      <div className="absolute inset-0 rounded-full border-2 border-amber-400 animate-ping opacity-60" />
                    )}
                  </div>

                  <h4 className="mt-3 text-base sm:text-lg font-bold text-white">Pooja (AI Calling Agent)</h4>
                  <p className="text-xs text-emerald-400 font-mono mt-0.5">
                    {isCalling ? `Active Call • ${formatTimer(callDuration)}` : 'Call Disconnected'}
                  </p>
                  <span className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5">
                    {aiSpeaking ? 'Pooja is speaking...' : 'Pooja is listening...'}
                  </span>
                </div>

                {/* Subtitle / Live Transcript Display */}
                <div className="w-full my-3 p-3 sm:p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 text-xs sm:text-sm text-slate-200 text-center leading-relaxed max-h-24 sm:max-h-32 overflow-y-auto">
                  <div className="flex items-center justify-center gap-1 text-[11px] text-emerald-400 mb-1 font-semibold">
                    <Sparkles className="w-3 h-3" /> Live Voice Transcript
                  </div>
                  {callTranscript}
                </div>

                {/* Quick Interactive Prompt Buttons for Call */}
                {/* Quick Call Action Prompts */}
                <div className="w-full grid grid-cols-2 gap-1.5 sm:gap-2 mb-3">
                  <button
                    onClick={() => handleUserResponseInCall('plot_rate', 'What is the per Gaj rate in Hirapura?')}
                    className="p-2 sm:p-2.5 text-left text-[11px] sm:text-xs bg-slate-800/90 active:bg-slate-700 text-slate-200 rounded-xl border border-slate-700 transition cursor-pointer"
                  >
                    💬 "Hirapura plot rates?"
                  </button>
                  <button
                    onClick={() => handleUserResponseInCall('loan', 'How much loan assistance is available?')}
                    className="p-2 sm:p-2.5 text-left text-[11px] sm:text-xs bg-slate-800/90 active:bg-slate-700 text-slate-200 rounded-xl border border-slate-700 transition cursor-pointer"
                  >
                    💬 "70% Bank loan details?"
                  </button>
                  <button
                    onClick={() => handleUserResponseInCall('registry', 'What is the registry & legal status?')}
                    className="p-2 sm:p-2.5 text-left text-[11px] sm:text-xs bg-slate-800/90 active:bg-slate-700 text-slate-200 rounded-xl border border-slate-700 transition cursor-pointer"
                  >
                    💬 "Registry & legal status?"
                  </button>
                  <button
                    onClick={() => handleUserResponseInCall('site_visit', 'Book a site visit at Weekend Farms')}
                    className="p-2 sm:p-2.5 text-left text-[11px] sm:text-xs bg-slate-800/90 active:bg-slate-700 text-slate-200 rounded-xl border border-slate-700 transition cursor-pointer"
                  >
                    💬 "Book your site visit"
                  </button>
                </div>

                {/* Call Control Buttons */}
                <div className="flex items-center gap-5 pb-1">
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className={`p-3.5 sm:p-4 rounded-full border transition cursor-pointer ${isMuted ? 'bg-amber-600/30 border-amber-500 text-amber-400' : 'bg-slate-800 border-slate-700 text-slate-300'}`}
                    title={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted ? <MicOff className="w-5 h-5 sm:w-6 sm:h-6" /> : <Mic className="w-5 h-5 sm:w-6 sm:h-6" />}
                  </button>

                  {isCalling ? (
                    <button
                      onClick={handleEndCall}
                      className="p-3.5 sm:p-4 rounded-full bg-red-600 active:bg-red-700 text-white shadow-lg shadow-red-600/40 transition active:scale-105 cursor-pointer"
                      title="End Call"
                    >
                      <PhoneOff className="w-6 h-6 sm:w-7 sm:h-7" />
                    </button>
                  ) : (
                    <button
                      onClick={handleStartCall}
                      className="p-3.5 sm:p-4 rounded-full bg-emerald-600 active:bg-emerald-700 text-white shadow-lg shadow-emerald-600/40 transition active:scale-105 cursor-pointer"
                      title="Start Call"
                    >
                      <Phone className="w-6 h-6 sm:w-7 sm:h-7" />
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* CHAT MODE INTERFACE */}
            {mode === 'chat' && (
              <div className="flex-1 flex flex-col bg-slate-950 overflow-hidden h-[380px] sm:h-[420px]">
                {/* Messages Container */}
                <div className="flex-1 p-3 sm:p-4 overflow-y-auto space-y-2.5">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed shadow-sm ${
                          msg.sender === 'user'
                            ? 'bg-emerald-600 text-white rounded-br-none'
                            : 'bg-slate-800 text-slate-200 rounded-bl-none border border-slate-700/80'
                        }`}
                      >
                        <div className="flex items-center gap-1 font-semibold text-[10px] mb-0.5 opacity-80">
                          {msg.sender === 'ai' && <Bot className="w-3 h-3 text-emerald-400" />}
                          <span>{msg.sender === 'ai' ? 'Pooja (AI)' : 'You'}</span>
                          <span>• {msg.time}</span>
                        </div>
                        <p>{msg.text}</p>
                      </div>
                    </div>
                  ))}
                  <div ref={chatEndRef} />
                </div>

                {/* Preset Chips */}
                <div className="px-2.5 py-2 bg-slate-900 border-t border-slate-800/80 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                  <button
                    onClick={() => handleSendMessage('What is the per Gaj rate in Hirapura Weekend Farms?')}
                    className="whitespace-nowrap px-2.5 py-1 text-[10px] sm:text-[11px] bg-slate-800 active:bg-slate-700 text-slate-300 rounded-full border border-slate-700 cursor-pointer"
                  >
                    Rate per Gaj?
                  </button>
                  <button
                    onClick={() => handleSendMessage('Can I get up to 70% bank loan?')}
                    className="whitespace-nowrap px-2.5 py-1 text-[10px] sm:text-[11px] bg-slate-800 active:bg-slate-700 text-slate-300 rounded-full border border-slate-700 cursor-pointer"
                  >
                    70% Loan?
                  </button>
                  <button
                    onClick={() => handleSendMessage('I want to book a site visit')}
                    className="whitespace-nowrap px-2.5 py-1 text-[10px] sm:text-[11px] bg-slate-800 active:bg-slate-700 text-slate-300 rounded-full border border-slate-700 cursor-pointer"
                  >
                    Book Site Visit
                  </button>
                </div>

                {/* Input Bar */}
                <div className="p-2.5 bg-slate-900 border-t border-slate-800 flex items-center gap-2">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Ask Pooja about Hirapura Weekend Farms..."
                    className="flex-1 bg-slate-950 border border-slate-700 text-slate-200 placeholder:text-slate-500 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-emerald-500"
                  />
                  <button
                    onClick={() => handleSendMessage()}
                    className="p-2 bg-emerald-600 active:bg-emerald-500 text-white rounded-xl transition cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Footer Trust Note */}
            <div className="bg-slate-950 py-2 px-3 text-center text-[10px] text-slate-500 border-t border-slate-800/80 flex items-center justify-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-500" />
              <span>Ajarwal Group • Verified Properties • Jaipur</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
