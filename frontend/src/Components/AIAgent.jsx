
import React, { useState, useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';
import axios from 'axios';

const AIAgent = () =>{
     const {backendUrl, token} = useContext(ShopContext) ;
    const [input, setInput] = useState("") ;
    const [messages, setMessages] = useState({role:'bot', text:'Hi! I noticed you like our collection. How can I help you today'}) ;

   
    const handleSend = async() =>{

        const userMsg = {role: 'user', text: input} ;
        setMessages(prev => [...prev, userMsg]) ;
        setInput("") ;

        const handleSend = async () =>{
            const userMsg = {role: 'user', text:input} ;
            setMessages(prev => [...prev, userMsg]);
            setInput("") ;

            try {
                const res = await axios.post(backendUrl + '/api/ai/chat', {message: input, userId:token}) ;
                console.log(res);

                setMessages(prev => [...prev, {role: 'bot', text: res.data.reply}]) ;
                
            } catch (error) {
                console.log('AI_Agent_error',error.message) ;
                
            }

    }
}
return (
        <div className="fixed bottom-5 right-5 w-80 bg-white shadow-2xl border rounded-lg overflow-hidden z-50">
            <div className="bg-black text-white p-3 font-bold">Shopping AI Agent</div>
            <div className="h-64 overflow-y-auto p-3 flex flex-col gap-2">
                {messages.map((m, i) => (
                    console.log('this is m line 41--',m),
                    
                    <div key={i} className={`p-2 rounded ${m.role === 'user' ? 'bg-blue-100 self-end' : 'bg-gray-100 self-start'}`}>
                        {m.text}
                    </div>
                ))} ;

            </div>
            <div className="flex p-2 border-t">
                <input value={input} onChange={(e) => setInput(e.target.value)} className="flex-1 outline-none text-sm" placeholder="Ask me anything..." />
                <button onClick={handleSend} className="bg-black text-white px-3 py-1 ml-2">Send</button>
            </div>
        </div>
    );
} ;


export default AIAgent;