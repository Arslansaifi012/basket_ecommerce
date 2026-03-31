
import express from 'express' ;
import { getUserBehaviorSummary } from '../controllers/aiController';

const aiRouter = express.Router() ;

aiRouter.post('/chat', async (req, res)=>{

    const {message, userId} = req.body ;

    const summary = await getUserBehaviorSummary(userId) ;

    const systemPrompt = `
        You are a Personal Shopping Assistant for our E-commerce store. 
        User History: ${JSON.stringify(summary)}.
        Instructions: Use this history to suggest products. If they liked ${summary.topInterest}, 
        focus your recommendations there. Be friendly and witty.
    `;

    res.json({ 
        success: true, 
        reply: "Based on your interest in " + summary.topInterest + ", I suggest...",
        suggestedProducts: [] // You can also attach product objects here
    });
})

