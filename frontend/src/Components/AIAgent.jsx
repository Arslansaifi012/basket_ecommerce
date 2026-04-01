import React, { useState, useContext, useEffect, useRef } from 'react';
import axios from 'axios';
import { Send, Bot, User, X, MessageSquare, Sparkles } from 'lucide-react';
import { ShopContext } from '../context/ShopContext';

const AIAgent = () => {
    const { backendUrl, token } = useContext(ShopContext);
    const [input, setInput] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'bot', text: 'Hi! I noticed you like our collection. How can I help you today?' }
    ]);

    const scrollRef = useRef(null);

    // Auto-scroll to bottom on new messages
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg = { role: 'user', text: input };
        setMessages(prev => [...prev, userMsg]);
        setInput("");
        setLoading(true);

        try {
            const res = await axios.post(
                `${backendUrl}/api/ai/chat`, 
                { message: input }, 
                { headers: { token: token } }
            );
            
            setMessages(prev => [...prev, { role: 'bot', text: res.data.reply }]);
        } catch (error) {
            console.error('AI_Agent_error', error.message);
            setMessages(prev => [...prev, { role: 'bot', text: "Sorry, I'm having trouble connecting. Try again?" }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            
            {/* Chat Window */}
            {isOpen && (
                <div className="w-80 md:w-96 h-[500px] bg-white shadow-2xl rounded-2xl flex flex-col mb-4 overflow-hidden border border-gray-100 animate-in slide-in-from-bottom-5 duration-300">
                    
                    {/* Header */}
                    <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-4 text-white flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <div className="bg-blue-500 p-1.5 rounded-lg">
                                <Sparkles size={18} className="text-white" />
                            </div>
                            <div>
                                <p className="font-bold text-sm">Shopping Assistant</p>
                                <p className="text-[10px] text-gray-300">Powered by AI</p>
                            </div>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-1 rounded-full transition-colors">
                            <X size={20} />
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
                        {messages.map((m, i) => (
                            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`flex gap-2 max-w-[85%] ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                    <div className={`p-2 rounded-full h-8 w-8 flex items-center justify-center shrink-0 ${m.role === 'user' ? 'bg-blue-600' : 'bg-gray-200'}`}>
                                        {m.role === 'user' ? <User size={16} className="text-white" /> : <Bot size={16} className="text-gray-600" />}
                                    </div>
                                    <div className={`p-3 rounded-2xl text-sm leading-relaxed ${
                                        m.role === 'user' 
                                        ? 'bg-blue-600 text-white rounded-tr-none' 
                                        : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-tl-none'
                                    }`}>
                                        {m.text}
                                    </div>
                                </div>
                            </div>
                        ))}
                        {loading && (
                            <div className="flex justify-start animate-pulse">
                                <div className="bg-gray-200 h-8 w-12 rounded-lg ml-10"></div>
                            </div>
                        )}
                    </div>

                    {/* Input Area */}
                    <div className="p-4 bg-white border-t">
                        <div className="relative flex items-center">
                            <input 
                                value={input} 
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                className="w-full bg-gray-100 border-none rounded-full py-2.5 pl-4 pr-12 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all" 
                                placeholder="Ask about products..." 
                            />
                            <button 
                                onClick={handleSend} 
                                disabled={!input.trim()}
                                className="absolute right-1.5 p-1.5 bg-gray-900 text-white rounded-full hover:bg-black disabled:bg-gray-300 transition-colors"
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
                className="bg-black hover:scale-110 transition-transform text-white p-4 rounded-full shadow-xl flex items-center justify-center"
            >
                {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
            </button>
        </div>
    );
};

export default AIAgent;