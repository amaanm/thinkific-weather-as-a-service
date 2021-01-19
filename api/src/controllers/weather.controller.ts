import { Application, NextFunction, Request, Response, Router } from "express";
import { Weather } from "../types";

export function find(app: Application) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { city } = req.query;
    if (!city) {
      // if no city query provided, throw error
      return next({ message: 'city must be specified', code: 400 });
    }

    try {
      const weather: Weather = await app.get('models').Weather.get(city);
      res.json(weather);
    } catch (e) {
      next(e);
    }
  };
}

export default function (app: Application) {
  const SERVICE_NAME = 'weather';

  const router = Router();

  // get weather for a given city
  router.get('/', find(app));

  // could define multiple routers/version specific routes here. 
  app.use(`/v1/${SERVICE_NAME}`, router);
};
