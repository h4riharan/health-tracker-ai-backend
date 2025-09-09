import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import user from '../models/user';

// Extend Express Request interface to include 'user'
declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

const secretKey = process.env.JWT_SECRET!;

export default function authenticateJWT(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET!, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      (req as any).user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
}

// Dummy registration validation middleware
export const validateRegistration = (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;
    if (!username || typeof username !== 'string' || username.length < 3) {
        return res.status(400).json({ message: 'Username is required and must be at least 3 characters.' });
    }
    if (!password || typeof password !== 'string' || password.length < 6) {
        return res.status(400).json({ message: 'Password is required and must be at least 6 characters.' });
    }
    next();
};

// Dummy login validation middleware
export const validateLogin = (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;
    if (!username || typeof username !== 'string') {
        return res.status(400).json({ message: 'Username is required.' });
    }
    if (!password || typeof password !== 'string') {
        return res.status(400).json({ message: 'Password is required.' });
    }
    next();
};