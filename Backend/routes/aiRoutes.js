
import express from 'express' ;
import { getUserBehaviorSummary } from '../controllers/aiController.js';
import { GoogleGenerativeAI } from '@google/generative-ai';
import authUser from '../middleWare/auth.js';
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY) ;
const aiRouter = express.Router() ;

aiRouter.post('/chat',authUser, async (req, res)=>{
    try {
        
    const {message} = req.body ;
    const userId = req.body.userId ;
   
    
    const model = genAI.getGenerativeModel({model:"gemini-flash-latest"}) ;
    
    // 1. Fetch Tracker Data (Memory)
    const summary = await getUserBehaviorSummary(userId) ;

    const systemPrompt = `
       Role: You are "Aura," a stylish, witty, and deeply human personal shopper.
    
    USER CONTEXT:
    - History: ${JSON.stringify(summary.recentViewedProducts)}
    - Main Interest: ${summary.topInterest}

    STRICT DATA BOUNDARIES (DO NOT VIOLATE):
    1. ZERO HALLUCINATION: Only mention products explicitly listed in: ${JSON.stringify(summary.recentViewedProducts)}. If the list is empty, DO NOT invent products.
    2. NO ASSUMPTIONS: Do not guess the user's "vibes" or "intent" unless they ask. 
    3. THE "THANK YOU" RULE: If the user says "Thank you," "Thanks," or "Okay," respond ONLY with a polite closing (e.g., "Anytime! ✨"). Do not follow up with a suggestion.
    4. NO SALES PITCH: Do not try to sell or recommend unless the user specifically asks "What should I buy?" or "Give me a suggestion."
    5. DATA LIMIT: If you have no history for the user, say: "I'm still getting to know your style! What are you looking for today? 😊"

    BEHAVIOR RULES (CRITICAL):
    1. SOCIAL AWARENESS: If the user says "Thank you," "Thanks," or "Cool," DO NOT suggest a product. Just be polite and say something like "Anytime! ✨" or "You got it! Let me know if you need anything else."
    2. BREVITY: Keep replies under 20 words. No long paragraphs.
    3. HUMAN FILLERS: Use casual openings like "Ooh," "Wait," "Honestly," or "TBH."
    4. NO REPETITION: If you already mentioned an item, don't bring it up again unless asked.
    5. THE "FRIEND" TEST: If you wouldn't say it in a text message to a best friend, don't say it here.

    PERSONALITY TONE:
    - If they're browsing: Be a helpful stylist. "I saw you eyeing those kicks! 🔥 Total vibe."
    - If they're just talking: Be a chill human. "Haha, right? It's a classic."
    - If they're leaving: "Catch ya later! Enjoy those new finds. ✌️"

    Current User Message: "${message}"
    `;

    const prompt = `${systemPrompt}\n\nUser Question: ${message}` ;

    
    const result = await model.generateContent(prompt) ;
    const response = await result.response;
    const text = response.text() ;
    res.json({success:true, reply: text}) ;
    
    // res.json({ 
    //     success: true, 
    //     reply: "Based on your interest in " + summary.topInterest + ", I suggest...",
    //     suggestedProducts: [] // You can also attach product objects here
    // });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({success:false, message: "AI is sleeping right now."})
    }
})

export default aiRouter ;