import React, { useState, useEffect, useRef } from 'react';
import { Phone, PhoneCall, PhoneOff, Mic, MicOff, MessageSquare, X, Send, Bot, Sparkles, CheckCircle2 } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  time: string;
}

const KNOWLEDGE_BASE: Record<string, string> = {
  'plot_rate': 'Bhankrota 200 ft bypass aur Jaisinghpura link road par JDA approved plots ka rate lagbhag ₹38,500 se ₹45,000 per gaj chal raha hai. Hamare paas 111 gaj aur 200 gaj ke prime corner plots available hain jinki turant registry ho jayegi.',
  'loan': 'Ji bilkul sir! Hamari sabhi JDA approved properties par SBI, HDFC aur ICICI Bank se 80% tak ka home loan uplabdh hai. File clearance aur documentation me hamari team poori madad karti hai.',
  'registry': 'Ji 100% verified legal title hai! Single JDA patta aur RERA approved townships hain. Registry aur Dakhil-Kharij (Mutation) ke sabhi papers complete hain.',
  'site_visit': 'Maine aapki site visit request note kar li hai. Hamari team kal aapko Bhankrota office ya aapke home address se pickup karke location visit karwa degi. Kripya apna phone number confirm kar dijiye.',
  'villa': 'Delhi Public School (DPS) ke paas hamare paas 3 aur 4 BHK ke ready-to-move luxury duplex villas hain. Inka rate ₹78 Lakh se ₹85 Lakh ke beech hai, gated security aur private terrace ke sath.',
  'farmhouse': 'Weekend farmhouses ke liye Boraj-Begus road par 600 gaj se 1000 gaj ke gated farmhouse plots hain, jisme clubhouse, swimming pool aur 25 fruit trees plantation included hai. Rate sirf ₹9,200 per gaj hai.'
};

export const AiAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<'chat' | 'call'>('call');
  const [isCalling, setIsCalling] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [aiSpeaking, setAiSpeaking] = useState(false);
  const [callTranscript, setCallTranscript] = useState<string>('Call connect ho rahi hai...');

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'ai',
      text: 'Namaste! Main Pooja bol rahi hoon Ajarwal Real Estate Group se. Bhankrota aur Ajmer Road me aap kis tarah ki property dekh rahe hain — JDA Plot, Duplex Villa, ya Farmhouse?',
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
      utterance.lang = 'hi-IN';
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
    setCallTranscript('Namaste sir! Main Pooja, Ajarwal Real Estate Group se bol rahi hoon. Bhankrota me aap kis budget me property dekh rahe hain?');
    speakText('Namaste sir! Main Pooja, Ajarwal Real Estate Group se bol rahi hoon. Bhankrota me aap kis budget me property dekh rahe hain?');
  };

  const handleEndCall = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsCalling(false);
    setAiSpeaking(false);
    setCallTranscript('Call samapt hui.');
  };

  const handleUserResponseInCall = (type: string, userText: string) => {
    const aiReply = KNOWLEDGE_BASE[type] || 'Ji sir, main aapki baat samajh gayi. Hamara office Bhankrota Chauraha par hai, aap jab chahein aakar direct site inspect kar sakte hain.';
    setCallTranscript(`Aapne poocha: "${userText}"\n\nPooja: "${aiReply}"`);
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
      let reply = 'Dhanyawad aapke sandesh ke liye! Main aapko Bhankrota ki best verified property details share kar rahi hoon. Kya aap apna WhatsApp number share karna chahenge taaki brochure bhej sakein?';
      const lower = text.toLowerCase();

      if (lower.includes('rate') || lower.includes('plot') || lower.includes('zameen') || lower.includes('price')) {
        reply = KNOWLEDGE_BASE['plot_rate'];
      } else if (lower.includes('loan') || lower.includes('sbi') || lower.includes('bank')) {
        reply = KNOWLEDGE_BASE['loan'];
      } else if (lower.includes('registry') || lower.includes('jda') || lower.includes('patta')) {
        reply = KNOWLEDGE_BASE['registry'];
      } else if (lower.includes('villa') || lower.includes('house') || lower.includes('makan')) {
        reply = KNOWLEDGE_BASE['villa'];
      } else if (lower.includes('farmhouse') || lower.includes('kheti')) {
        reply = KNOWLEDGE_BASE['farmhouse'];
      } else if (lower.includes('visit') || lower.includes('dekhna') || lower.includes('call') || lower.includes('phone')) {
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
      <div className="hidden sm:flex fixed bottom-6 right-6 z-40 flex-col items-end gap-2.5">
        <button
          onClick={() => {
            setIsOpen(true);
            setMode('call');
            if (!isCalling) handleStartCall();
          }}
          className="group relative flex items-center gap-3 bg-gradient-to-r from-emerald-600 to-teal-700 text-white px-5 py-3 rounded-full shadow-2xl hover:scale-105 transition-all duration-300 border-2 border-emerald-400/30 cursor-pointer"
        >
          <div className="relative">
            <PhoneCall className="w-5 h-5 animate-bounce" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full animate-ping" />
          </div>
          <div className="text-left">
            <div className="text-[10px] font-semibold text-emerald-100 flex items-center gap-1">
              <span>LIVE AI ASSISTANT</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <div className="text-xs font-bold tracking-wide">Call Pooja (AI Agent)</div>
          </div>
        </button>

        <button
          onClick={() => {
            setIsOpen(true);
            setMode('chat');
          }}
          className="flex items-center gap-1.5 bg-slate-900/90 backdrop-blur text-slate-200 hover:text-white px-3.5 py-1.5 rounded-full text-xs font-medium border border-slate-700 shadow-lg hover:bg-slate-800 transition cursor-pointer"
        >
          <MessageSquare className="w-3 h-3 text-emerald-400" />
          <span>Chat in Hindi / English</span>
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
                    Ajarwal Group • Bhankrota Specialist
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
                      src="/logo-emblem.jpg"
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
                <div className="w-full grid grid-cols-2 gap-1.5 sm:gap-2 mb-3">
                  <button
                    onClick={() => handleUserResponseInCall('plot_rate', 'Bhankrota me plot rate kya hai?')}
                    className="p-2 sm:p-2.5 text-left text-[11px] sm:text-xs bg-slate-800/90 active:bg-slate-700 text-slate-200 rounded-xl border border-slate-700 transition cursor-pointer"
                  >
                    💬 "Plot rate kya hai?"
                  </button>
                  <button
                    onClick={() => handleUserResponseInCall('loan', 'Bank loan kitna milega?')}
                    className="p-2 sm:p-2.5 text-left text-[11px] sm:text-xs bg-slate-800/90 active:bg-slate-700 text-slate-200 rounded-xl border border-slate-700 transition cursor-pointer"
                  >
                    💬 "SBI/HDFC loan kitna?"
                  </button>
                  <button
                    onClick={() => handleUserResponseInCall('registry', 'JDA patta aur registry clear hai?')}
                    className="p-2 sm:p-2.5 text-left text-[11px] sm:text-xs bg-slate-800/90 active:bg-slate-700 text-slate-200 rounded-xl border border-slate-700 transition cursor-pointer"
                  >
                    💬 "JDA patta pakka hai?"
                  </button>
                  <button
                    onClick={() => handleUserResponseInCall('site_visit', 'Kal site visit book kar do')}
                    className="p-2 sm:p-2.5 text-left text-[11px] sm:text-xs bg-slate-800/90 active:bg-slate-700 text-slate-200 rounded-xl border border-slate-700 transition cursor-pointer"
                  >
                    💬 "Site visit book karo"
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
                          <span>{msg.sender === 'ai' ? 'Pooja (AI)' : 'Aap'}</span>
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
                    onClick={() => handleSendMessage('Bhankrota 200ft road pe JDA plot rate kya hai?')}
                    className="whitespace-nowrap px-2.5 py-1 text-[10px] sm:text-[11px] bg-slate-800 active:bg-slate-700 text-slate-300 rounded-full border border-slate-700 cursor-pointer"
                  >
                    Plot Rate Bhankrota?
                  </button>
                  <button
                    onClick={() => handleSendMessage('Kya 80% bank loan SBI se mil jayega?')}
                    className="whitespace-nowrap px-2.5 py-1 text-[10px] sm:text-[11px] bg-slate-800 active:bg-slate-700 text-slate-300 rounded-full border border-slate-700 cursor-pointer"
                  >
                    Bank Loan?
                  </button>
                  <button
                    onClick={() => handleSendMessage('Mujhe kal site visit karni hai')}
                    className="whitespace-nowrap px-2.5 py-1 text-[10px] sm:text-[11px] bg-slate-800 active:bg-slate-700 text-slate-300 rounded-full border border-slate-700 cursor-pointer"
                  >
                    Site Visit
                  </button>
                </div>

                {/* Input Bar */}
                <div className="p-2.5 bg-slate-900 border-t border-slate-800 flex items-center gap-2">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Pooja se Bhankrota property ke baare me puchiye..."
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
              <span>Ajarwal Group • 100% Verified Legal Titles • Bhankrota</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
