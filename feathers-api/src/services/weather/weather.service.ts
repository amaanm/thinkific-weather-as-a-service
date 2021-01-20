// Initializes the `weather` service on path `/weather`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Weather } from './weather.class';
import hooks from './weather.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'weather': Weather & ServiceAddons<any>;
  }
}

export default function (app: Application) {
  const options = {};

  // Initialize our service with any options it requires
  app.use('/weather', new Weather(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('weather');

  service.hooks(hooks);
}
