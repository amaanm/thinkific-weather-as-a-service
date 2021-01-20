import { compareSync } from "bcrypt";
import { Application, NextFunction, Request, Response, Router } from "express";
import { sign } from "jsonwebtoken";
import { authRequired } from "../middleware/authenticate";
import { User } from "../types";

export function get(app: Application) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
      if (id != req.user.username) {
        return next({ code: 403, message: 'Unauthorized' });
      }
      const user: User = await app.get('models').User.get(id);
      if (!user) return next({ code: 404, message: 'Not found' });
      res.json(user);
    } catch (e) {
      next(e);
    }
  };
}

export function update(app: Application) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const { password, favouriteCity } = req.body;

    if (id != req.user.username) {
      return next({ code: 403, message: 'Unauthorized' });
    }
    const user: User = await app.get('models').User.get(id);
    if (!user) return next({ code: 404, message: 'Not found' });

    // Only update password/favouriteCity
    user.password = password || user.password;
    user.favouriteCity = favouriteCity || user.favouriteCity;

    res.json(await app.get('models').User.update(id, user, !!password));
  };
}

export function create(app: Application) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const user = req.body;

    if (!user || !user.username || !user.password) {
      return next({ code: 400, message: 'Invalid user object' });
    }

    try {
      const newUser: User = await app.get('models').User.create(user);
      res.status(201).json(newUser);
    } catch (e) {
      next(e);
    }
  };
}

export function authenticate(app: Application) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const auth = req.body;

    if (!auth || !auth.username || !auth.password) {
      return next({ code: 400, message: 'Username and password required' });
    }

    try {
      const user: User = await app.get('models').User.get(auth.username);

      if (!user || !compareSync(auth.password, user.password)) {
        throw new Error('Invalid credentials');
      }

      if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET env variable must be set');
      }

      res.json({
        user: { ...user, password: undefined },
        accessToken: sign({ ...user, sub: user.username }, process.env.JWT_SECRET),
      });
    } catch (e) {
      next({ code: 401, message: e.toString() });
    }
  };
}

export default function (app: Application) {
  const SERVICE_NAME = 'users';

  const router = Router();

  // user endpoints
  router.post('/', create(app));
  router.get('/:id', authRequired(), get(app));
  router.patch('/:id', authRequired(), update(app));
  router.post('/auth', authenticate(app));

  // could define multiple routers/version specific routes here. 
  app.use(`/v1/${SERVICE_NAME}`, router);
};
