import { Application } from "express";
import CityModel from "./city.model";
import WeatherModel from "./weather.model";
import UserModel from "./user.model";

// Create all of the models and set them to the models key on the express app instance
// having the models be accessible through the express app simplifies setting up DB connections,
// and prevents importing models individually in controllers
export default function (app: Application) {
  app.set('models', {
    City: new CityModel(app),
    Weather: new WeatherModel(app),
    User: new UserModel(app),
  });
};
