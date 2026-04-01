import express from 'express';
import { askAiAgent, getChatHistory } from '../controllers/aiController.js';
import authUser from '../middleWare/auth.js';

const aiRouter = express.Router();

// Main chat endpoint
aiRouter.post('/chat', authUser, askAiAgent);

// History fetch endpoint (Call this in useEffect on Frontend)
aiRouter.get('/history', authUser, getChatHistory);

export default aiRouter;