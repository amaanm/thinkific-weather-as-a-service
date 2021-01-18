import { Application } from "express";
import cities from './cities.controller';
import weather from './weather.controller';

// Create all of the models and set them to the models key on the express app instance
// having the models be accessible through the express app simplifies setting up DB connections,
// and prevents importing models individually in controllers
export default function (app: Application) {
  cities(app);
  weather(app);
};
