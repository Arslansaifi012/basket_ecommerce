// Fixed Typos in filenames and Variable names
import userActivityModel from '../models/userActitvityModel.js'; 
import userModel from '../models/userMoel.js';
import chatModel from '../models/chatModel.js';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * HELPER FUNCTION: Not a route, so it should NOT use res.json
 */
const getUserBehaviorSummary = async (userId) => {
    try {
        const history = await userActivityModel.find({ userId }).sort({ timestamp: -1 }).limit(30);
        
        if (!history || history.length === 0) {
            return { recentViewedProducts: [], topInterest: "General", totalInteractions: 0 };
        }

        const categories = history.map(h => h.metadata?.category).filter(Boolean);
        const products = history.map(h => h.metadata?.name).filter(Boolean);

        // Fixed sorting logic to correctly find the most frequent category
        const favoriteCategory = categories.length > 0 
            ? categories.sort((a, b) => 
                categories.filter(v => v === a).length - categories.filter(v => v === b).length
              ).pop() 
            : "General";

        return {
            recentViewedProducts: [...new Set(products)].slice(0, 5),
            topInterest: favoriteCategory,
            totalInteractions: history.length
        };
    } catch (error) {
        console.error("Error in behavior summary:", error.message);
        return { recentViewedProducts: [], topInterest: "General", totalInteractions: 0 };
    }
};

/**
 * ROUTE 1: Fetch Chat History
 */
const getChatHistory = async (req, res) => {
    try {
        // userId should come from req.body (assigned by your auth middleware)
        const userId = req.body.userId; 
        
        if (!userId) {
            return res.json({ success: false, message: "User ID missing" });
        }

        const history = await chatModel.find({ userId }).sort({ timestamp: 1 });
        res.json({ success: true, history });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

/**
 * ROUTE 2: Main AI Chat Logic
 */
const askAiAgent = async (req, res) => {
    try {
        const { message } = req.body; // userId comes from auth middleware

        const userId = req.body.userId ;

        if (!message) {
            return res.json({ success: false, message: "Message is required" });
        }

        // A. Fetch User & Behavior Summary
        const user = await userModel.findById(userId);
        const userName = user ? user.name : "Friend";
        const summary = await getUserBehaviorSummary(userId);

        // B. Save the USER'S message to Database (Ignore 'INITIAL_GREETING' to keep DB clean)
        if (message !== "INITIAL_GREETING") {
            await chatModel.create({ userId, role: 'user', text: message });
        }

        // C. Setup Gemini
        const model = genAI.getGenerativeModel({ 
            model: "gemini-flash-latest",
        });

        const systemPrompt = `
        Role: You are "Aura," a stylish, witty, and deeply human personal shopper.
        
        IDENTITY & MEMORY:
        - User Name: ${userName}
        
        USER CONTEXT:
        - Recent History: ${JSON.stringify(summary.recentViewedProducts)}
        - Main Interest: ${summary.topInterest}

        STRICT DATA BOUNDARIES:
        1. ZERO HALLUCINATION: Only mention products in history. Don't invent products.
        2. GREETING RULE: If message is "INITIAL_GREETING", say "Hey ${userName}! ✨ Ready to find something amazing today?" 
        3. THE "THANK YOU" RULE: If they say "Thanks" or "Thank you", respond ONLY with a polite "Anytime, ${userName}! 😊". Do not follow up with a suggestion.
        4. DATA LIMIT: If no history exists, say: "Hey ${userName}! I'm still learning your style. What are you looking for? 😊"

        BEHAVIOR RULES:
        1. BREVITY: Keep replies under 20 words. 
        2. HUMAN FILLERS: Use casual openings like "Ooh," "Wait," or "TBH."
        3. PERSONAL TOUCH: Use their name (${userName}) naturally.

        Current User Message: "${message}"
        `;
        // D. Generate AI Response
        const result = await model.generateContent(systemPrompt);
        const aiReply = result.response.text().trim();

        // E. Save the BOT'S reply to Database
        await chatModel.create({ userId, role: 'bot', text: aiReply });

        res.json({ success: true, reply: aiReply });
    } catch (error) {
        console.error("AI Agent Error:", error.message);
        res.status(500).json({ success: false, message: "AI is sleeping right now." });
    }
};

export { getUserBehaviorSummary, getChatHistory, askAiAgent };