import express from 'express';
import { Request, Response } from 'express';
import { jwtAuthMiddleware } from '../middlewares/jwtAuth';
import { redisClient } from '../redisClient';

const router = express.Router();

interface AuthenticatedRequest extends Request {
    userId?: string;
}

router.post('/enqueue', jwtAuthMiddleware, async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.userId;
    const prompt = req.body.prompt;
    try {
        const job = JSON.stringify({userId, prompt});
        await redisClient.lPush('userRequests', job);
        res.status(200).json({ message: 'Request enqueued successfully' });
        return;
    }
    catch (e: any) {
        console.log(e);
        res.status(500).json({ message: "Failed to add request to queue" });
        return;
    }
});


export default router;
