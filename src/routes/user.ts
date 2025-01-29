import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { Users } from '../db';
import { createHash, validatePassword } from '../util/passwordHashing';
import { jwtAuthMiddleware } from '../middlewares/jwtAuth';
import { signupMiddleware, loginMiddleware } from '../middlewares/userSchemaValidation';
import { Types } from 'mongoose';

const router = express.Router();
router.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || '';

interface AuthenticatedRequest extends Request {
  userId?: string;
  hashedPassword?: string;
  _id?: Types.ObjectId;
}

async function signupUserExist(req: AuthenticatedRequest, res: Response, next: NextFunction) : Promise<void> {
  
  const { email } = req.body;
  
  try {
    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      res.status(409).json({ message: "Email already exists" });
      return;
    }
    next();
  } catch (e: any) {
    console.error(e);
    res.status(500).json({
      error: e.errors ? e.errors.map((err: any) => ({ message: err.message })) : [{ message: "An unexpected error occurred" }]
    });
  }
}

async function loginUserExist(req: AuthenticatedRequest, res: Response, next: NextFunction) : Promise<void> {
  const { email } = req.body;
  try {
    const existingUser = await Users.findOne({ email });
    if (!existingUser) {
      res.status(404).json({ message: "User does not exist" });
      return;
    }
    req.hashedPassword = existingUser.hashedPassword;
    req._id = existingUser._id;
    next();
  } catch (e: any) {
    console.error(e);
    res.status(500).json({ error: e.errors || [{ message: "An unexpected error occurred" }] });
  }
}

router.post('/signup', signupMiddleware, signupUserExist, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  const { email, firstName, lastName, plainPassword } = req.body;

  try {
    const newUser = new Users({ email, firstName, lastName });
    const hashedPassword = await createHash(plainPassword);
    newUser.hashedPassword = hashedPassword;
    await newUser.save();

    const userId = newUser._id;

    const token = jwt.sign({ userId: userId }, JWT_SECRET);

    console.log('User saved');
    res.json({ 
      message: 'User saved',
      token: token
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Database Error while adding new user" });
  }
});

router.post('/login', loginMiddleware, loginUserExist, async (req: AuthenticatedRequest, res: Response) : Promise<void> => {
  const { plainPassword } = req.body;
  const hashedPassword = req.hashedPassword;
  if (!hashedPassword) {
    res.status(500).json({ message: "Server Error: Missing password hash" });
    return;
  }
  const comparedPassword = await validatePassword(plainPassword, hashedPassword);
  if (!comparedPassword) {
    res.status(401).json({ message: "Wrong password" });
    return;
  }

  const userId = req._id;
  if (!userId) {
    res.status(500).json({ message: "Server Error: Missing user ID" });
    return;
  }
  const token = jwt.sign({ userId: userId }, JWT_SECRET);
  res.json({
    message: 'logged in',
    token: token
  });
  return
});


export default router;
