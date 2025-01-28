import express, {Request, Response } from 'express';

const router = express.Router();

router.use(express.json());


router.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
    }
);

module.exports = router;