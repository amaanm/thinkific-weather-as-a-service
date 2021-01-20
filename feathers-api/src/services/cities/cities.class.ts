import { NotImplemented } from '@feathersjs/errors';
import { Id, NullableId, Paginated, Params, ServiceMethods } from '@feathersjs/feathers';
import { Application } from '../../declarations';

interface Data {}

interface ServiceOptions {}

export class Cities implements ServiceMethods<Data> {
  app: Application;
  options: ServiceOptions;

  constructor (options: ServiceOptions = {}, app: Application) {
    this.options = options;
    this.app = app;
  }

  async find (params?: Params): Promise<Data[] | Paginated<Data>> {
    return [
      { id: '0', name: 'Vancouver' },
      { id: '1', name: 'Prague' },
      { id: '2', name: 'Paris' },
      { id: '3', name: 'Sydney' },
    ];
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
