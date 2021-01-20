import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

declare global {
  namespace Express {
    export interface Request {
        user?: any;
    }
  }
}

export function authRequired() {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET env variable must be set');
    }

    const header = req.headers['authorization'];
    if (!header) return res.status(401).json({ error: 'Auth required' });

    const token = header?.replace('Bearer ', '').trim();
    if (!token) return res.status(401).json({ error: 'Auth required' });

    try {
      const user = jwt.verify(token, process.env.JWT_SECRET!);
      req.user = user;
      next();
    } catch (e) {
      return res.status(401).json({ error: e.toString() });
    }
  };
}

export function authOptional() {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET env variable must be set');
      }

      const token = (req.headers['authorization'] || '').replace('Bearer ', '').trim();

      const user = jwt.verify(token, process.env.JWT_SECRET);
      req.user = user;
    } catch (e) {
      // don't care
    } finally {
      next();
    }
  };
}
