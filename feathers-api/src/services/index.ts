import { Application } from '../declarations';
import users from './users/users.service';
import cities from './cities/cities.service';
import weather from './weather/weather.service';
// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application) {
  app.configure(users);
  app.configure(cities);
  app.configure(weather);
}
