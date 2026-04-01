import React, { useState, useContext, useEffect, useRef } from 'react';
import axios from 'axios';
import { Send, Bot, User, X, MessageSquare, Sparkles, Trash2 } from 'lucide-react';
import { ShopContext } from '../context/ShopContext';

const AIAgent = () => {
    const { backendUrl, token } = useContext(ShopContext);
    const [input, setInput] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState([]); // Start empty to load from DB

    const scrollRef = useRef(null);

    // 1. Fetch Chat History and Initial Greeting
    useEffect(() => {
        const initChat = async () => {
            try {
                // Fetch saved messages from MongoDB
                const res = await axios.get(`${backendUrl}/api/ai/history`, { headers: {token:token} });
                
                if (res.data.success && res.data.history.length > 0) {
                    setMessages(res.data.history);
                } else {
                    // If no history, trigger the personalized greeting
                    const greetingRes = await axios.post(
                        `${backendUrl}/api/ai/chat`, 
                        { message: "INITIAL_GREETING" }, 
                        { headers: { token } }
                    );
                    if (greetingRes.data.success) {
                        setMessages([{ role: 'bot', text: greetingRes.data.reply }]);
                    }
                }
            } catch (error) {
                console.error('Error initializing chat:', error.message);
                setMessages([{ role: 'bot', text: "Hey! I'm Aura. Ready to shop? ✨" }]);
            }
        };

        if (token) initChat();
    }, [token, backendUrl]);

    // Auto-scroll logic
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, loading]);

    const handleSend = async () => {
        if (!input.trim() || loading) return;

        const userMsg = { role: 'user', text: input };
        setMessages(prev => [...prev, userMsg]);
        setInput("");
        setLoading(true);

        try {
            const res = await axios.post(
                `${backendUrl}/api/ai/chat`, 
                { message: input }, 
                { headers: {token:token} }
            );
            
            if (res.data.success) {
                setMessages(prev => [...prev, { role: 'bot', text: res.data.reply }]);
            }
        } catch (error) {
            setMessages(prev => [...prev, { role: 'bot', text: "I hit a snag. Try again in a sec? 😅" }]);
        } finally {
            setLoading(false);
        }
    };

    if (!token) return null; // Hide if not logged in

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
            
            {isOpen && (
                <div className="w-[320px] sm:w-[380px] h-[520px] bg-white shadow-2xl rounded-2xl flex flex-col mb-4 overflow-hidden border border-gray-100 transition-all duration-500 animate-in fade-in zoom-in-95">
                    
                    {/* Header */}
                    <div className="bg-gray-900 p-4 text-white flex justify-between items-center shadow-md">
                        <div className="flex items-center gap-3">
                            <div className="bg-gradient-to-tr from-blue-500 to-purple-500 p-2 rounded-xl shadow-inner">
                                <Sparkles size={18} className="text-white animate-pulse" />
                            </div>
                            <div>
                                <p className="font-semibold text-sm leading-tight">Aura AI</p>
                                <div className="flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                                    <p className="text-[10px] text-gray-400 uppercase tracking-widest">Personal Stylist</p>
                                </div>
                            </div>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="hover:rotate-90 transition-transform duration-300 p-1">
                            <X size={20} className="text-gray-400 hover:text-white" />
                        </button>
                    </div>
                    

                    {/* Messages Area */}
                    <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#f8f9fa]">
                        {messages.map((m, i) => (
                            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`flex gap-2 max-w-[85%] ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                    <div className={`p-1.5 rounded-lg h-7 w-7 flex items-center justify-center shrink-0 shadow-sm ${m.role === 'user' ? 'bg-gray-800' : 'bg-white'}`}>
                                        {m.role === 'user' ? <User size={14} className="text-white" /> : <Bot size={14} className="text-blue-600" />}
                                    </div>
                                    <div className={`p-3 rounded-2xl text-[13px] shadow-sm ${
                                        m.role === 'user' 
                                        ? 'bg-blue-600 text-white rounded-tr-none' 
                                        : 'bg-white text-gray-700 border border-gray-100 rounded-tl-none'
                                    }`}>
                                        {m.text}
                                    </div>
                                </div>
                            </div>
                        ))}
                        {loading && (
                            <div className="flex justify-start items-center gap-2">
                                <div className="bg-white p-2 rounded-2xl rounded-tl-none border border-gray-100 shadow-sm">
                                    <div className="flex gap-1">
                                        <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce"></span>
                                        <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                                        <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Input Area */}
                    <div className="p-4 bg-white border-t border-gray-50">
                        <div className="relative flex items-center group">
                            <input 
                                value={input} 
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-4 pr-12 text-sm focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all" 
                                placeholder="Style me..." 
                            />
                            <button 
                                onClick={handleSend} 
                                disabled={!input.trim() || loading}
                                className="absolute right-2 p-2 bg-gray-900 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-200 transition-all active:scale-90"
                            >
                                <Send size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Floating Toggle Button */}
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="bg-gray-900 hover:bg-black group hover:scale-110 transition-all duration-300 text-white p-4 rounded-2xl shadow-2xl flex items-center justify-center relative"
            >
                {isOpen ? <X size={24} /> : (
                    <>
                        <MessageSquare size={24} />
                        <span className="absolute -top-1 -right-1 flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                        </span>
                    </>
                )}
            </button>
        </div>
    );
};

export default AIAgent;
