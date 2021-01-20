import axios from 'axios';
import { BadRequest, NotFound, NotImplemented } from '@feathersjs/errors';
import { Id, NullableId, Paginated, Params, ServiceMethods } from '@feathersjs/feathers';
import { Application } from '../../declarations';

interface Data {
  city: string;
  current: {
    temp: number;
    descShort: string;
    descLong: string;
    owmIcon?: string;
  };
}

interface ServiceOptions {}

export class Weather implements ServiceMethods<Data> {
  app: Application;
  options: ServiceOptions;

  constructor (options: ServiceOptions = {}, app: Application) {
    this.options = options;
    this.app = app;
  }

  async find (params?: Params): Promise<Data> {
    if (!params || !params.query || !params.query.city) {
      throw new BadRequest('city query required');
    }
    const { city } = params.query;

    try {
      const req = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.app.get('OWM_KEY')}`);
      const owm = req.data;
      const weather: Data = {
        city: `${owm.name}, ${owm.sys.country}`,
        current: {
          descShort: owm.weather[0].main,
          descLong: owm.weather[0].description,
          owmIcon: `http://openweathermap.org/img/wn/${owm.weather[0].icon}@2x.png`,
          temp: owm.main.temp - 273.15, // kelvin to degrees celcius
        },
      };

      return weather;
    } catch (e) {
      throw new NotFound('Cannot find that city');
    }
  }

  async get (id: Id, params?: Params): Promise<Data> {
    throw new NotImplemented();
  }

  async create (data: Data, params?: Params): Promise<Data> {
    throw new NotImplemented();
  }

  async update (id: NullableId, data: Data, params?: Params): Promise<Data> {
    throw new NotImplemented();
  }

  async patch (id: NullableId, data: Data, params?: Params): Promise<Data> {
    throw new NotImplemented();
  }

  async remove (id: NullableId, params?: Params): Promise<Data> {
    throw new NotImplemented();
  }
}
