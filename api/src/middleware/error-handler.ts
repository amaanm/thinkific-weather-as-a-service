import { NextFunction, Request, Response } from 'express';

export function errorHandler() {
  return (error: any, req: Request, res: Response, next: NextFunction) => {
    switch (typeof error) {
      case 'string':
        res.status(500).json({ error });
        break;
      case 'object':
        res.status(error.code || 500).json({ error: error.message || error.toString() });
        break;
      default:
        res.status(500).json({ error: error.toString() });
        break;
    }
  };
}
