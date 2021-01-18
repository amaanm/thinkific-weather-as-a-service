import { Application, Router } from "express";

export default function (app: Application) {
  const SERVICE_NAME = 'cities';

  const router = Router();

  // list all cities
  router.get('/', async (req, res, next) => {
    try {
      const cities = await app.get('models').City.find();
      res.json(cities);
    } catch (e) {
      next(e)
    }
  });

  // could define multiple routers/version specific routes here. 
  app.use(`/v1/${SERVICE_NAME}`, router);
};
