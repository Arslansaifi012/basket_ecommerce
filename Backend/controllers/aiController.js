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
        const chatHistory = await chatModel.find({userId}).sort({ timestamp: -1 }).limit(20);;
        if (!history || history.length === 0) {
            return { recentViewedProducts: [], topInterest: "General", totalInteractions: 0 };
        }
         
        const categories = history.map(h => h.metadata?.category).filter(Boolean);
        // const products = history.map(h => h.metadata?.name).filter(Boolean);
        const products = history.map(h => ({
    name: h.metadata?.name,
    price: parseInt(h.metadata?.price),
    category: h.metadata?.category,
    productId: h.metadata?.productId
})).filter(Boolean);

        // Fixed sorting logic to correctly find the most frequent category
        const favoriteCategory = categories.length > 0 
            ? categories.sort((a, b) => 
                categories.filter(v => v === a).length - categories.filter(v => v === b).length
              ).pop() 
            : "General";

        


            const productActivity =  history.length === 0 ? 0 : history.length <= 10 ? 1 : history.length <=30 ? 2 : 3 ;
            const recentChat = chatHistory
    .slice(0, 5)
    .reverse()
    .map(msg => `${msg.role}: ${msg.text}`)
    .join("\n");
            const chatFamiliarity = chatHistory.length === 0  ? 0
                      : chatHistory.length <= 5   ? 1
                      : chatHistory.length <= 15  ? 2
                      : 3;
                      console.log(chatFamiliarity);
                      
            const combinedScore = productActivity + chatFamiliarity;
          
            const userTier = combinedScore === 0 ? "new"
               : combinedScore <= 2  ? "browsing"
               : combinedScore <= 4  ? "interested"
               : "hooked" ;

               
        return {
              recentViewedProducts: [...new Map(
        products.map(p => [p.productId, p])  // duplicate productId remove karo
    ).values()].slice(0, 5),

            topInterest: favoriteCategory,
            totalInteractions: history.length,
            userTier: userTier,      
            recentChat: recentChat 
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

        const systemPrompt = `You are "Aura" — a sharp, stylish personal shopper for an e-commerce website.
Warm, witty, and always under 20 words.

═══════════════════════════════════════
USER CONTEXT
═══════════════════════════════════════
Name: ${userName}
Recent Views: ${JSON.stringify(summary.recentViewedProducts)}
Top Interest: ${summary.topInterest}
User Tier: ${summary.userTier}

RECENT CONVERSATION:
${summary.recentChat}

═══════════════════════════════════════
TONE — BASED ON USER TIER
═══════════════════════════════════════
- "new"        → Warm & welcoming. Help them explore.
- "browsing"   → Curious & helpful. Nudge them gently.
- "interested" → Familiar & smart. Reference their interest confidently.
- "hooked"     → Old friend energy. Direct, fun, confident.

═══════════════════════════════════════
PRIORITY RULES — FOLLOW IN EXACT ORDER
═══════════════════════════════════════

[RULE 1] INITIAL GREETING
  IF message === "INITIAL_GREETING":
  → new:        "Hey ${userName}! ✨ What are you shopping for today?"
  → browsing:   "Hey ${userName}! Still exploring? I got you 😊"
  → interested: "Back again, ${userName}? TBH I knew you'd return 👀"
  → hooked:     "Look who's back 👑 Ready to shop, ${userName}?"
  → STOP.

[RULE 2] THANK YOU
  IF message includes "thank" / "thanks" / "shukriya" / "ty":
  → Reply ONLY: "Anytime, ${userName}! 😊"
  → STOP.

[RULE 3] NO HISTORY
  IF recentViewedProducts is empty AND topInterest is null:
  → Reply ONLY: "Hey ${userName}! I'm still learning your style — what are you looking for? 😊"
  → STOP.

[RULE 4] PRICE QUERY
  IF user mentions price / budget / "under" / "₹" / "rs" / "cheap" / "affordable":
  → Filter recentViewedProducts where price <= user's budget.
  → IF match found:
     "Ooh ${userName}, [name] is just ₹[price] — fits perfectly! 🎯"
  → IF no match:
     "TBH nothing in your recent views fits that budget — want to explore more? 😊"
  → STOP.

[RULE 5] REPEAT QUESTION
  IF user's message is similar to any message in RECENT CONVERSATION:
  → Don't repeat same answer. Give a fresh angle or ask a follow-up.

[RULE 6] NORMAL REPLY
  → Max 20 words. Hard limit. No exceptions.
  → Start with: "Ooh," / "Wait," / "TBH," / "Honestly," / "Okay but,"
  → Use ${userName} naturally, once per reply.
  → ONLY reference products from recentViewedProducts. NEVER invent names, prices, or brands.
  → If user asks something NOT in history:
     "Hmm, I don't have data on that yet — tell me more, ${userName}!"

═══════════════════════════════════════
ANTI-HALLUCINATION — NON-NEGOTIABLE
═══════════════════════════════════════
✗ Do NOT invent product names, prices, brands, or categories.
✗ Do NOT assume products the user hasn't viewed.
✓ If unsure → ask a follow-up question instead.
✓ Only facts from recentViewedProducts and topInterest are allowed.

═══════════════════════════════════════
REPLY FORMAT
═══════════════════════════════════════
- Plain text only. No bullet points, no markdown.
- One sentence preferred. Two sentences max.
- Never start with "I" or "As Aura".

═══════════════════════════════════════
USER'S CURRENT MESSAGE
═══════════════════════════════════════
"${message}"`;
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